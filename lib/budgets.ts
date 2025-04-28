"use server";
import { createClient } from "@/utils/supabase/server";
import { Budgets } from "./types";
/**
 * Create a new budget
 * @param budget Budget data without id, user_id, created_at, updated_at
 * @returns The created budget
 */
export async function createBudget(
  budget: Omit<Budgets, "id" | "user_id" | "created_at" | "updated_at">,
) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("budgets")
    .insert({
      ...budget,
      user_id: user.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all budgets for the current user
 * @returns Array of budgets with spent and remaining amounts
 */
export async function getBudgets() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", user.user.id);

  if (error) throw error;
  return data as Budgets[];
}

/**
 * Get a specific budget by ID
 * @param id Budget ID
 * @returns Budget with spent and remaining amounts
 */
export async function getBudgetById(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.user.id)
    .single();

  if (error) throw error;
  return data as Budgets;
}

/**
 * Update a budget
 * @param id Budget ID
 * @param updates Partial budget data to update
 * @returns The updated budget
 */
export async function updateBudget(id: string, updates: Partial<Budgets>) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("budgets")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a budget
 * @param id Budget ID
 * @returns true if successful
 */
export async function deleteBudget(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user.id);

  if (error) throw error;
  return true;
}
