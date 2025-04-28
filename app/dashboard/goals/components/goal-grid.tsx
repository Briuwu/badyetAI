"use client";

import { GoalCard } from "./goal-card";

// Sample goal data - in a real app, this would come from your database
const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    targetAmount: 100000,
    savedAmount: 75000,
    remainingAmount: 25000,
    deadline: "2025-08-01",
    priority: "High",
    category: "Savings",
    color: "blue",
  },
  {
    id: 2,
    name: "Home Down Payment",
    targetAmount: 250000,
    savedAmount: 62500,
    remainingAmount: 187500,
    deadline: "2026-12-01",
    priority: "High",
    category: "Housing",
    color: "purple",
  },
  {
    id: 3,
    name: "Vacation to Japan",
    targetAmount: 50000,
    savedAmount: 30000,
    remainingAmount: 20000,
    deadline: "2025-05-01",
    priority: "Medium",
    category: "Travel",
    color: "amber",
  },
  {
    id: 4,
    name: "New Car",
    targetAmount: 100000,
    savedAmount: 20000,
    remainingAmount: 80000,
    deadline: "2026-06-01",
    priority: "Medium",
    category: "Transportation",
    color: "emerald",
  },
  {
    id: 5,
    name: "Wedding Fund",
    targetAmount: 150000,
    savedAmount: 0,
    remainingAmount: 150000,
    deadline: "2027-01-01",
    priority: "Low",
    category: "Life Events",
    color: "pink",
  },
];

export function GoalGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
