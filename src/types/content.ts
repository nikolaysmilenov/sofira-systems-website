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
  problem: string;
  solution: string;
  components: string[];
  inquiry?: string;
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

export type ProjectKind =
  | "client-project"
  | "own-product"
  | "internal-project"
  | "public-platform";

export type ProjectStatus =
  | "in-production"
  | "in-development"
  | "internal-product"
  | "public-platform"
  | "ongoing";

export type ArchitectureLayerId =
  | "business"
  | "application"
  | "data"
  | "automation"
  | "ai"
  | "ui"
  | "desktop"
  | "api"
  | "database"
  | "access-control"
  | "market-data"
  | "scanner"
  | "strategy"
  | "decision"
  | "safety"
  | "signal"
  | "signal-engine"
  | "risk-logic"
  | "execution"
  | "monitoring";

export type ArchitectureLayer = {
  id: ArchitectureLayerId;
  label: string;
  text: string;
};

export type CaseStudyCta = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  href: string;
  kind: ProjectKind;
  status: ProjectStatus;
  seoTitle: string;
  seoDescription: string;
  context: string;
  problem: string;
  approach: string;
  system: string;
  architecture: ArchitectureLayer[];
  result: string;
  modules?: {
    current: string[];
    upcoming?: string[];
  };
  indexCta?: string;
  ctas: CaseStudyCta[];
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

export type TechnologyProjectRef = {
  label: string;
  href: string;
};

export type TechnologyItem = {
  name: string;
  role: string;
  projects: TechnologyProjectRef[];
};

export type TechnologyCategory = {
  id: string;
  index: string;
  coord: string;
  title: string;
  meaning: string;
  items: TechnologyItem[];
};

export type TechnologyMapLayer = {
  id: string;
  label: string;
  meaning: string;
  technologies: string[];
  example: TechnologyProjectRef;
};

export type InquiryOption = {
  id: string;
  label: string;
};
