import { contactPath, routes } from "@/data/navigation";

type NeedOption = {
  id: string;
  label: string;
  inquiry: string;
  href: string;
  text: string;
  cta?: string;
};

export const needOptions: NeedOption[] = [
  {
    id: "software",
    label: "Софтуер",
    inquiry: "software",
    href: contactPath("software"),
    text: "Създаваме системи според реалните процеси на вашия бизнес — от първата архитектура до готовия продукт.",
  },
  {
    id: "automation",
    label: "Автоматизация",
    inquiry: "automation",
    href: contactPath("automation"),
    text: "Свързваме процеси, данни и системи, за да премахнем излишната ръчна работа.",
  },
  {
    id: "ai",
    label: "AI",
    inquiry: "ai",
    href: contactPath("ai"),
    text: "Използваме AI там, където има реална задача за решаване — анализ, обработка, автоматизация или интелигентни функции.",
  },
  {
    id: "business",
    label: "Вътрешна бизнес система",
    inquiry: "software",
    href: contactPath("software"),
    text: "Изграждаме вътрешен инструмент около начина, по който работи организацията — роли, данни и ежедневни операции.",
  },
  {
    id: "platform",
    label: "Дигитална платформа",
    inquiry: "platform",
    href: contactPath("platform"),
    text: "Свързваме модули, права и работни потоци в една среда, която екипът може да използва дългосрочно.",
  },
  {
    id: "product",
    label: "Собствен продукт",
    inquiry: "hr-hub-360",
    href: routes.hrHub360,
    cta: "Разгледайте HR HUB 360",
    text: "Развиваме собствени продукти отделно от клиентските проекти. HR HUB 360 е първата публична система.",
  },
];
