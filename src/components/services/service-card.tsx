import Link from "next/link";
import { ServiceIcon } from "@/components/services/service-icon";
import { Surface } from "@/components/ui/surface";
import { getServiceHref } from "@/data/services";
import { ctaCopy } from "@/data/labels";
import { cn } from "@/lib/cn";
import type { Service } from "@/types/content";

type ServiceCardProps = {
  service: Service;
  index?: number;
  href?: string;
  className?: string;
  variant?: "teaser" | "detail";
};

export function ServiceCard({
  service,
  index,
  href = getServiceHref(service.slug),
  className,
  variant = "teaser",
}: ServiceCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <ServiceIcon name={service.icon} />
        {typeof index === "number" ? (
          <span className="font-display text-xs tracking-label text-subtle">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      {variant === "detail" ? (
        <h2 className="mt-5 text-2xl text-foreground">{service.title}</h2>
      ) : (
        <h3 className="mt-5 text-lg text-foreground">{service.title}</h3>
      )}
      <p
        className={cn(
          "mt-3 flex-1 leading-relaxed text-muted",
          variant === "detail" ? "text-sm sm:text-base" : "text-sm",
        )}
      >
        {variant === "detail" ? service.description : service.shortDescription}
      </p>
      {variant === "teaser" ? (
        <span className="mt-5 text-sm font-medium text-electric transition-colors group-hover:text-electric-hover">
          {ctaCopy.learnMore}
        </span>
      ) : null}
    </>
  );

  if (variant === "detail") {
    return (
      <section id={service.slug} className={cn("scroll-mt-28 h-full", className)}>
        <Surface className="flex h-full flex-col p-6 sm:p-8">{body}</Surface>
      </section>
    );
  }

  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Surface hover className="flex h-full flex-col p-6">
        {body}
      </Surface>
    </Link>
  );
}
