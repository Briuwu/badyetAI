"use client";

import { useForm } from "@tanstack/react-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  createGoalSchema,
  defaultGoalValues,
  colorOptions,
  categoryOptions,
} from "./create-goal-schema";
import { Label } from "@/components/ui/label";
import { FieldInfo } from "@/components/field-info";

export function CreateGoalForm() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);

  const form = useForm({
    defaultValues: defaultGoalValues,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    validators: {
      onSubmit: createGoalSchema,
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
      <form.Field name="name">
        {(field) => (
          <div className="space-y-2">
            <Label>Goal Name</Label>
            <Input
              placeholder="Enter goal name"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <form.Field name="target_amount">
          {(field) => (
            <div className="space-y-2">
              <Label>Target Amount (₱)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="saved_amount">
          {(field) => (
            <div className="space-y-2">
              <Label>Saved Amount (₱)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <form.Field name="start_date">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={
                  field.state.value
                    ? format(field.state.value, "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  field.handleChange(e.target.valueAsDate || new Date())
                }
                placeholder="YYYY-MM-DD"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="deadline">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label>Target Date</Label>
              <Input
                type="date"
                value={
                  field.state.value
                    ? format(field.state.value, "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  field.handleChange(e.target.valueAsDate || new Date())
                }
                placeholder="YYYY-MM-DD"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <form.Field name="priority">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label>Priority</Label>
              <Popover open={openPriority} onOpenChange={setOpenPriority}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.state.value && "text-muted-foreground",
                    )}
                  >
                    {field.state.value || "Select priority"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search priority..." />
                    <CommandList>
                      <CommandEmpty>No priority found.</CommandEmpty>
                      <CommandGroup>
                        {["High", "Medium", "Low"].map((priority) => (
                          <CommandItem
                            key={priority}
                            value={priority}
                            onSelect={() => {
                              field.handleChange(
                                priority as "High" | "Medium" | "Low",
                              );
                              setOpenPriority(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                priority === field.state.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {priority}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col space-y-2">
              <Label>Category</Label>
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.state.value && "text-muted-foreground",
                    )}
                  >
                    {categoryOptions.find((c) => c.value === field.state.value)
                      ?.label || "Select category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryOptions.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.label}
                            onSelect={() => {
                              field.handleChange(category.value);
                              setOpenCategory(false);
                            }}
                          >
                            {category.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.state.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="color">
        {(field) => (
          <div className="flex flex-col space-y-2">
            <Label>Card Color</Label>
            <Popover open={openColor} onOpenChange={setOpenColor}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.state.value && "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: field.state.value }}
                    />
                    {colorOptions.find((c) => c.value === field.state.value)
                      ?.label || "Select color"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search color..." />
                  <CommandList>
                    <CommandEmpty>No color found.</CommandEmpty>
                    <CommandGroup>
                      {colorOptions.map((color) => (
                        <CommandItem
                          key={color.value}
                          value={color.label}
                          onSelect={() => {
                            field.handleChange(color.value);
                            setOpenColor(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: color.value }}
                            />
                            {color.label}
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              color.value === field.state.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              placeholder="Enter goal description"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </div>
        )}
      </form.Field>

      <div className="flex justify-end gap-3">
        <Button type="submit">Create Goal</Button>
      </div>
    </form>
  );
}
