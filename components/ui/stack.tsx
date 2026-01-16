"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Stack({ element, children }: ComponentRenderProps) {
  const { gap, padding, align } = element.props as {
    gap?: string | null;
    padding?: string | null;
    align?: string | null;
  };

  const spacing: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  };

  const alignItems: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: spacing[gap || "md"],
        padding: padding ? spacing[padding] : "0",
        alignItems: alignItems[align || "left"],
      }}
    >
      {children}
    </div>
  );
}
