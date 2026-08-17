import type { NavItem } from "@/types/content";

export const routes = {
  home: "/",
  services: "/uslugi",
  products: "/produkti",
  hrHub360: "/produkti/hr-hub-360",
  projects: "/proekti",
  about: "/za-nas",
  contact: "/kontakt",
  privacy: "/poveritelnost",
  terms: "/obshti-usloviya",
  cookies: "/biskvitki",
} as const;

export function productPath(slug: string): string {
  return `${routes.products}/${slug}`;
}

export function contactPath(topic?: string): string {
  if (!topic) {
    return routes.contact;
  }

  return `${routes.contact}?tema=${encodeURIComponent(topic)}`;
}

export const mainNav: NavItem[] = [
  { href: routes.home, label: "Начало" },
  { href: routes.services, label: "Услуги" },
  { href: routes.products, label: "Продукти" },
  { href: routes.projects, label: "Проекти" },
  { href: routes.about, label: "За нас" },
  { href: routes.contact, label: "Контакти" },
];

export const footerNav: NavItem[] = mainNav;

export const legalNav: NavItem[] = [
  { href: routes.privacy, label: "Поверителност" },
  { href: routes.terms, label: "Общи условия" },
  { href: routes.cookies, label: "Бисквитки" },
];
