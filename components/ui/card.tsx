"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Card({ element, children }: ComponentRenderProps) {
  const { padding, shadow, border } = element.props as {
    padding?: string | null;
    shadow?: string | null;
    border?: boolean | null;
  };

  const paddingMap: Record<string, string> = {
    sm: "16px",
    md: "24px",
    lg: "32px",
  };

  const shadowMap: Record<string, string> = {
    none: "none",
    sm: "0 1px 2px rgba(15, 23, 42, 0.08)",
    md: "0 6px 16px rgba(15, 23, 42, 0.12)",
    lg: "0 12px 30px rgba(15, 23, 42, 0.16)",
  };

  const showBorder = border ?? true;

  return (
    <div
      style={{
        background: "var(--card)",
        color: "var(--card-foreground)",
        padding: paddingMap[padding || "md"],
        border: showBorder ? "1px solid var(--border)" : "none",
        borderRadius: "var(--radius)",
        boxShadow: shadowMap[shadow || "none"],
      }}
    >
      {children}
    </div>
  );
}
