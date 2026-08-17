import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { NavLinks } from "@/components/navigation/nav-links";
import { routes } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] border-b border-border bg-black">
      <Container className="flex h-full items-center justify-between gap-4">
        <Logo priority />
        <nav className="hidden lg:block" aria-label="Основна навигация">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <Button href={routes.contact}>Свържете се с нас</Button>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
