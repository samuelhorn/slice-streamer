"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { Badge as ShadcnBadge } from "@/components/ui/badge";

export function Badge({ element }: ComponentRenderProps) {
  const { text, variant } = element.props as {
    text: string;
    variant?: string | null;
  };

  const normalizedVariant =
    variant === "primary" ? "default" : variant || "default";

  return (
    <ShadcnBadge variant={normalizedVariant as "default"}>{text}</ShadcnBadge>
  );
}
