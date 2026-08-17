import { Section } from "@/components/ui/section";
import { outcomes } from "@/data/system-flow";

export function WhatYouGet() {
  return (
    <Section tone="mist">
      <p className="coord">DELIVERABLES</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl lg:text-[2.7rem]">
        Какво получавате
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Не показваме измислени клиенти, отзиви или награди. Показваме какво
        реално влиза в работата.
      </p>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {outcomes.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-3 py-7 transition-colors sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]"
          >
            <span className="font-display text-xl text-electric">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl text-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
