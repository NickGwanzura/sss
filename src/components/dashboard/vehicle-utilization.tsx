"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { vehicle: "CBZ-01", utilization: 85 },
  { vehicle: "CBZ-02", utilization: 72 },
  { vehicle: "CBZ-03", utilization: 93 },
  { vehicle: "CBZ-04", utilization: 60 },
  { vehicle: "CBZ-05", utilization: 78 },
];

export function VehicleUtilization() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Vehicle Utilization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis
                dataKey="vehicle"
                type="category"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => `${Number(value)}%`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.9 0.01 260)",
                }}
              />
              <Bar dataKey="utilization" fill="#2563EB" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.utilization > 80 ? "#2563EB" : entry.utilization > 70 ? "#0891B2" : "#94A3B8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

