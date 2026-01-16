"use client";

import { type ComponentRenderProps } from "@json-render/react";

export function Image({ element }: ComponentRenderProps) {
  const { src, alt, width, aspectRatio, rounded } = element.props as {
    src: string;
    alt: string;
    width?: string | null;
    aspectRatio?: string | null;
    rounded?: string | null;
  };

  const widthMap: Record<string, string> = {
    full: "100%",
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.3333%",
    "2/3": "66.6667%",
  };

  const aspectMap: Record<string, string> = {
    "16/9": "16 / 9",
    "4/3": "4 / 3",
    "1/1": "1 / 1",
  };

  const radiusMap: Record<string, string> = {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "999px",
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{
        display: "block",
        width: widthMap[width || "full"],
        maxWidth: "100%",
        height: "auto",
        borderRadius: radiusMap[rounded || "none"],
        aspectRatio:
          aspectRatio && aspectRatio !== "auto"
            ? aspectMap[aspectRatio]
            : undefined,
        objectFit:
          aspectRatio && aspectRatio !== "auto" ? "cover" : "contain",
      }}
    />
  );
}
