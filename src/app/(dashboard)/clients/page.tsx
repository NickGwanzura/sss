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
import { Plus, Search, Building, Banknote, Fuel, Dice1, ShoppingBag, Store, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  { id: "CLT-001", name: "CBZ Bank", type: "BANK", branches: 12, contracts: 3, status: "Active", revenue: "$2.4M", icon: Banknote, color: "bg-blue-500" },
  { id: "CLT-002", name: "Econet Wireless", type: "RETAILER", branches: 8, contracts: 2, status: "Active", revenue: "$1.1M", icon: Store, color: "bg-green-500" },
  { id: "CLT-003", name: "OK Zimbabwe", type: "SUPERMARKET", branches: 15, contracts: 4, status: "Active", revenue: "$980K", icon: ShoppingBag, color: "bg-orange-500" },
  { id: "CLT-004", name: "NMB Bank", type: "BANK", branches: 6, contracts: 2, status: "Active", revenue: "$1.8M", icon: Banknote, color: "bg-purple-500" },
  { id: "CLT-005", name: "Meikles Hotel", type: "OTHER", branches: 3, contracts: 1, status: "Active", revenue: "$420K", icon: Building, color: "bg-teal-500" },
  { id: "CLT-006", name: "Total Energies", type: "FUEL_STATION", branches: 10, contracts: 2, status: "Active", revenue: "$750K", icon: Fuel, color: "bg-red-500" },
];

const typeColors: Record<string, string> = {
  BANK: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  RETAILER: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  FUEL_STATION: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  CASINO: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  GOVERNMENT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  SUPERMARKET: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  OTHER: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
};

export default function ClientsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage banks, retailers, and other clients</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: "24", change: "+3 this month", color: "bg-primary/10 text-primary" },
          { label: "Active Banks", value: "6", change: "100% active", color: "bg-blue-500/10 text-blue-600" },
          { label: "Total Branches", value: "64", change: "Across all clients", color: "bg-green-500/10 text-green-600" },
          { label: "Monthly Revenue", value: "$6.8M", change: "↑ 12.4%", color: "bg-emerald-500/10 text-emerald-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold mt-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => {
          const Icon = client.icon;
          return (
            <Card
              key={client.id}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
              onClick={() => router.push(`/clients/${client.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${client.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${typeColors[client.type]}`}>
                        {client.type.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <p className="font-semibold">{client.branches}</p>
                    <p className="text-muted-foreground">Branches</p>
                  </div>
                  <div>
                    <p className="font-semibold">{client.contracts}</p>
                    <p className="text-muted-foreground">Contracts</p>
                  </div>
                  <div>
                    <p className="font-semibold">{client.revenue}</p>
                    <p className="text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
