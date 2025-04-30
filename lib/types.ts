import { Tables } from "@/utils/supabase/database.types";
import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string(),
  date: z.date(),
  type: z.enum(["income", "expense"]),
  category: z.string(),
  budgetCategory: z.string(),
});

export type Transactions = Tables<"transactions">;
export type AddTransaction = z.infer<typeof transactionSchema>;

export type Goals = Tables<"goals">;
export type AddGoal = Omit<
  Goals,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export type Budgets = Tables<"budgets">;

export type TransactionsColumn = Omit<
  Transactions,
  "id" | "category_id" | "created_at" | "user_id"
>;
