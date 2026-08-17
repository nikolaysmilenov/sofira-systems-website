import { cn } from "@/lib/cn";

type ProductConceptVisualProps = {
  title: string;
  caption?: string;
  variant?: "hero" | "employees" | "leave" | "documents";
  className?: string;
};

const modules = [
  "Табло",
  "Служители",
  "Договори",
  "Документи",
  "Отпуски",
  "Работно време",
  "Подбор",
  "Обучения",
];

export function ProductConceptVisual({
  title,
  caption = "Визуална концепция",
  variant = "hero",
  className,
}: ProductConceptVisualProps) {
  return (
    <figure className={cn("concept-window", className)}>
      <div className="concept-chrome">
        <span className="concept-dot" />
        <span className="concept-dot" />
        <span className="concept-dot" />
        <p className="ml-2 truncate text-xs font-medium text-muted">{title}</p>
        <p className="ml-auto rounded-full border border-electric/20 bg-electric/8 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-electric">
          {caption}
        </p>
      </div>
      <div className="grid min-h-[240px] bg-navy-950 sm:min-h-[280px] sm:grid-cols-[9.5rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border bg-white p-4 sm:block">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-subtle">
            Модули
          </p>
          <ul className="mt-3 space-y-1.5">
            {modules.map((item) => (
              <li
                key={item}
                className={cn(
                  "rounded-md px-2 py-1.5 text-xs",
                  item === activeModule(variant)
                    ? "bg-electric/10 font-medium text-electric"
                    : "text-muted",
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
        <p className="text-sm font-medium text-foreground">Календар на отсъствията</p>
        <p className="mt-1 text-xs text-subtle">Структура на модула, не реални данни.</p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, index) => (
            <div
              key={index}
              className={cn(
                "h-8 rounded-md border border-border bg-white",
                index === 9 || index === 10 ? "bg-electric/12 border-electric/20" : null,
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
        <p className="text-sm font-medium text-foreground">Електронно досие</p>
        <p className="mt-1 text-xs text-subtle">Показваме групи документи, без реални файлове.</p>
        <div className="mt-4 space-y-2">
          {["Договори", "Анекси", "Лични документи", "Архив"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5"
            >
              <span className="text-sm text-foreground">{item}</span>
              <span className="h-2 w-16 rounded-full bg-navy-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "employees") {
    return (
      <div>
        <p className="text-sm font-medium text-foreground">Служители и организация</p>
        <p className="mt-1 text-xs text-subtle">Колони от реалния модул, без примерни хора.</p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white">
          <div className="grid grid-cols-3 border-b border-border bg-navy-950 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-subtle">
            <span>Профил</span>
            <span>Отдел</span>
            <span>Длъжност</span>
          </div>
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-3 border-b border-border px-3 py-3 last:border-b-0"
            >
              <span className="h-2.5 w-20 rounded-full bg-navy-700" />
              <span className="h-2.5 w-16 rounded-full bg-navy-700" />
              <span className="h-2.5 w-24 rounded-full bg-navy-700" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-foreground">HR HUB 360</p>
      <p className="mt-1 text-xs text-subtle">
        Схематичен изглед на работната среда. Не е екранна снимка.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["Служители", "Договори", "Отпуски", "Подбор"].map((item) => (
          <div
            key={item}
            className="rounded-lg border border-border bg-white px-3 py-3"
          >
            <p className="text-xs font-medium text-foreground">{item}</p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-navy-700">
              <div className="h-1.5 w-2/3 rounded-full bg-electric/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
