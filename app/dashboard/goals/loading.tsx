import { TransactionHeaderSkeleton } from "@/components/skeletons/dashboard-header";
import { GridSkeleton } from "@/components/skeletons/grid";

export default function GoalsLoading() {
  return (
    <div>
      <TransactionHeaderSkeleton />
      <GridSkeleton />
    </div>
  );
}
