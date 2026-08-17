import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-electric text-white hover:bg-electric-hover shadow-[0_8px_20px_rgb(26_109_255_/_0.22)]",
  secondary:
    "border border-border bg-white text-foreground hover:border-electric/40 hover:bg-navy-800",
  ghost: "text-muted hover:text-foreground",
} as const;

type ButtonVariant = keyof typeof variants;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export function Button(props: ButtonProps) {
  const classes = cn(
    baseClassName,
    variants[props.variant ?? "primary"],
    props.className,
  );

  if (isLinkButton(props)) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  const buttonProps = withoutKeys(props, ["className", "variant", "children", "href"]);

  return (
    <button className={classes} {...buttonProps}>
      {props.children}
    </button>
  );
}

function withoutKeys<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...object };

  for (const key of keys) {
    delete result[key];
  }

  return result;
}

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}
