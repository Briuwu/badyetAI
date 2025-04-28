import { Tables } from "@/utils/supabase/database.types";

export type Transactions = Tables<"transactions">;

export type TransactionsColumn = Omit<
  Transactions,
  "id" | "category_id" | "created_at" | "user_id"
>;
