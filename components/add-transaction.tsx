import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { TransactionForm } from "./transaction-form";
import { getAvailableBudgets } from "@/lib/budgets";

export const AddTransaction = async () => {
  const budgetOptions = await getAvailableBudgets();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-xs lg:text-base">
          <PlusCircleIcon /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to your account. You can add income or expense
            transactions to keep track of your finances.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm budgetOpts={budgetOptions} />
      </DialogContent>
    </Dialog>
  );
};
