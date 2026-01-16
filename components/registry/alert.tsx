"use client";

import { type ComponentRenderProps } from "@json-render/react";
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function Alert({ element }: ComponentRenderProps) {
  const { title, description, variant } = element.props as {
    title: string;
    description: string;
    variant?: string | null;
  };

  const normalizedVariant = variant || "default";

  return (
    <ShadcnAlert variant={normalizedVariant as "default"}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </ShadcnAlert>
  );
}
