import { ContactCta } from "@/components/sections/contact-cta";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { ProductScreenshot } from "@/components/products/product-screenshot";
import { HrHubShowcase } from "@/components/products/hr-hub-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hrHubDashboard, hrHubFeaturedScreens } from "@/data/hr-hub-screens";
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
  const upcomingCapabilities = product.capabilities.filter(
    (item) => item.state === "upcoming",
  );
  const isHrHub = product.slug === "hr-hub-360";
  const extraScreens = hrHubFeaturedScreens.filter((item) => item.id !== "tablo");

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
          {isHrHub ? (
            <ProductScreenshot
              src={hrHubDashboard.src}
              alt={hrHubDashboard.alt}
              caption={hrHubDashboard.caption}
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          ) : null}
        </Container>
      </section>

      {isHrHub ? (
        <section className="border-b border-border bg-white">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">PRODUCT</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Какво представлява HR HUB 360?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {product.solution}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Екраните по-долу са от реалния десктоп клиент, върху изолирана
              демонстрационна организация. Не показваме данни на клиенти или
              служители.
            </p>
          </Container>
        </section>
      ) : null}

      {isHrHub ? (
        <section className="border-b border-border bg-navy-950">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">APPLICATION SURFACE</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Табло
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {hrHubDashboard.description}
            </p>
            <div className="mt-10">
              <ProductScreenshot
                src={hrHubDashboard.src}
                alt={hrHubDashboard.alt}
                caption={hrHubDashboard.caption}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </Container>
        </section>
      ) : null}

      {isHrHub ? (
        <section className="border-b border-border bg-white">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">MODULES</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Модули от HR HUB 360
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Изберете модул, за да видите реалния екран, заглавието и кратко
              описание. Работни процеси и отчети още не са готови и не са
              включени тук като налични екрани.
            </p>
            <div className="mt-10">
              <HrHubShowcase />
            </div>
          </Container>
        </section>
      ) : null}

      {isHrHub ? (
        <section className="border-b border-border bg-navy-950">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">SELECTED SCREENS</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Избрани екрани
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Служители, договори и работно време показват най-ясно реалната
              работна повърхност на системата.
            </p>
            <div className="mt-10 space-y-12">
              {extraScreens.map((screen) => (
                <article key={screen.id} className="space-y-4">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl text-foreground">{screen.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      {screen.description}
                    </p>
                  </div>
                  <ProductScreenshot
                    src={screen.src}
                    alt={screen.alt}
                    caption={screen.caption}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <Container className="py-14 sm:py-16 lg:py-20">
        {product.problem || (!isHrHub && product.solution) ? (
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
            {!isHrHub && product.solution ? (
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

        {product.benefits.length > 0 ? (
          <section className="mt-16">
            <p className="coord">ORGANIZE</p>
            <h2 className="mt-4 text-3xl text-foreground sm:text-4xl">
              Какво подрежда системата
            </h2>
            <ul className="mt-8 space-y-5">
              {product.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-4 text-base leading-relaxed text-muted"
                >
                  <span className="mt-2 h-px w-8 shrink-0 bg-electric" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {currentCapabilities.length > 0 ? (
          <section className="mt-16">
            <p className="coord">AVAILABLE</p>
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
          {upcomingCapabilities.length > 0 ? (
            <div>
              <p className="coord">COMING SOON</p>
              <h2 className="mt-4 text-3xl text-foreground">Предстои</h2>
              <ul className="mt-8 space-y-5">
                {upcomingCapabilities.map((item) => (
                  <li key={item.title} className="text-base leading-relaxed text-muted">
                    <span className="font-medium text-foreground">{item.title}</span>
                    <span> — {item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p className="coord">VALUE</p>
              <h2 className="mt-4 text-3xl text-foreground">За бизнеса</h2>
              <ul className="mt-8 space-y-5">
                {product.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-4 text-base leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-px w-8 shrink-0 bg-electric" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
