import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionOrThrow, handleError } from "@/lib/api/helpers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await getSessionOrThrow();
    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        contacts: true,
        branches: {
          where: { isActive: true },
          orderBy: { name: "asc" },
        },
        contracts: {
          orderBy: { startDate: "desc" },
        },
        _count: {
          select: {
            branches: true,
            contracts: true,
            collectionOrders: true,
            invoices: true,
          },
        },
      },
    });

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json({ client });
  } catch (error) {
    return handleError(error);
  }
}
