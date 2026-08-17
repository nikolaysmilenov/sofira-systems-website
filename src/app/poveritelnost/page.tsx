import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Политика за поверителност",
  description:
    "Политика за поверителност на SOFIRA SYSTEMS. Пълният документ ще бъде публикуван преди събиране на лични данни чрез работеща форма.",
  path: "/poveritelnost",
  ogTitle: "Поверителност | SOFIRA SYSTEMS",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Политика за поверителност"
      description="Този документ ще бъде публикуван в пълния му вид преди сайтът да започне да обработва лични данни чрез работеща форма за контакт или клиентски профили."
    >
      <p>
        SOFIRA SYSTEMS ще публикува ясна политика за поверителност, която описва
        какви данни се събират, с каква цел и за какъв срок се съхраняват.
      </p>
      <p>
        На този етап формата за контакт валидира въведените данни, но не изпраща
        съобщения към пощенска услуга, докато такава не бъде конфигурирана.
      </p>
    </LegalPage>
  );
}
