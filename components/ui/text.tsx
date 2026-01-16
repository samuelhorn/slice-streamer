"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Text({ element }: ComponentRenderProps) {
  const { content, size, weight, color, align } = element.props as {
    content: string;
    size?: string | null;
    weight?: string | null;
    color?: string | null;
    align?: string | null;
  };

  const sizeMap: Record<string, string> = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
  };

  const weightMap: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
  };

  const colorMap: Record<string, string> = {
    default: "var(--foreground)",
    muted: "var(--muted-foreground)",
    accent: "var(--primary)",
  };

  const alignMap: Record<string, "left" | "center" | "right" | "justify"> = {
    left: "left",
    center: "center",
    right: "right",
    justify: "justify",
  };

  const textAlign = (align && alignMap[align]) || "left";

  return (
    <p
      style={{
        margin: 0,
        fontSize: sizeMap[size || "base"],
        fontWeight: weightMap[weight || "normal"],
        color: colorMap[color || "default"],
        textAlign,
        lineHeight: 1.6,
      }}
    >
      {content}
    </p>
  );
}
