import {
  AppWindow,
  BrainCircuit,
  Globe,
  Layers,
  Puzzle,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceIconName } from "@/types/content";

const icons: Record<ServiceIconName, LucideIcon> = {
  globe: Globe,
  layers: Layers,
  workflow: Workflow,
  brainCircuit: BrainCircuit,
  appWindow: AppWindow,
  puzzle: Puzzle,
};

type ServiceIconProps = {
  name: ServiceIconName;
};

export function ServiceIcon({ name }: ServiceIconProps) {
  const Icon = icons[name];

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-black text-cyan">
      <Icon aria-hidden="true" size={18} />
    </span>
  );
}
