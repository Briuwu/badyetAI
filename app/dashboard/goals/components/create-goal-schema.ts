import { z } from "zod";

// Define the schema for creating a new goal
export const createGoalSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  target_amount: z.coerce.number().positive("Target amount must be positive"),
  saved_amount: z.coerce
    .number()
    .nonnegative("Saved amount cannot be negative")
    .default(0),
  start_date: z.date().default(() => new Date()),
  deadline: z.date(),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
  category: z.string().min(1, "Category is required"),
  color: z.string().default("#E3F2FD"), // Default light blue background
  description: z.string(),
});

// Infer the type from the schema
export type CreateGoalFormValues = z.infer<typeof createGoalSchema>;

// Define the default values
export const defaultGoalValues: Partial<CreateGoalFormValues> = {
  saved_amount: 0,
  start_date: new Date(),
  priority: "Medium",
  color: "#E3F2FD",
  description: "",
  target_amount: 0,
};

// Define color options for goals
export const colorOptions = [
  { label: "blue", value: "#E3F2FD" },
  { label: "purple", value: "#EDE7F6" },
  { label: "amber", value: "#FFF8E1" },
  { label: "emerald", value: "#E8F5E9" },
  { label: "pink", value: "#FCE4EC" },
  { label: "default", value: "#F3F4F6" },
];

// Define category options
export const categoryOptions = [
  { label: "Savings", value: "Savings" },
  { label: "Investment", value: "Investment" },
  { label: "Emergency", value: "Emergency" },
  { label: "Education", value: "Education" },
  { label: "Travel", value: "Travel" },
  { label: "Housing", value: "Housing" },
  { label: "Vehicle", value: "Vehicle" },
  { label: "Other", value: "Other" },
];
