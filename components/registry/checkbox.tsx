"use client";

import * as React from "react";
import { type ComponentRenderProps } from "@json-render/react";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

export function Checkbox({ element }: ComponentRenderProps) {
  const { label, checked, disabled } = element.props as {
    label?: string | null;
    checked?: boolean | null;
    disabled?: boolean | null;
  };

  const id = React.useId();
  const ariaLabel = label || "Checkbox";

  return (
    <div className="flex items-center gap-2">
      <ShadcnCheckbox
        id={id}
        aria-label={ariaLabel}
        defaultChecked={!!checked}
        disabled={!!disabled}
      />
      {label ? (
        <label
          htmlFor={id}
          className={`text-sm leading-none ${
            disabled ? "text-muted-foreground" : "text-foreground"
          }`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}
