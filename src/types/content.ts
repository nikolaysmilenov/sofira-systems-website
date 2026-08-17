export type NavItem = {
  href: string;
  label: string;
};

export type ServiceIconName =
  | "globe"
  | "layers"
  | "workflow"
  | "brainCircuit"
  | "appWindow"
  | "puzzle";

export type ServiceGroup = "client" | "product";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: ServiceIconName;
  group: ServiceGroup;
};

export type ProductStatus = "available" | "in-development" | "coming-soon";

export type ProductCategory = "hr" | "operations" | "platform";

export type CapabilityState = "current" | "upcoming";

export type ProductCapability = {
  title: string;
  description: string;
  state?: CapabilityState;
};

export type ProductVisuals = {
  mark?: string;
  cover?: string;
  screenshots: string[];
};

export type ProductChannelId =
  | "pricing"
  | "monthly-subscription"
  | "annual-subscription"
  | "trial"
  | "purchase"
  | "account"
  | "login"
  | "application";

export type ProductChannel = {
  id: ProductChannelId;
  label: string;
  state: "upcoming" | "active";
  href?: string;
};

export type ProductCta = {
  details: string;
  inquire: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  href: string;
  status: ProductStatus;
  category: ProductCategory;
  featured?: boolean;
  platform?: string;
  problem?: string;
  solution?: string;
  capabilities: ProductCapability[];
  benefits: string[];
  visuals: ProductVisuals;
  cta: ProductCta;
  channels: ProductChannel[];
  seoTitle: string;
  seoDescription: string;
};

export type ProjectStatus = "in-development" | "published";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  href: string;
  status: ProjectStatus;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type InquiryOption = {
  id: string;
  label: string;
};
