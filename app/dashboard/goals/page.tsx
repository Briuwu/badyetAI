import { getGoals } from "@/lib/goals";
import { CreateGoalModal } from "./components/create-goal-modal";
import { GoalGrid } from "./components/goal-grid";

export default async function GoalsPage() {
  const goals = await getGoals();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track your progress towards your financial goals and dreams.
          </p>
        </div>
        <CreateGoalModal />
      </div>

      {goals.length > 0 ? (
        <GoalGrid goals={goals} />
      ) : (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No goals found.</p>
        </div>
      )}
    </div>
  );
}
