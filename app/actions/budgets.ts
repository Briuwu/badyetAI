"use server";

import { revalidatePath } from "next/cache";
import { createBudget, updateBudget, deleteBudget } from "@/lib/budgets";
import { AddBudget, Budgets } from "@/lib/types";

/**
 * Add a new budget
 */
export async function addBudget(data: AddBudget) {
  try {
    const { name, amount } = data;

    if (!name || !amount) {
      throw new Error("Missing required fields");
    }

    // Create the budget
    const budget = await createBudget({
      name,
      amount,
      remaining: 0,
      spent: 0,
    });

    // Revalidate the budgets page to show the new budget
    revalidatePath("/dashboard/budgets");

    return { success: true, budget };
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
}

/**
 * Update an existing budget
 */
export async function editBudget(id: string, budgets: Budgets) {
  try {
    const { name, amount } = budgets;

    if (!name || !amount) {
      throw new Error("Missing required fields");
    }

    // Update the budget
    const budget = await updateBudget(id, {
      name,
      amount,
    });

    // Revalidate the budgets page to show the updated budget
    revalidatePath("/dashboard/budgets");
    revalidatePath(`/dashboard/budgets/${id}`);

    return { success: true, budget };
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
}

/**
 * Delete a budget
 */
export async function removeBudget(id: string) {
  try {
    await deleteBudget(id);

    // Revalidate the budgets page to remove the deleted budget
    revalidatePath("/budgets");

    return { success: true };
  } catch (error) {
    console.error("Error deleting budget:", error);
    return { error: "Failed to delete budget" };
  }
}
