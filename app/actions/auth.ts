"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    throw new Error("Login failed. Please try again.");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw new Error("Signup failed. Please try again.");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
};
