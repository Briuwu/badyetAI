import { getTransactions } from "@/lib/transactions";
import { ExpenseIncomeChart } from "./expense-income-chart";
import { SpendingDistributionChart } from "./spending-distribution-chart";
import { formatDate } from "date-fns";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const spendingColors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#36A2EB",
];

export const ComparisonCharts = async () => {
  const transactions = await getTransactions();

  // Aggregate income and expenses by month
  const monthlyTotals: Record<string, { income: number; expenses: number }> =
    {};

  transactions.forEach((transaction) => {
    const month = formatDate(new Date(transaction.transaction_date), "MMMM");
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = { income: 0, expenses: 0 };
    }
    if (transaction.transaction_type === "income") {
      monthlyTotals[month].income += transaction.amount;
    } else if (transaction.transaction_type === "expense") {
      monthlyTotals[month].expenses += transaction.amount;
    }
  });

  // Ensure all months are present
  const chartData = MONTHS.map((month) => ({
    month,
    income: monthlyTotals[month]?.income || 0,
    expenses: monthlyTotals[month]?.expenses || 0,
  }));

  const categoryTotals: Record<string, number> = {};

  transactions.forEach((transaction) => {
    if (transaction.transaction_type === "expense") {
      const category = transaction.category || "Uncategorized";
      categoryTotals[category] =
        (categoryTotals[category] || 0) + transaction.amount;
    }
  });

  const spendingDistribution = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
      color:
        spendingColors[
          Object.keys(categoryTotals).indexOf(category) % spendingColors.length
        ],
    }),
  );

  return (
    <div className="my-10 grid gap-5 xl:grid-cols-2">
      <ExpenseIncomeChart chartData={chartData} />
      <SpendingDistributionChart spendingData={spendingDistribution} />
    </div>
  );
};
