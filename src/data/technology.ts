import { projectPath, routes } from "@/data/navigation";
import type {
  ProcessStep,
  TechnologyCategory,
  TechnologyMapLayer,
  TechnologyProjectRef,
} from "@/types/content";

const sofiraSite: TechnologyProjectRef = {
  label: "SOFIRA SYSTEMS — сайт",
  href: projectPath("sofira-systems"),
};

const hrHub: TechnologyProjectRef = {
  label: "HR HUB 360",
  href: projectPath("hr-hub-360"),
};

const stinger: TechnologyProjectRef = {
  label: "STINGER",
  href: projectPath("stinger"),
};

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "experience",
    index: "01",
    coord: "EXPERIENCE",
    title: "Интерфейс",
    meaning:
      "Използваме ги за структурирани, адаптивни интерфейси — публични страници и продуктови екрани. Не за декоративни демота.",
    items: [
      {
        name: "Next.js",
        role: "Приложението на публичния сайт: страници, маршрути и сървърни API.",
        projects: [sofiraSite],
      },
      {
        name: "React",
        role: "Компонентен интерфейс за сайта и за десктоп клиента на HR HUB 360.",
        projects: [sofiraSite, hrHub],
      },
      {
        name: "TypeScript",
        role: "Типизиран код в сайта и в HR HUB 360 — интерфейс, API и валидация.",
        projects: [sofiraSite, hrHub],
      },
      {
        name: "HTML и CSS",
        role: "Семантична маркировка и оформление на публичните страници.",
        projects: [sofiraSite],
      },
      {
        name: "Tailwind CSS",
        role: "Стилова система на сайта и на HR HUB 360 десктоп клиента.",
        projects: [sofiraSite, hrHub],
      },
    ],
  },
  {
    id: "application",
    index: "02",
    coord: "APPLICATION",
    title: "Приложна логика",
    meaning:
      "Среда за изпълнение и бизнес правила. Слоят решава какво може да се случи в системата — не как изглежда екранът и не как се приема HTTP заявката.",
    items: [
      {
        name: "Node.js",
        role: "Среда за изпълнение на публичния сайт и на HR HUB 360 API.",
        projects: [sofiraSite, hrHub],
      },
    ],
  },
  {
    id: "api",
    index: "03",
    coord: "API / SERVICES",
    title: "API и услуги",
    meaning:
      "Сървърни маршрути и услуги: запитване, консултант и HR операции. Няма публично документиран външен API за клиенти.",
    items: [
      {
        name: "Next.js Route Handlers",
        role: "Сървърни маршрути за запитване и за цифровия консултант.",
        projects: [sofiraSite],
      },
      {
        name: "Fastify",
        role: "HTTP API на HR HUB 360: бизнес операции, сесии и защитени маршрути.",
        projects: [hrHub],
      },
      {
        name: "Zod",
        role: "Проверка на входящи данни — формата за запитване и HR HUB 360 API.",
        projects: [sofiraSite, hrHub],
      },
      {
        name: "JWT и контролиран достъп",
        role: "Автентикация, роли и изолация по организация в HR HUB 360. Не е вход на публичния сайт.",
        projects: [hrHub],
      },
    ],
  },
  {
    id: "data",
    index: "04",
    coord: "DATA",
    title: "Данни",
    meaning:
      "Устойчиво съхранение, структурирани записи и граници между организации. Публичният сайт няма клиентска база данни.",
    items: [
      {
        name: "PostgreSQL",
        role: "Основно хранилище на HR HUB 360 за HR записи по организация.",
        projects: [hrHub],
      },
      {
        name: "Prisma",
        role: "Схема, миграции и достъп до данните на HR HUB 360.",
        projects: [hrHub],
      },
      {
        name: "SQLite",
        role: "Локален журнал на STINGER. Не е базата на сайта или на HR HUB 360.",
        projects: [stinger],
      },
    ],
  },
  {
    id: "automation",
    index: "05",
    coord: "AUTOMATION",
    title: "Автоматизация",
    meaning:
      "Интеграции и конвейери, които изпълняват конкретна стъпка. Няма универсална платформа за работни потоци, публикувана като продукт.",
    items: [
      {
        name: "Resend",
        role: "Доставка на запитвания от контактната форма по имейл. Само на публичния сайт.",
        projects: [sofiraSite],
      },
      {
        name: "STINGER конвейер",
        role: "Сканиране → стратегия → решение → безопасност → сигнал → двигател за изпълнение → журнал. По подразбиране режимът е само сигнали — поръчки не се изпращат.",
        projects: [stinger],
      },
    ],
  },
  {
    id: "ai",
    index: "06",
    coord: "AI",
    title: "AI интеграция",
    meaning:
      "Сървърен достъп до модели за ориентация на посетителя. Няма собствен foundation model и няма инфраструктура за обучение.",
    items: [
      {
        name: "Google Gemini",
        role: "Подразбиращ се модел за цифровия консултант. Достъпът е само от сървъра.",
        projects: [sofiraSite],
      },
      {
        name: "OpenAI",
        role: "Алтернативен доставчик, ако е конфигуриран. Не е отделен публичен продукт.",
        projects: [sofiraSite],
      },
      {
        name: "Guardrails и разговор",
        role: "Ограничения, обработка на разговора и резервни отговори, когато моделът липсва или отказва.",
        projects: [sofiraSite],
      },
    ],
  },
  {
    id: "infrastructure",
    index: "07",
    coord: "INFRASTRUCTURE",
    title: "Инфраструктура",
    meaning:
      "Къде работи системата. Показваме само проверени среди — без облачни платформи, които не се използват.",
    items: [
      {
        name: "Vercel",
        role: "Хостинг на публичния сайт sofirasystems.com.",
        projects: [sofiraSite],
      },
      {
        name: "Docker Compose",
        role: "Локална PostgreSQL среда за разработка на HR HUB 360. Не е продукционен клъстер.",
        projects: [hrHub],
      },
    ],
  },
  {
    id: "desktop",
    index: "08",
    coord: "DESKTOP / SYSTEMS",
    title: "Десктоп системи",
    meaning:
      "Собствените продукти не са уеб абонамент. HR HUB 360 и STINGER са десктоп приложения в разработка.",
    items: [
      {
        name: "Tauri",
        role: "Windows обвивка на HR HUB 360 около продуктовия интерфейс.",
        projects: [hrHub],
      },
      {
        name: "Rust",
        role: "Нативна част от Tauri обвивката на HR HUB 360.",
        projects: [hrHub],
      },
      {
        name: "Python",
        role: "Приложният език на STINGER. Не се използва в публичния сайт.",
        projects: [stinger],
      },
      {
        name: "PySide6",
        role: "Десктоп интерфейс на STINGER.",
        projects: [stinger],
      },
      {
        name: "MetaTrader 5",
        role: "Клиент за пазарни данни и брокерски път в STINGER. Не е търговска услуга на SOFIRA SYSTEMS.",
        projects: [stinger],
      },
    ],
  },
];

