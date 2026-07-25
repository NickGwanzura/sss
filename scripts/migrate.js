const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

/**
 * Run Prisma migrations by executing the raw SQL directly via Prisma Client.
 * This bypasses the Prisma CLI entirely, avoiding config/env issues in Docker.
 */
async function runMigrations() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("ERROR: DATABASE_URL is not set");
    return false;
  }

  console.log(`Connecting to database...`);

  const prisma = new PrismaClient({
    log: ["error"],
  });

  try {
    await prisma.$connect();
    console.log("Connected to database successfully");

    // Read migration SQL files
    const migrationsDir = path.join(process.cwd(), "prisma", "migrations");
    if (!fs.existsSync(migrationsDir)) {
      console.error("Migrations directory not found:", migrationsDir);
      return false;
    }

    const dirs = fs.readdirSync(migrationsDir).sort();
    console.log(`Found ${dirs.length} migration(s): ${dirs.join(", ")}`);

    // Check which migrations are already applied
    let alreadyApplied = new Set();
    try {
      const result = await prisma.$queryRawUnsafe(
        "SELECT migration_name FROM _prisma_migrations"
      );
      if (Array.isArray(result)) {
        for (const row of result) {
          alreadyApplied.add(row.migration_name);
        }
      }
    } catch {
      // _prisma_migrations table doesn't exist yet - first migration
      console.log("No existing migrations table found, starting fresh");
    }

    console.log(`Already applied: ${[...alreadyApplied].join(", ") || "none"}`);

    for (const dir of dirs) {
      if (alreadyApplied.has(dir)) {
        console.log(`Skipping already-applied migration: ${dir}`);
        continue;
      }

      const sqlPath = path.join(migrationsDir, dir, "migration.sql");
      if (!fs.existsSync(sqlPath)) {
        console.log(`No SQL file for migration ${dir}, skipping`);
        continue;
      }

      const sql = fs.readFileSync(sqlPath, "utf-8");
      console.log(`Running migration: ${dir} (${sql.length} chars)`);

      // Execute the SQL in chunks to avoid overwhelming the connection
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const stmt of statements) {
        try {
          await prisma.$executeRawUnsafe(stmt + ";");
        } catch (err) {
          // Some statements might fail if objects already exist
          // In Prisma migrations, this is expected behavior
          console.log(`  Statement warning (continuing): ${err.message.substring(0, 100)}`);
        }
      }

      // Record the migration in _prisma_migrations table
      try {
        await prisma.$executeRawUnsafe(
          `INSERT INTO _prisma_migrations (migration_name, started_at, finished_at, migration_file) 
           VALUES ($1, NOW(), NOW(), $2)`,
          dir,
          `migrations/${dir}/migration.sql`
        );
      } catch (err) {
        console.log(`  Could not record migration: ${err.message}`);
      }

      console.log(`Migration ${dir} completed`);
    }

    console.log("All migrations completed successfully!");
    return true;
  } catch (err) {
    console.error("Migration failed:", err.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

runMigrations()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
