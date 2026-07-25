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
import { DollarSign, TrendingUp, TrendingDown, Receipt, Download, FileText } from "lucide-react";
import { formatCurrency, getStatusColor } from "@/lib/utils";

const invoices = [
  { id: "INV-001", client: "CBZ Bank", amount: 45000, currency: "USD", issueDate: "2024-07-01", dueDate: "2024-07-31", status: "PAID", paidAt: "2024-07-15" },
  { id: "INV-002", client: "Econet Wireless", amount: 22000, currency: "USD", issueDate: "2024-07-01", dueDate: "2024-07-31", status: "PENDING", paidAt: null },
  { id: "INV-003", client: "OK Zimbabwe", amount: 38000, currency: "USD", issueDate: "2024-07-01", dueDate: "2024-07-31", status: "OVERDUE", paidAt: null },
  { id: "INV-004", client: "NMB Bank", amount: 35000, currency: "USD", issueDate: "2024-07-01", dueDate: "2024-07-31", status: "PENDING", paidAt: null },
  { id: "INV-005", client: "Meikles", amount: 15000, currency: "USD", issueDate: "2024-07-01", dueDate: "2024-07-31", status: "PAID", paidAt: "2024-07-20" },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
          <p className="text-sm text-muted-foreground mt-1">Invoicing, revenue, and expense tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Receipt className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardContent className="p-4">
            <p className="text-sm text-primary-foreground/80">Monthly Revenue</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(155000)}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-primary-foreground/80">
              <TrendingUp className="h-3 w-3" />
              <span>↑ 12.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="text-xl font-bold mt-1">{formatCurrency(57000)}</p>
            <p className="text-xs text-muted-foreground mt-1">2 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Overdue</p>
            <p className="text-xl font-bold text-destructive mt-1">{formatCurrency(38000)}</p>
            <p className="text-xs text-muted-foreground mt-1">1 invoice overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Collection Rate</p>
            <p className="text-xl font-bold mt-1">94.2%</p>
            <p className="text-xs text-muted-foreground mt-1">↑ 2.1% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Collection Fees", amount: 85000, percentage: 55 },
              { label: "ATM Replenishment", amount: 35000, percentage: 23 },
              { label: "Route Contracts", amount: 22000, percentage: 14 },
              { label: "Other Services", amount: 13000, percentage: 8 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Fuel Costs", amount: 28000, percentage: 35 },
              { label: "Vehicle Maintenance", amount: 15000, percentage: 19 },
              { label: "Salaries & Wages", amount: 22000, percentage: 28 },
              { label: "Insurance", amount: 8000, percentage: 10 },
              { label: "Other", amount: 6000, percentage: 8 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Invoices</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell className="text-sm">{inv.client}</TableCell>
                  <TableCell className="text-xs font-medium">{formatCurrency(inv.amount)}</TableCell>
                  <TableCell className="text-xs">{inv.issueDate}</TableCell>
                  <TableCell className="text-xs">{inv.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === "PAID" ? "success" : inv.status === "OVERDUE" ? "destructive" : "warning"} className="text-[10px]">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inv.paidAt || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
