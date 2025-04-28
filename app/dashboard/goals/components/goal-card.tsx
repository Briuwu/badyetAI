"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Target,
  TrendingUp,
  MoreHorizontal,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GoalCardProps {
  goal: {
    id: number;
    name: string;
    targetAmount: number;
    savedAmount: number;
    remainingAmount: number;
    deadline: string;
    priority: string;
    category: string;
    color: string;
  };
}

export function GoalCard({ goal }: GoalCardProps) {
  const percentComplete = Math.round(
    (goal.savedAmount / goal.targetAmount) * 100,
  );
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysRemaining = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Calculate monthly amount needed to reach goal
  const monthsRemaining = Math.ceil(daysRemaining / 30);
  const monthlyAmountNeeded =
    monthsRemaining > 0 ? Math.ceil(goal.remainingAmount / monthsRemaining) : 0;

  // Get color classes based on goal.color
  const getColorClasses = () => {
    switch (goal.color) {
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          progress: "bg-blue-500",
          text: "text-blue-700",
        };
      case "purple":
        return {
          bg: "bg-violet-50",
          border: "border-violet-200",
          progress: "bg-violet-500",
          text: "text-violet-700",
        };
      case "amber":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          progress: "bg-amber-500",
          text: "text-amber-700",
        };
      case "emerald":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          progress: "bg-emerald-500",
          text: "text-emerald-700",
        };
      case "pink":
        return {
          bg: "bg-pink-50",
          border: "border-pink-200",
          progress: "bg-pink-500",
          text: "text-pink-700",
        };
      default:
        return {
          bg: "bg-slate-50",
          border: "border-slate-200",
          progress: "bg-slate-500",
          text: "text-slate-700",
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <Card
      className={`overflow-hidden ${colorClasses.bg} ${colorClasses.border}`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{goal.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Goal</DropdownMenuItem>
            <DropdownMenuItem>Add Contribution</DropdownMenuItem>
            <DropdownMenuItem>Delete Goal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Badge
              variant="outline"
              className={`${colorClasses.text} border-current`}
            >
              {goal.priority} Priority
            </Badge>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <CalendarIcon className="mr-1 h-3 w-3" />
            <span>{new Date(goal.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-1 flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            ₱{goal.targetAmount.toLocaleString()}
          </div>
          <div className="text-muted-foreground text-sm">Target Amount</div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <PiggyBank className={`mr-1 h-4 w-4 ${colorClasses.text}`} />
              <span>Saved</span>
            </div>
            <span className="font-medium">
              ₱{goal.savedAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Target className="mr-1 h-4 w-4 text-slate-500" />
              <span>Remaining</span>
            </div>
            <span className="font-medium">
              ₱{goal.remainingAmount.toLocaleString()}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span>{percentComplete}% complete</span>
              <span>{daysRemaining} days left</span>
            </div>
            <Progress
              value={percentComplete}
              className="h-2 bg-white"
              indicatorClassName={colorClasses.progress}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <TrendingUp className="mr-1 h-4 w-4 text-slate-500" />
              <span>Monthly Need</span>
            </div>
            <span className="font-medium">
              ₱{monthlyAmountNeeded.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="outline" size="sm" className="w-full">
          Add Contribution
        </Button>
      </CardFooter>
    </Card>
  );
}
