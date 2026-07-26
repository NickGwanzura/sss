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

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        include: {
          driver: { select: { id: true, name: true } },
          vehicle: { select: { id: true, registration: true } },
          stops: {
            orderBy: { stopOrder: "asc" },
            include: { branch: { select: { id: true, name: true } } },
          },
          crew: {
            include: { employee: { select: { id: true, firstName: true, lastName: true, role: true } } },
          },
          _count: { select: { incidents: true, cashBags: true } },
        },
        orderBy: { scheduledDate: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.trip.count({ where }),
    ]);

    return NextResponse.json({ trips, total, limit, offset });
  } catch (error) {
    return handleError(error);
  }
}
