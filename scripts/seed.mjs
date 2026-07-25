// Plain JS seed script - use with: node scripts/seed.mjs
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Log the connection info (redacted password)
console.log("Connecting with adapter...");
if (process.env.DATABASE_URL) {
  console.log("DB:", process.env.DATABASE_URL.replace(/:[^:@]+@/, ":****@"));
}

async function main() {
  console.log("Seeding database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@"));

  // Create admin user
  const adminEmail = "admin@suburban.co.zw";
  const adminPassword = "Admin123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await prisma.user.create({
      data: {
        name: "System Admin",
        email: adminEmail,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });
    console.log(`Admin user created: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // Create a sample client
  const existingClient = await prisma.client.findUnique({
    where: { code: "CBZ" },
  });

  if (!existingClient) {
    const client = await prisma.client.create({
      data: {
        name: "CBZ Bank",
        type: "BANK",
        code: "CBZ",
        riskLevel: "Low",
        isActive: true,
      },
    });
    console.log(`Client created: ${client.name}`);

    const branches = ["Borrowdale", "Sam Levy", "Msasa", "Bulawayo"];
    for (const branchName of branches) {
      await prisma.branch.create({
        data: {
          clientId: client.id,
          name: branchName,
          isActive: true,
        },
      });
    }
    console.log(`${branches.length} branches created`);
  }

  // Create a sample vehicle
  const existingVehicle = await prisma.vehicle.findUnique({
    where: { registration: "SSS-001" },
  });

  if (!existingVehicle) {
    await prisma.vehicle.create({
      data: {
        registration: "SSS-001",
        make: "Toyota",
        model: "Hilux Double Cab",
        year: 2024,
        color: "White",
        capacity: 1500,
        status: "ACTIVE",
      },
    });
    console.log("Sample vehicle created: SSS-001");
  }

  // Create a sample employee
  const existingEmployee = await prisma.employee.findUnique({
    where: { employeeCode: "EMP-001" },
  });

  if (!existingEmployee) {
    await prisma.employee.create({
      data: {
        employeeCode: "EMP-001",
        firstName: "John",
        lastName: "Doe",
        role: "DRIVER",
        phone: "+263 77 123 4567",
        isActive: true,
      },
    });
    console.log("Sample employee created: EMP-001");
  }

  console.log("\nSeeding complete!");
  console.log(`\nLogin credentials:`);
  console.log(`  Email:    ${adminEmail}`);
  console.log(`  Password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
