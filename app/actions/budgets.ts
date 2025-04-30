"use server";

import { revalidatePath } from "next/cache";
import { createBudget, updateBudget, deleteBudget } from "@/lib/budgets";

/**
 * Add a new budget
 */
export async function addBudget(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const periodStart = formData.get("period_start") as string;
    const periodEnd = formData.get("period_end") as string;

    // Validate required fields
    if (!name || isNaN(amount) || !periodStart || !periodEnd) {
      return { error: "Missing required fields" };
    }

    // Create the budget
    const budget = await createBudget({
      name,
      amount,
      remaining: 0,
      spent: 0,
    });

    // Revalidate the budgets page to show the new budget
    revalidatePath("/budgets");

    return { success: true, budget };
  } catch (error) {
    console.error("Error adding budget:", error);
    return { error: "Failed to add budget" };
  }
}

/**
 * Update an existing budget
 */
export async function editBudget(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const periodStart = formData.get("period_start") as string;
    const periodEnd = formData.get("period_end") as string;

    // Validate required fields
    if (!name || isNaN(amount) || !periodStart || !periodEnd) {
      return { error: "Missing required fields" };
    }

    // Update the budget
    const budget = await updateBudget(id, {
      name,
      amount,
    });

    // Revalidate the budgets page to show the updated budget
    revalidatePath("/budgets");
    revalidatePath(`/budgets/${id}`);

    return { success: true, budget };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { error: "Failed to update budget" };
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
