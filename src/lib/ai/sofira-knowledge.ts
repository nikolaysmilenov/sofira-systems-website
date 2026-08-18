import { about } from "@/data/about";
import { hrHubScreens } from "@/data/hr-hub-screens";
import { intakeOptions } from "@/data/labels";
import { contactPath, routes } from "@/data/navigation";
import { processSteps } from "@/data/process";
import { featuredProduct } from "@/data/products";
import { services } from "@/data/services";

export const UNKNOWN_FACT =
  "Това не е потвърдено в публичната информация на SOFIRA SYSTEMS.";
export const UNKNOWN_INTEGRATION =
  "Не разполагам с потвърдена информация за тази интеграция.";
export const CUSTOM_EVALUATION =
  "Това може да се оцени като част от проект за софтуер по поръчка.";

const hr = featuredProduct;

export const sofiraKnowledge = {
  company: {
    name: "SOFIRA SYSTEMS",
    domain: "sofirasystems.com",
    country: "България",
    what: about.sections[0].body,
    who: about.sections[1].body,
    statements: about.statements.map((item) => `${item.title} ${item.body}`),
    positioning:
      "SOFIRA SYSTEMS не просто прави сайтове. Изгражда софтуерни системи според реалните процеси на бизнеса.",
    tracks: [
      "Технологичен партньор: софтуер по поръчка според процесите на клиента.",
      "Продуктова компания: собствени продукти, отделно от клиентските проекти.",
    ],
    not: [
      "Не сме агенция за маркетинг.",
      "Не сме агенция за графичен дизайн.",
      "Не сме фирма за компютърна поддръжка.",
    ],
  },
  unverified: {
    noPublicPrices: true,
    noClientNames: true,
    noReviews: true,
    noProjectCounts: true,
    noEmployeeCounts: true,
    noRevenue: true,
    noYearsOfExperience: true,
    noDeliveryTimes: true,
    noCertifications: true,
    noPartnerships: true,
    noNamedIntegrations: true,
    noConfirmedWarehouseProduct: true,
    noConfirmedCrmProduct: true,
  },
  services: services.map((service) => ({
    title: service.title,
    problem: service.problem,
    solution: service.solution,
    components: service.components,
    inquiry: service.inquiry ?? null,
    href: service.group === "product" ? routes.hrHub360 : `${routes.services}#${service.slug}`,
  })),
  process: processSteps.map((step) => ({
    title: step.title,
    description: step.description,
  })),
  products: {
    positioning:
      "SOFIRA SYSTEMS е технологичен партньор и продуктова компания. Клиентските системи се изграждат по поръчка. Собствените продукти се развиват отделно.",
    flagship: hr
      ? {
          name: hr.name,
          status: "В разработка",
          tagline: hr.tagline,
          summary: hr.summary,
          description: hr.description,
          platform: hr.platform,
          problem: hr.problem,
          solution: hr.solution,
          href: hr.href,
          inquireHref: contactPath("hr-hub-360"),
          notSoldOnSite: true,
          currentModules: hrCurrentModules(hr),
          upcomingModules: hr.capabilities
            .filter((item) => item.state === "upcoming")
            .map((item) => ({
              title: item.title,
              description: item.description,
            })),
        }
      : null,
  },
  contact: {
    page: routes.contact,
    hrHubInquire: contactPath("hr-hub-360"),
    intake: intakeOptions.map((option) => option.label),
    required: ["Име", "Имейл", "Съобщение"],
    optional: ["Компания", "Телефон"],
    cta: "Заявете проект",
  },
  links: {
    home: routes.home,
    services: routes.services,
    products: routes.products,
    hrHub: routes.hrHub360,
    contact: routes.contact,
    about: routes.about,
  },
} as const;

function hrCurrentModules(product: NonNullable<typeof featuredProduct>) {
  const security = product.capabilities.find(
    (item) => item.title === "Контрол и сигурност",
  );

  return [
    ...hrHubScreens.map((screen) => ({
      title:
        screen.nav === "Присъствия"
          ? "Присъствия / работно време"
          : screen.title,
      description: screen.description,
    })),
    {
      title: "Роли, одит и изолация по организация",
      description:
        security?.description ??
        "Роли, права, одитен журнал и изолация по организация.",
    },
  ];
}

export function buildSofiraKnowledgeBrief(): string {
  const product = sofiraKnowledge.products.flagship;
  const servicesText = sofiraKnowledge.services
    .map(
      (service) =>
        `- ${service.title}: проблем: ${service.problem} Решение: ${service.solution} Компоненти: ${service.components.join(", ")}.`,
    )
    .join("\n");
  const processText = sofiraKnowledge.process
    .map((step, index) => `${String(index + 1).padStart(2, "0")} ${step.title}: ${step.description}`)
    .join("\n");

  const hrText = product
    ? [
        `${product.name} е собствен HR продукт на SOFIRA SYSTEMS. Статус: ${product.status}.`,
        product.description,
        `Платформа: ${product.platform}`,
        `Проблем: ${product.problem}`,
        `Решение: ${product.solution}`,
        "Не се продава през сайта. Няма публични цени, абонамент, пробен период, вход или клиентски профил.",
        "Текущи възможности:",
        ...product.currentModules.map((item) => `- ${item.title}: ${item.description}`),
        "Предстоящи възможности (Скоро, не са готови):",
        ...product.upcomingModules.map((item) => `- ${item.title}: ${item.description}`),
        "Не описвай вътрешна архитектура, база данни, credentials или клиентски данни.",
        `Страница: ${product.href}`,
        `Запитване: ${product.inquireHref}`,
      ].join("\n")
    : "";

  return [
    "КОМПАНИЯ",
    `${sofiraKnowledge.company.name} е българска софтуерна компания.`,
    sofiraKnowledge.company.what,
    sofiraKnowledge.company.who,
    sofiraKnowledge.company.tracks.join(" "),
    sofiraKnowledge.company.not.join(" "),
    `Позициониране, само когато е уместно: ${sofiraKnowledge.company.positioning}`,
    sofiraKnowledge.company.statements.join(" "),
    "",
    "НЕПОТВЪРДЕНО — не твърди, че съществува",
    "Няма публични цени, клиенти, отзиви, брой проекти, брой служители, приходи, години опит, срокове, сертификати или партньорства.",
    "Няма потвърден готов складов продукт или CRM продукт.",
    "Няма потвърдени именувани интеграции, включително SAP.",
    `Ако липсва факт: "${UNKNOWN_FACT}"`,
    `Ако липсва интеграция: "${UNKNOWN_INTEGRATION}"`,
    `Ако е възможна поръчкова работа: "${CUSTOM_EVALUATION}"`,
    "",
    "УСЛУГИ",
    servicesText,
    "",
    "ПРОЦЕС",
    processText,
    "",
    "ПРОДУКТИ",
    sofiraKnowledge.products.positioning,
    hrText,
    "",
    "КОНТАКТ",
    `Общо запитване: ${sofiraKnowledge.contact.page}`,
    `HR HUB запитване: ${sofiraKnowledge.contact.hrHubInquire}`,
    `Задължителни полета: ${sofiraKnowledge.contact.required.join(", ")}.`,
    `По избор: ${sofiraKnowledge.contact.optional.join(", ")}.`,
    `Типове проект: ${sofiraKnowledge.contact.intake.join(", ")}.`,
  ].join("\n");
}
