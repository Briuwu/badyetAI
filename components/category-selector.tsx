"use client";

import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelect: (id: number) => void;
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={cn(
            "hover:bg-accent flex flex-col items-center justify-center rounded-md border p-3",
            selectedCategoryId === category.id && "border-primary bg-accent",
          )}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="mt-1 text-xs">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
