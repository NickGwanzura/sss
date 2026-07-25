"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building, Phone, Mail, MapPin, Banknote, FileText, Users, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

const clientData = {
  id: "CLT-001",
  name: "CBZ Bank",
  type: "BANK",
  code: "CBZ",
  address: "123 Samora Machel Ave, Harare",
  phone: "+263 24 279 1000",
  email: "operations@cbz.co.zw",
  website: "www.cbz.co.zw",
  riskLevel: "Low",
  slaResponse: 30,
  status: "Active",
  createdAt: "2023-01-15",
};

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/clients")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{clientData.name}</h1>
          <p className="text-sm text-muted-foreground">Client details and management</p>
        </div>
        <Badge variant="success" className="ml-auto">{clientData.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Client Code</p>
              <p className="text-sm font-medium">{clientData.code}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <Badge variant="secondary">{clientData.type}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Address</p>
                <p className="text-sm">{clientData.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm">{clientData.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm">{clientData.email}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <Badge variant={clientData.riskLevel === "Low" ? "success" : "warning"}>{clientData.riskLevel}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">SLA Response Time</p>
              <p className="text-sm font-medium">{clientData.slaResponse} min</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Client Since</p>
              <p className="text-sm">{clientData.createdAt}</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { icon: Building, label: "Branches", value: "12" },
              { icon: FileText, label: "Active Contracts", value: "3" },
              { icon: Users, label: "Contacts", value: "5" },
              { icon: Banknote, label: "Monthly Revenue", value: "$150K" },
              { icon: Calendar, label: "Collections/Month", value: "85" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{stat.label}</span>
                </div>
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
