"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Download, TrendingUp, TrendingDown, FileSpreadsheet, PieChart } from "lucide-react";

const reportCategories = [
  {
    title: "Daily Operations",
    icon: FileText,
    reports: [
      { name: "Cash Collected Summary", description: "Daily cash collection totals by client and branch", type: "PDF" },
      { name: "Vehicle Performance", description: "Daily vehicle utilization and route completion", type: "Excel" },
      { name: "Crew Assignment Report", description: "Daily crew assignments and duty hours", type: "PDF" },
    ],
  },
  {
    title: "Client Analytics",
    icon: BarChart3,
    reports: [
      { name: "Collections by Client", description: "Monthly collection volumes and values per client", type: "Excel" },
      { name: "SLA Compliance", description: "Service level agreement adherence rates", type: "PDF" },
      { name: "Client Invoice History", description: "Complete invoice and payment history", type: "Excel" },
    ],
  },
  {
    title: "Financial Reports",
    icon: FileSpreadsheet,
    reports: [
      { name: "Monthly Revenue Report", description: "Revenue breakdown by service type and client", type: "PDF" },
      { name: "Profitability Analysis", description: "Route and service profitability metrics", type: "Excel" },
      { name: "Expense Summary", description: "Monthly operating expenses by category", type: "PDF" },
    ],
  },
  {
    title: "Compliance & Safety",
    icon: PieChart,
    reports: [
      { name: "Incident Analysis", description: "Monthly incident trends and resolution metrics", type: "PDF" },
      { name: "Vehicle Maintenance Log", description: "Complete service history and upcoming maintenance", type: "Excel" },
      { name: "Audit Trail Export", description: "Complete system audit log for compliance", type: "Excel" },
    ],
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate and download operational reports</p>
        </div>
        <Button className="gap-2">
          <BarChart3 className="h-4 w-4" />
          Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Reports Generated</p>
            <p className="text-xl font-bold">47</p>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-success">+18%</span>
            </div>
            <p className="text-xl font-bold mt-1">94.2%</p>
            <p className="text-xs text-muted-foreground">SLA Compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-success" />
              <span className="text-xs font-medium text-success">-32%</span>
            </div>
            <p className="text-xl font-bold mt-1">3</p>
            <p className="text-xs text-muted-foreground">Incidents This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Collection Accuracy</p>
            <p className="text-xl font-bold">99.8%</p>
            <p className="text-xs text-muted-foreground mt-1">YTD average</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-semibold">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.reports.map((report) => (
                  <div key={report.name} className="flex items-start justify-between rounded-lg border p-3 transition-all hover:bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">{report.type}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
