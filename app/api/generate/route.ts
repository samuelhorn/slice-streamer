import { streamText } from "ai";
import { componentList } from "@/lib/catalog";
import { getLucideIconNames } from "@/lib/lucide-icons";

export const maxDuration = 30;

const SYSTEM_PROMPT_BASE = `You are a website section generator that outputs JSONL (JSON Lines) patches only.

AVAILABLE COMPONENTS:
${componentList.join(", ")}

COMPONENT DETAILS:
- Container: { maxWidth?: "sm"|"md"|"lg"|"xl"|"full", padding?: "none"|"sm"|"md"|"lg" }
- Stack: { gap?: "xs"|"sm"|"md"|"lg"|"xl"|"2xl", padding?: "xs"|"sm"|"md"|"lg"|"xl", align?: "left"|"center"|"right" }
- Row: { gap?: "xs"|"sm"|"md"|"lg"|"xl", align?: "start"|"center"|"end", justify?: "start"|"center"|"end"|"between", wrap?: boolean }
- Columns: { cols?: 2|3|4, gap?: "sm"|"md"|"lg"|"xl" }
- Spacer: { size?: "xs"|"sm"|"md"|"lg"|"xl"|"2xl" }
- Heading: { level: 1-6, text: string, size?: "sm"|"md"|"lg"|"xl"|"2xl"|"3xl", weight?: "normal"|"medium"|"semibold"|"bold", align?: "left"|"center"|"right" }
- Text: { content: string, size?: "xs"|"sm"|"base"|"lg"|"xl", weight?: "normal"|"medium"|"semibold", color?: "default"|"muted"|"accent", align?: "left"|"center"|"right" }
- Button: { label: string, variant?: "primary"|"secondary"|"outline"|"ghost", size?: "sm"|"md"|"lg", href?: string, action?: string }
- Link: { text: string, href: string, variant?: "default"|"underline"|"button" }
- Image: { src: string, alt: string, width?: "full"|"auto"|"1/2"|"1/3"|"2/3", aspectRatio?: "16/9"|"4/3"|"1/1"|"auto", rounded?: "none"|"sm"|"md"|"lg"|"full" }
- Icon: { name: string, size?: "sm"|"md"|"lg"|"xl", color?: "default"|"accent"|"muted" }
- Card: { padding?: "sm"|"md"|"lg", shadow?: "none"|"sm"|"md"|"lg", border?: boolean }
- Divider: { spacing?: "sm"|"md"|"lg", color?: "light"|"default"|"dark" }

LAYOUT RULES (HIGHEST PRIORITY):
1) Stack = vertical only. Row = horizontal only. Columns = grid for 2-4 items.
2) If the prompt implies horizontal layout (left/right, side-by-side, split, "3 cards"), use Row or Columns. Never use Stack for horizontal.
3) Row children are left then right. Stack children are top then bottom.
4) "image on the right" -> Row ["content", "image"]. "image on the left" -> Row ["image", "content"].
5) Use Columns with Card children for pricing/features grids (2-4 cards).

OUTPUT FORMAT:
Output JSONL where each line is a patch operation.
- {"op":"set","path":"/root","value":"main-card"}
- {"op":"add","path":"/elements/main-card","value":{...}}

ELEMENT STRUCTURE:
{
  "key": "unique-key",
  "type": "ComponentType",
  "props": { ... },
  "children": ["child-key-1", "child-key-2"]
}

RULES:
1) First set /root to the root element's key
2) Add each element with a unique key using /elements/{key}
3) Parent elements list child keys in their "children" array
4) Stream elements progressively - parent first, then children
5) Each element must have: key, type, props
6) Children array contains STRING KEYS, not nested objects
7) Generate a single cohesive website section (hero, features, CTA, etc.)
8) Image src must use the placeholder API: https://placehold.co/{width}x{height}

EXAMPLE - Image on Right:
{"op":"set","path":"/root","value":"split-hero"}
{"op":"add","path":"/elements/split-hero","value":{"key":"split-hero","type":"Container","props":{"maxWidth":"xl","padding":"lg"},"children":["split-row"]}}
{"op":"add","path":"/elements/split-row","value":{"key":"split-row","type":"Row","props":{"gap":"lg","align":"center","justify":"between","wrap":false},"children":["content-stack","hero-image"]}}
{"op":"add","path":"/elements/content-stack","value":{"key":"content-stack","type":"Stack","props":{"gap":"md","align":"left"},"children":["split-heading","split-text","split-button"]}}
{"op":"add","path":"/elements/split-heading","value":{"key":"split-heading","type":"Heading","props":{"level":1,"text":"Welcome","size":"3xl","weight":"bold"}}}
{"op":"add","path":"/elements/split-text","value":{"key":"split-text","type":"Text","props":{"content":"Image is on the right.","size":"lg"}}}
{"op":"add","path":"/elements/split-button","value":{"key":"split-button","type":"Button","props":{"label":"Learn more","variant":"primary"}}}
{"op":"add","path":"/elements/hero-image","value":{"key":"hero-image","type":"Image","props":{"src":"https://placehold.co/600x400","alt":"Hero","width":"1/2"}}}

Generate JSONL patches now:`;

export async function POST(req: Request) {
  const { prompt, context } = await req.json();

  let fullPrompt = prompt;
  let systemPrompt = SYSTEM_PROMPT_BASE;

  // Check if icons are mentioned in the prompt (case-insensitive)
  const usesIcons = /\bicon(s)?\b/i.test(prompt);

  // Only add icon name constraints if icons are actually used
  if (usesIcons) {
    const iconNames = getLucideIconNames();
    systemPrompt += `\n\nICON CONSTRAINTS (ONLY APPLY IF USING ICONS):
- Icon component name MUST be one of these valid Lucide icon names (case-sensitive):
${iconNames.join(", ")}
- Use the exact name as listed above (e.g., "Heart", "Star", "Check", not "heart-icon" or "starIcon")
- If unsure which icon to use, pick the closest semantic match from the list above`;
  }

  // Add data context
  if (context?.data) {
    fullPrompt += `\n\nAVAILABLE DATA:\n${JSON.stringify(
      context.data,
      null,
      2
    )}`;
  }

  const result = streamText({
    model: "google/gemini-2.5-flash",
    system: systemPrompt,
    prompt: fullPrompt,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
