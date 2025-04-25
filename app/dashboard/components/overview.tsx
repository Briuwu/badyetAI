import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, EllipsisVertical } from "lucide-react";

export const Overview = () => {
  return (
    <div className="my-10 grid gap-5 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index}>
          <CardHeader className="flex items-center justify-between text-slate-800">
            <div>
              <CardTitle>Total Income</CardTitle>
              <CardDescription className="text-xs">
                This is the total income for the month.
              </CardDescription>
            </div>
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₱1,234</p>
          </CardContent>
          <CardFooter className="text-sm">
            <div className="flex items-center">
              <ArrowUp className="w-4 text-emerald-500" />
              <span className="font-bold text-emerald-500">40%</span>
              <p className="ml-1 text-slate-600">vs last month</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
