"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data - in a real app, this would be calculated from your actual goals
const summaryData = {
  totalGoalAmount: 500000,
  totalSaved: 187500,
  totalRemaining: 312500,
  percentComplete: 37.5,
  monthlyContribution: 25000,
  estimatedCompletion: "December 2025",
  goalsByCategory: [
    { name: "Emergency Fund", target: 100000, saved: 75000, color: "#0ea5e9" },
    {
      name: "Home Down Payment",
      target: 250000,
      saved: 62500,
      color: "#8b5cf6",
    },
    { name: "Vacation", target: 50000, saved: 30000, color: "#f59e0b" },
    { name: "New Car", target: 100000, saved: 20000, color: "#10b981" },
  ],
};

export function GoalSummary() {
  return (
    <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50">
      <CardContent className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 bg-white/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-indigo-700">
                  Total Goal Amount
                </h3>
                <div className="text-3xl font-bold text-indigo-900">
                  ₱{summaryData.totalGoalAmount.toLocaleString()}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-indigo-700">
                  Total Saved
                </h3>
                <div className="text-3xl font-bold text-indigo-900">
                  ₱{summaryData.totalSaved.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-600">
                  {summaryData.percentComplete}% of total goals
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-indigo-700">
                  Remaining
                </h3>
                <div className="text-3xl font-bold text-indigo-900">
                  ₱{summaryData.totalRemaining.toLocaleString()}
                </div>
                <div className="text-sm text-indigo-600">
                  Est. completion: {summaryData.estimatedCompletion}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-indigo-700">
                <span>Overall Progress</span>
                <span>{summaryData.percentComplete}%</span>
              </div>
              <Progress
                value={summaryData.percentComplete}
                className="h-3 bg-white"
                indicatorClassName="bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={summaryData.goalsByCategory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => `₱${Number(value).toLocaleString()}`}
                    labelStyle={{ color: "#4338ca" }}
                    contentStyle={{
                      backgroundColor: "white",
                      borderColor: "#c7d2fe",
                      borderRadius: "0.375rem",
                    }}
                  />
                  <Bar
                    dataKey="target"
                    name="Target"
                    stackId="a"
                    fill="#c7d2fe"
                  />
                  <Bar dataKey="saved" name="Saved" stackId="b">
                    {summaryData.goalsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
