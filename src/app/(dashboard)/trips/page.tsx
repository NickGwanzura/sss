"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Navigation, AlertTriangle, Truck, Clock, Fuel, Gauge, Loader2 } from "lucide-react";
import { getStatusColor, formatCurrency } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { useState } from "react";

interface TripRow {
  id: string;
  tripNumber: string;
  status: string;
  scheduledDate: string;
  driver?: { id: string; name: string };
  vehicle?: { id: string; registration: string };
  stops: { stopOrder: number; type: string; branch?: { id: string; name: string }; status: string }[];
}

export default function TripsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, loading } = useApi<{ trips: TripRow[]; total: number }>(
    `/api/trips${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`,
  );

  const trips = data?.trips ?? [];

  const activeCount = trips.filter(
    (t) => t.status === "EN_ROUTE" || t.status === "COLLECTED",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trip Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Live tracking of all active CIT trips</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {activeCount} Active
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips..." className="pl-8" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trips</SelectItem>
            <SelectItem value="EN_ROUTE">En Route</SelectItem>
            <SelectItem value="COLLECTED">Collected</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : trips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Truck className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No trips found</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Create a new trip to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {trips.map((trip) => {
            const completedStops = trip.stops.filter((s) => s.status === "COLLECTED" || s.status === "DELIVERED").length;
            const branchName = trip.stops[0]?.branch?.name ?? "—";
            return (
              <Card key={trip.id} className="transition-all hover:shadow-md cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        trip.status === "EN_ROUTE" ? "bg-primary/10" :
                        trip.status === "COLLECTED" ? "bg-purple-500/10" :
                        trip.status === "DELIVERED" ? "bg-green-500/10" :
                        "bg-muted"
                      }`}>
                        <Truck className={`h-6 w-6 ${
                          trip.status === "EN_ROUTE" ? "text-primary" :
                          trip.status === "COLLECTED" ? "text-purple-600" :
                          trip.status === "DELIVERED" ? "text-green-600" :
                          "text-muted-foreground"
                        }`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{trip.tripNumber}</h3>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                            {trip.status.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                          <span>{trip.driver?.name ?? "Unassigned"}</span>
                          <span className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            {trip.vehicle?.registration ?? "—"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {branchName}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {new Date(trip.scheduledDate).toLocaleDateString()}
                          </span>
                          <span className="text-muted-foreground">
                            Stops: <span className="font-medium">{completedStops}/{trip.stops.length}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
