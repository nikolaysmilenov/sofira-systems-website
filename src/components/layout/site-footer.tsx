import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, legalNav, routes } from "@/data/navigation";
import { products } from "@/data/products";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="deep-section border-t border-white/10">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-deep-muted">
              Технологична компания за софтуерни системи, автоматизация, AI и
              собствени продукти. Изграждаме инструменти, които бизнесът използва
              всеки ден.
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
          <div className="lg:col-span-3">
            <p className="text-sm font-medium text-on-deep">Следваща стъпка</p>
            <p className="mt-4 text-sm leading-relaxed text-deep-muted">
              Разкажете ни какво искате да изградим.
            </p>
            <Link
              href={routes.contact}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-cyan-bright hover:text-white"
            >
              Заявете проект
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-deep-muted">
            © {year} {site.name}. Всички права запазени.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs text-deep-muted hover:text-on-deep"
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
      <p className="text-sm font-medium text-on-deep">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="text-sm text-deep-muted transition-colors hover:text-on-deep"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
