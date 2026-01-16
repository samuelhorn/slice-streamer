import * as LucideIcons from "lucide-react";

/**
 * Get all valid Lucide icon names
 * Filters out non-icon exports and returns sorted list
 */
export function getLucideIconNames(): string[] {
  return Object.keys(LucideIcons)
    .filter(
      (key) =>
        // Icon components start with uppercase
        key[0] === key[0].toUpperCase() &&
        // Must be a function (component)
        typeof LucideIcons[key as keyof typeof LucideIcons] === "function" &&
        // Exclude non-icon exports
        !["createLucideIcon", "IconNode", "IconProps", "IconContext", "defaultProps"].includes(
          key
        )
    )
    .sort();
}
