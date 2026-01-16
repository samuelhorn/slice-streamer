"use client";

import * as React from "react";
import { type ComponentRenderProps } from "@json-render/react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbEntry = {
  label: string;
  href?: string | null;
  current?: boolean | null;
};

export function Breadcrumb({ element }: ComponentRenderProps) {
  const { items } = element.props as {
    items?: BreadcrumbEntry[] | null;
  };

  const normalizedItems = items && items.length ? items : [];

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        {normalizedItems.map((item, index) => {
          const isLast = index === normalizedItems.length - 1;
          const isCurrent = item.current ?? isLast;
          const key = `${item.label}-${index}`;

          return (
            <React.Fragment key={key}>
              <BreadcrumbItem>
                {item.href && !isCurrent ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
