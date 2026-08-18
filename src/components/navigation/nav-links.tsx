"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/cn";

type NavLinksProps = {
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
};

export function NavLinks({
  onNavigate,
  className,
  linkClassName,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {mainNav.map((item) => {
        const current =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "inline-flex min-h-11 items-center rounded-md px-2.5 text-sm font-medium tracking-normal transition-colors xl:px-3",
                current
                  ? "bg-electric/8 text-foreground"
                  : "text-muted hover:bg-navy-800 hover:text-foreground",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
