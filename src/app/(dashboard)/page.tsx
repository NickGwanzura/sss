"use client";

import { DashboardStatsGrid } from "@/components/dashboard/stats-cards";
import { CollectionsChart } from "@/components/dashboard/collections-chart";
import { DepositsByClient } from "@/components/dashboard/deposits-by-client";
import { RecentTrips } from "@/components/dashboard/recent-trips";
import { LiveMap } from "@/components/dashboard/live-map";
import { IncidentTrends } from "@/components/dashboard/incident-trends";
import { VehicleUtilization } from "@/components/dashboard/vehicle-utilization";
import { OpenIncidents } from "@/components/dashboard/open-incidents";
import { useApi } from "@/hooks/use-api";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: statsData, loading } = useApi<{
    activeTrips: number;
    completedDeliveries: number;
    vehiclesOnline: number;
    vehiclesTotal: number;
    crewOnDuty: number;
    crewTotal: number;
    openIncidents: number;
    pendingCollections: number;
  }>("/api/stats");

  const stats = statsData ?? {
    activeTrips: 0,
    completedDeliveries: 0,
    vehiclesOnline: 0,
    vehiclesTotal: 0,
    crewOnDuty: 0,
    crewTotal: 0,
    openIncidents: 0,
    pendingCollections: 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operations Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time overview of all CIT operations
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <DashboardStatsGrid stats={stats} />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CollectionsChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DepositsByClient />
            <VehicleUtilization />
          </div>
        </div>
        <div className="space-y-6">
          <OpenIncidents />
          <IncidentTrends />
        </div>
      </div>

      <LiveMap />
      <RecentTrips />
    </div>
  );
}
