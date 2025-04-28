import { columns } from "./columns";
import { DataTable } from "./data-table";

export const Transactions = () => {
  return <DataTable columns={columns} data={[]} />;
};
