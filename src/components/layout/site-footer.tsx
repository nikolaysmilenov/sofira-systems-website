import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, legalNav, routes } from "@/data/navigation";
import { products } from "@/data/products";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy-950">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              SOFIRA SYSTEMS създава софтуер по поръчка и собствени продукти за
              компании, които търсят работещи системи.
            </p>
          </div>
          <FooterColumn title="Навигация" links={footerNav} />
          <FooterColumn
            title="Продукти"
            links={products.map((product) => ({
              href: product.href,
              label: product.name,
            }))}
          />
          <FooterColumn
            title="Компанията"
            links={[
              { href: routes.services, label: "Услуги" },
              { href: routes.projects, label: "Проекти" },
              { href: routes.about, label: "За нас" },
              { href: routes.contact, label: "Контакт" },
            ]}
          />
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-foreground">Контакт</p>
            <p className="mt-4 text-sm text-muted">
              Изпратете запитване чрез формата за контакт.
            </p>
            <Link
              href={routes.contact}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-electric hover:text-electric-hover"
            >
              Свържете се с нас
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            © {year} {site.name}. Всички права запазени.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-subtle hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="lg:col-span-2">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
