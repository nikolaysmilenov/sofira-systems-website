import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ProductStatusBadge } from "@/components/products/product-status-badge";
import { HrHubShowcase } from "@/components/products/hr-hub-showcase";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuredProduct } from "@/data/products";
import { routes } from "@/data/navigation";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Проекти",
  description:
    "SOFIRA SYSTEMS развива решения за клиенти и собствени продукти. Първото публично решение е HR HUB 360. Клиентска работа се публикува само със съгласие.",
  path: "/proekti",
  ogTitle: "Избрани решения | SOFIRA SYSTEMS",
});

export default function ProjectsPage() {
  const product = featuredProduct;

  return (
    <>
      <PageHero
        tone="deep"
        eyebrow="Избрани решения"
        title="Технологично портфолио, без измислени казуси."
        description="Публикуваме само това, което реално изграждаме. Клиентски проекти се показват със съгласие. Портфолиото ще расте, когато има какво да се покаже публично."
      />
      <section className="border-b border-border bg-white">
        <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:py-20">
          <div>
            <p className="coord">OWN PRODUCT</p>
            {product ? (
              <div className="mt-4">
                <ProductStatusBadge status={product.status} />
              </div>
            ) : null}
            <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">
              HR HUB 360
            </h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-xs tracking-[0.2em] text-subtle uppercase">Проблем</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted">
                  HR процесите често се разпръскват между таблици, документи и
                  отделни инструменти.
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.2em] text-subtle uppercase">
                  Технологична концепция
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted">
                  Десктоп система за Windows с български интерфейс: служители,
                  договори, документи, отпуски, работно време, подбор и обучения
                  в една среда.
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={routes.hrHub360}>Към продукта</Button>
              <Button href={routes.services} variant="secondary">
                Клиентски системи
              </Button>
            </div>
          </div>
          {product ? <HrHubShowcase /> : null}
        </Container>
      </section>
      <Container className="py-16 sm:py-20">
        <p className="coord">CLIENT WORK</p>
        <h2 className="mt-4 text-3xl text-foreground">Решения за клиенти</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Изграждаме софтуер по поръчка според конкретна задача. Не публикуваме
          имена, логота или метрики без съгласие. Когато има публично
          представим проект, той ще се появи тук.
        </p>
      </Container>
      <ContactCta />
    </>
  );
}
