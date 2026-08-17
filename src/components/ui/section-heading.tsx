import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow ? (
        <Eyebrow className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold text-foreground sm:text-[2.15rem] sm:leading-tight",
          eyebrow ? "mt-4" : "mt-0",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
