import Image from "next/image";

type PlatformScreen = {
  id: "platform" | "projects" | "project-intake";
  label: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
};

const platformScreens: PlatformScreen[] = [
  {
    id: "platform",
    label: "PLATFORM",
    title: "Публична платформа",
    caption:
      "Начална страница с основна навигация към услугите, продуктите и контакта.",
    src: "/images/projects/sofira-systems/platform-home.png",
    alt: "Началната страница на SOFIRA SYSTEMS с основна навигация и представяне на услугите.",
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "Инженерни казуси",
    caption:
      "Структурирано представяне на собствените продукти и публикуваните инженерни истории.",
    src: "/images/projects/sofira-systems/projects.png",
    alt: "Страницата Проекти на SOFIRA SYSTEMS с представяне на HR HUB 360.",
  },
  {
    id: "project-intake",
    label: "PROJECT INTAKE",
    title: "Първоначално запитване",
    caption:
      "Контактна форма за проектно запитване с предварително избрана тема HR HUB 360.",
    src: "/images/projects/sofira-systems/project-intake.png",
    alt: "Контактната форма на SOFIRA SYSTEMS с предварително избрана тема HR HUB 360.",
  },
];

function ProofScreen({
  screen,
  primary = false,
}: {
  screen: PlatformScreen;
  primary?: boolean;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-border bg-navy-950 shadow-[0_20px_60px_rgb(12_23_48_/_0.12)]">
        <Image
          src={screen.src}
          alt={screen.alt}
          width={1440}
          height={900}
          sizes={
            primary
              ? "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              : "(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 580px"
          }
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-5">
        <p className="coord">{screen.label}</p>
        <h3 className="mt-3 text-2xl text-foreground">{screen.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {screen.caption}
        </p>
      </figcaption>
    </figure>
  );
}

export function SofiraPlatformProof() {
  const [primary, ...supporting] = platformScreens;

  return (
    <div className="min-w-0 space-y-12 sm:space-y-16">
      <ProofScreen screen={primary} primary />
      <div className="grid min-w-0 gap-12 lg:grid-cols-2 lg:gap-8">
        {supporting.map((screen) => (
          <ProofScreen key={screen.id} screen={screen} />
        ))}
      </div>
    </div>
  );
}
