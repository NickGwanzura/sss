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
import { Plus, Search, Calendar } from "lucide-react";
import { getStatusColor, getStatusDot, formatCurrency } from "@/lib/utils";

const collections = [
  { id: "COL-001", client: "CBZ Bank", branch: "Borrowdale", date: "2024-07-25", window: "10:00 - 12:00", expected: 85000, priority: "High", status: "PENDING" },
  { id: "COL-002", client: "Econet", branch: "Msasa", date: "2024-07-25", window: "11:00 - 13:00", expected: 42000, priority: "Normal", status: "ASSIGNED" },
  { id: "COL-003", client: "OK Zimbabwe", branch: "Sam Levy", date: "2024-07-25", window: "09:00 - 11:00", expected: 38000, priority: "Normal", status: "EN_ROUTE" },
  { id: "COL-004", client: "NMB Bank", branch: "City Centre", date: "2024-07-25", window: "14:00 - 16:00", expected: 55000, priority: "High", status: "PENDING" },
  { id: "COL-005", client: "Meikles", branch: "Bulawayo", date: "2024-07-25", window: "08:00 - 10:00", expected: 22000, priority: "Low", status: "COLLECTED" },
  { id: "COL-006", client: "Total Energies", branch: "Willowvale", date: "2024-07-24", window: "10:00 - 12:00", expected: 18000, priority: "Normal", status: "DELIVERED" },
  { id: "COL-007", client: "CBZ Bank", branch: "Msasa", date: "2024-07-24", window: "13:00 - 15:00", expected: 65000, priority: "High", status: "CLOSED" },
];

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Collection Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage daily cash collection jobs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Collection
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search collections..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ASSIGNED">Assigned</SelectItem>
            <SelectItem value="EN_ROUTE">En Route</SelectItem>
            <SelectItem value="COLLECTED">Collected</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Today
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
        {["PENDING", "ASSIGNED", "EN_ROUTE", "COLLECTED", "DELIVERED", "CLOSED", "CANCELLED"].map((status) => (
          <Card key={status} className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="p-3 text-center">
              <div className={`mx-auto mb-1 h-2 w-2 rounded-full ${getStatusDot(status)}`} />
              <p className="text-[10px] text-muted-foreground uppercase">{status.replace(/_/g, " ")}</p>
              <p className="text-lg font-bold">{collections.filter(c => c.status === status).length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collections Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Window</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((col) => (
                <TableRow key={col.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <TableCell className="font-medium text-xs">{col.id}</TableCell>
                  <TableCell className="text-sm">{col.client}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{col.branch}</TableCell>
                  <TableCell className="text-xs">{col.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{col.window}</TableCell>
                  <TableCell className="text-xs font-medium">{formatCurrency(col.expected)}</TableCell>
                  <TableCell>
                    <Badge variant={col.priority === "High" ? "destructive" : col.priority === "Normal" ? "secondary" : "outline"} className="text-[10px]">
                      {col.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${getStatusDot(col.status)}`} />
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(col.status)}`}>
                        {col.status.replace(/_/g, " ")}
                      </span>
                    </div>
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
