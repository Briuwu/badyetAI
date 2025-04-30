import { ComparisonChartSkeleton } from "@/components/skeletons/comparison-chart";
import { TransactionHeaderSkeleton } from "@/components/skeletons/dashboard-header";
import { OverviewSkeleton } from "@/components/skeletons/overview";
import { Separator } from "@/components/ui/separator";

export default function DashboardLoading() {
  return (
    <div className="w-full">
      <TransactionHeaderSkeleton />
      <OverviewSkeleton />
      <Separator />
      <ComparisonChartSkeleton />
    </div>
  );
}
