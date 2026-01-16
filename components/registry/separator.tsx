"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { Separator as ShadcnSeparator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function Separator({ element }: ComponentRenderProps) {
  const { orientation, spacing } = element.props as {
    orientation?: string | null;
    spacing?: string | null;
  };

  const normalizedOrientation: "horizontal" | "vertical" =
    orientation === "vertical" ? "vertical" : "horizontal";

  const spacingMap =
    normalizedOrientation === "vertical"
      ? { sm: "mx-3", md: "mx-5", lg: "mx-8" }
      : { sm: "my-3", md: "my-5", lg: "my-8" };

  const defaultSpacing =
    normalizedOrientation === "vertical" ? "mx-5" : "my-5";

  const spacingKey = spacing as keyof typeof spacingMap | null;
  const spacingClassName =
    spacingKey && spacingKey in spacingMap
      ? spacingMap[spacingKey]
      : defaultSpacing;

  return (
    <ShadcnSeparator
      orientation={normalizedOrientation}
      className={cn(spacingClassName)}
    />
  );
}
