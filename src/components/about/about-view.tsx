import { ContactCta } from "@/components/sections/contact-cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  aboutBeliefs,
  aboutClose,
  aboutPageHero,
  aboutProcess,
  aboutSystems,
  aboutTechnology,
  aboutTrust,
  aboutWho,
} from "@/data/about-page";
import { ctaCopy } from "@/data/labels";
import { routes } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function AboutView() {
  return (
    <>
      <AboutHero />
      <AboutWho />
      <AboutBeliefs />
      <AboutProcess />
      <AboutTrust />
      <AboutSystems />
      <AboutTechnology />
      <ContactCta
        title={aboutClose.title}
        description={aboutClose.description}
      />
    </>
  );
}

function AboutHero() {
  return (
    <section className="deep-section relative overflow-hidden border-b border-white/10">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <Container className="relative min-w-0 py-16 sm:py-20 lg:py-24">
        <p className="coord">{aboutPageHero.coord}</p>
        <h1 className="mt-5 max-w-4xl text-[2.15rem] text-on-deep sm:text-5xl lg:text-[4.15rem]">
          {aboutPageHero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
          {aboutPageHero.description}
        </p>
        <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={routes.contact} className="w-full sm:w-auto">
            {ctaCopy.requestProject}
          </Button>
          <Button
            href={routes.projects}
            variant="inverse"
            className="w-full sm:w-auto"
          >
            {ctaCopy.viewProjects}
          </Button>
        </div>
        <p className="mt-8 text-xs font-medium tracking-label text-deep-muted">
          {aboutPageHero.kicker}
        </p>
      </Container>
    </section>
  );
}

function AboutWho() {
  return (
    <Section>
      <p className="coord">{aboutWho.coord}</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        {aboutWho.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {aboutWho.lead}
      </p>
      <p className="mt-12 text-xs font-medium tracking-kicker text-subtle">
        {aboutWho.startLabel}
      </p>
      <ol className="mt-6 max-w-xl">
        {aboutWho.start.map((item, index) => (
          <li key={item.label} className="flex min-w-0 gap-4">
            <div className="flex w-10 shrink-0 flex-col items-center">
              <span className="font-display text-sm text-electric">
                {item.index}
              </span>
              {index < aboutWho.start.length - 1 ? (
                <span
                  className="mt-1 h-full min-h-6 w-px bg-electric/30"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="mt-1 h-6 w-px bg-electric/30"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="pb-6 text-base text-foreground sm:text-lg">
              {item.label}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-2 max-w-xl font-display text-sm tracking-label text-electric">
        ↓ {aboutWho.close}
      </p>
    </Section>
  );
}

function AboutBeliefs() {
  return (
    <Section tone="mist">
      <p className="coord">{aboutBeliefs.coord}</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        {aboutBeliefs.title}
      </h2>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {aboutBeliefs.items.map((item) => (
          <li
            key={item.index}
            className="grid min-w-0 gap-3 py-8 lg:grid-cols-[5rem_minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-10"
          >
            <span className="font-display text-2xl text-electric">
              {item.index}
            </span>
            <h3 className="text-2xl text-foreground sm:text-3xl">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AboutProcess() {
  return (
    <Section id="kak-rabotim" className="relative overflow-hidden" tone="deep">
      <div className="blueprint-grid-deep pointer-events-none absolute inset-0" />
      <div className="relative min-w-0">
        <p className="coord">{aboutProcess.coord}</p>
        <h2 className="mt-4 max-w-3xl text-3xl text-on-deep sm:text-5xl">
          {aboutProcess.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
          {aboutProcess.description}
        </p>
        <ol className="mt-14">
          {aboutProcess.steps.map((step, index) => (
            <li key={step.index} className="flex min-w-0 gap-4 sm:gap-6">
              <div className="flex w-12 shrink-0 flex-col items-center self-stretch sm:w-14">
                <span className="flex size-10 items-center justify-center rounded-full border border-cyan-bright/40 bg-white/6 font-display text-sm text-cyan-bright sm:size-12 sm:text-base">
                  {step.index}
                </span>
                {index < aboutProcess.steps.length - 1 ? (
                  <span
                    className="min-h-8 w-px flex-1 bg-cyan-bright/35"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div
                className={cn(
                  "min-w-0 flex-1 pb-10",
                  index === aboutProcess.steps.length - 1 && "pb-0",
                )}
              >
                <h3 className="pt-1.5 text-2xl text-on-deep sm:pt-2 sm:text-3xl">
                  {step.title}
                </h3>
                <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
                  <ProcessCell label="Правим" text={step.action} />
                  <ProcessCell label="Получавате" text={step.outcome} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function ProcessCell({ label, text }: { label: string; text: string }) {
  return (
    <div className="min-w-0 border-l border-cyan-bright/35 pl-4">
      <p className="text-xs font-medium tracking-kicker text-cyan-bright">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-deep-muted sm:text-base">
        {text}
      </p>
    </div>
  );
}

function AboutTrust() {
  return (
    <Section tone="mist">
      <p className="coord">{aboutTrust.coord}</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        {aboutTrust.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {aboutTrust.description}
      </p>
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {aboutTrust.items.map((item, index) => (
          <li
            key={item.title}
            className="grid min-w-0 gap-3 py-7 sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]"
          >
            <span className="font-display text-xl text-electric">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl text-foreground sm:text-2xl">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function AboutSystems() {
  return (
    <section>
      <div className="border-b border-border bg-white">
        <Container className="py-16 sm:py-20">
          <p className="coord">{aboutSystems.coord}</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
            {aboutSystems.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {aboutSystems.description}
          </p>
        </Container>
      </div>
      {aboutSystems.items.map((project, index) => (
        <article
          key={project.href}
          className={cn(
            "border-b border-border",
            index % 2 === 1 ? "bg-navy-950" : "bg-white",
          )}
        >
          <Container className="grid min-w-0 gap-6 py-14 sm:py-16 lg:grid-cols-[7rem_minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <p className="font-display text-3xl text-electric">{project.index}</p>
            <div className="min-w-0 max-w-3xl">
              <p className="font-display text-sm tracking-label text-electric">
                {project.kicker}
              </p>
              <h3 className="mt-3 text-3xl text-foreground sm:text-4xl">
                {project.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {project.summary}
              </p>
            </div>
            <Button href={project.href} className="w-fit">
              {ctaCopy.viewProject}
            </Button>
          </Container>
        </article>
      ))}
    </section>
  );
}

function AboutTechnology() {
  return (
    <Section tone="mist">
      <p className="coord">{aboutTechnology.coord}</p>
      <h2 className="mt-4 max-w-3xl text-3xl text-foreground sm:text-5xl">
        {aboutTechnology.title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {aboutTechnology.description}
      </p>
      <ul className="mt-10 flex min-w-0 flex-wrap gap-2">
        {aboutTechnology.names.map((name) => (
          <li
            key={name}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm text-foreground"
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <Button href={aboutTechnology.href}>{ctaCopy.viewTechnology}</Button>
      </div>
    </Section>
  );
}
