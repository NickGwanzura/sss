import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  ClipboardCheck,
  Car,
  Users,
  AlertTriangle,
  Clock,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStats {
  activeTrips: number;
  completedDeliveries: number;
  vehiclesOnline: number;
  vehiclesTotal: number;
  crewOnDuty: number;
  crewTotal: number;
  openIncidents: number;
  pendingCollections: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
}

function StatCard({ title, value, icon, color, subtext }: StatCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 lg:p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">{title}</p>
            <p className="text-xl font-bold tracking-tight lg:text-2xl">{value}</p>
            {subtext && (
              <p className="text-xs text-muted-foreground">{subtext}</p>
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

export function DashboardStatsGrid({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <StatCard
        title="Active Trips"
        value={stats.activeTrips}
        icon={<Truck className="h-5 w-5 text-white" />}
        color="bg-blue-500"
      />
      <StatCard
        title="Completed Today"
        value={stats.completedDeliveries}
        icon={<ClipboardCheck className="h-5 w-5 text-white" />}
        color="bg-green-500"
      />
      <StatCard
        title="Vehicles Online"
        value={`${stats.vehiclesOnline}/${stats.vehiclesTotal}`}
        icon={<Car className="h-5 w-5 text-white" />}
        color="bg-indigo-500"
        subtext={`${Math.round((stats.vehiclesOnline / Math.max(stats.vehiclesTotal, 1)) * 100)}% availability`}
      />
      <StatCard
        title="Crew on Duty"
        value={`${stats.crewOnDuty}/${stats.crewTotal}`}
        icon={<Users className="h-5 w-5 text-white" />}
        color="bg-purple-500"
      />
      <StatCard
        title="Open Incidents"
        value={stats.openIncidents}
        icon={<AlertTriangle className="h-5 w-5 text-white" />}
        color="bg-red-500"
        subtext={stats.openIncidents > 0 ? "Requires attention" : "All clear"}
      />
      <StatCard
        title="Pending Collections"
        value={stats.pendingCollections}
        icon={<Clock className="h-5 w-5 text-white" />}
        color="bg-orange-500"
      />
      <StatCard
        title="ATM Replenishments"
        value="—"
        icon={<Monitor className="h-5 w-5 text-white" />}
        color="bg-teal-500"
      />
    </div>
  );
}
