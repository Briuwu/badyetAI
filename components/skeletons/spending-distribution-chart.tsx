import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function SpendingDistributionChartSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-44" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-60" />
        </CardDescription>
      </CardHeader>
      <CardContent className="my-auto">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Pie chart skeleton */}
          <div className="flex h-[300px] w-full items-center justify-center md:w-1/2">
            <div className="relative">
              {/* Outer circle */}
              <Skeleton className="h-[240px] w-[240px] rounded-full" />
              {/* Inner circle (donut hole) */}
              <div className="absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
            </div>
          </div>

          {/* Legend skeleton */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
