"use client";

import { useTransition } from "react";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { Lock, User } from "lucide-react";
import { FieldInfo } from "@/components/field-info";
import { signup } from "../actions/auth";

const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      startTransition(async () => {
        try {
          await signup({
            email: value.email,
            password: value.password,
          });
        } catch (error) {
          console.error("Sign up error:", error);
        }
      });
    },
    validators: {
      onSubmit: loginSchema,
    },
  });
  return (
    <div className="grid min-h-screen content-center">
      <main className="mx-auto w-full max-w-md rounded-md border p-5 shadow-md">
        <h1 className="text-center font-bold uppercase">Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-10"
        >
          <form.Field name="email">
            {(field) => {
              return (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-neutral-400">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      type="email"
                      disabled={isPending}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-8"
                    />
                    <User className="absolute bottom-1.5 left-2 w-5" />
                  </div>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              return (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-neutral-400">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      disabled={isPending}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-8"
                    />
                    <Lock className="absolute bottom-1.5 left-2 w-4" />
                  </div>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => {
              return (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-neutral-400">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      disabled={isPending}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-8"
                    />
                    <Lock className="absolute bottom-1.5 left-2 w-4" />
                  </div>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <Button type="submit" disabled={isPending} className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold underline">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
