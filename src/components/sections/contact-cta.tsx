import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

export function ContactCta() {
  return (
    <Section>
      <Surface className="px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
        <Eyebrow>Контакт</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-foreground sm:text-[2.15rem]">
          Готови ли сте да опишете задачата?
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Можете да възложите проект или да заявите информация за HR HUB 360.
          Ще уточним обхвата и дали SOFIRA SYSTEMS е правилният партньор.
        </p>
        <div className="mt-8">
          <Button href={routes.contact}>{ctaCopy.contact}</Button>
        </div>
      </Surface>
    </Section>
  );
}
