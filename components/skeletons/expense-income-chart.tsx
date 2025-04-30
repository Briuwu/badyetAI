import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function ExpenseIncomeChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart legend skeleton */}
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center">
              <Skeleton className="mr-2 h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center">
              <Skeleton className="mr-2 h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Chart skeleton */}
          <div className="relative h-64 w-full">
            {/* Y-axis ticks */}
            <div className="absolute top-0 left-0 flex h-full flex-col justify-between">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-12" />
              ))}
            </div>

            {/* Bars */}
            <div className="absolute top-0 right-0 bottom-8 left-12 flex items-end justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex w-8 flex-col items-center">
                  <div className="w-full">
                    <Skeleton className="mb-1 h-24 w-full rounded" />
                    <Skeleton className="h-12 w-full rounded" />
                  </div>
                  <Skeleton className="mt-2 h-4 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
