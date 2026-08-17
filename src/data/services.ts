import { routes } from "@/data/navigation";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "softuerni-sistemi",
    title: "Софтуер по поръчка",
    shortDescription:
      "Системи, разработени според конкретните процеси и изисквания на бизнеса.",
    description:
      "Разработваме софтуер за конкретна организация. Започваме от реалния процес и стигаме до инструмент, който екипът използва всеки ден — с ясен обхват и поддържаема архитектура.",
    icon: "layers",
    group: "client",
  },
  {
    slug: "digitalni-platformi",
    title: "Дигитални платформи",
    shortDescription:
      "Свързани модули и работни процеси в една система за ежедневна употреба.",
    description:
      "Изграждаме дигитални платформи, когато бизнесът се нуждае от свързани модули, роли и дългосрочна експлоатация. Това не е еднократна страница, а система с ясна структура.",
    icon: "puzzle",
    group: "client",
  },
  {
    slug: "avtomatizatsiya",
    title: "Автоматизация",
    shortDescription:
      "Намаляване на ръчната работа и оптимизиране на повтарящи се процеси.",
    description:
      "Автоматизираме повтарящи се операции, за да намалим ръчната работа и риска от грешки. Започваме от конкретния процес и избираме решение, което може да се използва устойчиво.",
    icon: "workflow",
    group: "client",
  },
  {
    slug: "ai-resheniya",
    title: "AI решения",
    shortDescription:
      "Практическо приложение на изкуствения интелект за реални бизнес задачи.",
    description:
      "Внедряваме AI там, където има ясна задача: обработка на информация, вътрешни процеси и работни потоци. Не предлагаме изкуствен интелект заради самото понятие.",
    icon: "brainCircuit",
    group: "client",
  },
  {
    slug: "ueb-razrabotki",
    title: "Уеб разработки",
    shortDescription:
      "Бизнес уебсайт или уеб приложение с ясна структура, готово за реална употреба.",
    description:
      "Изграждаме бизнес уебсайтове и уеб приложения с ясна структура, стабилна работа и възможност за развитие. Фокусът е върху реалната употреба, а не върху декоративен ефект.",
    icon: "globe",
    group: "client",
  },
  {
    slug: "produktova-razrabotka",
    title: "Продуктова разработка",
    shortDescription:
      "Собствени софтуерни продукти на SOFIRA SYSTEMS, отделно от клиентските проекти.",
    description:
      "Развиваме собствени продукти като самостоятелни системи. HR HUB 360 е първият публичен пример. Това не е поръчкова услуга, а продуктова линия на компанията.",
    icon: "appWindow",
    group: "product",
  },
];

export const clientServices = services.filter(
  (service) => service.group === "client",
);

export const productServices = services.filter(
  (service) => service.group === "product",
);

export function getServiceHref(slug: string): string {
  return `${routes.services}#${slug}`;
}
