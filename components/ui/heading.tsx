"use client";

import { type ComponentRenderProps } from "@json-render/react";
import type { ElementType } from "react";

export function Heading({ element }: ComponentRenderProps) {
  const { level, text, size, weight, align } = element.props as {
    level?: number | null;
    text: string;
    size?: string | null;
    weight?: string | null;
    align?: string | null;
  };

  const levelValue = level && level >= 1 && level <= 6 ? level : 2;
  const Tag = `h${levelValue}` as ElementType;

  const sizeMap: Record<string, string> = {
    sm: "18px",
    md: "20px",
    lg: "24px",
    xl: "30px",
    "2xl": "36px",
    "3xl": "44px",
  };

  const defaultSizeByLevel: Record<number, string> = {
    1: "40px",
    2: "32px",
    3: "26px",
    4: "22px",
    5: "18px",
    6: "16px",
  };

  const weightMap: Record<string, number> = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  return (
    <Tag
      style={{
        margin: 0,
        fontSize: size ? sizeMap[size] : defaultSizeByLevel[levelValue],
        fontWeight: weightMap[weight || "semibold"],
        textAlign: align || "left",
        lineHeight: 1.2,
        color: "var(--foreground)",
      }}
    >
      {text}
    </Tag>
  );
}
