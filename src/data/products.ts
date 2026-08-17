import { contactPath, productPath } from "@/data/navigation";
import { ctaCopy, isInquiryId } from "@/data/labels";
import type { Product, ProductChannel } from "@/types/content";

const upcomingChannels: ProductChannel[] = [
  { id: "pricing", label: "Цени", state: "upcoming" },
  { id: "monthly-subscription", label: "Месечен абонамент", state: "upcoming" },
  { id: "annual-subscription", label: "Годишен абонамент", state: "upcoming" },
  { id: "trial", label: "Пробен период", state: "upcoming" },
  { id: "purchase", label: "Покупка", state: "upcoming" },
  { id: "account", label: "Създаване на акаунт", state: "upcoming" },
  { id: "login", label: "Вход", state: "upcoming" },
  {
    id: "application",
    label: "Самото приложение",
    state: "upcoming",
  },
];

function defineProduct(input: Omit<Product, "href">): Product {
  return {
    ...input,
    href: productPath(input.slug),
  };
}

export const products: Product[] = [
  defineProduct({
    slug: "hr-hub-360",
    name: "HR HUB 360",
    tagline: "Система за управление на човешките ресурси",
    summary:
      "Десктоп HR система за българския пазар. Събира служители, договори, отпуски, работно време, подбор и обучения в една среда.",
    description:
      "HR HUB 360 е собствен продукт на SOFIRA SYSTEMS. Развива се като цялостна система за управление на човешките ресурси, с български интерфейс и инсталация на Windows. На този етап продуктът не се продава през сайта. Предстои публичен достъп, абонамент и клиентски профил.",
    status: "in-development",
    category: "hr",
    featured: true,
    platform:
      "Десктоп приложение за Windows. Основният език на интерфейса е български.",
    problem:
      "HR процесите често се разпръскват между таблици, документи и отделни инструменти. Това затруднява проследяването на служители, договори, отпуски и подбор на едно място.",
    solution:
      "HR HUB 360 събира основните HR операции в една система — от служители и организация до договори, документи, отпуски, работно време, подбор и обучения.",
    capabilities: [
      {
        title: "Служители и организация",
        description:
          "Профил на служителя (Employee 360), списък със служители, отдели, длъжности и организационна структура.",
      },
      {
        title: "Договори и правоотношения",
        description:
          "Трудови правоотношения, договори, анекси, история на възнаграждението и прекратяване.",
      },
      {
        title: "Документи и досие",
        description:
          "Електронно трудово досие с версии на документи, преглед, изтегляне, архив и контрол на достъпа.",
      },
      {
        title: "Отпуски",
        description:
          "Заявления, квоти, обясним баланс и календар на отсъствията.",
      },
      {
        title: "Работно време",
        description:
          "Планирано и отработено време, графици, извънреден труд и заключени месечни периоди.",
      },
      {
        title: "Възнаграждения",
        description:
          "Основа за изчисление върху фиксирани данни, с проверка и заключване. Без претенция за готово данъчно съответствие.",
      },
      {
        title: "Подбор",
        description:
          "Свободни позиции, обяви, кандидати, интервюта, оферти и назначаване.",
      },
      {
        title: "Обучения",
        description:
          "Каталог курсове, назначения към служители и сертификати в документния модул.",
      },
      {
        title: "Оценки",
        description:
          "Цикли и оценки на представяне към служител и трудово правоотношение. Не е 360-degree обратна връзка.",
      },
      {
        title: "Активи",
        description:
          "HR регистър за служебно имущество към служител и трудово правоотношение. Без склад и счетоводство.",
      },
      {
        title: "Контрол и сигурност",
        description: "Роли, права, одитен журнал и изолация по организация.",
      },
    ],
    benefits: [
      "Една система за основните HR операции, вместо разпръснати файлове и процеси.",
      "Ясна картина за служителя през профила Employee 360.",
      "Контрол върху правата и историята на действията.",
      "Създадена за българския пазар, с български интерфейс.",
      "Десктоп приложение, което се инсталира на Windows и се обновява централно.",
    ],
    visuals: {
      screenshots: [],
    },
    cta: {
      details: ctaCopy.viewProduct,
      inquire: ctaCopy.inquire,
    },
    channels: upcomingChannels,
    seoTitle: "HR HUB 360",
    seoDescription:
      "HR HUB 360 е HR система на SOFIRA SYSTEMS в активна разработка. Десктоп приложение за Windows с български интерфейс за служители, договори, отпуски и подбор.",
  }),
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const featuredProduct =
  products.find((product) => product.featured) ?? products[0];

export function getProductInquireHref(product: Product): string {
  return contactPath(isInquiryId(product.slug) ? product.slug : "other");
}
