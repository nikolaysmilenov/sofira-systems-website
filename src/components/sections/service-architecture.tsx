import { Button } from "@/components/ui/button";
import { ctaCopy } from "@/data/labels";
import { contactPath, routes } from "@/data/navigation";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";

export function ServiceArchitecture() {
  return (
    <div>
      {services.map((service, index) => {
        const mist = index % 2 === 1;
        const href =
          service.group === "product"
            ? routes.hrHub360
            : contactPath(service.inquiry);
        const cta =
          service.group === "product"
            ? ctaCopy.viewHrHub
            : ctaCopy.discussProject;

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={cn(
              "scroll-mt-28 border-b border-border py-16 sm:py-20 lg:py-24",
              mist ? "bg-navy-950" : "bg-white",
            )}
          >
            <div className="mx-auto grid w-full max-w-[1220px] gap-8 px-4 sm:px-6 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12 lg:px-8">
              <p className="font-display text-3xl text-electric">
                {String(index + 1).padStart(2, "0")}
              </p>
              <article className="max-w-4xl">
                <p className="coord">
                  {service.group === "product" ? "OWN PRODUCT" : "CLIENT SYSTEM"}
                </p>
                <h2 className="mt-4 text-3xl text-foreground sm:text-5xl">
                  {service.title}
                </h2>

                <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium tracking-kicker text-subtle">
                      Проблем
                    </dt>
                    <dd className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                      {service.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium tracking-kicker text-subtle">
                      Какво изграждаме
                    </dt>
                    <dd className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
                      {service.solution}
                    </dd>
                  </div>
                </dl>

                <div className="mt-10">
                  <p className="text-xs font-medium tracking-kicker text-subtle">
                    Типични компоненти
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.components.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button href={href}>{cta}</Button>
                </div>
              </article>
            </div>
          </section>
        );
      })}
    </div>
  );
}
