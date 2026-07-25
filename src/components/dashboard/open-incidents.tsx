"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Car, Clock, ShieldAlert } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

const incidents = [
  {
    id: "INC-001",
    type: "Vehicle Breakdown",
    description: "CBZ-012 engine failure at Borrowdale",
    severity: "HIGH",
    status: "INVESTIGATING",
    icon: Car,
    time: "15 min ago",
  },
  {
    id: "INC-002",
    type: "Delayed Collection",
    description: "Econet Msasa 45 min overdue",
    severity: "MEDIUM",
    status: "OPEN",
    icon: Clock,
    time: "1 hour ago",
  },
];

export function OpenIncidents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Open Incidents</CardTitle>
        <Badge variant="destructive" className="text-xs">{incidents.length} active</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {incidents.map((incident) => {
          const Icon = incident.icon;
          return (
            <div
              key={incident.id}
              className="flex items-start gap-3 rounded-lg border p-3 transition-all hover:bg-muted/50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                <Icon className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{incident.type}</p>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {incident.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{incident.description}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{incident.time}</p>
              </div>
              <Badge variant="warning" className="text-[10px]">
                {incident.status}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
