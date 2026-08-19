import { ProductScreenshot } from "@/components/products/product-screenshot";
import {
  hrHubProofPrimary,
  hrHubProofSupporting,
  type HrHubProofScreen,
} from "@/data/hr-hub-screens";
import { cn } from "@/lib/cn";

function ProofBlock({
  screen,
  primary = false,
}: {
  screen: HrHubProofScreen;
  primary?: boolean;
}) {
  return (
    <article
      className={cn(
        "grid min-w-0 gap-5",
        "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10",
      )}
    >
      <ProductScreenshot
        src={screen.src}
        alt={screen.alt}
        caption={screen.caption}
        priority={primary}
        sizes={
          primary
            ? "(max-width: 768px) 100vw, 1100px"
            : "(max-width: 768px) 100vw, 900px"
        }
      />
      <div className="min-w-0 max-w-xl lg:pt-2">
        <p className="coord">SCREEN</p>
        <h3 className="mt-3 text-2xl text-foreground sm:text-3xl">
          {screen.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {screen.process}
        </p>
      </div>
    </article>
  );
}

export function HrHubProof({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0 space-y-12 sm:space-y-16", className)}>
      <ProofBlock screen={hrHubProofPrimary} primary />
      {hrHubProofSupporting.map((screen) => (
        <ProofBlock key={screen.id} screen={screen} />
      ))}
    </div>
  );
}
