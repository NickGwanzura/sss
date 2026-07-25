"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Navigation, AlertTriangle, Truck, Clock, Fuel, Gauge } from "lucide-react";
import { getStatusColor, getStatusDot, formatCurrency } from "@/lib/utils";

const trips = [
  { id: "CIT-2024-089", client: "CBZ Bank", vehicle: "CBZ-012", driver: "T. Moyo", stops: 4, completed: 1, status: "EN_ROUTE", speed: "45 km/h", fuel: "¾", location: "Borrowdale", deviation: false, eta: "14:30" },
  { id: "CIT-2024-088", client: "Econet", vehicle: "CBZ-008", driver: "J. Ndlovu", stops: 3, completed: 2, status: "COLLECTED", speed: "0 km/h", fuel: "½", location: "Msasa", deviation: false, eta: "13:45" },
  { id: "CIT-2024-087", client: "OK Zimbabwe", vehicle: "CBZ-005", driver: "M. Chigumba", stops: 3, completed: 3, status: "DELIVERED", speed: "0 km/h", fuel: "¼", location: "Sam Levy", deviation: false, eta: "12:30" },
  { id: "CIT-2024-086", client: "NMB Bank", vehicle: "CBZ-003", driver: "T. Gumbo", stops: 4, completed: 0, status: "ASSIGNED", speed: "—", fuel: "Full", location: "Depot", deviation: false, eta: "15:00" },
  { id: "CIT-2024-085", client: "Meikles", vehicle: "—", driver: "Unassigned", stops: 2, completed: 0, status: "PENDING", speed: "—", fuel: "—", location: "—", deviation: false, eta: "16:00" },
  { id: "CIT-2024-084", client: "Total Energies", vehicle: "CBZ-001", driver: "S. Dube", stops: 3, completed: 1, status: "EN_ROUTE", speed: "52 km/h", fuel: "⅔", location: "Willowvale", deviation: true, eta: "11:45" },
];

export default function TripsPage() {
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
            {trips.filter(t => t.status === "EN_ROUTE" || t.status === "COLLECTED").length} Active
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trips..." className="pl-8" />
        </div>
        <Select defaultValue="all">
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

      {/* Trip Cards */}
      <div className="grid grid-cols-1 gap-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="transition-all hover:shadow-md cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Vehicle icon */}
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

                  {/* Trip info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{trip.id}</h3>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                        {trip.status.replace(/_/g, " ")}
                      </span>
                      {trip.deviation && (
                        <Badge variant="destructive" className="text-[10px] gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Deviation
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                      <span>{trip.client}</span>
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        {trip.vehicle}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {trip.location}
                      </span>
                      <span>{trip.driver}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        ETA: <span className="font-medium">{trip.eta}</span>
                      </span>
                      {trip.speed !== "—" && (
                        <span className="flex items-center gap-1">
                          <Gauge className="h-3 w-3 text-muted-foreground" />
                          {trip.speed}
                        </span>
                      )}
                      {trip.fuel !== "—" && (
                        <span className="flex items-center gap-1">
                          <Fuel className="h-3 w-3 text-muted-foreground" />
                          {trip.fuel}
                        </span>
                      )}
                      <span className="text-muted-foreground">
                        Stops: <span className="font-medium">{trip.completed}/{trip.stops}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
