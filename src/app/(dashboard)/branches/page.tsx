"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Search, MapPin, Phone, Clock, DollarSign } from "lucide-react";

const branches = [
  { id: "BR-001", client: "CBZ Bank", name: "Borrowdale", address: "123 Borrowdale Rd", city: "Harare", phone: "+263 24 279 1000", hours: "08:00 - 16:00", cashLimit: 500000, status: "Active" },
  { id: "BR-002", client: "CBZ Bank", name: "Sam Levy", address: "Sam Levy Village", city: "Harare", phone: "+263 24 279 2000", hours: "08:00 - 18:00", cashLimit: 750000, status: "Active" },
  { id: "BR-003", client: "CBZ Bank", name: "Msasa", address: "45 Msasa Park", city: "Harare", phone: "+263 24 279 3000", hours: "08:00 - 16:00", cashLimit: 350000, status: "Active" },
  { id: "BR-004", client: "CBZ Bank", name: "Bulawayo", address: "Main Street", city: "Bulawayo", phone: "+263 29 279 4000", hours: "08:00 - 15:30", cashLimit: 600000, status: "Active" },
  { id: "BR-005", client: "Econet", name: "Msasa HQ", address: "1 Econet Way", city: "Harare", phone: "+263 24 279 5000", hours: "08:00 - 17:00", cashLimit: 250000, status: "Active" },
];

export default function BranchesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Branches</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage client branch locations and details</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Branches</p>
            <p className="text-2xl font-bold mt-1">64</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Active Today</p>
            <p className="text-2xl font-bold mt-1">58</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Coverage Cities</p>
            <p className="text-2xl font-bold mt-1">6</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search branches..." className="pl-8" />
      </div>

      {/* Branches Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Cash Limit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{branch.name}</p>
                      <p className="text-xs text-muted-foreground">{branch.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{branch.client}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{branch.city}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/60">{branch.address}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{branch.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{branch.hours}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium">${(branch.cashLimit / 1000).toFixed(0)}K</TableCell>
                  <TableCell>
                    <Badge variant="success" className="text-[10px]">{branch.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
