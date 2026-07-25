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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Car, Clock, ShieldAlert, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getStatusColor, formatDateTime } from "@/lib/utils";

const incidents = [
  { id: "INC-001", type: "VEHICLE_BREAKDOWN", severity: "HIGH", status: "INVESTIGATING", description: "CBZ-012 engine failure at Borrowdale branch", location: "Borrowdale, Harare", reported: "2024-07-25T10:15:00", photos: 3, police: "—" },
  { id: "INC-002", type: "DELAYED_COLLECTION", severity: "MEDIUM", status: "OPEN", description: "Econet Msasa collection 45 min overdue", location: "Msasa, Harare", reported: "2024-07-25T09:30:00", photos: 0, police: "—" },
  { id: "INC-003", type: "CASH_DISCREPANCY", severity: "HIGH", status: "INVESTIGATING", description: "Amount mismatch at OK Sam Levy - expected $38K, counted $37.5K", location: "Sam Levy, Harare", reported: "2024-07-24T14:00:00", photos: 2, police: "—" },
  { id: "INC-004", type: "SEAL_BROKEN", severity: "CRITICAL", status: "CLOSED", description: "Seal broken on bag CBZ-0038 during transit", location: "Willowvale, Harare", reported: "2024-07-23T11:20:00", photos: 4, police: "CR-2024-089", resolved: "2024-07-23T16:00:00" },
  { id: "INC-005", type: "LOST_COMMUNICATION", severity: "LOW", status: "RESOLVED", description: "GPS tracker lost signal for 15 min", location: "Bulawayo", reported: "2024-07-22T08:45:00", photos: 0, police: "—", resolved: "2024-07-22T09:00:00" },
];

const severityColors: Record<string, "destructive" | "warning" | "secondary" | "outline"> = {
  CRITICAL: "destructive",
  HIGH: "warning",
  MEDIUM: "secondary",
  LOW: "outline",
};

const incidentIcons: Record<string, React.ElementType> = {
  VEHICLE_BREAKDOWN: Car,
  ROBBERY_ATTEMPT: ShieldAlert,
  DELAYED_COLLECTION: Clock,
  CASH_DISCREPANCY: AlertTriangle,
  SEAL_BROKEN: ShieldAlert,
  LOST_COMMUNICATION: AlertTriangle,
  OTHER: AlertTriangle,
};

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incidents</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage operational incidents</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Report Incident
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Open</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Investigating</p>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Resolved</p>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search incidents..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Incidents Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((inc) => {
                const Icon = incidentIcons[inc.type] || AlertTriangle;
                return (
                  <TableRow key={inc.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <TableCell className="font-mono text-xs font-medium">{inc.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{inc.type.replace(/_/g, " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={severityColors[inc.severity]} className="text-[10px]">
                        {inc.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[250px] truncate">{inc.description}</TableCell>
                    <TableCell className="text-xs">{inc.location}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(inc.reported).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          inc.status === "OPEN" ? "bg-red-500" :
                          inc.status === "INVESTIGATING" ? "bg-orange-500" :
                          inc.status === "RESOLVED" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(inc.status)}`}>
                          {inc.status}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
