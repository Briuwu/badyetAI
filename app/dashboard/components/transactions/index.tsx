import { getTransactions } from "@/lib/transactions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const Transactions = async () => {
  const transactions = await getTransactions();
  return <DataTable columns={columns} data={transactions} />;
};
