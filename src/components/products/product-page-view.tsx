import { ContactCta } from "@/components/sections/contact-cta";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { ProductConceptVisual } from "@/components/products/product-concept-visual";
import { HrHubShowcase } from "@/components/products/hr-hub-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProductInquireHref } from "@/data/products";
import { capabilityStateLabel, ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import type { Product } from "@/types/content";

type ProductPageViewProps = {
  product: Product;
};

export function ProductPageView({ product }: ProductPageViewProps) {
  const inquireHref = getProductInquireHref(product);
  const currentCapabilities = product.capabilities.filter(
    (item) => item.state !== "upcoming",
  );
  const isHrHub = product.slug === "hr-hub-360";

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:py-24">
          <div>
            <p className="coord">PRODUCT LAUNCH</p>
            <div className="mt-5">
              <ProductStatusBadge status={product.status} />
            </div>
            <h1 className="mt-5 text-4xl text-on-deep sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-deep-muted">
              Централизирана система за управление на човешките ресурси и бизнес
              процесите.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-deep-muted">
              {product.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={inquireHref}>{ctaCopy.inquire}</Button>
              <Button href={routes.products} variant="inverse">
                {ctaCopy.allProducts}
              </Button>
            </div>
          </div>
          <ProductConceptVisual title={product.name} variant="hero" />
        </Container>
      </section>

      {isHrHub ? (
        <section className="border-b border-border bg-navy-950">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">APPLICATION SURFACE</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Модули от HR HUB 360
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Навигацията, етикетите и групите следват десктоп клиента на HR HUB
              360. Панелите са визуална концепция — не екранни снимки и не данни
              от организация.
            </p>
            <div className="mt-10">
              <HrHubShowcase />
            </div>
          </Container>
        </section>
      ) : null}

      <Container className="py-14 sm:py-16 lg:py-20">
        {product.problem || product.solution ? (
          <div className="grid gap-12 border-b border-border pb-16 lg:grid-cols-2">
            {product.problem ? (
              <div>
                <p className="coord">PROBLEM</p>
                <h2 className="mt-4 text-3xl text-foreground">Проблемът</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.problem}
                </p>
              </div>
            ) : null}
            {product.solution ? (
              <div>
                <p className="coord">SYSTEM</p>
                <h2 className="mt-4 text-3xl text-foreground">Решението</h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {product.solution}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {currentCapabilities.length > 0 ? (
          <section className="mt-16">
            <p className="coord">CAPABILITIES</p>
            <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
              Какво е в системата
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Описаните области са част от реалната разработка. Не добавяме
              функции, които все още не съществуват.
            </p>
            <ol className="mt-10 divide-y divide-border border-y border-border">
              {currentCapabilities.map((item, index) => (
                <li
                  key={item.title}
                  className="grid gap-3 py-6 sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-start"
                >
                  <span className="font-display text-xl text-electric">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {product.benefits.length > 0 ? (
            <div>
              <p className="coord">VALUE</p>
              <h2 className="mt-4 text-3xl text-foreground">За бизнеса</h2>
              <ul className="mt-8 space-y-5">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-4 text-base leading-relaxed text-muted">
                    <span className="mt-2 h-px w-8 shrink-0 bg-electric" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-[1.4rem] bg-deep p-6 text-on-deep sm:p-8">
            <p className="coord">STATUS</p>
            <h2 className="mt-4 text-2xl">В активна разработка</h2>
            <p className="mt-4 text-sm leading-relaxed text-deep-muted">
              Маркетинговият сайт представя продукта. Самото приложение, входът,
              абонаментът и плащането остават отделни и все още не са активни.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-deep-muted">
              {product.channels.map((channel) => (
                <li key={channel.id}>
                  {channel.label} —{" "}
                  {channel.state === "active" && channel.href ? (
                    <a href={channel.href} className="text-cyan-bright">
                      към услугата
                    </a>
                  ) : (
                    "предстои"
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-deep-muted">
              {capabilityStateLabel.upcoming}: работни процеси и отчети в
              приложението още не са готови.
            </p>
            <div className="mt-8">
              <Button href={inquireHref}>{product.cta.inquire}</Button>
            </div>
          </div>
        </section>
      </Container>
      <ContactCta />
    </>
  );
}
