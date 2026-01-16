"use client";

import * as React from "react";
import { type ComponentRenderProps } from "@json-render/react";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselEntry = {
  content?: string | null;
  contentKey?: string | null;
};

export function Carousel({ element, children }: ComponentRenderProps) {
  const { items, orientation, loop, showControls } = element.props as {
    items?: CarouselEntry[] | null;
    orientation?: string | null;
    loop?: boolean | null;
    showControls?: boolean | null;
  };

  const normalizedItems = items && items.length ? items : [];
  const normalizedOrientation: "horizontal" | "vertical" =
    orientation === "vertical" ? "vertical" : "horizontal";
  const childNodes = React.Children.toArray(children);
  const childKeys = element.children ?? [];
  const contentByKey = new Map<string, React.ReactNode>();

  childKeys.forEach((key, index) => {
    contentByKey.set(key, childNodes[index]);
  });

  return (
    <ShadcnCarousel
      className="w-full"
      orientation={normalizedOrientation}
      opts={loop ? { loop: true } : undefined}
    >
      <CarouselContent>
        {normalizedItems.map((item, index) => {
          const contentNode = item.contentKey
            ? contentByKey.get(item.contentKey)
            : null;
          const key = item.contentKey || `slide-${index + 1}`;
          return (
            <CarouselItem key={key}>
              {contentNode ?? item.content}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {showControls === false ? null : (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </ShadcnCarousel>
  );
}
