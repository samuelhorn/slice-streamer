"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

export function Textarea({ element }: ComponentRenderProps) {
  const { placeholder, value, rows, disabled } = element.props as {
    placeholder?: string | null;
    value?: string | null;
    rows?: number | null;
    disabled?: boolean | null;
  };

  return (
    <ShadcnTextarea
      placeholder={placeholder || ""}
      defaultValue={value || ""}
      rows={rows || 4}
      disabled={!!disabled}
      aria-label={placeholder || "Textarea"}
    />
  );
}
