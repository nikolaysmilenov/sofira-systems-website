import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { routes } from "@/data/navigation";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-electric">
        404
      </p>
      <h1 className="mt-4 text-3xl text-foreground sm:text-5xl">
        Страницата не беше намерена
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Адресът не съществува или е бил преместен. Можете да се върнете към
        началната страница или да разгледате услугите ни.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href={routes.home}>Към началото</Button>
        <Button href={routes.contact} variant="secondary">
          Контакт
        </Button>
      </div>
      <p className="mt-8 text-sm text-subtle">
        Ако търсите конкретен продукт, започнете от{" "}
        <Link href={routes.products} className="font-medium text-electric hover:text-electric-hover">
          продуктите
        </Link>
        .
      </p>
    </Container>
  );
}
