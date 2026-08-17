import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
  priority?: boolean;
};

const sizes = {
  sm: 36,
  md: 42,
  lg: 72,
};

export function Logo({
  size = "md",
  withWordmark = true,
  priority = false,
}: LogoProps) {
  const height = sizes[size];
  const width = Math.round(
    (height * site.logo.markWidth) / site.logo.markHeight,
  );

  return (
    <Link
      href="/"
      aria-label={`${site.name} — начална страница`}
      className="group inline-flex min-w-0 items-center gap-3 rounded-sm"
    >
      <Image
        src={site.logo.mark}
        alt=""
        width={site.logo.markWidth}
        height={site.logo.markHeight}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="shrink-0 object-contain"
        style={{ width, height }}
      />
      {withWordmark ? (
        <span className="flex shrink-0 flex-col leading-none">
          <span
            className={cn(
              "font-display font-semibold tracking-[0.12em] text-foreground sm:tracking-[0.18em]",
              size === "lg" ? "text-lg" : "text-[13px] sm:text-sm",
            )}
          >
            SOFIRA
          </span>
          <span
            className={cn(
              "mt-1 tracking-[0.22em] text-muted sm:tracking-[0.38em]",
              size === "lg" ? "text-[11px]" : "text-[9px] sm:text-[10px]",
            )}
          >
            SYSTEMS
          </span>
        </span>
      ) : null}
    </Link>
  );
}
