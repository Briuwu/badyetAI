import { Tables } from "@/utils/supabase/database.types";

export type Transactions = Tables<"transactions">;
export type AddTransaction = Omit<
  Transactions,
  "id" | "created_at" | "updated_at" | "user_id"
>;

export type Goals = Tables<"goals">;

export type Budgets = Tables<"budgets">;

export type TransactionsColumn = Omit<
  Transactions,
  "id" | "category_id" | "created_at" | "user_id"
>;
