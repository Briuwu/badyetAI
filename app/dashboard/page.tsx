import { Overview } from "./components/overview";
import { ComparisonCharts } from "./components/comparison-charts";
import { Separator } from "@/components/ui/separator";
import { Transactions } from "./components/transactions";
import { Goals } from "./components/goals";
import { AddTransaction } from "@/components/add-transaction";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="font-bold text-slate-800 lg:text-xl">
            Welcome back, Brian!
          </p>
          <p className="text-xs text-slate-600 lg:text-sm">
            You&apos;re ₱2,000 away from your savings goal{" "}
            <span className="font-bold">keep going!</span>🤗
          </p>
        </div>
        <AddTransaction />
      </div>
      <Overview />
      <Separator />
      <ComparisonCharts />
      <Separator />
      <div className="my-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.5fr]">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-slate-800">Transactions</p>
              <p className="text-xs text-slate-600">
                Track your spending and income to stay on top of your finances.
              </p>
            </div>
            <Button variant="link" asChild>
              <Link href="/dashboard/transactions">View All</Link>
            </Button>
            <Transactions />
          </div>
        </div>
        <Goals />
      </div>
    </div>
  );
}
