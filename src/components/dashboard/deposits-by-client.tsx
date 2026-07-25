"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "CBZ Bank", amount: 850000, color: "#2563EB" },
  { name: "Econet", amount: 420000, color: "#0891B2" },
  { name: "OK Zimbabwe", amount: 380000, color: "#EA580C" },
  { name: "NMB Bank", amount: 290000, color: "#7C3AED" },
  { name: "Meikles", amount: 180000, color: "#059669" },
];

export function DepositsByClient() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Deposits by Client</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="amount"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid oklch(0.9 0.01 260)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-1.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">${(item.amount / 1000).toFixed(0)}K</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
