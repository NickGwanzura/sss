"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, MapPin, Phone, Clock, AlertTriangle, Navigation, Siren } from "lucide-react";

const activePanics = [
  {
    id: "PNC-001",
    vehicle: "CBZ-012",
    crew: "T. Moyo, S. Dube",
    location: "Borrowdale Rd / Samora Machel Ave",
    lat: -17.8292,
    lng: 31.0522,
    time: "2 min ago",
    status: "ACTIVE",
    description: "Panic button pressed at Borrowdale intersection",
    respondingUnits: ["CBZ-008", "Police Unit 4"],
  },
];

const panicHistory = [
  { id: "PNC-000", vehicle: "CBZ-005", date: "2024-06-15", type: "Test Drill", duration: "3 min", resolution: "False alarm", status: "RESOLVED" },
  { id: "PNC-000", vehicle: "CBZ-003", date: "2024-05-28", type: "Armed Robbery", duration: "45 min", resolution: "Police response, suspects apprehended", status: "RESOLVED" },
];

export default function PanicPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Panic System</h1>
          <p className="text-sm text-muted-foreground mt-1">Emergency response and alert management</p>
        </div>
        <Badge variant="destructive" className="gap-1.5 text-sm px-3 py-1">
          <div className="h-2 w-2 animate-pulse rounded-full bg-destructive-foreground" />
          {activePanics.length} Active
        </Badge>
      </div>

      {/* Active Panic Alert */}
      {activePanics.map((panic) => (
        <Card key={panic.id} className="border-destructive/50 bg-destructive/5 animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20">
                  <Siren className="h-7 w-7 text-destructive" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-destructive">EMERGENCY - {panic.id}</h2>
                    <Badge variant="destructive" className="animate-pulse">ACTIVE</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{panic.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="destructive" size="lg" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Escalate
                </Button>
                <Button variant="outline" size="lg">
                  Resolve
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Vehicle:</span>
                  <span>{panic.vehicle}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span>
                  <span>{panic.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Time:</span>
                  <span>{panic.time}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Responding Units</p>
                <div className="space-y-2">
                  {panic.respondingUnits.map((unit) => (
                    <div key={unit} className="flex items-center gap-2 rounded-lg border bg-background/50 px-3 py-2 text-sm">
                      <Navigation className="h-3.5 w-3.5 text-primary" />
                      {unit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Map */}
              <div className="h-32 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/30">
                    <div className="h-4 w-4 rounded-full bg-destructive animate-ping" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-[10px]">
                  GPS: {panic.lat}, {panic.lng}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              <Button variant="destructive" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Crew
              </Button>
              <Button variant="destructive" className="gap-2">
                <Phone className="h-4 w-4" />
                Call Police
              </Button>
              <Button variant="destructive" className="gap-2">
                <MapPin className="h-4 w-4" />
                Nearby Vehicles
              </Button>
              <Button variant="destructive" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                SMS Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Panic History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {panicHistory.map((h, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-lg border p-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                h.status === "RESOLVED" ? 'bg-green-500/10' : 'bg-destructive/10'
              }`}>
                <ShieldAlert className={`h-4 w-4 ${h.status === "RESOLVED" ? 'text-green-600' : 'text-destructive'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{h.type}</p>
                  <Badge variant={h.status === "RESOLVED" ? "success" : "destructive"} className="text-[10px]">
                    {h.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{h.vehicle} · {h.date} · Duration: {h.duration}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">{h.resolution}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
