"use client";

import { DashboardStatsGrid } from "@/components/dashboard/stats-cards";
import { CollectionsChart } from "@/components/dashboard/collections-chart";
import { DepositsByClient } from "@/components/dashboard/deposits-by-client";
import { RecentTrips } from "@/components/dashboard/recent-trips";
import { LiveMap } from "@/components/dashboard/live-map";
import { IncidentTrends } from "@/components/dashboard/incident-trends";
import { VehicleUtilization } from "@/components/dashboard/vehicle-utilization";
import { OpenIncidents } from "@/components/dashboard/open-incidents";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operations Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time overview of all CIT operations
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStatsGrid />

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Collections Chart - spans 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <CollectionsChart />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DepositsByClient />
            <VehicleUtilization />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <OpenIncidents />
          <IncidentTrends />
        </div>
      </div>

      {/* Live Map */}
      <LiveMap />

      {/* Recent Trips */}
      <RecentTrips />
    </div>
  );
}
