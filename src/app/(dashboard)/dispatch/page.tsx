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
import { Radio, CheckCircle2, XCircle, ClipboardCheck, Camera, Shield, Tablet, Users } from "lucide-react";
import { getStatusColor, getStatusDot, formatTime } from "@/lib/utils";

const dispatchItems = [
  {
    id: "DSP-001",
    trip: "CIT-2024-089",
    vehicle: "CBZ-012",
    crew: "T. Moyo, S. Dube",
    time: "08:30",
    checklist: { vehicle: true, cashBags: true, weapons: true, cameras: true, tablet: true, seals: "CBZ-0042" },
    driverSign: true,
    supervisorSign: true,
    status: "COMPLETED",
  },
  {
    id: "DSP-002",
    trip: "CIT-2024-088",
    vehicle: "CBZ-008",
    crew: "J. Ndlovu, P. Sibanda",
    time: "09:00",
    checklist: { vehicle: true, cashBags: true, weapons: true, cameras: false, tablet: true, seals: "CBZ-0043" },
    driverSign: false,
    supervisorSign: false,
    status: "IN_PROGRESS",
  },
  {
    id: "DSP-003",
    trip: "CIT-2024-090",
    vehicle: "CBZ-005",
    crew: "M. Chigumba, K. Banda",
    time: "10:00",
    checklist: { vehicle: false, cashBags: false, weapons: false, cameras: false, tablet: false, seals: "" },
    driverSign: false,
    supervisorSign: false,
    status: "PENDING",
  },
];

export default function DispatchPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dispatch Center</h1>
          <p className="text-sm text-muted-foreground mt-1">Morning dispatch and equipment sign-out</p>
        </div>
        <Button className="gap-2">
          <Radio className="h-4 w-4" />
          Start Dispatch
        </Button>
      </div>

      {/* Dispatch Cards */}
      <div className="space-y-4">
        {dispatchItems.map((item) => (
          <Card key={item.id} className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Trip {item.trip}</h3>
                    <Badge 
                      variant={item.status === "COMPLETED" ? "success" : item.status === "IN_PROGRESS" ? "warning" : "secondary"}
                      className="text-[10px]"
                    >
                      {item.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{item.vehicle}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {item.crew}
                    </span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>

              {/* Equipment Checklist */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <CheckItem icon={ClipboardCheck} label="Vehicle Check" checked={item.checklist.vehicle} />
                <CheckItem icon={Shield} label="Cash Bags" checked={item.checklist.cashBags} />
                <CheckItem icon={Shield} label="Weapons" checked={item.checklist.weapons} />
                <CheckItem icon={Camera} label="Body Cameras" checked={item.checklist.cameras} />
                <CheckItem icon={Tablet} label="Tablet" checked={item.checklist.tablet} />
                <div className="flex items-center gap-2 rounded-lg border p-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Seals: {item.checklist.seals || "—"}
                  </Badge>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.driverSign ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  Driver Sign: {item.driverSign ? "✓ Signed" : "Pending"}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${item.supervisorSign ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  Supervisor Sign: {item.supervisorSign ? "✓ Signed" : "Pending"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CheckItem({ icon: Icon, label, checked }: { icon: React.ElementType; label: string; checked: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border p-2.5 transition-all ${checked ? 'bg-success/5 border-success/30' : 'bg-muted/30'}`}>
      <Icon className={`h-4 w-4 ${checked ? 'text-success' : 'text-muted-foreground'}`} />
      <span className={`text-xs ${checked ? 'text-success font-medium' : 'text-muted-foreground'}`}>
        {label}
      </span>
      {checked ? (
        <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-success" />
      ) : (
        <XCircle className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
      )}
    </div>
  );
}
