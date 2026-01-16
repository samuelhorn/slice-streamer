"use client";

import { type ComponentRenderProps } from "@json-render/react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption = {
  label: string;
  value: string;
};

export function Select({ element }: ComponentRenderProps) {
  const { placeholder, value, options } = element.props as {
    placeholder?: string | null;
    value?: string | null;
    options?: SelectOption[] | null;
  };

  const normalizedOptions = options && options.length ? options : [];

  return (
    <ShadcnSelect defaultValue={value || undefined}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {normalizedOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
}
