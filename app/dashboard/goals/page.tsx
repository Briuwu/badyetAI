import { GoalGrid } from "./components/goal-grid";
import { GoalProgress } from "./components/goal-progress";
import { GoalSummary } from "./components/goal-summary";

export default function GoalsPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
        <p className="text-muted-foreground">
          Track your progress towards your financial goals and dreams.
        </p>
      </div>

      <GoalSummary />
      <GoalProgress />
      <GoalGrid />
    </div>
  );
}
