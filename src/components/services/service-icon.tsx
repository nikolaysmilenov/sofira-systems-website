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
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-electric/8 text-electric">
      <Icon aria-hidden="true" size={20} />
    </span>
  );
}
