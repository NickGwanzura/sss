import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionOrThrow, handleError } from "@/lib/api/helpers";

export async function GET(request: NextRequest) {
  try {
    await getSessionOrThrow();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 200);
    const offset = Number(searchParams.get("offset")) || 0;

    const where = status ? { status: status as any } : {};

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          _count: { select: { trips: true, serviceLogs: true } },
        },
        orderBy: { registration: "asc" },
        take: limit,
        skip: offset,
      }),
      prisma.vehicle.count({ where }),
    ]);

    return NextResponse.json({ vehicles, total, limit, offset });
  } catch (error) {
    return handleError(error);
  }
}
