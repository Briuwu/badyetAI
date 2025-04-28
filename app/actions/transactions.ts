"use server";

import { revalidatePath } from "next/cache";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/transactions";
import { AddTransaction } from "@/lib/types";

/**
 * Add a new transaction
 */
export async function addTransaction(data: AddTransaction) {
  try {
    // Validate required fields
    const {
      title,
      amount,
      transaction_date: transactionDate,
      category,
      transaction_type: transactionType,
      description,
    } = data;
    if (
      !title ||
      isNaN(amount) ||
      !transactionDate ||
      !category ||
      !transactionType
    ) {
      return { error: "Missing required fields" };
    }

    // Create the transaction
    const transaction = await createTransaction({
      title,
      amount,
      description,
      transaction_date: transactionDate,
      category: category,
      transaction_type: transactionType,
    });

    // Revalidate the transactions page to show the new transaction
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");

    return { success: true, transaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { error: "Failed to add transaction" };
  }
}

/**
 * Update an existing transaction
 */
export async function editTransaction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const description = (formData.get("description") as string) || null;
    const transactionDate = formData.get("transaction_date") as string;
    const category = formData.get("category_id") as string;

    // Validate required fields
    if (!title || isNaN(amount) || !transactionDate || !category) {
      return { error: "Missing required fields" };
    }

    // Update the transaction
    const transaction = await updateTransaction(id, {
      title,
      amount,
      description,
      transaction_date: transactionDate,
      category: category,
    });

    return { success: true, transaction };
  } catch (error) {
    console.error("Error updating transaction:", error);
    return { error: "Failed to update transaction" };
  }
}

/**
 * Delete a transaction
 */
export async function removeTransaction(
  id: string,
  budgetId?: string,
  goalId?: string,
) {
  try {
    await deleteTransaction(id);

    // Revalidate the transactions page to remove the deleted transaction
    revalidatePath("/transactions");
    if (budgetId) revalidatePath(`/budgets/${budgetId}`);
    if (goalId) revalidatePath(`/goals/${goalId}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { error: "Failed to delete transaction" };
  }
}
