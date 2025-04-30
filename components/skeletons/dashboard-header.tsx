import { Skeleton } from "@/components/ui/skeleton";

export function TransactionHeaderSkeleton() {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <Skeleton className="mb-2 h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-9 w-20" />
    </div>
  );
}
