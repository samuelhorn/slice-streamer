import { createCatalog } from "@json-render/core";
import { z } from "zod";

/**
 * Website section component catalog
 *
 * This defines the ONLY components that the AI can generate.
 * It acts as a guardrail - the AI cannot create arbitrary HTML/CSS.
 *
 * Note: OpenAI structured output requires all fields to be required.
 * Use .nullable() instead of .optional() for optional fields.
 */
export const sectionCatalog = createCatalog({
  name: "website-sections",
  components: {
    // Layout
    Container: {
      props: z.object({
        maxWidth: z.enum(["sm", "md", "lg", "xl", "full"]).nullable(),
        padding: z.enum(["none", "sm", "md", "lg"]).nullable(),
      }),
      hasChildren: true,
      description: "Page-level wrapper that constrains width and adds padding",
    },

    Stack: {
      props: z.object({
        gap: z.enum(["xs", "sm", "md", "lg", "xl", "2xl"]).nullable(),
        padding: z.enum(["xs", "sm", "md", "lg", "xl"]).nullable(),
        align: z.enum(["left", "center", "right"]).nullable(),
      }),
      hasChildren: true,
      description: "Vertical stack for grouping section content",
    },

    Row: {
      props: z.object({
        gap: z.enum(["xs", "sm", "md", "lg", "xl"]).nullable(),
        align: z.enum(["start", "center", "end"]).nullable(),
        justify: z.enum(["start", "center", "end", "between"]).nullable(),
        wrap: z.boolean().nullable(),
      }),
      hasChildren: true,
      description: "Horizontal row layout for side-by-side elements",
    },

    Columns: {
      props: z.object({
        cols: z.union([z.literal(2), z.literal(3), z.literal(4)]).nullable(),
        gap: z.enum(["sm", "md", "lg", "xl"]).nullable(),
      }),
      hasChildren: true,
      description: "Grid columns for multi-column layouts",
    },

    Spacer: {
      props: z.object({
        size: z.enum(["xs", "sm", "md", "lg", "xl", "2xl"]).nullable(),
      }),
      description: "Vertical spacing block",
    },

    // Typography
    Heading: {
      props: z.object({
        level: z.union([
          z.literal(1),
          z.literal(2),
          z.literal(3),
          z.literal(4),
          z.literal(5),
          z.literal(6),
        ]),
        text: z.string(),
        size: z.enum(["sm", "md", "lg", "xl", "2xl", "3xl"]).nullable(),
        weight: z.enum(["normal", "medium", "semibold", "bold"]).nullable(),
        align: z.enum(["left", "center", "right"]).nullable(),
      }),
      description: "Heading text for section titles",
    },

    Text: {
      props: z.object({
        content: z.string(),
        size: z.enum(["xs", "sm", "base", "lg", "xl"]).nullable(),
        weight: z.enum(["normal", "medium", "semibold"]).nullable(),
        color: z.enum(["default", "muted", "accent"]).nullable(),
        align: z.enum(["left", "center", "right"]).nullable(),
      }),
      description: "Body text or supporting copy",
    },

    // Actions & UI
    Button: {
      props: z.object({
        label: z.string(),
        variant: z
          .enum([
            "default",
            "secondary",
            "outline",
            "ghost",
            "link",
            "destructive",
          ])
          .nullable(),
        size: z.enum(["sm", "md", "lg"]).nullable(),
        href: z.string().nullable(),
        action: z.string().nullable(),
      }),
      description: "Shadcn button or linked button",
    },

    Link: {
      props: z.object({
        text: z.string(),
        href: z.string(),
        variant: z.enum(["default", "underline", "button"]).nullable(),
      }),
      description: "Inline link or button-style link",
    },

    Badge: {
      props: z.object({
        text: z.string(),
        variant: z
          .enum(["default", "secondary", "outline", "destructive"])
          .nullable(),
      }),
      description: "Shadcn badge for labels and tags",
    },

    Alert: {
      props: z.object({
        title: z.string(),
        description: z.string(),
        variant: z.enum(["default", "destructive"]).nullable(),
      }),
      description: "Shadcn alert banner with title and description",
    },

    Input: {
      props: z.object({
        placeholder: z.string().nullable(),
        value: z.string().nullable(),
        type: z
          .enum(["text", "email", "password", "search", "tel", "url"])
          .nullable(),
        disabled: z.boolean().nullable(),
      }),
      description: "Shadcn input field",
    },

    Textarea: {
      props: z.object({
        placeholder: z.string().nullable(),
        value: z.string().nullable(),
        rows: z
          .union([
            z.literal(2),
            z.literal(3),
            z.literal(4),
            z.literal(5),
            z.literal(6),
          ])
          .nullable(),
        disabled: z.boolean().nullable(),
      }),
      description: "Shadcn textarea field",
    },

    Select: {
      props: z.object({
        placeholder: z.string().nullable(),
        value: z.string().nullable(),
        options: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            })
          )
          .nullable(),
      }),
      description: "Shadcn select dropdown",
    },

    Checkbox: {
      props: z.object({
        label: z.string().nullable(),
        checked: z.boolean().nullable(),
        disabled: z.boolean().nullable(),
      }),
      description: "Shadcn checkbox with optional label",
    },

    Breadcrumb: {
      props: z.object({
        items: z
          .array(
            z.object({
              label: z.string(),
              href: z.string().nullable(),
              current: z.boolean().nullable(),
            })
          )
          .nullable(),
      }),
      description: "Shadcn breadcrumb navigation",
    },

    Carousel: {
      props: z.object({
        items: z
          .array(
            z.object({
              content: z.string().nullable(),
              contentKey: z.string().nullable(),
            })
          )
          .nullable(),
        orientation: z.enum(["horizontal", "vertical"]).nullable(),
        loop: z.boolean().nullable(),
        showControls: z.boolean().nullable(),
      }),
      description: "Shadcn carousel for sliding content",
    },

    // Structural
    Card: {
      props: z.object({
        title: z.string().nullable(),
        description: z.string().nullable(),
        footer: z.string().nullable(),
        padding: z.enum(["sm", "md", "lg"]).nullable(),
        shadow: z.enum(["none", "sm", "md", "lg"]).nullable(),
        border: z.boolean().nullable(),
      }),
      hasChildren: true,
      description: "Shadcn card container for grouped content",
    },

    Separator: {
      props: z.object({
        orientation: z.enum(["horizontal", "vertical"]).nullable(),
        spacing: z.enum(["sm", "md", "lg"]).nullable(),
      }),
      description: "Shadcn separator line",
    },

    Accordion: {
      props: z.object({
        type: z.enum(["single", "multiple"]).nullable(),
        collapsible: z.boolean().nullable(),
        items: z
          .array(
            z.object({
              title: z.string(),
              content: z.string().nullable(),
              contentKey: z.string().nullable(),
              value: z.string().nullable(),
            })
          )
          .nullable(),
      }),
      description: "Shadcn accordion with text items",
    },

    Tabs: {
      props: z.object({
        items: z
          .array(
            z.object({
              label: z.string(),
              content: z.string().nullable(),
              contentKey: z.string().nullable(),
              value: z.string().nullable(),
            })
          )
          .nullable(),
      }),
      description: "Shadcn tabs with text content",
    },

    // Media
    Image: {
      props: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.enum(["full", "auto", "1/2", "1/3", "2/3"]).nullable(),
        aspectRatio: z.enum(["16/9", "4/3", "1/1", "auto"]).nullable(),
        rounded: z.enum(["none", "sm", "md", "lg", "full"]).nullable(),
      }),
      description: "Image media block",
    },

    Icon: {
      props: z.object({
        name: z.string(),
        size: z.enum(["sm", "md", "lg", "xl"]).nullable(),
        color: z.enum(["default", "accent", "muted"]).nullable(),
      }),
      description: "Icon from the icon set",
    },

    Avatar: {
      props: z.object({
        src: z.string().nullable(),
        alt: z.string().nullable(),
        fallback: z.string().nullable(),
        size: z.enum(["sm", "md", "lg", "xl"]).nullable(),
      }),
      description: "Shadcn avatar with image or fallback",
    },
  },
  validation: "strict",
});

// Export the component list for the AI prompt
export const componentList = sectionCatalog.componentNames as string[];
