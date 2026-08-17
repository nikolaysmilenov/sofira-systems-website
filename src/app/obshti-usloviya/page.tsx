import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Общи условия",
  description:
    "Общи условия за ползване на уебсайта на SOFIRA SYSTEMS. Текстът ще бъде публикуван преди търговска употреба, абонаменти или клиентски профили.",
  path: "/obshti-usloviya",
  ogTitle: "Общи условия | SOFIRA SYSTEMS",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Общи условия"
      description="Общите условия за ползване на сайта и бъдещите продукти ще бъдат публикувани преди търговска употреба."
    >
      <p>
        Този раздел е подготвен като постоянна правна страница. Пълният текст ще
        бъде добавен, когато сайтът започне да предлага платени услуги, абонаменти
        или клиентски профили.
      </p>
      <p>
        Дотогава съдържанието на сайта е информативно и не създава договор за
        покупка или абонамент.
      </p>
    </LegalPage>
  );
}
