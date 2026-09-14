import type { AnchorHTMLAttributes, ReactNode } from "react";

export default function PillLink({
  href = "#",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      href={href}
      className={`whitespace-nowrap rounded-full border border-accent-2 px-5 py-2.5 text-sm font-semibold ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