export const technologyMapLayers: TechnologyMapLayer[] = [
  {
    id: "user",
    label: "USER",
    meaning:
      "Човекът, който използва системата: посетител на сайта, HR екип или оператор на вътрешен инструмент.",
    technologies: [],
    example: sofiraSite,
  },
  {
    id: "interface",
    label: "INTERFACE",
    meaning:
      "Екранът, през който се работи — уеб страници или десктоп прозорци. Изгражда се като структура, не като брошура.",
    technologies: ["Next.js", "React", "TypeScript", "HTML и CSS", "Tailwind CSS"],
    example: sofiraSite,
  },
  {
    id: "application",
    label: "APPLICATION",
    meaning:
      "Среда за изпълнение и бизнес правила. Тук се решава какво може да се случи, не само какво се вижда.",
    technologies: ["Node.js"],
    example: hrHub,
  },
  {
    id: "api",
    label: "API / SERVICES",
    meaning:
      "Сървърни маршрути и услуги: запитване, консултант, HR операции. Няма публично документиран външен API за клиенти.",
    technologies: [
      "Next.js Route Handlers",
      "Fastify",
      "Zod",
      "JWT и контролиран достъп",
    ],
    example: sofiraSite,
  },
  {
    id: "data",
    label: "DATA",
    meaning:
      "Къде живеят записите. HR HUB 360 използва PostgreSQL с изолация по организация. STINGER пази журнал в SQLite. Сайтът не държи клиентска база.",
    technologies: ["PostgreSQL", "Prisma", "SQLite"],
    example: hrHub,
  },
  {
    id: "automation",
    label: "AUTOMATION",
    meaning:
      "Конкретни потоци: имейл при запитване и сигнален конвейер в STINGER. По подразбиране STINGER не изпраща поръчки.",
    technologies: ["Resend", "STINGER конвейер"],
    example: stinger,
  },
  {
    id: "ai",
    label: "AI",
    meaning:
      "Цифровият консултант на сайта. Моделите се викат от сървъра, с ограничения и резервни отговори. Не е собствен foundation model.",
    technologies: ["Google Gemini", "OpenAI", "Guardrails и разговор"],
    example: sofiraSite,
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    meaning:
      "Публичният сайт се хоства на Vercel. Docker Compose се използва за локална база на HR HUB 360, не като облачен клъстер.",
    technologies: ["Vercel", "Docker Compose"],
    example: sofiraSite,
  },
  {
    id: "desktop",
    label: "DESKTOP",
    meaning:
      "Собствени десктоп системи в разработка: HR HUB 360 на Tauri и STINGER на Python/PySide6.",
    technologies: ["Tauri", "Rust", "Python", "PySide6", "MetaTrader 5"],
    example: hrHub,
  },
];

