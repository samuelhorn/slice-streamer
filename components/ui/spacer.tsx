"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Spacer({ element }: ComponentRenderProps) {
  const { size } = element.props as {
    size?: string | null;
  };

  const spacing: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  };

  return (
    <div
      aria-hidden="true"
      style={{ height: spacing[size || "md"], width: "100%" }}
    />
  );
}
