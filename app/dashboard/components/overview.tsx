import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGoals } from "@/lib/goals";
import { getTransactions } from "@/lib/transactions";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";

export const Overview = async () => {
  const transactions = await getTransactions();
  const goals = await getGoals();

  const totalSavings = goals.reduce((acc, goal) => acc + goal.saved_amount, 0);

  const totalIncome = transactions
    .filter((transaction) => transaction.transaction_type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const overview = [
    {
      title: "Total Income",
      amount: totalIncome,
      color: "text-green-500",
    },
    {
      title: "Total Expense",
      amount: totalExpense,
      color: "text-red-500",
    },
    {
      title: "Total Savings",
      amount: totalSavings,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="my-10 grid gap-5 lg:grid-cols-3">
      {overview.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex items-center justify-between text-slate-800">
            <div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="text-xs">
                This is the total {item.title} for the month.
              </CardDescription>
            </div>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </CardHeader>
          <CardContent>
            <p className={cn("text-3xl font-bold", item.color)}>
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
                maximumFractionDigits: 2,
              }).format(item.amount)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
