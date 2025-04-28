"use client";

import { useState, useTransition } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "@/components/category-selector";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

import { expenses, income } from "@/lib/constant";
import { FieldInfo } from "./field-info";
import { addTransaction } from "@/app/actions/transactions";

const transactionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string(),
  date: z.date(),
  type: z.enum(["income", "expense"]),
  category: z.string(),
  budgetCategory: z.string(),
});

export function TransactionForm() {
  const [isPending, startTransition] = useTransition();
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
      date: new Date(),
      type: "expense" as "expense" | "income",
      category: "",
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
      // Here you would typically save the transaction to your database
      startTransition(async () => {
        try {
          await addTransaction({
            title: value.title,
            amount: value.amount,
            description: value.description,
            transaction_date: format(value.date, "yyyy-MM-dd"),
            category: value.category,
            transaction_type: value.type,
          });
        } catch (error) {
          console.error("Error adding transaction:", error);
        }
      });
    },
    validators: {
      onSubmit: transactionSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <Tabs
        defaultValue="expense"
        value={transactionType}
        onValueChange={(value) => {
          setTransactionType(value as "income" | "expense");
          setSelectedCategory(null);
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense" disabled={isPending}>
            Expense
          </TabsTrigger>
          <TabsTrigger value="income" disabled={isPending}>
            Income
          </TabsTrigger>
        </TabsList>
        <TabsContent value="expense" className="space-y-4 pt-4">
          <CategorySelector
            categories={expenses}
            selectedCategory={selectedCategory}
            onSelect={(name) => {
              setSelectedCategory(name);
              form.setFieldValue("category", name);
            }}
            isPending={isPending}
          />
        </TabsContent>
        <TabsContent value="income" className="space-y-4 pt-4">
          <CategorySelector
            categories={income}
            selectedCategory={selectedCategory}
            onSelect={(name) => {
              setSelectedCategory(name);
              form.setFieldValue("category", name);
            }}
            isPending={isPending}
          />
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <form.Field
              name="title"
              validators={{
                onChange: z.string().min(1, "Title is required"),
              }}
            >
              {(field) => (
                <>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    disabled={isPending}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <form.Field
              name="amount"
              validators={{
                onChange: z.number().min(0.01, "Amount must be greater than 0"),
              }}
            >
              {(field) => (
                <>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={field.state.value === 0 ? "" : field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    disabled={isPending}
                  />
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Note/Description</Label>
          <form.Field name="description">
            {(field) => (
              <>
                <Textarea
                  id="description"
                  placeholder="Add a note (optional)"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={3}
                  disabled={isPending}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <form.Field name="date">
            {(field) => (
              <Input
                type="date"
                id="date"
                value={format(field.state.value, "yyyy-MM-dd")}
                onChange={(e) => field.handleChange(new Date(e.target.value))}
                placeholder="Select date"
                className="flex items-center justify-between"
                disabled={isPending}
              />
            )}
          </form.Field>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={!selectedCategory || isPending}>
          Add Transaction
        </Button>
      </div>
    </form>
  );
}
