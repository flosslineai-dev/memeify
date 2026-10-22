import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "brand" | "ghost-light" | "light";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white shadow-[0_10px_30px_-10px_rgba(17,24,39,0.6)] hover:bg-[#1f2937] hover:shadow-[0_16px_40px_-12px_rgba(17,24,39,0.55)]",
  brand:
    "bg-brand text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.8)] hover:bg-brand-700",
  secondary:
    "bg-white text-ink ring-1 ring-inset ring-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:ring-slate-300 hover:bg-slate-50",
  light: "bg-white text-ink shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] hover:bg-brand-50",
  "ghost-light": "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/20",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  children: ReactNode;
};

/** A link styled as a button. Every CTA on the site navigates somewhere real. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  external,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    sizes[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export const buttonClasses = (variant: Variant = "primary", size: keyof typeof sizes = "lg") =>
  cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-out enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
  );
