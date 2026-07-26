import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionOrThrow, handleError } from "@/lib/api/helpers";

export async function GET() {
  try {
    await getSessionOrThrow();

    const clients = await prisma.client.findMany({
      include: {
        _count: { select: { branches: true, contracts: true, collectionOrders: true } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ clients });
  } catch (error) {
    return handleError(error);
  }
}
