import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatResourceDate, resourcePath, resources } from "@/data/resources";

export function ResourceIndex() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-deep">
        <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p className="coord">ENGINEERING JOURNAL</p>
          <h1 className="mt-5 max-w-4xl text-4xl text-on-deep sm:text-6xl">
            Практически ресурси за софтуер, автоматизация и AI.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
            Публикуваме практически материал за това как бизнес процесите се
            превръщат в софтуерни системи — без общи обещания и без готови
            отговори за всеки случай.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-white">
        <Container className="py-14 sm:py-16 lg:py-20">
          <p className="coord">INDEX / 03 ARTICLES</p>
          <ol className="mt-8 divide-y divide-border border-y border-border">
            {resources.map((article) => (
              <li
                key={article.slug}
                className="grid min-w-0 gap-5 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[6rem_minmax(0,1fr)_auto] lg:items-end"
              >
                <p className="font-display text-3xl text-electric">{article.number}</p>
                <article className="min-w-0 max-w-3xl">
                  <p className="coord">{article.category}</p>
                  <h2 className="mt-4 text-2xl text-foreground sm:text-3xl">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                    {article.description}
                  </p>
                  <p className="mt-4 text-xs font-medium tracking-normal text-subtle">
                    {formatResourceDate(article.publishedAt)} · {article.readingTimeMinutes} мин.
                    четене
                  </p>
                </article>
                <Button href={resourcePath(article.slug)} className="w-fit">
                  Прочетете
                </Button>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
