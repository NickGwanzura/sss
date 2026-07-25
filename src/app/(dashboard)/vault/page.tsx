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
import { Banknote, ArrowDownToLine, ArrowUpFromLine, RefreshCw, QrCode } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const vaultBalance = {
  usd: 2450000,
  zwl: 185000000,
  zar: 320000,
};

const recentTransactions = [
  { id: "VTX-001", type: "Deposit", reference: "CIT-2024-089", bag: "CBZ-0042", amount: 85000, currency: "USD", from: "CBZ Borrowdale", time: "10:30", status: "Completed" },
  { id: "VTX-002", type: "Deposit", reference: "CIT-2024-088", bag: "CBZ-0043", amount: 42000, currency: "USD", from: "Econet Msasa", time: "11:15", status: "Completed" },
  { id: "VTX-003", type: "Withdrawal", reference: "WTH-001", bag: "—", amount: 50000, currency: "USD", from: "ATM Replenishment", time: "09:00", status: "Pending" },
  { id: "VTX-004", type: "Transfer", reference: "TRF-001", bag: "CBZ-0040", amount: 200000, currency: "ZWL", from: "CBZ Main Branch", time: "Yesterday", status: "Completed" },
];

export default function VaultPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vault Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Cash inventory, deposits, and reconciliation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reconcile
          </Button>
          <Button className="gap-2">
            <QrCode className="h-4 w-4" />
            Scan Bag
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-blue-100">USD Balance</p>
              <Banknote className="h-5 w-5 text-blue-200" />
            </div>
            <p className="text-2xl font-bold mt-2">{formatCurrency(vaultBalance.usd)}</p>
            <p className="text-xs text-blue-200 mt-1">Last reconciled: Today 08:00</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-100">ZWL Balance</p>
              <Banknote className="h-5 w-5 text-green-200" />
            </div>
            <p className="text-2xl font-bold mt-2">ZWL {vaultBalance.zwl.toLocaleString()}</p>
            <p className="text-xs text-green-200 mt-1">≈ ${(vaultBalance.zwl / 380).toFixed(0)} USD</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-purple-100">ZAR Balance</p>
              <Banknote className="h-5 w-5 text-purple-200" />
            </div>
            <p className="text-2xl font-bold mt-2">R {vaultBalance.zar.toLocaleString()}</p>
            <p className="text-xs text-purple-200 mt-1">≈ ${(vaultBalance.zar / 18).toFixed(0)} USD</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <ArrowDownToLine className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Record Deposit</p>
              <p className="text-xs text-muted-foreground">Log incoming cash</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <ArrowUpFromLine className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Process Withdrawal</p>
              <p className="text-xs text-muted-foreground">Release cash out</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <RefreshCw className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Vault Transfer</p>
              <p className="text-xs text-muted-foreground">Between vaults</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bag</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-mono text-xs">{tx.reference}</TableCell>
                  <TableCell>
                    <Badge variant={tx.type === "Deposit" ? "success" : tx.type === "Withdrawal" ? "destructive" : "secondary"} className="text-[10px]">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{tx.bag}</TableCell>
                  <TableCell className="text-xs font-medium">
                    {tx.currency === "ZWL" ? `ZWL ${tx.amount.toLocaleString()}` : formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="text-xs">{tx.from}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{tx.time}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "Completed" ? "success" : "warning"} className="text-[10px]">
                      {tx.status}
                    </Badge>
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
