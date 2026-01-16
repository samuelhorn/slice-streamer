"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Columns({ element, children }: ComponentRenderProps) {
  const { cols, gap } = element.props as {
    cols?: number | null;
    gap?: string | null;
  };

  const spacing: Record<string, string> = {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols || 2}, minmax(0, 1fr))`,
        gap: spacing[gap || "md"],
      }}
    >
      {children}
    </div>
  );
}
