"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SpendingDistributionChart({
  spendingData,
}: {
  spendingData: {
    name: string;
    value: number;
    color: string;
  }[];
}) {
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
