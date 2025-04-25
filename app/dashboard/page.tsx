import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Overview } from "./components/overview";
import { ComparisonCharts } from "./components/comparison-charts";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-slate-800">
            Welcome back, Brian!
          </p>
          <p className="text-sm text-slate-600">
            You&apos;re ₱2,000 away from your savings goal{" "}
            <span className="font-bold">keep going!</span>🤗
          </p>
        </div>
        <Button>
          <PlusCircleIcon /> Add Transaction
        </Button>
      </div>
      <Overview />
      <Separator />
      <ComparisonCharts />
    </div>
  );
}
