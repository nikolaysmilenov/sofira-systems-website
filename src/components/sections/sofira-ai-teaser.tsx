"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SOFIRA_AI_OPEN_EVENT } from "@/components/ai/sofira-ai";
import { ctaCopy } from "@/data/labels";

export function SofiraAiTeaser() {
  return (
    <Section id="sofira-ai" className="border-t border-border">
      <p className="coord">CONSULTANT</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        Не знаете какъв тип система ви трябва?
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        SOFIRA AI е цифровият консултант на сайта. Помага да формулирате нуждата
        и да ви насочи към подходяща услуга, продукт или запитване. Не сключва
        сделки и не измисля възможности.
      </p>
      <div className="mt-8">
        <Button
          type="button"
          onClick={() => {
            window.dispatchEvent(new Event(SOFIRA_AI_OPEN_EVENT));
          }}
        >
          {ctaCopy.talkToAi}
        </Button>
      </div>
    </Section>
  );
}
