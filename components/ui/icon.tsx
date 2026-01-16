"use client";

import { type ComponentRenderProps } from "@json-render/react";
import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";

export function Icon({ element }: ComponentRenderProps) {
  const { name, size, color } = element.props as {
    name: string;
    size?: string | null;
    color?: string | null;
  };

  const sizeMap: Record<string, number> = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const colorMap: Record<string, string> = {
    default: "var(--foreground)",
    accent: "var(--primary)",
    muted: "var(--muted-foreground)",
  };

  const normalizeName = (value: string) =>
    value
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

  const normalizedName = normalizeName(name);

  const iconSize = sizeMap[size || "md"];
  const iconColor = colorMap[color || "default"];
  const IconComponent = (LucideIcons as Record<
    string,
    ComponentType<{ size?: number; color?: string }>
  >)[name] ??
    (LucideIcons as Record<
      string,
      ComponentType<{ size?: number; color?: string }>
    >)[normalizedName];

  if (IconComponent) {
    return <IconComponent size={iconSize} color={iconColor} aria-label={name} />;
  }

  const fallback = name ? name.slice(0, 2).toUpperCase() : "?";

  return (
    <span
      role="img"
      aria-label={name}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: iconSize,
        height: iconSize,
        borderRadius: "999px",
        border: "1px solid var(--border)",
        color: iconColor,
        fontSize: Math.round(iconSize * 0.55),
        fontWeight: 600,
        textTransform: "uppercase",
      }}
    >
      {fallback}
    </span>
  );
}
