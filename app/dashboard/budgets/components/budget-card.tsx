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
import { ArrowUpCircle, ArrowDownCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Budgets } from "@/lib/types";
import { formatDate } from "date-fns";

interface BudgetCardProps {
  budget: Budgets & {
    categories: string[];
  };
}

export function BudgetCard({ budget }: BudgetCardProps) {
  const percentSpent = Math.round((budget.spent / budget.amount) * 100);
  const isOverBudget = budget.spent > budget.amount;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{budget.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Budget</DropdownMenuItem>
            <DropdownMenuItem>View Transactions</DropdownMenuItem>
            <DropdownMenuItem>Delete Budget</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            {formatDate(new Date(budget.created_at!), "MMMM yyyy")}
          </div>
          <div className="flex space-x-1">
            {budget.categories.slice(0, 2).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {budget.categories.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{budget.categories.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-1 flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            ₱{budget.amount.toLocaleString()}
          </div>
          <div className="text-muted-foreground text-sm">Total Budget</div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <ArrowDownCircle className="mr-1 h-4 w-4 text-red-500" />
              <span>Spent</span>
            </div>
            <span className="font-medium">
              ₱{budget.spent.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <ArrowUpCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>Remaining</span>
            </div>
            <span
              className={`font-medium ${isOverBudget ? "text-red-500" : "text-green-500"}`}
            >
              ₱{budget.remaining.toLocaleString()}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span>{percentSpent}% used</span>
              {/* check if the remaining is negative value */}
              {budget.remaining < 0 ? (
                <span className="text-red-500">
                  ₱{Math.abs(budget.remaining).toLocaleString()} over budget
                </span>
              ) : (
                <span>{100 - percentSpent}% remaining</span>
              )}
            </div>
            <Progress
              value={percentSpent}
              className={`h-2 ${percentSpent > 90 ? "bg-red-200" : "bg-slate-200"}`}
              indicatorClassName={percentSpent > 90 ? "bg-red-500" : ""}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
