import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Политика за бисквитки",
  description:
    "Политика за бисквитки на SOFIRA SYSTEMS. На този етап се използват само технически необходими средства за работата на сайта.",
  path: "/biskvitki",
  ogTitle: "Бисквитки | SOFIRA SYSTEMS",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Политика за бисквитки"
      description="На този етап сайтът използва единствено технически необходими средства за работата си. Пълна политика ще бъде публикувана, ако бъдат добавени аналитични или маркетингови бисквитки."
    >
      <p>
        Не поставяме маркетингови банери и не претендираме за съгласие, което все
        още не е необходимо.
      </p>
      <p>
        Ако в бъдеще бъдат добавени измерване на посещения или вградени услуги,
        тук ще опишем какви бисквитки се използват и как могат да бъдат управлявани.
      </p>
    </LegalPage>
  );
}
