"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Link({ element }: ComponentRenderProps) {
  const { text, href, variant } = element.props as {
    text: string;
    href: string;
    variant?: string | null;
  };

  const variantMap = {
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

  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontWeight: 500,
        ...variantMap[variant || "default"],
      }}
    >
      {text}
    </a>
  );
}
