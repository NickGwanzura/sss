"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Monitor, BatteryFull, BatteryMedium, BatteryLow, MapPin, Calendar } from "lucide-react";

const atms = [
  { id: "ATM-001", location: "CBZ Borrowdale", level: 78, cassette1: 25000, cassette2: 20000, lastReplenished: "2024-07-20", nextDue: "2024-07-27", status: "Active", technician: "T. Gumbo" },
  { id: "ATM-002", location: "CBZ Sam Levy", level: 45, cassette1: 15000, cassette2: 12000, lastReplenished: "2024-07-22", nextDue: "2024-07-26", status: "Active", technician: "T. Gumbo" },
  { id: "ATM-003", location: "OK Sam Levy", level: 92, cassette1: 30000, cassette2: 25000, lastReplenished: "2024-07-23", nextDue: "2024-07-30", status: "Active", technician: "L. Moyo" },
  { id: "ATM-004", location: "NMB City Centre", level: 15, cassette1: 5000, cassette2: 3000, lastReplenished: "2024-07-18", nextDue: "2024-07-24", status: "Low Cash", technician: "L. Moyo" },
  { id: "ATM-005", location: "Econet Msasa", level: 60, cassette1: 18000, cassette2: 15000, lastReplenished: "2024-07-21", nextDue: "2024-07-28", status: "Active", technician: "S. Dube" },
];

function BatteryIndicator({ level }: { level: number }) {
  if (level > 60) return <BatteryFull className="h-4 w-4 text-success" />;
  if (level > 30) return <BatteryMedium className="h-4 w-4 text-warning" />;
  return <BatteryLow className="h-4 w-4 text-destructive" />;
}

export default function ATMsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">ATM Replenishment</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor cash levels and schedule replenishments</p>
        </div>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Replenishment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total ATMs</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Needs Replenish</p>
            <p className="text-2xl font-bold text-orange-600">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Critical Low</p>
            <p className="text-2xl font-bold text-destructive">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Cash Level</p>
            <p className="text-2xl font-bold">58%</p>
          </CardContent>
        </Card>
      </div>

      {/* ATM Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {atms.map((atm) => (
          <Card key={atm.id} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    atm.level > 60 ? 'bg-green-500/10' : atm.level > 30 ? 'bg-yellow-500/10' : 'bg-red-500/10'
                  }`}>
                    <Monitor className={`h-5 w-5 ${
                      atm.level > 60 ? 'text-green-600' : atm.level > 30 ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{atm.location}</h3>
                    <p className="text-xs text-muted-foreground">{atm.id}</p>
                  </div>
                </div>
                <Badge variant={atm.status === "Active" ? "success" : "destructive"} className="text-[10px]">
                  {atm.status}
                </Badge>
              </div>

              {/* Cash Level */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Cash Level</span>
                  <div className="flex items-center gap-1.5">
                    <BatteryIndicator level={atm.level} />
                    <span className="font-medium">{atm.level}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      atm.level > 60 ? 'bg-success' : atm.level > 30 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${atm.level}%` }}
                  />
                </div>
              </div>

              {/* Cassette Info */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-muted-foreground">Cassette 1</p>
                  <p className="font-medium">${atm.cassette1.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-muted-foreground">Cassette 2</p>
                  <p className="font-medium">${atm.cassette2.toLocaleString()}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last: {atm.lastReplenished}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Next: {atm.nextDue}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
