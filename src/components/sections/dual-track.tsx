import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";

export function DualTrack() {
  return (
    <Section tone="deep" contained={false} className="relative overflow-hidden">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid w-full max-w-[1220px] px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="border-white/10 py-10 lg:border-r lg:pr-12">
          <p className="coord">TECHNOLOGY PARTNER</p>
          <h2 className="mt-5 text-3xl text-on-deep sm:text-4xl">
            Технологичен партньор
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-deep-muted">
            Проектираме и изграждаме системи според процесите, ролите и данните
            на вашия бизнес.
          </p>
          <DualVisual
            from="PROCESS"
            through="SOFIRA SYSTEMS"
            to="DIGITAL SYSTEM"
          />
          <div className="mt-8">
            <Button href={routes.services} variant="inverse">
              {ctaCopy.viewServices}
            </Button>
          </div>
        </article>
        <article className="border-t border-white/10 py-10 lg:border-t-0 lg:pl-12">
          <p className="coord">PRODUCT COMPANY</p>
          <h2 className="mt-5 text-3xl text-on-deep sm:text-4xl">
            Продуктова компания
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-deep-muted">
            Създаваме собствени продукти. HR HUB 360 е първата публична система
            в тази линия.
          </p>
          <DualVisual
            from="ARCHITECTURE"
            through="APPLICATION"
            to="USERS"
          />
          <div className="mt-8">
            <Button href={routes.products} variant="inverse">
              {ctaCopy.viewProducts}
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}

function DualVisual({
  from,
  through,
  to,
}: {
  from: string;
  through: string;
  to: string;
}) {
  return (
    <div className="mt-10 space-y-3" aria-hidden="true">
      <FlowNode label={from} />
      <div className="ml-5 h-8 w-px bg-cyan-bright/50" />
      <FlowNode label={through} accent />
      <div className="ml-5 h-8 w-px bg-cyan-bright/50" />
      <FlowNode label={to} />
    </div>
  );
}

function FlowNode({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div
      className={
        accent
          ? "rounded-lg border border-cyan-bright/40 bg-white/6 px-4 py-3 text-sm tracking-[0.16em] text-on-deep"
          : "rounded-lg border border-white/10 px-4 py-3 text-sm tracking-[0.16em] text-deep-muted"
      }
    >
      {label}
    </div>
  );
}
