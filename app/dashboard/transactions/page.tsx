import { AddTransaction } from "@/components/add-transaction";
import { Transactions } from "../components/transactions";
import { TransactionsChart } from "./components/transactions-chart";

export default function TransactionsPage() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.35fr_1fr]">
      <TransactionsChart />
      <div>
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
    </div>
  );
}
