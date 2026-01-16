"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Divider({ element }: ComponentRenderProps) {
  const { spacing, color } = element.props as {
    spacing?: string | null;
    color?: string | null;
  };

  const spacingMap: Record<string, string> = {
    sm: "12px",
    md: "20px",
    lg: "32px",
  };

  const colorMap: Record<string, string> = {
    light: "var(--border)",
    default: "var(--muted-foreground)",
    dark: "var(--foreground)",
  };

  return (
    <div
      role="separator"
      style={{
        height: "1px",
        width: "100%",
        background: colorMap[color || "light"],
        margin: `${spacingMap[spacing || "md"]} 0`,
      }}
    />
  );
}
