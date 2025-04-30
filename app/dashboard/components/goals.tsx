import { Button } from "@/components/ui/button";
import { GoalCard } from "../goals/components/goal-card";
import { getGoals } from "@/lib/goals";
import Link from "next/link";

export const Goals = async () => {
  const goals = await getGoals();
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-10 flex items-center justify-between">
        <p className="text-lg font-bold text-slate-800">Goals</p>
        <Button variant="link" asChild>
          <Link href="/dashboard/goals">View All</Link>
        </Button>
      </div>
      {goals.slice(0, 3).map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};
