"use client";

import { useState } from "react";
import { CalendarIcon, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Sample data - replace with your actual data
const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    remainingAmount: 2500,
    priority: "high",
    dueDate: "8/1/2025",
    daysLeft: 93,
    percentComplete: 75,
    monthlyNeed: 806,
    color: "bg-blue-50",
  },
  {
    id: 2,
    name: "Vacation Fund",
    targetAmount: 20000,
    savedAmount: 8000,
    remainingAmount: 12000,
    priority: "medium",
    dueDate: "5/1/2025",
    daysLeft: 30,
    percentComplete: 40,
    monthlyNeed: 4000,
    color: "bg-amber-50",
  },
];

export const Goals = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedGoals = showAll ? goals : goals.slice(0, 2);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-bold">Goals</h2>
        <Button variant="link" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "View All"}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        {displayedGoals.map((goal) => (
          <Card
            key={goal.id}
            className={`overflow-hidden border ${goal.color}`}
          >
            <CardContent className="p-0">
              <div className="flex items-start justify-between p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{goal.name}</h3>
                    {goal.priority === "high" && (
                      <Badge
                        variant="outline"
                        className="border-purple-200 bg-purple-100 text-purple-800 hover:bg-purple-100"
                      >
                        High Priority
                      </Badge>
                    )}
                    {goal.priority === "medium" && (
                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        Medium Priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-2xl font-bold">
                    ₱{goal.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <CalendarIcon className="text-muted-foreground h-3 w-3" />
                      <span className="text-muted-foreground text-xs">
                        {goal.dueDate}
                      </span>
                    </div>
                    <p className="text-right text-lg font-semibold">
                      ₱{goal.savedAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-4 pb-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-red-600" />
                  <span className="text-muted-foreground text-sm">
                    Remaining
                  </span>
                  <span className="ml-auto font-medium">
                    ₱{goal.remainingAmount.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{goal.percentComplete}% complete</span>
                    <span>{goal.daysLeft} days left</span>
                  </div>
                  <Progress value={goal.percentComplete} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t px-4 py-3">
              <Button variant="outline" className="w-full">
                Add Contribution
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};
