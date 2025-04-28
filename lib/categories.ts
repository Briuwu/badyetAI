import { supabase, Category } from "./supabase";

/**
 * Get all categories (both default and user-created)
 * @param type Optional filter by category type (income or expense)
 * @returns Array of categories
 */
export async function getCategories(type?: "income" | "expense") {
  const query = supabase.from("categories").select("*").order("name");

  if (type) {
    query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Category[];
}

/**
 * Create a new custom category
 * @param category Category data without id, user_id, created_at, updated_at, is_default
 * @returns The created category
 */
export async function createCategory(
  category: Omit<
    Category,
    "id" | "user_id" | "created_at" | "updated_at" | "is_default"
  >,
) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("categories")
    .insert({
      ...category,
      user_id: user.user.id,
      is_default: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a custom category
 * @param id Category ID
 * @param updates Partial category data to update
 * @returns The updated category
 */
export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, "id" | "user_id" | "is_default">>,
) {
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .eq("is_default", false) // Only allow updating custom categories
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a custom category
 * @param id Category ID
 * @returns true if successful
 */
export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("is_default", false); // Only allow deleting custom categories

  if (error) throw error;
  return true;
}
