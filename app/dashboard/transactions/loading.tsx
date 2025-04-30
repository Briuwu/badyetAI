import { TransactionHeaderSkeleton } from "@/components/skeletons/dashboard-header";
import { DataTableSkeleton } from "@/components/skeletons/data-table";

export default function TransactionsLoading() {
  return (
    <div>
      <TransactionHeaderSkeleton />
      <DataTableSkeleton />
    </div>
  );
}
