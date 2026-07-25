const { execSync, spawn } = require("child_process");
const dns = require("dns");
const net = require("net");
const fs = require("fs");
const path = require("path");

const results = [];
const log = (msg) => {
  results.push(msg);
  console.log(msg);
};

async function main() {
  const dbUrl = process.env.DATABASE_URL || "";
  log(`DATABASE_URL: ${dbUrl.replace(/:[^:@]+@/, ":****@")}`);

  // Try to find hostname/port with or without protocol
  let host, port = 5432;
  const match1 = dbUrl.match(/@([^:]+):(\d+)/);
  const match2 = dbUrl.match(/:\/\/([^:]+):(\d+)/);
  
  if (match1) {
    host = match1[1];
    port = parseInt(match1[2]);
  } else if (match2) {
    host = match2[1];
    port = parseInt(match2[2]);
  } else {
    // Try common patterns
    if (dbUrl.includes("@")) {
      host = dbUrl.split("@")[1].split(":")[0];
    }
  }

  if (host) {
    log(`Target host: "${host}", port: ${port}`);

    // Test DNS resolution
    await new Promise((resolve) => {
      dns.resolve(host, (err, addresses) => {
        if (err) {
          log(`DNS ERROR: ${err.code} - ${err.message}`);
        } else {
          log(`DNS resolved to: ${addresses.join(", ")}`);
        }
        resolve();
      });
    });

    // Test TCP connection
    const connected = await new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(5000);
      socket.on("connect", () => {
        log("TCP: CONNECTED successfully!");
        socket.destroy();
        resolve(true);
      });
      socket.on("error", (err) => {
        log(`TCP ERROR: ${err.message}`);
        resolve(false);
      });
      socket.on("timeout", () => {
        log("TCP: Connection timed out after 5s");
        socket.destroy();
        resolve(false);
      });
      socket.connect(port, host);
    });

    // Try migrations if connected
    if (connected) {
      try {
        log("Running: npx prisma migrate deploy");
        const output = execSync("npx prisma migrate deploy", {
          encoding: "utf8",
          timeout: 30000,
          env: { ...process.env },
        });
        log(`Migration output: ${output.trim()}`);
        log("Migrations: SUCCESS");
      } catch (err) {
        log(`Migration ERROR: ${err.message}`);
        if (err.stdout) log(`Migration stdout: ${err.stdout}`);
        if (err.stderr) log(`Migration stderr: ${err.stderr}`);
      }
    }
  } else {
    log("WARNING: Could not parse DATABASE_URL");
  }

  finish();
}

function finish() {
  // Write diagnostic file to public dir for browser access
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const filePath = path.join(publicDir, "diagnostic.json");
    fs.writeFileSync(
      filePath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          nodeVersion: process.version,
          env: Object.keys(process.env)
            .filter((k) => !k.includes("SECRET") && !k.includes("PASSWORD") && !k.includes("KEY"))
            .reduce((acc, k) => {
              acc[k] = process.env[k]?.substring(0, 80);
              return acc;
            }, {}),
          diagnostics: results,
        },
        null,
        2
      )
    );
    log(`Diagnostic written to ${filePath}`);
  } catch (e) {
    log(`Could not write diagnostic file: ${e.message}`);
  }

  log("Starting Next.js server...");

  // Spawn the real Next.js server
  const server = spawn("node", ["server.js"], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: { ...process.env },
  });

  server.on("exit", (code) => {
    log(`Server exited with code ${code}`);
    process.exit(code);
  });
}

main().catch((err) => {
  log(`FATAL ERROR: ${err.message}`);
  finish();
});
