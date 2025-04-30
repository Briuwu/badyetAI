import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <Skeleton className="h-5 w-32" />
        </CardTitle>
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex space-x-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>

        <div className="mb-1 flex items-baseline justify-between">
          <div>
            <Skeleton className="h-7 w-24" />
          </div>
          <div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Skeleton className="mr-1 h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Skeleton className="mr-1 h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-2 w-full rounded" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Skeleton className="h-8 w-full rounded" />
      </CardFooter>
    </Card>
  );
}
