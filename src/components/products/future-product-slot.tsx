import { Surface } from "@/components/ui/surface";

export function FutureProductSlot() {
  return (
    <Surface className="flex h-full min-h-[280px] flex-col justify-between border-dashed p-6 sm:p-8">
      <p className="text-[11px] font-medium tracking-kicker text-subtle">
        Очаквайте скоро
      </p>
      <div>
        <h3 className="text-2xl text-foreground">Следващи продукти</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Следващите системи ще се появят тук, когато са готови за представяне.
        </p>
      </div>
    </Surface>
  );
}
