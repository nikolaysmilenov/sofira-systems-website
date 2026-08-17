import Image from "next/image";
import { cn } from "@/lib/cn";

type ProductScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function ProductScreenshot({
  src,
  alt,
  caption,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 1100px",
}: ProductScreenshotProps) {
  return (
    <figure className={cn("hr-frame", className)}>
      <div className="relative aspect-[16/10] min-h-[200px] overflow-hidden bg-hr-canvas">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-left-top sm:object-top"
        />
        <p className="absolute left-3 top-3 z-10 rounded-full bg-white/92 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-[#0c1929] shadow-[0_8px_18px_rgb(12_23_48_/_0.16)] sm:left-4 sm:top-4">
          Демонстрационни данни
        </p>
      </div>
      {caption ? (
        <figcaption className="border-t border-hr-border bg-white px-4 py-3 text-xs leading-relaxed text-subtle sm:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
