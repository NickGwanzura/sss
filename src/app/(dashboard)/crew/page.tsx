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
import { Plus, Search, Users, Shield, IdCard, Activity } from "lucide-react";
import { getStatusColor, getInitials } from "@/lib/utils";

const employees = [
  { id: "EMP-001", code: "DR-001", firstName: "Tendai", lastName: "Moyo", role: "DRIVER", phone: "+263 77 123 4567", email: "t.moyo@suburban.co.zw", licenseExpiry: "2025-06-15", firearmExpiry: "2024-12-20", medicalExpiry: "2024-09-10", status: "On Duty" },
  { id: "EMP-002", code: "CM-001", firstName: "Jabulani", lastName: "Ndlovu", role: "COMMANDER", phone: "+263 77 123 4568", email: "j.ndlovu@suburban.co.zw", licenseExpiry: "2025-03-22", firearmExpiry: "2025-01-15", medicalExpiry: "2024-11-05", status: "On Duty" },
  { id: "EMP-003", code: "GD-001", firstName: "Sipho", lastName: "Dube", role: "GUARD", phone: "+263 77 123 4569", email: "s.dube@suburban.co.zw", licenseExpiry: "—", firearmExpiry: "2024-10-30", medicalExpiry: "2025-02-18", status: "On Duty" },
  { id: "EMP-004", code: "DR-002", firstName: "Memory", lastName: "Chigumba", role: "DRIVER", phone: "+263 77 123 4570", email: "m.chigumba@suburban.co.zw", licenseExpiry: "2024-11-10", firearmExpiry: "—", medicalExpiry: "2024-08-25", status: "Off Duty" },
  { id: "EMP-005", code: "SV-001", firstName: "Tafadzwa", lastName: "Gumbo", role: "SUPERVISOR", phone: "+263 77 123 4571", email: "t.gumbo@suburban.co.zw", licenseExpiry: "2025-08-05", firearmExpiry: "2025-04-12", medicalExpiry: "2024-12-01", status: "On Duty" },
];

const roleColors: Record<string, string> = {
  DRIVER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  COMMANDER: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  GUARD: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  SUPERVISOR: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function CrewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Crew Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage drivers, commanders, guards, and supervisors</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Crew Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Crew</p>
              <p className="text-xl font-bold">24</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">On Duty</p>
              <p className="text-xl font-bold">18</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Armed</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <IdCard className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">License Expiring</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search crew..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
            <SelectItem value="COMMANDER">Commander</SelectItem>
            <SelectItem value="GUARD">Guard</SelectItem>
            <SelectItem value="SUPERVISOR">Supervisor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Crew Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <Card key={emp.id} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {getInitials(`${emp.firstName} ${emp.lastName}`)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{emp.firstName} {emp.lastName}</h3>
                    <Badge variant={emp.status === "On Duty" ? "success" : "secondary"} className="text-[10px]">
                      {emp.status}
                    </Badge>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${roleColors[emp.role]}`}>
                    {emp.role}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">{emp.code}</p>
                  <p className="text-xs text-muted-foreground">{emp.phone}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <p className="text-muted-foreground">License</p>
                  <p className={new Date(emp.licenseExpiry) < new Date() && emp.licenseExpiry !== "—" ? "text-destructive font-medium" : "font-medium"}>
                    {emp.licenseExpiry === "—" ? "N/A" : emp.licenseExpiry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Firearm</p>
                  <p className={new Date(emp.firearmExpiry) < new Date() ? "text-destructive font-medium" : "font-medium"}>
                    {emp.firearmExpiry === "—" ? "N/A" : emp.firearmExpiry}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Medical</p>
                  <p className="font-medium">{emp.medicalExpiry}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
