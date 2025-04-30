"use client";

import { Goals } from "@/lib/types";
import { GoalCard } from "./goal-card";

export function GoalGrid({ goals }: { goals: Goals[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {goals?.map((goal) => <GoalCard key={goal.id} goal={goal} />)}
    </div>
  );
}
