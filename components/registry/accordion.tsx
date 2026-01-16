"use client";

import * as React from "react";
import { type ComponentRenderProps } from "@json-render/react";
import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionEntry = {
  title: string;
  content?: string | null;
  contentKey?: string | null;
  value?: string | null;
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export function Accordion({ element, children }: ComponentRenderProps) {
  const { items, type, collapsible } = element.props as {
    items?: AccordionEntry[] | null;
    type?: string | null;
    collapsible?: boolean | null;
  };

  const normalizedItems = items && items.length ? items : [];
  const normalizedType: "single" | "multiple" =
    type === "multiple" ? "multiple" : "single";
  const childNodes = React.Children.toArray(children);
  const childKeys = element.children ?? [];
  const contentByKey = new Map<string, React.ReactNode>();

  childKeys.forEach((key, index) => {
    contentByKey.set(key, childNodes[index]);
  });

  return (
    <ShadcnAccordion type={normalizedType} collapsible={collapsible ?? true}>
      {normalizedItems.map((item, index) => {
        const value =
          item.value ||
          toSlug(item.title || `item-${index + 1}`) ||
          `item-${index + 1}`;
        const contentNode = item.contentKey
          ? contentByKey.get(item.contentKey)
          : null;
        return (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{contentNode ?? item.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </ShadcnAccordion>
  );
}