export const engineeringPrinciples: ProcessStep[] = [
  {
    index: "01",
    title: "Бизнес процесът е първи",
    description:
      "Започваме от стъпките, ролите и данните. Технологията се избира, за да обслужи процеса — не обратното.",
  },
  {
    index: "02",
    title: "Архитектура преди реализация",
    description:
      "Слоевете и границите се определят преди екраните. Пазар, решение, риск и изпълнение не се смесват в един модул.",
  },
  {
    index: "03",
    title: "Ясно разделени отговорности",
    description:
      "Интерфейсът не пише бизнес правилата. Слой за безопасност може да забрани действие, не да го изобрети.",
  },
  {
    index: "04",
    title: "Проверка и тестове",
    description:
      "Проверяваме типове, валидация и реални сценарии. Публикуваме само това, което системата наистина прави.",
  },
  {
    index: "05",
    title: "Сигурност и контролиран достъп",
    description:
      "Ключове остават на сървъра. HR данните са изолирани по организация. Формите имат проверка и ограничение на опитите.",
  },
  {
    index: "06",
    title: "Системи, които могат да се развиват",
    description:
      "Собствените продукти са в разработка. Нови слоеве се добавят, без да се пренаписва цялата система заради един екран.",
  },
];

export const technologyProjectLinks = [
  {
    title: "Next.js",
    text: "Публичният сайт е Next.js приложение — страници, запитване и консултант.",
    href: sofiraSite.href,
    label: sofiraSite.label,
  },
  {
    title: "HR архитектура",
    text: "HR HUB 360 събира десктоп клиент, API, PostgreSQL и изолация по организация. Продукт в разработка.",
    href: hrHub.href,
    label: "Инженерен казус",
  },
  {
    title: "MetaTrader 5 / сигнален конвейер",
    text: "STINGER чете пазарни данни, изгражда сигнал и води журнал. По подразбиране е само сигнали, не търговски продукт.",
    href: stinger.href,
    label: stinger.label,
  },
  {
    title: "AI интеграция",
    text: "SOFIRA AI е сървърен консултант на сайта — модел, ограничения и резервни отговори. Не е автономен агент.",
    href: sofiraSite.href,
    label: "На публичния сайт",
  },
];

export const hrHubProductLink = routes.hrHub360;
