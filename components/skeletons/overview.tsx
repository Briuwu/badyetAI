import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const OverviewSkeleton = () => {
  return (
    <div className="my-10 grid gap-5 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index}>
          <CardHeader className="flex items-center justify-between text-slate-800">
            <div>
              <CardTitle>
                <Skeleton className="h-5 w-28" />
              </CardTitle>
              <CardDescription className="text-xs">
                <Skeleton className="mt-1 h-3 w-48" />
              </CardDescription>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-24" />
          </CardContent>
          <CardFooter className="text-sm">
            <div className="flex items-center">
              <Skeleton className="mr-1 h-4 w-4" />
              <Skeleton className="mr-1 h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
