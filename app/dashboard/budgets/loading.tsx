import { TransactionHeaderSkeleton } from "@/components/skeletons/dashboard-header";
import { GridSkeleton } from "@/components/skeletons/grid";

export default function BudgetsLoading() {
  return (
    <div>
      <TransactionHeaderSkeleton />
      <GridSkeleton />
    </div>
  );
}
