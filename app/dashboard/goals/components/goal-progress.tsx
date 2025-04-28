"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample data - in a real app, this would be calculated from your actual goals
const progressData = {
  totalSaved: 187500,
  monthlySavings: [
    { month: "Jan", amount: 15000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 22000 },
    { month: "Apr", amount: 25000 },
  ],
  projectedSavings: 300000,
  projectedDate: "December 2025",
  savingsRate: 25000,
};

export function GoalProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Total Amount Saved</h3>
              <div className="text-4xl font-bold text-indigo-600">
                ₱{progressData.totalSaved.toLocaleString()}
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                Current monthly contribution: ₱
                {progressData.savingsRate.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recent Monthly Savings</h3>
              <div className="grid grid-cols-4 gap-2">
                {progressData.monthlySavings.map((item) => (
                  <div key={item.month} className="flex flex-col items-center">
                    <div className="relative flex h-24 w-full items-end">
                      <div
                        className="absolute bottom-0 w-full rounded-t-md bg-indigo-100"
                        style={{
                          height: `${(item.amount / 30000) * 100}%`,
                          background:
                            "linear-gradient(to top, #c7d2fe, #818cf8)",
                        }}
                      ></div>
                    </div>
                    <span className="mt-1 text-xs font-medium">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Projected Savings</h3>
              <div className="text-4xl font-bold text-indigo-600">
                ₱{progressData.projectedSavings.toLocaleString()}
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                By {progressData.projectedDate} at current savings rate
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Savings Milestones</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>25% of Goals</span>
                    <span>₱125,000</span>
                  </div>
                  <Progress
                    value={100}
                    className="h-2"
                    indicatorClassName="bg-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>50% of Goals</span>
                    <span>₱250,000</span>
                  </div>
                  <Progress
                    value={75}
                    className="h-2"
                    indicatorClassName="bg-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>75% of Goals</span>
                    <span>₱375,000</span>
                  </div>
                  <Progress
                    value={50}
                    className="h-2"
                    indicatorClassName="bg-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>100% of Goals</span>
                    <span>₱500,000</span>
                  </div>
                  <Progress
                    value={37.5}
                    className="h-2"
                    indicatorClassName="bg-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
