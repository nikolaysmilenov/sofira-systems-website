"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type ErrorPageProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-[11px] font-medium tracking-kicker text-electric">
        Грешка
      </p>
      <h1 className="mt-4 text-3xl text-foreground sm:text-5xl">
        Възникна неочакван проблем
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Страницата не можа да се зареди коректно. Можете да опитате отново или да
        се върнете към началната страница.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button type="button" onClick={() => retry()}>
          Опитайте отново
        </Button>
        <Button href="/" variant="secondary">
          Към началото
        </Button>
      </div>
    </Container>
  );
}
