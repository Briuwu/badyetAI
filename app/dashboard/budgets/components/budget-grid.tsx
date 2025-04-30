"use client";

import { Budgets } from "@/lib/types";
import { BudgetCard } from "./budget-card";

// Sample budget data - in a real app, this would come from your database
// const budgets = [
//   {
//     id: 1,
//     name: "Monthly Expenses",
//     amount: 50000,
//     spent: 32500,
//     remaining: 17500,
//     period: "April 2025",
//     categories: ["Food", "Transport", "Housing", "Utilities"],
//   },
//   {
//     id: 2,
//     name: "Entertainment",
//     amount: 10000,
//     spent: 7200,
//     remaining: 2800,
//     period: "April 2025",
//     categories: ["Movies", "Dining Out", "Events"],
//   },
//   {
//     id: 3,
//     name: "Shopping",
//     amount: 15000,
//     spent: 8900,
//     remaining: 6100,
//     period: "April 2025",
//     categories: ["Clothing", "Electronics", "Home Goods"],
//   },
//   {
//     id: 4,
//     name: "Travel Fund",
//     amount: 30000,
//     spent: 5000,
//     remaining: 25000,
//     period: "Q2 2025",
//     categories: ["Flights", "Accommodation", "Activities"],
//   },
// ];

type Props = {
  budgets: (Budgets & {
    categories: string[];
  })[];
};

export function BudgetGrid({ budgets }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
