import { routes } from "@/data/navigation";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "softuerni-sistemi",
    title: "Софтуер по поръчка",
    shortDescription:
      "Работеща система по вашия процес — с ясен обхват, роли и възможност за поддръжка.",
    description:
      "Разработваме софтуер за конкретна организация. Започваме от реалния процес и стигаме до инструмент, който екипът използва всеки ден — с ясен обхват и поддържаема архитектура.",
    icon: "layers",
    group: "client",
  },
  {
    slug: "digitalni-platformi",
    title: "Дигитални платформи",
    shortDescription:
      "Една платформа с модули, права и работни потоци, която екипът използва всеки ден.",
    description:
      "Изграждаме дигитални платформи, когато бизнесът се нуждае от свързани модули, роли и дългосрочна експлоатация. Това не е еднократна страница, а система с ясна структура.",
    icon: "puzzle",
    group: "client",
  },
  {
    slug: "avtomatizatsiya",
    title: "Автоматизация",
    shortDescription:
      "По-малко ръчна работа и по-малко грешки при повтарящи се операции.",
    description:
      "Автоматизираме повтарящи се операции, за да намалим ръчната работа и риска от грешки. Започваме от конкретния процес и избираме решение, което може да се използва устойчиво.",
    icon: "workflow",
    group: "client",
  },
  {
    slug: "ai-resheniya",
    title: "AI решения",
    shortDescription:
      "AI там, където има ясна задача — обработка на информация и вътрешни процеси.",
    description:
      "Внедряваме AI там, където има ясна задача: обработка на информация, вътрешни процеси и работни потоци. Не предлагаме изкуствен интелект заради самото понятие.",
    icon: "brainCircuit",
    group: "client",
  },
  {
    slug: "ueb-razrabotki",
    title: "Уеб разработки",
    shortDescription:
      "Уебсайт или уеб приложение с ясна структура, готово за реална бизнес употреба.",
    description:
      "Изграждаме бизнес уебсайтове и уеб приложения с ясна структура, стабилна работа и възможност за развитие. Фокусът е върху реалната употреба, а не върху декоративен ефект.",
    icon: "globe",
    group: "client",
  },
  {
    slug: "produktova-razrabotka",
    title: "Продуктова разработка",
    shortDescription:
      "Достъп до собствените продукти на SOFIRA SYSTEMS, отделно от поръчковата разработка.",
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
