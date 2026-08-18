import { ProductScreenshot } from "@/components/products/product-screenshot";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hrHubDashboard } from "@/data/hr-hub-screens";
import { ctaCopy, projectKindLabel, projectStatusLabel } from "@/data/labels";
import { projectPath, routes } from "@/data/navigation";
import { getProjectBySlug } from "@/data/projects";
import { cn } from "@/lib/cn";

const products = [
  {
    slug: "hr-hub-360",
    coord: "OWN PRODUCT / 002",
    text: "Собствена HR платформа за централизирано управление на служители, договори, документи, отпуски, присъствия и други HR процеси.",
    href: routes.hrHub360,
    cta: ctaCopy.viewHrHub,
    note: null,
    screenshot: true,
  },
  {
    slug: "stinger",
    coord: "OWN PRODUCT / 003",
    text: "Десктоп технологична система за пазарни данни, сканиране, сигнали, риск-логика и наблюдение.",
    href: projectPath("stinger"),
    cta: ctaCopy.viewStinger,
    note: "По подразбиране Signals Only — поръчки не се изпращат. Не е готов търговски продукт и не се представя като инвестиционна услуга или AI trading bot.",
    screenshot: false,
  },
] as const;

export function OwnProducts() {
  return (
    <section id="sobstveni-produkti" className="border-y border-border">
      {products.map((item, index) => {
        const project = getProjectBySlug(item.slug);
        if (!project) {
          return null;
        }

        const mist = index % 2 === 1;

        return (
          <article
            key={item.slug}
            className={cn(mist ? "bg-navy-950" : "bg-white")}
          >
            <Container
              className={cn(
                "grid gap-10 py-16 sm:py-20 lg:items-center lg:gap-16",
                item.screenshot
                  ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
                  : "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]",
              )}
            >
              <div className="min-w-0 max-w-xl">
                <p className="coord">{item.coord}</p>
                <p className="mt-4 font-display text-sm tracking-label text-electric">
                  {projectKindLabel[project.kind]} / {projectStatusLabel[project.status]}
                </p>
                <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">
                  {project.name}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                  {item.text}
                </p>
                {item.note ? (
                  <p className="mt-4 text-sm leading-relaxed text-subtle">
                    {item.note}
                  </p>
                ) : null}
                <div className="mt-8">
                  <Button href={item.href}>{item.cta}</Button>
                </div>
              </div>
              {item.screenshot ? (
                <ProductScreenshot
                  src={hrHubDashboard.src}
                  alt={hrHubDashboard.alt}
                  caption={hrHubDashboard.caption}
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              ) : (
                <div className="relative overflow-hidden rounded-[1.4rem] border border-border bg-white px-6 py-10 sm:px-8">
                  <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />
                  <div className="relative">
                    <p className="coord">SYS / SIGNALS ONLY</p>
                    <ol className="mt-8 space-y-3 text-sm font-medium tracking-label text-ink">
                      <li>MARKET DATA</li>
                      <li>SIGNAL ENGINE</li>
                      <li>RISK LOGIC</li>
                      <li>EXECUTION</li>
                      <li>MONITORING</li>
                    </ol>
                    <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
                      Слоевете са разделени. Изпълнението по подразбиране остава
                      в режим само сигнали.
                    </p>
                  </div>
                </div>
              )}
            </Container>
          </article>
        );
      })}
    </section>
  );
}
