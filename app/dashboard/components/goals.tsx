import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const Goals = () => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Goals</CardTitle>
          <CardDescription className="sr-only">
            Set your goals and track your progress towards achieving them.
          </CardDescription>
        </CardHeader>
        <Button variant="link" asChild>
          <Link href="/dashboard/goals">View All</Link>
        </Button>
      </div>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-md border border-slate-200 p-4 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-slate-800">
                Emergency Fund
              </p>
              <p className="text-xs text-slate-600">₱10,000</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-600">₱5,000</p>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-slate-200 p-4 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-slate-800">
                Vacation Fund
              </p>
              <p className="text-xs text-slate-600">₱20,000</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-600">₱8,000</p>
              <div className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
