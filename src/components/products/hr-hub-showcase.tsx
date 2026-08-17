"use client";

import { useState } from "react";
import { ProductScreenshot } from "@/components/products/product-screenshot";
import { hrHubScreens } from "@/data/hr-hub-screens";
import { cn } from "@/lib/cn";

export function HrHubShowcase({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState(hrHubScreens[0].id);
  const current =
    hrHubScreens.find((item) => item.id === activeId) ?? hrHubScreens[0];

  return (
    <div className={cn("min-w-0", className)}>
      <div
        role="tablist"
        aria-label="Модули на HR HUB 360"
        className="flex gap-2 overflow-x-auto pb-3"
        onKeyDown={(event) => {
          if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
            return;
          }
          const target = event.target;
          if (!(target instanceof HTMLElement)) {
            return;
          }
          const focusedId = target.id.replace(/^hrhub-/, "");
          const index = hrHubScreens.findIndex((item) => item.id === focusedId);
          if (index < 0) {
            return;
          }
          event.preventDefault();
          const offset = event.key === "ArrowRight" ? 1 : -1;
          const next =
            hrHubScreens[(index + offset + hrHubScreens.length) % hrHubScreens.length];
          setActiveId(next.id);
          document.getElementById(`hrhub-${next.id}`)?.focus();
        }}
      >
        {hrHubScreens.map((item) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`hrhub-${item.id}`}
              aria-selected={selected}
              aria-controls="hrhub-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2",
                selected
                  ? "border-electric bg-electric text-white"
                  : "border-border bg-white text-muted hover:text-foreground",
              )}
            >
              {item.nav}
            </button>
          );
        })}
      </div>

      <div
        id="hrhub-panel"
        role="tabpanel"
        aria-labelledby={`hrhub-${current.id}`}
      >
        <div className="mb-4 max-w-2xl">
          <h3 className="text-xl text-foreground">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {current.description}
          </p>
        </div>
        <ProductScreenshot
          src={current.src}
          alt={current.alt}
          caption={current.caption}
          sizes="(max-width: 768px) 100vw, 1080px"
        />
      </div>
    </div>
  );
}
