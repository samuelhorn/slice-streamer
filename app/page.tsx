"use client";

import { useState, useCallback } from "react";
import {
  DataProvider,
  ActionProvider,
  VisibilityProvider,
  useUIStream,
  Renderer,
} from "@json-render/react";
import { Loader2 } from "lucide-react";
import { componentRegistry } from "@/components/registry";

const INITIAL_DATA = {};

function SectionBuilder() {
  const [prompt, setPrompt] = useState("");
  const { tree, isStreaming, error, send, clear } = useUIStream({
    api: "/api/generate",
    onError: (err) => console.error("Generation error:", err),
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) return;
      await send(prompt, { data: INITIAL_DATA });
    },
    [prompt, send]
  );

  const examples = [
    "A hero section with a headline, subtext, and two buttons and image on the right side",
    "A pricing section with three horizontal cards and a heading",
    "A three-column feature section for a luxury hotel website with icons and short copy",
    "A split layout with an image and a call to action",
    "A demo request form with social proof logos",
    "A section for filtering cars, including selects, tags and buttons",
    "A 3 column carousel of testimonials with star ratings and avatars",
    "A form with inputs, selects and checkboxes",
    "A full width header with logo and navigation links left, call to actions right, and a breadcrumb beneath",
  ];

  const hasElements = tree && Object.keys(tree.elements).length > 0;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <header style={{ marginBottom: 48 }}>
        <h1 className="text-7xl font-bold">Slice Streamer</h1>
        <p className="text-xl text-muted-foreground max-w-xl mt-4">
          Stream website sections based on prompts, all constrained to a
          predefined catalog of components.
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <div
            style={{
              flex: 1,
              position: "relative",
              padding: "2px",
              borderRadius: "var(--radius)",
              background: "linear-gradient(90deg, #D7E7FF, #8b5cf6, #E6F0FF)",
              backgroundSize: "200% 100%",
              animation: isStreaming
                ? "gradient-border 1.5s linear infinite"
                : "none",
            }}
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website section you want..."
              disabled={isStreaming}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: isStreaming
                  ? "linear-gradient(90deg, rgba(215, 231, 255, 0.15), rgba(139, 92, 246, 0.1), rgba(230, 240, 255, 0.15))"
                  : "var(--card)",
                backgroundSize: isStreaming ? "200% 100%" : "100% 100%",
                animation: isStreaming
                  ? "gradient-border 1.5s linear infinite"
                  : "none",
                border: "none",
                borderRadius: "calc(var(--radius) - 2px)",
                color: "var(--foreground)",
                fontSize: 16,
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isStreaming || !prompt.trim()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {isStreaming ? "Generating..." : "Generate"}
          </button>
          {hasElements && (
            <button
              type="button"
              onClick={clear}
              className="bg-transparent text-muted-foreground px-4 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold border-2 border-border"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              className="px-2 py-1 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold border-2 border-border text-xs bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted transition-colors duration-75"
            >
              {ex}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error.message}</div>
      )}

      <div className="p-4 mb-4 bg-card border-2 border-border rounded-md text-sm mt-2">
        {!hasElements && !isStreaming ? (
          <div className="text-center p-6 text-xl text-muted-foreground">
            <p style={{ margin: 0 }}>
              Enter a prompt to generate a website section
            </p>
          </div>
        ) : isStreaming && !hasElements ? (
          <div className="text-center p-6">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        ) : tree ? (
          <Renderer
            tree={tree}
            registry={componentRegistry}
            loading={isStreaming}
          />
        ) : null}
      </div>

      {hasElements && (
        <details style={{ marginTop: 24 }}>
          <summary className="cursor-pointer font-semibold text-sm text-muted-foreground">
            View JSON
          </summary>
          <pre className="mt-2 p-4 bg-card border-2 border-border rounded-md overflow-auto text-sm text-muted-foreground">
            {JSON.stringify(tree, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default function SectionBuilderPage() {
  return (
    <DataProvider initialData={INITIAL_DATA}>
      <VisibilityProvider>
        <ActionProvider>
          <SectionBuilder />
        </ActionProvider>
      </VisibilityProvider>
    </DataProvider>
  );
}
