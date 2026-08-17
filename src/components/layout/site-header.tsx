"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavLinks } from "@/components/navigation/nav-links";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-height)] border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border bg-white/96 shadow-[0_10px_30px_rgb(12_23_48_/_0.08)]"
          : "border-transparent bg-white/80",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Logo priority />
        <nav className="hidden lg:block" aria-label="Основна навигация">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <Button href={routes.contact}>{ctaCopy.requestProject}</Button>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
