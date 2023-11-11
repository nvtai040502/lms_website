import { LucideIcon } from "lucide-react";

export type SidebarRoute = {
  icon: LucideIcon;
  label: string;
  href: string;
}

export type Mode = {
  routes: SidebarRoute[]
}