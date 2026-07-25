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
import { Building, Users, Clock, FileText, MessageSquare, HelpCircle, Download } from "lucide-react";
import { getStatusColor, formatCurrency } from "@/lib/utils";

export default function PortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customer Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">Client self-service portal overview</p>
        </div>
        <Button className="gap-2">
          <Users className="h-4 w-4" />
          Manage Access
        </Button>
      </div>

      {/* Client Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {["CBZ Bank", "Econet", "OK Zimbabwe", "NMB Bank", "Meikles", "Total Energies"].map((client) => (
          <Card key={client} className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{client}</h3>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    Last active: 2 hours ago
                  </p>
                </div>
                <Badge variant="success" className="text-[10px]">Online</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portal Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Client Portal Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "Schedule Pickups", desc: "Request new collection times", count: "12 pending" },
              { icon: FileText, label: "Download Receipts", desc: "Proof of collection documents", count: "48 this month" },
              { icon: Building, label: "Track Collections", desc: "Real-time collection status", count: "6 active" },
              { icon: MessageSquare, label: "Support Tickets", desc: "Submit and track issues", count: "3 open" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="rounded-lg border p-4 transition-all hover:shadow-md cursor-pointer">
                  <Icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-sm">{feature.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                  <p className="text-xs font-medium mt-2">{feature.count}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Support Tickets</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "TKT-001", client: "CBZ Bank", subject: "Schedule change request", priority: "Normal", status: "OPEN", created: "Today" },
                { id: "TKT-002", client: "OK Zimbabwe", subject: "Receipt not received", priority: "High", status: "INVESTIGATING", created: "Yesterday" },
                { id: "TKT-003", client: "Econet", subject: "Invoice query", priority: "Low", status: "CLOSED", created: "2 days ago" },
              ].map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                  <TableCell className="text-xs">{ticket.client}</TableCell>
                  <TableCell className="text-xs">{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant={ticket.priority === "High" ? "destructive" : ticket.priority === "Normal" ? "secondary" : "outline"} className="text-[10px]">
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{ticket.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
