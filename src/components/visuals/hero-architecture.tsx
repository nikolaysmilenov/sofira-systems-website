import Image from "next/image";
import { site } from "@/data/site";

const nodes = [
  { label: "Бизнес процеси", x: "8%", y: "18%" },
  { label: "Софтуер по поръчка", x: "58%", y: "8%" },
  { label: "Автоматизация", x: "12%", y: "58%" },
  { label: "HR HUB 360", x: "54%", y: "62%" },
];

export function HeroArchitecture() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="hero-glow pointer-events-none absolute inset-0 rounded-[2rem]" />
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_18px_50px_rgb(15_40_80_/_0.08)]">
        <div className="hero-grid absolute inset-0 opacity-90" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <line x1="22" y1="24" x2="68" y2="16" stroke="#1a6dff" strokeOpacity="0.22" strokeWidth="0.6" />
          <line x1="22" y1="24" x2="26" y2="64" stroke="#1a6dff" strokeOpacity="0.18" strokeWidth="0.6" />
          <line x1="68" y1="16" x2="68" y2="68" stroke="#22c4ff" strokeOpacity="0.22" strokeWidth="0.6" />
          <line x1="26" y1="64" x2="68" y2="68" stroke="#1a6dff" strokeOpacity="0.2" strokeWidth="0.6" />
        </svg>
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute rounded-lg border border-border bg-white px-3 py-2 shadow-[0_8px_20px_rgb(15_40_80_/_0.06)]"
            style={{ left: node.x, top: node.y }}
          >
            <p className="text-[11px] font-medium text-foreground">{node.label}</p>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-2xl bg-black shadow-[0_12px_30px_rgb(12_23_48_/_0.18)]">
          <Image
            src={site.logo.mark}
            alt=""
            width={72}
            height={78}
            className="h-14 w-14 object-contain"
            sizes="56px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
