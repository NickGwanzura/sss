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
import { Plus, Search, Truck, AlertTriangle, Wrench, Calendar } from "lucide-react";
import { getStatusColor, getStatusDot } from "@/lib/utils";

const vehicles = [
  { id: "VH-001", reg: "CBZ-012", make: "Toyota", model: "Hilux Double Cab", year: 2023, capacity: 2000, status: "ACTIVE", tracker: "TK-0012", nextService: "2024-09-15", insurance: "2024-12-31", driver: "T. Moyo" },
  { id: "VH-002", reg: "CBZ-008", make: "Isuzu", model: "D-Max", year: 2023, capacity: 2500, status: "ACTIVE", tracker: "TK-0008", nextService: "2024-08-20", insurance: "2025-01-15", driver: "J. Ndlovu" },
  { id: "VH-003", reg: "CBZ-005", make: "Ford", model: "Ranger", year: 2022, capacity: 2200, status: "IN_MAINTENANCE", tracker: "TK-0005", nextService: "2024-07-28", insurance: "2024-11-30", driver: "M. Chigumba" },
  { id: "VH-004", reg: "CBZ-003", make: "Toyota", model: "Land Cruiser", year: 2024, capacity: 3000, status: "ACTIVE", tracker: "TK-0003", nextService: "2024-10-10", insurance: "2025-03-20", driver: "T. Gumbo" },
  { id: "VH-005", reg: "CBZ-001", make: "Nissan", model: "Navara", year: 2021, capacity: 2000, status: "ACTIVE", tracker: "TK-0001", nextService: "2024-08-05", insurance: "2024-10-01", driver: "S. Dube" },
];

export default function FleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fleet Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage vehicles, maintenance, and tracking</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Vehicles</p>
              <p className="text-xl font-bold">10</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Truck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-xl font-bold">8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Wrench className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">In Maintenance</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Calendar className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Service Due</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vehicles..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="IN_MAINTENANCE">In Maintenance</SelectItem>
            <SelectItem value="OUT_OF_SERVICE">Out of Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration</TableHead>
                <TableHead>Make/Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Insurance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono font-medium text-xs">{v.reg}</TableCell>
                  <TableCell>
                    <p className="text-sm">{v.make} {v.model}</p>
                  </TableCell>
                  <TableCell className="text-xs">{v.year}</TableCell>
                  <TableCell className="text-xs">${(v.capacity / 1000).toFixed(1)}K kg</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${getStatusDot(v.status)}`} />
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(v.status)}`}>
                        {v.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{v.driver}</TableCell>
                  <TableCell className="text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {v.nextService}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{v.insurance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
