"use client";

import { type ComponentRenderProps } from "@json-render/react";
import { Button as ShadcnButton } from "@/components/ui/button";

export function Button({ element }: ComponentRenderProps) {
  const { label, variant, size, href, action } = element.props as {
    label: string;
    variant?: string | null;
    size?: string | null;
    href?: string | null;
    action?: string | null;
  };

  const variantMap: Record<string, string> = {
    primary: "default",
    default: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
    link: "link",
    destructive: "destructive",
  };

  const sizeMap: Record<string, string> = {
    sm: "sm",
    md: "default",
    lg: "lg",
    default: "default",
  };

  const normalizedVariant = variant ? variantMap[variant] ?? "default" : "default";
  const normalizedSize = size ? sizeMap[size] ?? "default" : "default";

  if (href) {
    return (
      <ShadcnButton
        asChild
        variant={normalizedVariant as "default"}
        size={normalizedSize as "default"}
        data-action={action || undefined}
      >
        <a href={href}>{label}</a>
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      type="button"
      variant={normalizedVariant as "default"}
      size={normalizedSize as "default"}
      data-action={action || undefined}
    >
      {label}
    </ShadcnButton>
  );
}
