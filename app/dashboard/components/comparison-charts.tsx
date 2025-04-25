import { ExpenseIncomeChart } from "./expense-income-chart";
import { SpendingDistributionChart } from "./spending-distribution-chart";

export const ComparisonCharts = () => {
  return (
    <div className="my-10 grid gap-5 xl:grid-cols-2">
      <ExpenseIncomeChart />
      <SpendingDistributionChart />
    </div>
  );
};
