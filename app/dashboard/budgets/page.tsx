import { BudgetGrid } from "./components/budget-grid";

export default function BudgetsPage() {
  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <p className="text-muted-foreground">
          Manage your budgets and track your spending against your financial
          goals.
        </p>
      </div>

      <BudgetGrid />
    </div>
  );
}
