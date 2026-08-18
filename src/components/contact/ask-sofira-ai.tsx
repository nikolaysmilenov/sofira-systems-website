"use client";

import { Button } from "@/components/ui/button";
import { SOFIRA_AI_OPEN_EVENT } from "@/components/ai/sofira-ai";

export function AskSofiraAi() {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto min-h-11 w-full justify-start whitespace-normal py-3 text-left font-medium sm:w-auto"
      onClick={() => {
        window.dispatchEvent(new Event(SOFIRA_AI_OPEN_EVENT));
      }}
    >
      Ако не сте сигурни какво ви трябва, попитайте SOFIRA AI.
    </Button>
  );
}
