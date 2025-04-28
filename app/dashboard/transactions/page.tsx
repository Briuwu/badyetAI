import { AddTransaction } from "@/components/add-transaction";
import { Transactions } from "../components/transactions";

export default function TransactionsPage() {
  return (
    <div className="grid gap-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-slate-800">Transactions</p>
          <p className="text-xs text-slate-600">
            Track your spending and income to stay on top of your finances.
          </p>
        </div>
        <AddTransaction />
      </div>
      <Transactions />
    </div>
  );
}
