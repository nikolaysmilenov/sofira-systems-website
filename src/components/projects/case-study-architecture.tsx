import { cn } from "@/lib/cn";
import type { ArchitectureLayer } from "@/types/content";

type CaseStudyArchitectureProps = {
  layers: ArchitectureLayer[];
  tone?: "light" | "deep";
};

export function CaseStudyArchitecture({
  layers,
  tone = "deep",
}: CaseStudyArchitectureProps) {
  const deep = tone === "deep";

  return (
    <ol className="mt-8 max-w-2xl space-y-0">
      {layers.map((layer, index) => (
        <li key={layer.id}>
          <div
            className={cn(
              "rounded-xl border px-5 py-4",
              deep
                ? "border-white/10 bg-white/5"
                : "border-border bg-white",
            )}
          >
            <p
              className={cn(
                "font-display text-sm tracking-[0.16em]",
                deep ? "text-cyan-bright" : "text-electric",
              )}
            >
              {layer.label}
            </p>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed sm:text-base",
                deep ? "text-deep-muted" : "text-muted",
              )}
            >
              {layer.text}
            </p>
          </div>
          {index < layers.length - 1 ? (
            <div className="flex justify-center py-2" aria-hidden="true">
              <span
                className={cn(
                  "flex flex-col items-center text-xs tracking-[0.2em]",
                  deep ? "text-cyan-bright/70" : "text-electric/70",
                )}
              >
                <span className="h-4 w-px bg-current" />
                <span>↓</span>
              </span>
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
