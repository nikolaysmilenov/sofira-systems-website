import type { InquiryOption, ProductStatus, ProjectStatus } from "@/types/content";

export const productStatusLabel: Record<ProductStatus, string> = {
  available: "Наличен",
  "in-development": "В разработка",
  "coming-soon": "Очаквайте скоро",
};

export const projectStatusLabel: Record<ProjectStatus, string> = {
  "in-development": "В разработка",
  published: "Публикуван",
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

export const inquiryOptions: InquiryOption[] = [
  { id: "project", label: "Проект" },
  { id: "software", label: "Софтуерна система" },
  { id: "automation", label: "Автоматизация" },
  { id: "ai", label: "AI решение" },
  { id: "hr-hub-360", label: "HR HUB 360" },
  { id: "other", label: "Друго" },
];

const legacyInquiryIds = ["business-system"] as const;

export function isInquiryId(value: string): boolean {
  return (
    inquiryOptions.some((option) => option.id === value) ||
    legacyInquiryIds.includes(value as (typeof legacyInquiryIds)[number])
  );
}

export const ctaCopy = {
  contact: "Свържете се с нас",
  learnMore: "Научете повече",
  viewProduct: "Разгледайте продукта",
  viewProducts: "Разгледайте продуктите",
  viewServices: "Разгледайте услугите",
  inquire: "Заявете информация",
  allProducts: "Всички продукти",
  allServices: "Всички услуги",
  about: "За компанията",
  sendInquiry: "Изпратете запитване",
} as const;
