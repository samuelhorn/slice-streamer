"use client";

import * as React from "react";
import { type ComponentRenderProps } from "@json-render/react";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type TabEntry = {
  label: string;
  content?: string | null;
  contentKey?: string | null;
  value?: string | null;
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export function Tabs({ element, children }: ComponentRenderProps) {
  const { items } = element.props as {
    items?: TabEntry[] | null;
  };

  const normalizedItems = items && items.length ? items : [];
  const childNodes = React.Children.toArray(children);
  const childKeys = element.children ?? [];
  const contentByKey = new Map<string, React.ReactNode>();

  childKeys.forEach((key, index) => {
    contentByKey.set(key, childNodes[index]);
  });
  const defaultValue =
    normalizedItems[0]?.value ||
    (normalizedItems[0]?.label ? toSlug(normalizedItems[0].label) : "tab-1");

  return (
    <ShadcnTabs defaultValue={defaultValue}>
      <TabsList>
        {normalizedItems.map((item, index) => {
          const value = item.value || toSlug(item.label || `tab-${index + 1}`);
          return (
            <TabsTrigger key={value} value={value}>
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {normalizedItems.map((item, index) => {
        const value = item.value || toSlug(item.label || `tab-${index + 1}`);
        const contentNode = item.contentKey
          ? contentByKey.get(item.contentKey)
          : null;
        return (
          <TabsContent key={value} value={value}>
            {contentNode ?? item.content}
          </TabsContent>
        );
      })}
    </ShadcnTabs>
  );
}
