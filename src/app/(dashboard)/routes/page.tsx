"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Route, Map, Navigation, Clock, GripVertical, Plus, Sparkles } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const routes = [
  {
    id: "RTE-001",
    name: "Harare North Circuit",
    vehicle: "CBZ-012",
    crew: "T. Moyo, S. Dube",
    stops: [
      { name: "CBZ Borrowdale", type: "Collection", eta: "10:00", status: "Completed" },
      { name: "Econet Msasa", type: "Collection", eta: "11:30", status: "En Route" },
      { name: "OK Sam Levy", type: "Collection", eta: "13:00", status: "Pending" },
      { name: "NMB City Centre", type: "Deposit", eta: "14:30", status: "Pending" },
    ],
    distance: "45 km",
    duration: "4.5 hrs",
    status: "ACTIVE",
  },
  {
    id: "RTE-002",
    name: "CBD Circuit",
    vehicle: "CBZ-008",
    crew: "J. Ndlovu, P. Sibanda",
    stops: [
      { name: "CBZ Sam Levy", type: "Collection", eta: "09:30", status: "Completed" },
      { name: "Total Willowvale", type: "Collection", eta: "11:00", status: "Completed" },
      { name: "CBZ Msasa", type: "Collection", eta: "12:30", status: "Pending" },
    ],
    distance: "32 km",
    duration: "3.5 hrs",
    status: "ACTIVE",
  },
  {
    id: "RTE-003",
    name: "Bulawayo Route",
    vehicle: "CBZ-003",
    crew: "T. Gumbo, L. Moyo",
    stops: [
      { name: "CBZ Bulawayo", type: "Collection", eta: "10:30", status: "Pending" },
      { name: "Meikles Hotel", type: "Collection", eta: "12:00", status: "Pending" },
    ],
    distance: "15 km",
    duration: "2 hrs",
    status: "SCHEDULED",
  },
];

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Route Planning</h1>
          <p className="text-sm text-muted-foreground mt-1">Build and optimize collection routes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Auto-Optimize
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Route
          </Button>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {routes.map((route) => (
          <Card key={route.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">{route.name}</CardTitle>
                    <Badge variant={route.status === "ACTIVE" ? "success" : "secondary"} className="text-[10px]">
                      {route.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {route.vehicle}
                    </span>
                    <span className="flex items-center gap-1">
                      <Route className="h-3 w-3" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {route.duration}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{route.crew}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Stops Timeline */}
              <div className="px-4 pb-4">
                {route.stops.map((stop, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold ${
                        stop.status === "Completed"
                          ? "border-success bg-success/10 text-success"
                          : stop.status === "En Route"
                          ? "border-primary bg-primary/10 text-primary animate-pulse"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {idx + 1}
                      </div>
                      {idx < route.stops.length - 1 && (
                        <div className="h-6 w-0.5 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{stop.name}</p>
                          <p className="text-xs text-muted-foreground">{stop.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium">{stop.eta}</p>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(stop.status === "Completed" ? "COLLECTED" : stop.status === "En Route" ? "EN_ROUTE" : "PENDING")}`}>
                            {stop.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Route Map Preview */}
              <div className="mx-4 mb-4 h-24 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 96">
                  <path
                    d="M30,70 Q80,20 130,50 Q180,80 230,40 Q280,0 330,50 Q360,70 370,30"
                    fill="none"
                    stroke="rgba(37, 99, 235, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                  {route.stops.map((_, idx) => (
                    <circle
                      key={idx}
                      cx={30 + idx * 85}
                      cy={idx % 2 === 0 ? 70 - idx * 8 : 50 + idx * 5}
                      r="4"
                      fill={`hsl(${220 + idx * 30}, 80%, 50%)`}
                    />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
