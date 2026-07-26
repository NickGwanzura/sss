import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "nicholas.gwanzura@outlook.com";
    const password = "Zubi@2030";

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Admin user already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name: "System Admin",
        email,
        passwordHash,
        role: "SUPER_ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({ message: "Admin user created", email });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
