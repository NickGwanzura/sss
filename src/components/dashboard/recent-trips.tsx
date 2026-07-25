"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor, getStatusDot, formatTime, formatCurrency } from "@/lib/utils";

const trips = [
  { id: "CIT-2024-089", client: "CBZ Bank", branch: "Borrowdale", status: "EN_ROUTE", amount: 85000, vehicle: "CBZ-012", eta: "14:30", crew: "T. Moyo, S. Dube" },
  { id: "CIT-2024-088", client: "Econet", branch: "Msasa", status: "COLLECTED", amount: 42000, vehicle: "CBZ-008", eta: "13:45", crew: "J. Ndlovu, P. Sibanda" },
  { id: "CIT-2024-087", client: "OK Zimbabwe", branch: "Sam Levy", status: "DELIVERED", amount: 38000, vehicle: "CBZ-005", eta: "12:30", crew: "M. Chigumba, K. Banda" },
  { id: "CIT-2024-086", client: "NMB Bank", branch: "City Centre", status: "ASSIGNED", amount: 55000, vehicle: "CBZ-003", eta: "15:00", crew: "T. Gumbo, L. Moyo" },
  { id: "CIT-2024-085", client: "Meikles", branch: "Bulawayo", status: "PENDING", amount: 22000, vehicle: "—", eta: "16:00", crew: "Unassigned" },
];

export function RecentTrips() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Active & Recent Trips</CardTitle>
        <Badge variant="secondary" className="text-xs">{trips.length} trips</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trip #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Crew</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium text-xs">{trip.id}</TableCell>
                <TableCell className="text-xs">{trip.client}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{trip.branch}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${getStatusDot(trip.status)}`} />
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(trip.status)}`}>
                      {trip.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium">{formatCurrency(trip.amount)}</TableCell>
                <TableCell className="text-xs font-mono">{trip.vehicle}</TableCell>
                <TableCell className="text-xs">{trip.eta}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{trip.crew}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
