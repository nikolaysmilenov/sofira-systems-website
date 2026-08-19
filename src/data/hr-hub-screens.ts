export type HrHubScreen = {
  id: string;
  nav: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
};

const demoCaption =
  "Реален екран от HR HUB 360. Демо среда — примерни данни, не клиентска организация.";

export const hrHubScreens: HrHubScreen[] = [
  {
    id: "tablo",
    nav: "Табло",
    title: "Табло",
    description:
      "Общ преглед на организацията: компания, активни служители, потребители и покани. Без измислени показатели.",
    src: "/images/products/hr-hub-360/tablo.webp",
    alt: "Табло на HR HUB 360",
    caption: demoCaption,
    featured: true,
  },
  {
    id: "sluzhiteli",
    nav: "Служители",
    title: "Служители",
    description:
      "Списък със сървърно търсене, филтри и странициране. Профил, служебен номер, длъжност, отдел и статус.",
    src: "/images/products/hr-hub-360/sluzhiteli.webp",
    alt: "Модул Служители в HR HUB 360",
    caption: demoCaption,
    featured: true,
  },
  {
    id: "dogovori",
    nav: "Договори",
    title: "Договори",
    description:
      "Трудови договори към служител и правоотношение: вид, срок, статус и история преди финализиране.",
    src: "/images/products/hr-hub-360/dogovori.webp",
    alt: "Модул Договори в HR HUB 360",
    caption: demoCaption,
    featured: true,
  },
  {
    id: "otpuski",
    nav: "Отпуски",
    title: "Отпуски",
    description:
      "Заявления, остатък и календар на отсъствията. Квотите се въвеждат към трудовото правоотношение.",
    src: "/images/products/hr-hub-360/otpuski.webp",
    alt: "Модул Отпуски в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "prisastviya",
    nav: "Присъствия",
    title: "Присъствия",
    description:
      "Планирано и отработено време, графици и извънреден труд като отделни факти. Изисква правна проверка преди production.",
    src: "/images/products/hr-hub-360/prisastviya.webp",
    alt: "Модул Присъствия в HR HUB 360",
    caption: demoCaption,
    featured: true,
  },
  {
    id: "vaznagrazhdeniya",
    nav: "Възнаграждения",
    title: "Възнаграждения",
    description:
      "Периоди с жизнен цикъл от отваряне до заключване. Основа за изчисление, без претенция за готово данъчно съответствие.",
    src: "/images/products/hr-hub-360/vaznagrazhdeniya.webp",
    alt: "Модул Възнаграждения в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "dokumenti",
    nav: "Документи",
    title: "Документи",
    description:
      "Централен домейн за файлове с категории, версии и контрол на достъпа. Електронното досие е в профила на служителя.",
    src: "/images/products/hr-hub-360/dokumenti.webp",
    alt: "Модул Документи в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "podbor",
    nav: "Подбор",
    title: "Подбор",
    description:
      "Свободни позиции, обяви, кандидати, интервюта и оферти. Кандидатският портал и имейл интеграциите още не са готови.",
    src: "/images/products/hr-hub-360/podbor.webp",
    alt: "Модул Подбор в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "obucheniya",
    nav: "Обучения",
    title: "Обучения",
    description:
      "Каталог курсове и назначения към служители. Сертификатите се съхраняват в документния модул.",
    src: "/images/products/hr-hub-360/obucheniya.webp",
    alt: "Модул Обучения в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "otsenki",
    nav: "Оценки",
    title: "Оценки",
    description:
      "Цикли и оценки на представяне към служител и трудово правоотношение. Не е 360-degree обратна връзка.",
    src: "/images/products/hr-hub-360/otsenki.webp",
    alt: "Модул Оценки в HR HUB 360",
    caption: demoCaption,
  },
  {
    id: "aktivi",
    nav: "Активи",
    title: "Активи",
    description:
      "HR регистър за служебно имущество към служител и трудово правоотношение. Без склад и счетоводство.",
    src: "/images/products/hr-hub-360/aktivi.webp",
    alt: "Модул Активи в HR HUB 360",
    caption: demoCaption,
  },
];

export const hrHubDashboard = hrHubScreens[0];

const verifiedModuleIds = [
  "tablo",
  "sluzhiteli",
  "dogovori",
  "dokumenti",
  "otpuski",
  "prisastviya",
  "vaznagrazhdeniya",
  "podbor",
  "obucheniya",
  "otsenki",
  "aktivi",
] as const;

export const hrHubVerifiedModules = verifiedModuleIds.map((id) => {
  const screen = hrHubScreens.find((item) => item.id === id);
  if (!screen) {
    throw new Error(`Missing verified HR HUB module: ${id}`);
  }
  return screen;
});

export const hrHubFeaturedScreens = hrHubScreens.filter((item) => item.featured);

export type HrHubProofScreen = HrHubScreen & {
  process: string;
};

const proofIds = ["tablo", "sluzhiteli", "otpuski", "prisastviya"] as const;

const proofProcess: Record<(typeof proofIds)[number], string> = {
  tablo: "Общ преглед на организацията и състоянието на модулите.",
  sluzhiteli: "Централизирано управление на служителите и свързаната информация.",
  otpuski: "Управление на заявления и отсъствия.",
  prisastviya: "Работно време и присъствия.",
};

export const hrHubProofScreens: HrHubProofScreen[] = proofIds.map((id) => {
  const screen = hrHubScreens.find((item) => item.id === id);
  if (!screen) {
    throw new Error(`Missing verified HR HUB screen: ${id}`);
  }

  return { ...screen, process: proofProcess[id] };
});

export const hrHubProofPrimary = hrHubProofScreens[0];
export const hrHubProofSupporting = hrHubProofScreens.slice(1);
