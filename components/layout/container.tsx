"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Container({ element, children }: ComponentRenderProps) {
  const { maxWidth, padding } = element.props as {
    maxWidth?: string | null;
    padding?: string | null;
  };

  const widths: Record<string, string> = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  const paddings: Record<string, string> = {
    none: "0",
    sm: "16px",
    md: "24px",
    lg: "32px",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: widths[maxWidth || "lg"],
        margin: "0 auto",
        padding: paddings[padding || "md"],
      }}
    >
      {children}
    </div>
  );
}
