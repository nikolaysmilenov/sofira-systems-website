import Image from "next/image";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
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

  return (
    <>
      <PageHero
        eyebrow="Собствен продукт"
        title={product.name}
        description={product.tagline}
        badge={<ProductStatusBadge status={product.status} />}
      />
      <Container className="py-14 sm:py-16 lg:py-20">
        <p className="max-w-3xl text-base leading-relaxed text-muted">
          {product.description}
        </p>

        {product.problem || product.solution ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            {product.problem ? (
              <section>
                <h2 className="text-2xl text-foreground">Проблемът</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.problem}
                </p>
              </section>
            ) : null}
            {product.solution ? (
              <section>
                <h2 className="text-2xl text-foreground">Решението</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.solution}
                </p>
                {product.platform ? (
                  <p className="mt-4 text-sm leading-relaxed text-subtle">
                    {product.platform}
                  </p>
                ) : null}
              </section>
            ) : null}
          </div>
        ) : null}

        {currentCapabilities.length > 0 ? (
          <section className="mt-16">
            <Eyebrow>Възможности</Eyebrow>
            <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
              Какво покрива системата
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

        <section className="mt-16">
          <Eyebrow>Преглед</Eyebrow>
          <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
            Структура на системата
          </h2>
          {product.visuals.screenshots.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.visuals.screenshots.map((src) => (
                <Surface key={src} className="overflow-hidden">
                  <Image
                    src={src}
                    alt=""
                    width={1200}
                    height={800}
                    className="h-auto w-full object-cover"
                  />
                </Surface>
              ))}
            </div>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Публични екранни снимки ще бъдат добавени, когато продуктът е
                готов за демонстрация. Дотогава показваме реалните модули, върху
                които се работи.
              </p>
              <Surface className="mt-8 overflow-hidden">
                <div className="border-b border-border px-5 py-3 sm:px-6">
                  <p className="font-display text-sm tracking-[0.08em] text-subtle">
                    {product.name}
                  </p>
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
                  {product.capabilities.map((item) => (
                    <div
                      key={item.title}
                      className="bg-navy-900 px-5 py-4 sm:px-6"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      {item.state === "upcoming" ? (
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-subtle">
                          {capabilityStateLabel.upcoming}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Surface>
            </>
          )}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {product.benefits.length > 0 ? (
            <div>
              <Eyebrow>Стойност</Eyebrow>
              <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
                Защо системата има значение
              </h2>
              <ul className="mt-6 space-y-4">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span
                      className="mt-[0.7rem] h-px w-4 shrink-0 bg-cyan/70"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={inquireHref}>{product.cta.inquire}</Button>
                <Button href={routes.products} variant="secondary">
                  {ctaCopy.allProducts}
                </Button>
              </div>
            </div>
          ) : null}
          <Surface className="h-fit p-6 sm:p-8">
            <Eyebrow>Достъп</Eyebrow>
            <h2 className="mt-4 text-xl text-foreground">Предстояща наличност</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Маркетинговият сайт представя продукта. Самото приложение, входът,
              абонаментът и плащането остават отделни и все още не са активни.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {product.channels.map((channel) => (
                <li key={channel.id}>
                  {channel.label} —{" "}
                  {channel.state === "active" && channel.href ? (
                    <a href={channel.href} className="text-cyan hover:text-foreground">
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
          </Surface>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}
