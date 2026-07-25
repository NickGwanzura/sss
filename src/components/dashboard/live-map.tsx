"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Truck, AlertTriangle, RefreshCw, Maximize2 } from "lucide-react";
import { useState } from "react";

const mapVehicles = [
  { id: "CBZ-012", lat: -17.8292, lng: 31.0522, status: "En Route", speed: 45, heading: "NE", nextStop: "Borrowdale" },
  { id: "CBZ-008", lat: -17.835, lng: 31.045, status: "Collected", speed: 0, heading: "—", nextStop: "Msasa" },
  { id: "CBZ-005", lat: -17.825, lng: 31.058, status: "Delivered", speed: 0, heading: "—", nextStop: "Sam Levy" },
  { id: "CBZ-003", lat: -17.840, lng: 31.035, status: "En Route", speed: 52, heading: "S", nextStop: "City Centre" },
];

export function LiveMap() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Card className={isFullscreen ? "fixed inset-4 z-50" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <CardTitle className="text-base font-semibold">Live Tracking</CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span>{mapVehicles.length} vehicles</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(!isFullscreen)}>
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Map Area - Stylized mock map */}
          <div className="relative h-64 lg:h-80">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Route lines */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
              <path
                d="M200,300 Q300,150 400,200 Q500,250 600,150"
                fill="none"
                stroke="rgba(37, 99, 235, 0.3)"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
              <path
                d="M150,200 Q250,250 350,180 Q450,110 550,200"
                fill="none"
                stroke="rgba(8, 145, 178, 0.3)"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
              <path
                d="M400,100 Q500,200 600,250 Q700,300 750,180"
                fill="none"
                stroke="rgba(234, 88, 12, 0.3)"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
            </svg>

            {/* Vehicle markers */}
            {mapVehicles.map((vehicle, idx) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
                className="absolute transition-all duration-500 hover:z-10"
                style={{
                  left: `${25 + idx * 18}%`,
                  top: `${30 + (idx % 2) * 25}%`,
                }}
              >
                <div className={`flex items-center gap-2 rounded-lg border bg-card px-2.5 py-1.5 shadow-lg transition-all hover:scale-110 ${selectedVehicle === vehicle.id ? 'ring-2 ring-primary scale-110 z-10' : ''}`}>
                  {vehicle.speed > 0 ? (
                    <Navigation className="h-3.5 w-3.5 text-primary animate-pulse" />
                  ) : (
                    <Truck className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className="text-xs font-medium">{vehicle.id}</span>
                  {selectedVehicle === vehicle.id && (
                    <div className="ml-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{vehicle.speed} km/h</span>
                      <span>{vehicle.heading}</span>
                      <span className="text-primary">→ {vehicle.nextStop}</span>
                    </div>
                  )}
                </div>
                {/* Pulse ring */}
                <div className={`absolute -inset-3 rounded-full border-2 border-primary/30 animate-ping ${vehicle.speed === 0 ? 'hidden' : ''}`} />
              </button>
            ))}

            {/* Incident marker */}
            <div className="absolute left-[55%] top-[60%]">
              <div className="flex items-center gap-1.5 rounded-lg border border-destructive/50 bg-destructive/10 px-2 py-1 text-xs text-destructive">
                <AlertTriangle className="h-3 w-3" />
                <span>Breakdown</span>
              </div>
            </div>

            {/* Branch markers */}
            {["Borrowdale", "Msasa", "Sam Levy"].map((name, idx) => (
              <div
                key={name}
                className="absolute flex items-center gap-1 rounded-lg bg-background/90 px-2 py-1 text-[10px] shadow-sm backdrop-blur"
                style={{ left: `${15 + idx * 25}%`, bottom: `${10 + idx * 12}%` }}
              >
                <MapPin className="h-3 w-3 text-primary" />
                {name}
              </div>
            ))}

            {/* Direction indicator */}
            <div className="absolute right-3 top-3 rounded-lg bg-background/80 px-2.5 py-1.5 text-[10px] backdrop-blur">
              <div className="flex items-center gap-2">
                <Navigation className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Satellite view</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between border-t bg-background/50 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>{mapVehicles.filter(v => v.speed > 0).length} moving</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>{mapVehicles.filter(v => v.speed === 0).length} stopped</span>
              </div>
            </div>
            <span>Last updated: just now</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
