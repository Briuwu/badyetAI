import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
  // Configure these based on your typical table layout
  const columnCount = 6;
  const rowCount = 5;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {/* Search input skeleton */}
          <Skeleton className="h-10 w-64" />

          {/* Type filter button skeleton */}
          <Skeleton className="h-10 w-24" />

          {/* Columns button skeleton */}
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border">
        <div className="w-full">
          {/* Table header */}
          <div className="bg-muted/50">
            <div className="flex w-full">
              {Array.from({ length: columnCount }).map((_, index) => (
                <div key={index} className="flex-1 p-2 text-left font-medium">
                  <Skeleton className="h-4 w-full max-w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Table body */}
          <div>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex w-full border-t">
                {Array.from({ length: columnCount }).map((_, cellIndex) => (
                  <div key={cellIndex} className="flex-1 p-4">
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1">
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
