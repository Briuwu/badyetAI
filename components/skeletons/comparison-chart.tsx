import { ExpenseIncomeChartSkeleton } from "./expense-income-chart";
import { SpendingDistributionChartSkeleton } from "./spending-distribution-chart";

export const ComparisonChartSkeleton = () => {
  return (
    <div className="my-10 grid gap-5 xl:grid-cols-2">
      <ExpenseIncomeChartSkeleton />
      <SpendingDistributionChartSkeleton />
    </div>
  );
};
