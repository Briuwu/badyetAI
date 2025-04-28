"use server";
import { createClient } from "@/utils/supabase/server";
import { Transactions } from "./types";

/**
 * Create a new transaction
 * @param transaction Transaction data without id, user_id, created_at, updated_at
 * @returns The created transaction
 */
export async function createTransaction(
  transaction: Omit<
    Transactions,
    "id" | "user_id" | "created_at" | "updated_at"
  >,
) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transaction,
      user_id: user.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all transactions for the current user
 * @param limit Maximum number of transactions to return
 * @param offset Number of transactions to skip
 * @returns Array of transactions with category and budget/goal information
 */
export async function getTransactions(limit = 50, offset = 0) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("transaction_date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as Transactions[];
}

/**
 * Get a specific transaction by ID
 * @param id Transaction ID
 * @returns Transaction with category and budget/goal information
 */
export async function getTransactionById(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.user.id)
    .single();

  if (error) throw error;
  return data as Transactions;
}

/**
 * Update a transaction
 * @param id Transaction ID
 * @param updates Partial transaction data to update
 * @returns The updated transaction
 */
export async function updateTransaction(
  id: string,
  updates: Partial<Transactions>,
) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.user.id)
    .select()
    .single();

  if (error) throw error;
  return data as Transactions;
}

/**
 * Delete a transaction
 * @param id Transaction ID
 * @returns true if successful
 */
export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user.id);

  if (error) throw error;
  return true;
}

/**
 * Get transactions for a specific budget
 * @param budgetId Budget ID
 * @returns Array of transactions for the budget
 */
export async function getTransactionsByBudget(budgetId: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("budget_id", budgetId)
    .eq("user_id", user.user.id)
    .order("transaction_date", { ascending: false });

  if (error) throw error;
  return data as Transactions[];
}

/**
 * Get transactions for a specific category
 * @param categoryId Category ID
 * @returns Array of transactions for the category
 */
export async function getTransactionsByCategory(categoryId: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("category_id", categoryId)
    .eq("user_id", user.user.id)
    .order("transaction_date", { ascending: false });

  if (error) throw error;
  return data as Transactions[];
}
