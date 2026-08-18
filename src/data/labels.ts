import type {
  InquiryOption,
  ProductStatus,
  ProjectKind,
  ProjectStatus,
} from "@/types/content";

export const productStatusLabel: Record<ProductStatus, string> = {
  available: "Наличен",
  "in-development": "В разработка",
  "coming-soon": "Очаквайте скоро",
};

export const projectStatusLabel: Record<ProjectStatus, string> = {
  "in-production": "В експлоатация",
  "in-development": "В разработка",
  "internal-product": "Вътрешен продукт",
  "public-platform": "Публична платформа",
  ongoing: "В процес на развитие",
};

export const projectKindLabel: Record<ProjectKind, string> = {
  "client-project": "CLIENT PROJECT",
  "own-product": "OWN PRODUCT",
  "internal-project": "INTERNAL / SOFIRA PROJECT",
  "public-platform": "OWN DIGITAL PLATFORM",
};

export const productCategoryLabel = {
  hr: "HR система",
  operations: "Оперативна система",
  platform: "Платформа",
} as const;

export const capabilityStateLabel = {
  current: "В системата",
  upcoming: "Предстои",
} as const;

export const intakeOptions: InquiryOption[] = [
  { id: "software", label: "Софтуерна система" },
  { id: "automation", label: "Автоматизация" },
  { id: "ai", label: "AI решение" },
  { id: "platform", label: "Дигитална платформа" },
  { id: "web", label: "Уеб приложение" },
  { id: "hr-hub-360", label: "HR HUB 360" },
  { id: "unsure", label: "Все още не съм сигурен" },
];

export const inquiryOptions: InquiryOption[] = [
  ...intakeOptions,
  { id: "project", label: "Проект" },
  { id: "other", label: "Друго" },
  { id: "business-system", label: "Вътрешна бизнес система" },
];

const legacyInquiryIds = ["business-system"] as const;

export function isInquiryId(value: string): boolean {
  return (
    inquiryOptions.some((option) => option.id === value) ||
    legacyInquiryIds.includes(value as (typeof legacyInquiryIds)[number])
  );
}

export function inquiryLabel(value: string): string {
  return inquiryOptions.find((option) => option.id === value)?.label ?? "";
}

export const ctaCopy = {
  contact: "Свържете се с нас",
  requestProject: "Заявете проект",
  discussProject: "Обсъдете проект",
  discussSimilar: "Обсъдете подобен проект",
  learnMore: "Научете повече",
  viewProduct: "Разгледайте продукта",
  viewHrHub: "Разгледайте HR HUB 360",
  viewProject: "Разгледайте проекта",
  viewProjects: "Разгледайте проектите",
  allProjects: "Вижте всички проекти",
  viewStinger: "Разгледайте STINGER",
  viewTechnology: "Вижте технологиите",
  talkToAi: "Говорете със SOFIRA AI",
  viewProducts: "Разгледайте продуктите",
  viewServices: "Разгледайте услугите",
  inquire: "Заявете информация",
  allProducts: "Всички продукти",
  allServices: "Всички услуги",
  about: "За компанията",
  sendInquiry: "Изпратете запитване",
} as const;
