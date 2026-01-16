"use client";

import { type ComponentRenderProps } from "@json-render/react";
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Card({ element, children }: ComponentRenderProps) {
  const { title, description, footer, padding, shadow, border } =
    element.props as {
      title?: string | null;
      description?: string | null;
      footer?: string | null;
      padding?: string | null;
      shadow?: string | null;
      border?: boolean | null;
    };

  const shadowMap: Record<string, string> = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const paddingMap: Record<string, string> = {
    sm: "px-4 py-4",
    md: "px-6 py-6",
    lg: "px-8 py-8",
  };

  const rootClass = cn(
    shadow ? shadowMap[shadow] : undefined,
    border === false ? "border-0" : undefined,
    padding ? "py-0" : undefined
  );

  const sectionPadding = padding ? paddingMap[padding] : undefined;

  return (
    <ShadcnCard className={rootClass}>
      {(title || description) && (
        <CardHeader className={sectionPadding}>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      )}
      {children ? (
        <CardContent className={sectionPadding}>{children}</CardContent>
      ) : null}
      {footer ? <CardFooter className={sectionPadding}>{footer}</CardFooter> : null}
    </ShadcnCard>
  );
}
