import Image from "next/image";
import { site } from "@/data/site";

const nodes = [
  { id: "business", label: "BUSINESS", x: "6%", y: "10%" },
  { id: "data", label: "DATA", x: "42%", y: "4%" },
  { id: "automation", label: "AUTOMATION", x: "74%", y: "12%" },
  { id: "ai", label: "AI", x: "78%", y: "48%" },
  { id: "people", label: "PEOPLE", x: "62%", y: "78%" },
  { id: "products", label: "PRODUCTS", x: "8%", y: "72%" },
];

const fragments = [
  { label: "Dashboard", x: "18%", y: "38%" },
  { label: "Workflow", x: "70%", y: "32%" },
  { label: "Analytics", x: "28%", y: "84%" },
  { label: "HR", x: "48%", y: "88%" },
];

export function HeroArchitecture() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="relative aspect-[1.05/1] overflow-hidden rounded-[1.4rem] border border-border bg-white shadow-[0_24px_70px_rgb(12_23_48_/_0.12)] sm:aspect-square">
        <div className="blueprint-grid absolute inset-0 opacity-80" />
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <p className="coord absolute left-4 top-4">SYS / 01</p>
        <p className="coord absolute right-4 top-4">SOFIRA CORE</p>

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path
            d="M22 18 C 38 22, 42 38, 50 50"
            fill="none"
            stroke="#1a6dff"
            strokeOpacity="0.45"
            strokeWidth="0.45"
            className="flow-line"
          />
          <path
            d="M50 8 C 50 24, 50 36, 50 50"
            fill="none"
            stroke="#22c4ff"
            strokeOpacity="0.4"
            strokeWidth="0.45"
            className="flow-line"
          />
          <path
            d="M82 18 C 70 28, 62 40, 50 50"
            fill="none"
            stroke="#1a6dff"
            strokeOpacity="0.4"
            strokeWidth="0.45"
            className="flow-line"
          />
          <path
            d="M86 54 C 72 54, 62 52, 50 50"
            fill="none"
            stroke="#22c4ff"
            strokeOpacity="0.42"
            strokeWidth="0.45"
            className="flow-line"
          />
          <path
            d="M70 84 C 62 72, 56 60, 50 50"
            fill="none"
            stroke="#1a6dff"
            strokeOpacity="0.38"
            strokeWidth="0.45"
            className="flow-line"
          />
          <path
            d="M18 78 C 28 68, 38 58, 50 50"
            fill="none"
            stroke="#22c4ff"
            strokeOpacity="0.38"
            strokeWidth="0.45"
            className="flow-line"
          />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#1a6dff" strokeOpacity="0.18" strokeWidth="0.4" />
          <circle
            cx="50"
            cy="50"
            r="21"
            fill="none"
            stroke="#22c4ff"
            strokeOpacity="0.12"
            strokeWidth="0.35"
            className="origin-center"
            style={{ animation: "node-breathe 4.5s ease-in-out infinite" }}
          />
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-md border border-electric/20 bg-white/95 px-2.5 py-1.5 shadow-[0_8px_20px_rgb(15_40_80_/_0.08)]"
            style={{ left: node.x, top: node.y }}
          >
            <p className="text-[10px] font-semibold tracking-[0.16em] text-ink">
              {node.label}
            </p>
          </div>
        ))}

        {fragments.map((fragment) => (
          <div
            key={fragment.label}
            className="absolute hidden rounded border border-border bg-navy-950 px-2 py-1 sm:block"
            style={{ left: fragment.x, top: fragment.y }}
          >
            <p className="text-[10px] text-muted">{fragment.label}</p>
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 flex w-[9.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl bg-black shadow-[0_16px_40px_rgb(12_23_48_/_0.28)]">
            <Image
              src={site.logo.mark}
              alt=""
              width={72}
              height={78}
              className="h-12 w-12 object-contain"
              sizes="48px"
              priority
            />
          </div>
          <p className="mt-3 text-center text-[11px] font-semibold tracking-[0.2em] text-ink">
            SOFIRA SYSTEMS
          </p>
        </div>

        <p className="coord absolute bottom-4 left-4">ARCH / LIVE</p>
        <p className="coord absolute bottom-4 right-4">BUSINESS CORE</p>
      </div>
    </div>
  );
}
