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
import { login } from "../actions/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      // Do something with form data
      startTransition(async () => {
        try {
          await login({
            email: value.email,
            password: value.password,
          });
        } catch (error) {
          console.error("Login error:", error);
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

          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-5 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-bold underline">
            Create one.
          </Link>
        </p>
      </main>
    </div>
  );
}
