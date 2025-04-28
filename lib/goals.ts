"use server";
import { createClient } from "@/utils/supabase/server";
import { Goals } from "./types";

/**
 * Create a new goal
 * @param goal Goal data without id, user_id, created_at, updated_at, saved_amount
 * @returns The created goal
 */
export async function createGoal(
  goal: Omit<
    Goals,
    "id" | "user_id" | "created_at" | "updated_at" | "saved_amount"
  >,
) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("goals")
    .insert({
      ...goal,
      saved_amount: 0,
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
    .eq("user_id", user.user.id)
    .order("deadline", { ascending: true });

  if (error) throw error;
  return data as Goals[];
}

/**
 * Get a specific goal by ID
 * @param id Goal ID
 * @returns Goal with progress information
 */
export async function getGoalById(id: string) {
  const { data, error } = await supabase
    .from("goal_summary")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as GoalSummary;
}

/**
 * Update a goal
 * @param id Goal ID
 * @param updates Partial goal data to update
 * @returns The updated goal
 */
export async function updateGoal(id: string, updates: Partial<Goal>) {
  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
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
  const { error } = await supabase.from("goals").delete().eq("id", id);

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
) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  // Start a transaction
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .insert({
      user_id: user.user.id,
      title: description,
      amount: amount,
      transaction_date: new Date().toISOString().split("T")[0],
      transaction_type: "expense",
      goal_id: goalId,
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
  const { data, error } = await supabase
    .from("goal_contributions_history")
    .select("*")
    .eq("goal_id", goalId)
    .order("contribution_date", { ascending: false });

  if (error) throw error;
  return data;
}
