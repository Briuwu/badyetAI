"use client";

import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (category: string) => void;
  isPending?: boolean;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onSelect,
  isPending,
}: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.name)}
          className={cn(
            "hover:bg-accent flex flex-col items-center justify-center rounded-md border p-3",
            selectedCategory === category.name && "border-primary bg-accent",
          )}
          disabled={isPending}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="mt-1 text-xs">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
