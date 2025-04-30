import { getBudgets } from "@/lib/budgets";
import { BudgetGrid } from "./components/budget-grid";
import { getTransactions } from "@/lib/transactions";

export default async function BudgetsPage() {
  const budgets = await getBudgets();
  const transactions = await getTransactions();

  const transformedBudgets = budgets.map((budget) => {
    const categories = transactions
      .filter((transaction) => transaction.budget_id === budget.id)
      .map((transaction) => transaction.category);

    return {
      ...budget,
      categories: [...new Set(categories)],
    };
  });

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
        <p className="text-muted-foreground">
          Manage your budgets and track your spending against your financial
          goals.
        </p>
      </div>

      <BudgetGrid budgets={transformedBudgets} />
    </div>
  );
}
