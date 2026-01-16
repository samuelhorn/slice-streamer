"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { Input as ShadcnInput } from "@/components/ui/input";

export function Input({ element }: ComponentRenderProps) {
  const { placeholder, value, type, disabled } = element.props as {
    placeholder?: string | null;
    value?: string | null;
    type?: string | null;
    disabled?: boolean | null;
  };

  return (
    <ShadcnInput
      type={type || "text"}
      placeholder={placeholder || ""}
      defaultValue={value || ""}
      disabled={!!disabled}
      aria-label={placeholder || "Input"}
    />
  );
}
