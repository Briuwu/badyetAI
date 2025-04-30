"use server";

import { revalidatePath } from "next/cache";
import {
  createGoal,
  updateGoal,
  deleteGoal,
  // addGoalContribution,
} from "@/lib/goals";
import { AddGoal } from "@/lib/types";

/**
 * Add a new goal
 */
export async function addGoal(data: AddGoal) {
  try {
    const {
      name,
      target_amount: targetAmount,
      deadline,
      priority,
      category,
    } = data;

    // Validate required fields
    if (!name || isNaN(targetAmount) || !deadline || !priority || !category) {
      return { error: "Missing required fields" };
    }

    // Create the goal
    const goal = await createGoal(data);

    // Revalidate the goals page to show the new goal
    revalidatePath("/dashboard/goals");

    return { success: true, goal };
  } catch (error) {
    console.error("Error adding goal:", error);
    return { error: "Failed to add goal" };
  }
}

/**
 * Update an existing goal
 */
export async function editGoal(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const targetAmount = parseFloat(formData.get("target_amount") as string);
    const deadline = formData.get("deadline") as string;
    const priority = formData.get("priority") as "Low" | "Medium" | "High";
    const category = formData.get("category") as string;
    const color = formData.get("color") as string;

    // Validate required fields
    if (!name || isNaN(targetAmount) || !deadline || !priority || !category) {
      return { error: "Missing required fields" };
    }

    // Update the goal
    const goal = await updateGoal(id, {
      name,
      target_amount: targetAmount,
      deadline,
      priority,
      category,
      color,
    });

    // Revalidate the goals page to show the updated goal
    revalidatePath("/goals");
    revalidatePath(`/goals/${id}`);

    return { success: true, goal };
  } catch (error) {
    console.error("Error updating goal:", error);
    return { error: "Failed to update goal" };
  }
}

/**
 * Delete a goal
 */
export async function removeGoal(id: string) {
  try {
    await deleteGoal(id);

    // Revalidate the goals page to remove the deleted goal
    revalidatePath("/goals");

    return { success: true };
  } catch (error) {
    console.error("Error deleting goal:", error);
    return { error: "Failed to delete goal" };
  }
}

/**
 * Add a contribution to a goal
 */
// export async function contributeToGoal(formData: FormData) {
//   try {
//     const goalId = formData.get("goal_id") as string;
//     const amount = parseFloat(formData.get("amount") as string);
//     const description =
//       (formData.get("description") as string) || "Goal Contribution";

//     // Validate required fields
//     if (!goalId || isNaN(amount) || amount <= 0) {
//       return { error: "Missing required fields" };
//     }

//     // Add the contribution
//     const contribution = await addGoalContribution(goalId, amount, description);

//     // Revalidate the goals page to show the updated goal
//     revalidatePath("/goals");
//     revalidatePath(`/goals/${goalId}`);

//     return { success: true, contribution };
//   } catch (error) {
//     console.error("Error adding contribution:", error);
//     return { error: "Failed to add contribution" };
//   }
// }
