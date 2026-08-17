import { ContactCta } from "@/components/sections/contact-cta";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { ProductConceptVisual } from "@/components/products/product-concept-visual";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Surface } from "@/components/ui/surface";
import { getProductInquireHref } from "@/data/products";
import { capabilityStateLabel, ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import type { Product } from "@/types/content";

type ProductPageViewProps = {
  product: Product;
};

export function ProductPageView({ product }: ProductPageViewProps) {
  const inquireHref = getProductInquireHref(product);
  const upcomingCapabilities = product.capabilities.filter(
    (item) => item.state === "upcoming",
  );
  const currentCapabilities = product.capabilities.filter(
    (item) => item.state !== "upcoming",
  );
  const isHrHub = product.slug === "hr-hub-360";

  return (
    <>
      <section className="border-b border-border bg-navy-950">
        <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
          <div>
            <Eyebrow>Собствен продукт</Eyebrow>
            <div className="mt-4">
              <ProductStatusBadge status={product.status} />
            </div>
            <h1 className="mt-4 max-w-xl text-3xl font-semibold text-foreground sm:text-5xl sm:leading-[1.08]">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {product.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={inquireHref}>{ctaCopy.inquire}</Button>
              <Button href={routes.products} variant="secondary">
                {ctaCopy.allProducts}
              </Button>
            </div>
          </div>
          <ProductConceptVisual title={product.name} variant="hero" />
        </Container>
      </section>

      <Container className="py-14 sm:py-16 lg:py-20">
        {product.problem || product.solution ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {product.problem ? (
              <Surface className="p-6 sm:p-8">
                <h2 className="text-2xl text-foreground">Проблемът</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.problem}
                </p>
              </Surface>
            ) : null}
            {product.solution ? (
              <Surface className="p-6 sm:p-8">
                <h2 className="text-2xl text-foreground">Решението</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.solution}
                </p>
                {product.platform ? (
                  <p className="mt-4 text-sm leading-relaxed text-subtle">
                    {product.platform}
                  </p>
                ) : null}
              </Surface>
            ) : null}
          </div>
        ) : null}

        {isHrHub ? (
          <section className="mt-16">
            <Eyebrow>Визуализация</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-2xl text-foreground sm:text-3xl">
              Единна система за управление на човешките ресурси
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Реални екранни снимки ще бъдат добавени, когато продуктът е готов
              за публична демонстрация. Панелите по-долу са визуална концепция
              върху реалните модули на HR HUB 360 — не са снимки от работещото
              приложение.
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <ProductConceptVisual
                title="Служители"
                variant="employees"
              />
              <ProductConceptVisual title="Отпуски" variant="leave" />
              <ProductConceptVisual
                title="Документи"
                variant="documents"
                className="lg:col-span-2"
              />
            </div>
          </section>
        ) : null}

        {currentCapabilities.length > 0 ? (
          <section className="mt-16">
            <Eyebrow>Възможности</Eyebrow>
            <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
              Основни възможности
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Описаните области са част от реалната разработка на продукта. Не
              добавяме функции, които все още не съществуват в системата.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {currentCapabilities.map((item) => (
                <Surface key={item.title} className="p-6">
                  <h3 className="text-lg text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Surface>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <Eyebrow>Преглед</Eyebrow>
          <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
            Преглед на модулите
          </h2>
          <Surface className="mt-8 overflow-hidden">
            <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
              {product.capabilities.map((item) => (
                <div key={item.title} className="bg-white px-5 py-5 sm:px-6">
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  {item.state === "upcoming" ? (
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-subtle">
                      {capabilityStateLabel.upcoming}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Surface>
        </section>

        {upcomingCapabilities.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Предстои</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {upcomingCapabilities.map((item) => (
                <Surface key={item.title} className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-subtle">
                    {capabilityStateLabel.upcoming}
                  </p>
                  <h3 className="mt-3 text-lg text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Surface>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {product.benefits.length > 0 ? (
            <div>
              <Eyebrow>Стойност</Eyebrow>
              <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
                Ползи за бизнеса
              </h2>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span
                      className="mt-[0.7rem] h-px w-4 shrink-0 bg-electric"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <Surface className="h-fit p-6 sm:p-8">
            <Eyebrow>Статус</Eyebrow>
            <h2 className="mt-4 text-xl text-foreground">В активна разработка</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Маркетинговият сайт представя продукта. Самото приложение, входът,
              абонаментът и плащането остават отделни и все още не са активни.
            </p>
            <h3 className="mt-6 text-sm font-medium text-foreground">
              Предстоящ достъп
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {product.channels.map((channel) => (
                <li key={channel.id}>
                  {channel.label} —{" "}
                  {channel.state === "active" && channel.href ? (
                    <a
                      href={channel.href}
                      className="font-medium text-electric hover:text-electric-hover"
                    >
                      към услугата
                    </a>
                  ) : (
                    "предстои"
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-subtle">
              Не публикуваме цени и не показваме бутони за плащане, докато
              покупката не е реално достъпна.
            </p>
            <div className="mt-8">
              <Button href={inquireHref} className="w-full sm:w-auto">
                {product.cta.inquire}
              </Button>
            </div>
          </Surface>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}
