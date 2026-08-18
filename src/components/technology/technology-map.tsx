"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { technologyMapLayers } from "@/data/technology";
import { cn } from "@/lib/cn";

export function TechnologyMap() {
  const panelId = useId();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [selectedId, setSelectedId] = useState(
    technologyMapLayers[1]?.id ?? "interface",
  );
  const selected =
    technologyMapLayers.find((layer) => layer.id === selectedId) ??
    technologyMapLayers[0];

  function selectLayer(index: number) {
    const layer = technologyMapLayers[index];
    if (!layer) {
      return;
    }

    setSelectedId(layer.id);
    buttonRefs.current[index]?.focus();
  }

  function onLayerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const last = technologyMapLayers.length - 1;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      selectLayer(Math.min(index + 1, last));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      selectLayer(Math.max(index - 1, 0));
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectLayer(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectLayer(last);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
      <ol className="flex flex-col">
        {technologyMapLayers.map((layer, index) => {
          const active = layer.id === selected.id;
          return (
            <li key={layer.id}>
              <button
                type="button"
                ref={(node) => {
                  buttonRefs.current[index] = node;
                }}
                aria-expanded={active}
                aria-controls={panelId}
                onClick={() => setSelectedId(layer.id)}
                onKeyDown={(event) => onLayerKeyDown(event, index)}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left transition-colors",
                  active
                    ? "border-electric bg-electric/8 text-foreground"
                    : "border-border bg-white text-muted hover:border-electric/40 hover:text-foreground",
                )}
              >
                <span className="font-display text-sm tracking-[0.16em]">
                  {layer.label}
                </span>
                <span className="text-xs text-subtle" aria-hidden="true">
                  {active ? "▸" : ""}
                </span>
              </button>
              {index < technologyMapLayers.length - 1 ? (
                <div className="flex justify-center py-1" aria-hidden="true">
                  <span className="flex flex-col items-center text-xs tracking-[0.2em] text-electric/70">
                    <span className="h-3 w-px bg-current" />
                    <span>↓</span>
                  </span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div
        id={panelId}
        role="region"
        aria-live="polite"
        className="rounded-xl border border-border bg-white px-6 py-8 sm:px-8"
      >
        <p className="coord">{selected.label}</p>
        <h3 className="mt-4 text-2xl text-foreground sm:text-3xl">
          {selected.label === "USER" ? "Кой използва системата" : selected.label}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {selected.meaning}
        </p>
        {selected.technologies.length > 0 ? (
          <div className="mt-8">
            <p className="text-xs tracking-[0.2em] text-subtle uppercase">
              Проверени технологии
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {selected.technologies.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-navy-950 px-4 py-2 text-sm text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-8 text-sm text-subtle">
            Този слой не е технология — това е човекът, за когото се изгражда системата.
          </p>
        )}
        <p className="mt-8 text-xs tracking-[0.2em] text-subtle uppercase">
          Пример
        </p>
        <Link
          href={selected.example.href}
          className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-electric transition-colors hover:text-electric-hover"
        >
          {selected.example.label}
        </Link>
      </div>
    </div>
  );
}

