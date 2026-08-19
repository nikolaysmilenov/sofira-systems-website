import { ctaCopy } from "@/data/labels";
import { contactPath, projectPath, routes } from "@/data/navigation";
import type { Project, ProjectKind } from "@/types/content";

export type ProjectIndexGroupId =
  | "public-systems"
  | "own-products"
  | "experimental";

export const projectIndexGroups: {
  id: ProjectIndexGroupId;
  coord: string;
  title: string;
  kinds: ProjectKind[];
}[] = [
  {
    id: "public-systems",
    coord: "CLIENT / PUBLIC SYSTEMS",
    title: "Публични системи",
    kinds: ["public-platform", "client-project"],
  },
  {
    id: "own-products",
    coord: "OWN PRODUCTS",
    title: "Собствени продукти",
    kinds: ["own-product"],
  },
  {
    id: "experimental",
    coord: "INTERNAL / EXPERIMENTAL",
    title: "Вътрешни / експериментални",
    kinds: ["internal-project"],
  },
];

export function projectsInGroup(groupId: ProjectIndexGroupId): Project[] {
  const group = projectIndexGroups.find((item) => item.id === groupId);
  if (!group) {
    return [];
  }

  return projects.filter((project) => group.kinds.includes(project.kind));
}

export const projects: Project[] = [
  {
    slug: "sofira-systems",
    index: "001",
    name: "SOFIRA SYSTEMS",
    summary:
      "Официалният публичен сайт на компанията — вход към услугите, продуктите и запитването.",
    href: projectPath("sofira-systems"),
    kind: "public-platform",
    status: "in-production",
    seoTitle: "SOFIRA SYSTEMS — публична платформа",
    seoDescription:
      "Как SOFIRA SYSTEMS изгражда собствения си публичен сайт: система, запитване и цифров консултант. Не е клиентски проект.",
    context:
      "SOFIRA SYSTEMS е собствената дигитална платформа на компанията. Сайтът представя какво изграждаме, собствените продукти и как може да се заяви проект. Това не е клиентски проект и не се публикува като чуждо портфолио.",
    problem:
      "Софтуерна компания се нуждае от публично място, което обяснява системите, продуктите и процеса на работа — без агенционен шаблон и без измислени казуси, клиенти или резултати.",
    approach:
      "Сайтът е изграден като система, а не като брошура. Започваме от процеса и позиционирането: технологичен партньор за софтуер по поръчка и отделна продуктова линия. Публикуваме само потвърдено съдържание — услуги, процес, HR HUB 360 и начин за запитване.",
    system:
      "Публичен уебсайт със страници за начало, услуги, продукти, проекти, за нас и контакт. Включва форма за запитване, цифров консултант за ориентация и продуктово представяне на HR HUB 360. Канонични адреси, карта на сайта и правила за роботи са част от публичната структура.",
    architecture: [
      {
        id: "ui",
        label: "INTERFACE",
        text: "Публична презентация, навигация и достъпни маршрути за услуги, продукти, проекти и контакт.",
      },
      {
        id: "application",
        label: "NEXT.JS / REACT",
        text: "Публично уеб приложение, изградено с Next.js и React.",
      },
      {
        id: "api",
        label: "APPLICATION / ROUTE HANDLERS",
        text: "Сървърни маршрути за проектни запитвания и разговор със SOFIRA AI.",
      },
      {
        id: "automation",
        label: "SOFIRA AI / CONTACT SERVICES",
        text: "Цифров консултант за ориентация и услуга за обработка на контактни запитвания.",
      },
      {
        id: "ai",
        label: "GEMINI / OPTIONAL OPENAI",
        text: "AI provider слой с Gemini по подразбиране и опционален OpenAI provider, когато е конфигуриран.",
      },
      {
        id: "email",
        label: "RESEND",
        text: "Изпращане на потвърдените контактни запитвания по имейл.",
      },
      {
        id: "hosting",
        label: "VERCEL",
        text: "Хостинг и production deployment на публичната платформа.",
      },
    ],
    result:
      "В експлоатация като публична платформа на sofirasystems.com. Развитието на публичното присъствие продължава. Няма публикувани посещения, конверсии или други измерими резултати.",
    ctas: [{ label: ctaCopy.discussSimilar, href: contactPath("web") }],
  },
  {
    slug: "hr-hub-360",
    index: "002",
    name: "HR HUB 360",
    summary:
      "Собствен HR продукт в разработка — десктоп система за българския пазар, отделно от клиентските проекти.",
    href: projectPath("hr-hub-360"),
    kind: "own-product",
    status: "in-development",
    seoTitle: "HR HUB 360 — инженерен казус",
    seoDescription:
      "Защо съществува HR HUB 360, каква е системната концепция и какъв е статусът. Собствен продукт в разработка, не клиентски проект.",
    context:
      "HR HUB 360 е собствен продукт на SOFIRA SYSTEMS. Развива се отделно от поръчковата работа. Не е клиентски проект и не се продава през сайта.",
    problem:
      "HR процесите често се разпръскват между таблици, документи и отделни инструменти. Това затруднява проследяването на служители, договори, отпуски и подбор на едно място.",
    approach:
      "Продуктът се развива като цялостна HR система, а не като набор от несвързани екрани. Започваме от реалните HR процеси — служители, правоотношения, документи, отпуски и присъствия — и ги събираме в една среда с роли, одит и изолация по организация.",
    system:
      "Десктоп приложение за Windows с български интерфейс. Текущите модули покриват основните HR операции. Модулите „Работни процеси“ и „Отчети“ са в навигацията, но още не са готови за работа.",
    architecture: [
      {
        id: "ui",
        label: "UI",
        text: "Десктоп интерфейс на български — табло, списъци, филтри и форми по модул.",
      },
      {
        id: "desktop",
        label: "TAURI / REACT",
        text: "Windows клиент: Tauri обвивка около React интерфейса.",
      },
      {
        id: "api",
        label: "FASTIFY API",
        text: "HTTP API за бизнес операции, сесии и защитени маршрути.",
      },
      {
        id: "database",
        label: "POSTGRESQL / PRISMA",
        text: "Схема, миграции и HR записи по организация.",
      },
      {
        id: "access-control",
        label: "TENANT ISOLATION / ACCESS CONTROL",
        text: "Изолация по организация, роли, права и одитен журнал.",
      },
    ],
    result:
      "Собствен продукт в разработка. Не се продава през сайта. Няма публичен абонамент, пробен период или клиентски вход. Няма публикувани измерими резултати от внедрявания.",
    modules: {
      current: [
        "Табло",
        "Служители",
        "Договори",
        "Документи",
        "Отпуски",
        "Присъствия / работно време",
        "Възнаграждения",
        "Подбор",
        "Обучения",
        "Оценки",
        "Активи",
        "Роли, одит и изолация по организация",
      ],
      upcoming: ["Работни процеси", "Отчети"],
    },
    ctas: [
      { label: ctaCopy.viewHrHub, href: routes.hrHub360 },
      { label: ctaCopy.discussSimilar, href: contactPath("hr-hub-360") },
    ],
  },
  {
    slug: "stinger",
    index: "003",
    name: "STINGER",
    summary:
      "Собствен технологичен проект в разработка — десктоп система за пазарни данни, сигнали, риск-логика и наблюдение.",
    href: projectPath("stinger"),
    kind: "own-product",
    status: "in-development",
    seoTitle: "STINGER — инженерен казус",
    seoDescription:
      "STINGER е собствен технологичен проект на SOFIRA SYSTEMS в разработка. Пазарни данни, сигнали, риск-логика и наблюдение — не готов търговски продукт.",
    context:
      "STINGER е собствен технологичен проект на SOFIRA SYSTEMS. Развива се като десктоп система за работа с пазарни данни, сигнали, риск-логика и наблюдение. Това не е клиентски проект и не се предлага като готов търговски или инвестиционен продукт.",
    problem:
      "Пазарната работа се разпада, когато данните, решението, рискът, изпълнението и наблюдението са несвързани. Липсва ясна системна граница: кой слой чете пазара, кой предлага действие, кой може само да забрани и кой изобщо изпраща поръчка.",
    approach:
      "Системата се изгражда на слоеве с разделени отговорности. Пазарният слой не решава покупка или продажба. Конвейерът за сигнали стига до решение. Слой за безопасност може само да спре действие, не да го създаде. Изпълнението е отделно и по подразбиране остава в режим само сигнали.",
    system:
      "Десктоп приложение за Windows. Включва пазарни данни през брокерски клиент към MetaTrader 5, скенер, конвейер за сигнали, риск-план, двигател за изпълнение и журнал. По подразбиране изпълнението не изпраща поръчки. Продуктът е в разработка и не се продава през сайта.",
    architecture: [
      {
        id: "market-data",
        label: "MARKET DATA",
        text: "Нормализиране на пазарни данни и режим на пазара. Слоят не решава покупка или продажба.",
      },
      {
        id: "scanner",
        label: "SCANNER",
        text: "Сканиране на наблюдаван списък по символи, етапи и текущ статус.",
      },
      {
        id: "strategy",
        label: "STRATEGY",
        text: "Стратегийна оценка върху пазарните факти. Не изпраща поръчка.",
      },
      {
        id: "decision",
        label: "DECISION",
        text: "Решение към действие, липса на сделка или пропуск. Спира преди изпълнението.",
      },
      {
        id: "safety",
        label: "SAFETY",
        text: "Слой за безопасност, който може само да забрани действие. Не създава посока.",
      },
      {
        id: "signal",
        label: "SIGNAL",
        text: "Изходът от конвейера е сигнал — не изпълнена сделка.",
      },
      {
        id: "execution",
        label: "EXECUTION ENGINE",
        text: "Двигател за изпълнение с режим Signals Only по подразбиране. Поръчки не се изпращат.",
      },
      {
        id: "monitoring",
        label: "JOURNAL / MONITORING",
        text: "Журнал, диагностични записи и десктоп статус. Без публикувани търговски резултати.",
      },
    ],
    result:
      "STINGER е собствен технологичен проект на SOFIRA SYSTEMS. Системата се разработва поетапно и не се представя като завършен търговски продукт. Не се предлага като инвестиционна услуга и не се публикуват търговски резултати.",
    modules: {
      current: [
        "Пазарни данни",
        "Скенер",
        "Сигнален конвейер",
        "Риск и безопасност",
        "Изпълнение — по подразбиране само сигнали",
        "Журнал и наблюдение",
        "Десктоп интерфейс",
      ],
    },
    indexCta: ctaCopy.viewProject,
    ctas: [{ label: ctaCopy.discussSimilar, href: routes.contact }],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
