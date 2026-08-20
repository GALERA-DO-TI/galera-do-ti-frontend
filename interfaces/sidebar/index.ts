import type { ReactElement } from "react";

export interface SubmenuSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface SidebarLink {
  label: string;
  href: string;
  icon: (props: { className?: string }) => ReactElement;
  active?: boolean;
  submenu?: SubmenuSection[];
}

export interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}
