"use client";

import { Badge } from "@/components/ui/badge";
import { TransactionsColumn } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TransactionsColumn>[] = [
  {
    accessorKey: "transaction_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("transaction_type") as string;

      const typeClass = type === "income" ? "bg-emerald-500" : "bg-red-500";

      return (
        <Badge
          variant="default"
          className={cn(typeClass, "text-xs text-white lowercase")}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const type = row.getValue("transaction_type") as string;

      // format as currency in philippines
      const formattedAmount = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount);

      return (
        <span
          className={cn(
            "font-medium",
            type === "income" ? "text-green-500" : "text-red-500",
          )}
        >
          {formattedAmount}
        </span>
      );
    },
  },
  {
    accessorKey: "transaction_date",
    header: "Date",
  },
  {
    accessorKey: "budget_name",
    header: "Budget",
  },
];
