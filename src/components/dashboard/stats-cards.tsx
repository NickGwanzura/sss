"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  ClipboardCheck,
  DollarSign,
  Car,
  Users,
  AlertTriangle,
  Clock,
  Monitor,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, changeType = "neutral", icon, color }: StatCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 lg:p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold tracking-tight lg:text-2xl">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                <TrendingUp
                  className={cn(
                    "h-3 w-3",
                    changeType === "positive" && "text-success",
                    changeType === "negative" && "text-destructive"
                  )}
                />
                <span
                  className={cn(
                    "text-xs",
                    changeType === "positive" && "text-success",
                    changeType === "negative" && "text-destructive",
                    changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110",
              color
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const STATS_DATA = [
    { title: "Active CIT Trips", value: "12", change: "+3 today", changeType: "positive" as const, icon: <Truck className="h-5 w-5 text-white" />, color: "bg-blue-500" },
    { title: "Completed Deliveries", value: "48", change: "+12 today", changeType: "positive" as const, icon: <ClipboardCheck className="h-5 w-5 text-white" />, color: "bg-green-500" },
    { title: "Cash in Transit", value: "$2.4M", change: "↑ 8.2%", changeType: "positive" as const, icon: <DollarSign className="h-5 w-5 text-white" />, color: "bg-emerald-500" },
    { title: "Vehicles Online", value: "8/10", change: "80% availability", changeType: "neutral" as const, icon: <Car className="h-5 w-5 text-white" />, color: "bg-indigo-500" },
    { title: "Crew on Duty", value: "24", change: "6 crews", changeType: "neutral" as const, icon: <Users className="h-5 w-5 text-white" />, color: "bg-purple-500" },
    { title: "Open Incidents", value: "2", change: "1 critical", changeType: "negative" as const, icon: <AlertTriangle className="h-5 w-5 text-white" />, color: "bg-red-500" },
    { title: "Pending Collections", value: "15", change: "5 overdue", changeType: "negative" as const, icon: <Clock className="h-5 w-5 text-white" />, color: "bg-orange-500" },
    { title: "ATM Replenishments", value: "6", change: "2 scheduled", changeType: "neutral" as const, icon: <Monitor className="h-5 w-5 text-white" />, color: "bg-teal-500" },
    { title: "Daily Revenue", value: "$45.2K", change: "↑ 12.3%", changeType: "positive" as const, icon: <TrendingUp className="h-5 w-5 text-white" />, color: "bg-cyan-500" },
];

export function DashboardStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {STATS_DATA.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
