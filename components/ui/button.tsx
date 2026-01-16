"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Button({ element }: ComponentRenderProps) {
  const { label, variant, size, href, action } = element.props as {
    label: string;
    variant?: string | null;
    size?: string | null;
    href?: string | null;
    action?: string | null;
  };

  const sizeMap: Record<string, { padding: string; fontSize: string }> = {
    sm: { padding: "8px 14px", fontSize: "14px" },
    md: { padding: "12px 18px", fontSize: "16px" },
    lg: { padding: "14px 22px", fontSize: "18px" },
  };

  const variantMap: Record<string, { background: string; color: string; border: string }> = {
    primary: {
      background: "var(--primary)",
      color: "var(--primary-foreground)",
      border: "1px solid var(--primary)",
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
      border: "1px solid var(--secondary)",
    },
    outline: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid transparent",
    },
  };

  const sizeStyle = sizeMap[size || "md"];
  const variantStyle = variantMap[variant || "primary"];

  const sharedStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    borderRadius: "var(--radius)",
    textDecoration: "none",
    fontWeight: 500,
    cursor: "pointer",
    ...sizeStyle,
    ...variantStyle,
  };

  if (href) {
    return (
      <a href={href} style={sharedStyle} data-action={action || undefined}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" style={sharedStyle} data-action={action || undefined}>
      {label}
    </button>
  );
}
