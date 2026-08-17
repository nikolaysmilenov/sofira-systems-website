import { cn } from "@/lib/cn";

type ProductConceptVisualProps = {
  title: string;
  caption?: string;
  variant?: "hero" | "employees" | "leave" | "documents";
  className?: string;
};

const nav = [
  "Табло",
  "Служители",
  "Договори",
  "Документи",
  "Отпуски",
  "Присъствия",
  "Подбор",
];

export function ProductConceptVisual({
  title,
  caption = "Визуална концепция",
  variant = "hero",
  className,
}: ProductConceptVisualProps) {
  return (
    <figure className={cn("hr-frame", className)}>
      <div className="flex items-center justify-between border-b border-[#1a2a3d] bg-hr-sidebar px-4 py-2.5">
        <p className="truncate text-xs font-medium text-white/80">{title}</p>
        <p className="rounded-full border border-cyan-bright/30 bg-white/8 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-cyan-bright">
          {caption}
        </p>
      </div>
      <div className="grid min-h-[240px] bg-hr-canvas sm:min-h-[280px] sm:grid-cols-[9.5rem_minmax(0,1fr)]">
        <aside className="hidden bg-hr-sidebar p-3 text-white sm:block">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Модули
          </p>
          <ul className="mt-2 space-y-0.5">
            {nav.map((item) => (
              <li
                key={item}
                className={cn(
                  "rounded-md px-2 py-1.5 text-xs",
                  item === activeModule(variant)
                    ? "bg-white/10 font-medium text-white"
                    : "text-white/55",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-4 sm:p-5">{panel(variant)}</div>
      </div>
      <figcaption className="sr-only">
        Визуална концепция на HR HUB 360. Не е екранна снимка на готовото
        приложение.
      </figcaption>
    </figure>
  );
}

function activeModule(variant: ProductConceptVisualProps["variant"]): string {
  if (variant === "leave") return "Отпуски";
  if (variant === "documents") return "Документи";
  if (variant === "employees") return "Служители";
  return "Табло";
}

function panel(variant: ProductConceptVisualProps["variant"]) {
  if (variant === "leave") {
    return (
      <div>
        <p className="text-sm font-semibold text-[#1c2834]">Календар на отсъствията</p>
        <p className="mt-1 text-xs text-[#5b6b7c]">Структура на модула, не реални данни.</p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, index) => (
            <div
              key={index}
              className={cn(
                "h-8 rounded-md border border-hr-border bg-white",
                index === 9 || index === 10 ? "border-hr-primary/40 bg-[#e8f3f6]" : null,
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "documents") {
    return (
      <div>
        <p className="text-sm font-semibold text-[#1c2834]">Електронно досие</p>
        <p className="mt-1 text-xs text-[#5b6b7c]">Групи документи, без реални файлове.</p>
        <div className="mt-4 space-y-2">
          {["Договори", "Анекси", "Лични документи", "Архив"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-md border border-hr-border bg-white px-3 py-2.5"
            >
              <span className="text-sm text-[#1c2834]">{item}</span>
              <span className="h-2 w-16 rounded-full bg-[#d8e0e8]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "employees") {
    return (
      <div>
        <p className="text-sm font-semibold text-[#1c2834]">Служители и организация</p>
        <p className="mt-1 text-xs text-[#5b6b7c]">Колони от реалния модул, без примерни хора.</p>
        <div className="mt-4 overflow-hidden rounded-md border border-hr-border bg-white">
          <div className="grid grid-cols-3 bg-[#eef2f5] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5b6b7c]">
            <span>Профил</span>
            <span>Отдел</span>
            <span>Длъжност</span>
          </div>
          {["HR / Специалист", "Операции / Мениджър", "Финанси / Счетоводител", "Производство / Ръководител"].map(
            (row) => (
              <div
                key={row}
                className="grid grid-cols-3 border-t border-hr-border px-3 py-3 text-xs text-[#1c2834]"
              >
                <span>Employee 360</span>
                <span>{row.split(" / ")[0]}</span>
                <span>{row.split(" / ")[1]}</span>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold text-[#1c2834]">HR HUB 360</p>
      <p className="mt-1 text-xs text-[#5b6b7c]">
        Схематичен изглед на работната среда. Не е екранна снимка.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["Служители", "Договори", "Отпуски", "Подбор"].map((item) => (
          <div key={item} className="rounded-md border border-hr-border bg-white px-3 py-3">
            <p className="text-xs font-medium text-[#1c2834]">{item}</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-[#d8e0e8]">
              <div className="h-1.5 w-2/3 rounded-full bg-hr-primary/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
