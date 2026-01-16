"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Row({ element, children }: ComponentRenderProps) {
  const { gap, align, justify, wrap } = element.props as {
    gap?: string | null;
    align?: string | null;
    justify?: string | null;
    wrap?: boolean | null;
  };

  const spacing: Record<string, string> = {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  };

  const alignItems: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
  };

  const justifyContent: Record<string, string> = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: spacing[gap || "md"],
        alignItems: alignItems[align || "start"],
        justifyContent: justifyContent[justify || "start"],
        flexWrap: wrap ? "wrap" : "nowrap",
      }}
    >
      {children}
    </div>
  );
}
