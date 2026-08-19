import { ContactCta } from "@/components/sections/contact-cta";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { HrHubProof } from "@/components/products/hr-hub-proof";
import { CaseStudyArchitecture } from "@/components/projects/case-study-architecture";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hrHubVerifiedModules } from "@/data/hr-hub-screens";
import { capabilityStateLabel, ctaCopy, projectKindLabel } from "@/data/labels";
import { projectPath, routes } from "@/data/navigation";
import { getProductInquireHref } from "@/data/products";
import { getProjectBySlug } from "@/data/projects";
import type { Product } from "@/types/content";

type ProductPageViewProps = {
  product: Product;
};

const upcomingModules = [
  { title: "Работни процеси", note: "Скоро" },
  { title: "Отчети", note: "Скоро" },
] as const;

export function ProductPageView({ product }: ProductPageViewProps) {
  const inquireHref = getProductInquireHref(product);
  const currentCapabilities = product.capabilities.filter(
    (item) => item.state !== "upcoming",
  );
  const upcomingCapabilities = product.capabilities.filter(
    (item) => item.state === "upcoming",
  );
  const isHrHub = product.slug === "hr-hub-360";
  const hrHubProject = isHrHub ? getProjectBySlug("hr-hub-360") : undefined;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">
            {isHrHub ? projectKindLabel["own-product"] : "PRODUCT LAUNCH"}
          </p>
          <div className="mt-5">
            <ProductStatusBadge status={product.status} />
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl text-on-deep sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-deep-muted">
            Централизирана система за управление на човешките ресурси и бизнес
            процесите.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted">
            {product.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={inquireHref}>{ctaCopy.inquire}</Button>
            <Button href={routes.products} variant="inverse">
              {ctaCopy.allProducts}
            </Button>
          </div>
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
            <p className="coord">MODULES</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Текущи модули
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Показани са само модулите, които реално съществуват в текущия HR HUB
              360 клиент.
            </p>
            <ol className="mt-10 divide-y divide-border border-y border-border">
              {hrHubVerifiedModules.map((screen, index) => (
                <li
                  key={screen.id}
                  className="grid gap-2 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline"
                >
                  <span className="font-display text-xl text-electric">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl text-foreground">{screen.nav}</h3>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <p className="coord">COMING SOON</p>
              <h3 className="mt-4 text-2xl text-foreground">Предстоящи</h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {upcomingModules.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-baseline justify-between gap-3 py-5"
                  >
                    <span className="text-xl text-subtle">{item.title}</span>
                    <span className="text-xs font-medium uppercase tracking-[0.1em] text-subtle">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {isHrHub ? (
        <section className="border-b border-border bg-white">
          <Container className="py-14 sm:py-16 lg:py-20">
            <p className="coord">APPLICATION SURFACE</p>
            <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-4xl">
              Реални екрани
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Четири екрана от демонстрационната среда: табло, служители, отпуски
              и присъствия.
            </p>
            <div className="mt-10">
              <HrHubProof />
            </div>
          </Container>
        </section>
      ) : null}

      {isHrHub && hrHubProject ? (
        <section className="relative overflow-hidden border-b border-white/10 bg-deep">
          <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
          <Container className="relative py-14 sm:py-16 lg:py-20">
            <p className="coord">ARCHITECTURE</p>
            <h2 className="mt-4 text-3xl text-on-deep sm:text-4xl">
              Архитектура
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
              Показани са само слоевете, които реално участват в текущия проект.
            </p>
            <CaseStudyArchitecture layers={hrHubProject.architecture} />
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

        {!isHrHub && currentCapabilities.length > 0 ? (
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
          {isHrHub ? (
            <div>
              <p className="coord">CASE STUDY</p>
              <h2 className="mt-4 text-3xl text-foreground">Инженерен казус</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Контекст, проблем, подход и същите реални екрани като инженерен
                запис на разработката.
              </p>
              <div className="mt-8">
                <Button href={projectPath("hr-hub-360")} variant="ghost">
                  {ctaCopy.viewProject}
                </Button>
              </div>
            </div>
          ) : upcomingCapabilities.length > 0 ? (
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
      <ContactCta
        title="Имате подобен процес?"
        description="Опишете как работите днес. Ще уточним дали HR HUB 360 или отделна система е правилният път."
        ctaLabel={ctaCopy.discussSimilar}
        ctaHref={inquireHref}
      />
    </>
  );
}
