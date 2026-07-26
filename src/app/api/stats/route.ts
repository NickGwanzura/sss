import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionOrThrow, handleError } from "@/lib/api/helpers";

export async function GET() {
  try {
    await getSessionOrThrow();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      activeTrips,
      completedDeliveries,
      vehiclesOnline,
      crewOnDuty,
      openIncidents,
      pendingCollections,
      totalVehicles,
      totalCrew,
    ] = await Promise.all([
      prisma.trip.count({ where: { status: { in: ["ASSIGNED", "EN_ROUTE", "COLLECTED"] } } }),
      prisma.trip.count({ where: { status: "DELIVERED", scheduledDate: { gte: today } } }),
      prisma.vehicle.count({ where: { status: "ACTIVE" } }),
      prisma.employee.count({ where: { isActive: true } }),
      prisma.incident.count({ where: { status: { in: ["OPEN", "INVESTIGATING"] } } }),
      prisma.collectionOrder.count({ where: { status: "PENDING", pickupDate: { gte: today } } }),
      prisma.vehicle.count(),
      prisma.employee.count(),
    ]);

    return NextResponse.json({
      activeTrips,
      completedDeliveries,
      vehiclesOnline,
      vehiclesTotal: totalVehicles,
      crewOnDuty,
      crewTotal: totalCrew,
      openIncidents,
      pendingCollections,
    });
  } catch (error) {
    return handleError(error);
  }
}
