"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const spendingData = [
  {
    name: "Rent & Utilities",
    value: 3000,
    percentage: "35%",
    color: "hsl(215, 25%, 27%)",
  },
  {
    name: "Transportation",
    value: 1400,
    percentage: "20%",
    color: "hsl(43, 96%, 56%)",
  },
  {
    name: "Savings & Investments",
    value: 1100,
    percentage: "18%",
    color: "hsl(172, 66%, 30%)",
  },
  { name: "Shopping", value: 500, percentage: "12%", color: "hsl(0, 0%, 85%)" },
  {
    name: "Entertainment",
    value: 300,
    percentage: "10%",
    color: "hsl(0, 0%, 95%)",
  },
  {
    name: "Dining & Groceries",
    value: 800,
    percentage: "5.25%",
    color: "hsl(173, 58%, 85%)",
  },
];

export function SpendingDistributionChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending Distribution</CardTitle>
        <CardDescription>Monthly breakdown of your expenses</CardDescription>
      </CardHeader>
      <CardContent className="my-auto">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="h-[300px] w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              {spendingData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-sm"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium">
                      ₱{item.value.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground w-12 text-right text-sm">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
