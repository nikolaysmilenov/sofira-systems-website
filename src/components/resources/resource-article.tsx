import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatResourceDate, type ResourceArticle } from "@/data/resources";

export function ResourceArticleView({ article }: { article: ResourceArticle }) {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">
            RESOURCE / {article.number} / {article.category}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl text-on-deep sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-deep-muted sm:text-xl">
            {article.introduction}
          </p>
          <p className="mt-6 text-xs font-medium tracking-normal text-cyan-bright">
            <time dateTime={article.publishedAt}>{formatResourceDate(article.publishedAt)}</time>
            {" · "}
            {article.readingTimeMinutes} мин. четене
          </p>
        </Container>
      </header>

      <div className="bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            {article.sections.map((section, index) => (
              <section key={section.title} className={index === 0 ? "" : "mt-14 sm:mt-16"}>
                <p className="coord">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-muted sm:text-lg sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {section.bullets.map((item) => (
                      <li key={item} className="py-3 text-base leading-relaxed text-foreground sm:text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </div>

      <section className="border-y border-border bg-navy-950">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="coord">RELATED</p>
            <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
              Продължете от реалния процес
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              {article.relatedLinks.map((link) => (
                <Button key={link.href} href={link.href} variant="ghost">
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative flex flex-col gap-7 py-14 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <p className="coord">NEXT STEP</p>
            <h2 className="mt-4 text-3xl text-on-deep sm:text-4xl">
              Имате подобен процес?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-deep-muted sm:text-lg">
              Опишете как работите днес. Ще уточним дали има смисъл от
              автоматизация, вътрешна система, AI решение или друга посока.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {article.finalLinks.map((link) => (
              <Button key={link.href} href={link.href}>
                {link.label}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
