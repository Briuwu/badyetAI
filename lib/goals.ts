"use server";
import { createClient } from "@/utils/supabase/server";
import { AddGoal, Goals } from "./types";

/**
 * Create a new goal
 * @param goal Goal data without id, user_id, created_at, updated_at, saved_amount
 * @returns The created goal
 */
export async function createGoal(goal: AddGoal) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("goals")
    .insert({
      ...goal,
      priority: goal.priority?.toLowerCase(),
      user_id: user.user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all goals for the current user
 * @returns Array of goals with progress information
 */
export async function getGoals() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.user.id);

  if (error) throw error;
  return data as Goals[];
}

/**
 * Get a specific goal by ID
 * @param id Goal ID
 * @returns Goal with progress information
 */
export async function getGoalById(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.user.id)
    .single();

  if (error) throw error;
  return data as Goals;
}

/**
 * Update a goal
 * @param id Goal ID
 * @param updates Partial goal data to update
 * @returns The updated goal
 */
export async function updateGoal(id: string, updates: Partial<Goals>) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a goal
 * @param id Goal ID
 * @returns true if successful
 */
export async function deleteGoal(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");
  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id)
    .eq("user_id", user.user.id);

  if (error) throw error;
  return true;
}

/**
 * Add a contribution to a goal
 * @param goalId Goal ID
 * @param amount Contribution amount
 * @param description Description of the contribution
 * @returns The created contribution
 */
export async function addGoalContribution(
  goalId: string,
  amount: number,
  description: string = "Goal Contribution",
  category: string,
) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  // Start a transaction
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .insert({
      amount,
      category,
      title: "Goal Contribution",
      transaction_date: new Date().toISOString().split("T")[0],
      transaction_type: "expense",
      description,
      user_id: user.user.id,
    })
    .select()
    .single();

  if (transactionError) throw transactionError;

  // Create the goal contribution
  const { data: contribution, error: contributionError } = await supabase
    .from("goal_contributions")
    .insert({
      goal_id: goalId,
      transaction_id: transaction.id,
      amount: amount,
      contribution_date: new Date().toISOString().split("T")[0],
    })
    .select()
    .single();

  if (contributionError) throw contributionError;

  return contribution;
}

/**
 * Get contributions for a goal
 * @param goalId Goal ID
 * @returns Array of contributions for the goal
 */
export async function getGoalContributions(goalId: string) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("goal_contributions")
    .select("*")
    .eq("goal_id", goalId)
    .eq("user_id", user.user.id);

  if (error) throw error;
  return data;
}
