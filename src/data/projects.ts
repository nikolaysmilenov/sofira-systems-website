import { productPath } from "@/data/navigation";

export const projects = [
  {
    slug: "hr-hub-360",
    name: "HR HUB 360",
    summary:
      "Собствен продукт на SOFIRA SYSTEMS — десктоп система за управление на човешките ресурси, разработена за българския пазар.",
    href: productPath("hr-hub-360"),
    status: "in-development" as const,
  },
];
