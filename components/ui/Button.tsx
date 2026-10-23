import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "gradient" | "gradient-pill" | "outline" | "text";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gradient:
    "rounded-lg bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 font-semibold text-surface",
  "gradient-pill":
    "rounded-full bg-gradient-to-r from-[#38b6ff] via-accent-2 to-accent px-6 py-3 font-semibold",
  outline:
    "rounded-lg border border-accent-2 bg-accent-3/60 px-5 py-2.5 font-semibold backdrop-blur",
  text: "font-semibold text-[#ff7acb]",
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export default function Button({
  variant = "gradient",
  className = "",
  href = "#",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block whitespace-nowrap text-center text-sm ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
