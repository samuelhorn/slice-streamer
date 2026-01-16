"use client";

import { type ComponentRenderProps } from "@json-render/react";
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Avatar({ element }: ComponentRenderProps) {
  const { src, alt, fallback, size } = element.props as {
    src?: string | null;
    alt?: string | null;
    fallback?: string | null;
    size?: string | null;
  };

  const sizeMap: Record<string, string> = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const fallbackText =
    fallback ||
    (alt
      ? alt
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0]?.toUpperCase())
          .join("")
      : "U");

  return (
    <ShadcnAvatar className={cn(size ? sizeMap[size] : "h-10 w-10")}>
      {src ? <AvatarImage src={src} alt={alt || "Avatar"} /> : null}
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </ShadcnAvatar>
  );
}
