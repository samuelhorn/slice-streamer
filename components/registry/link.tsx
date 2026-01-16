"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Link({ element }: ComponentRenderProps) {
  const { text, href, variant } = element.props as {
    text: string;
    href: string;
    variant?: string | null;
  };

  const variantMap: Record<
    string,
    {
      color?: string;
      textDecoration?: string;
      textUnderlineOffset?: string;
      background?: string;
      padding?: string;
      borderRadius?: string;
    }
  > = {
    default: {
      color: "var(--foreground)",
      textDecoration: "none",
    },
    underline: {
      color: "var(--foreground)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
    },
    button: {
      color: "var(--secondary-foreground)",
      background: "var(--secondary)",
      textDecoration: "none",
      padding: "8px 14px",
      borderRadius: "var(--radius)",
    },
  };

  const variantKey = variant || "default";
  const variantStyles = variantMap[variantKey] || variantMap.default;

  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 500,
        ...variantStyles,
      }}
    >
      {text}
    </a>
  );
}
