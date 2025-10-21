import type { LucideIcon } from "lucide-react";
import { Book, FileText, Home, Info } from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAVIGATION_ITEMS: Record<string, NavigationItem> = {
  home: { href: "/", label: "Home", icon: Home },
  docs: { href: "/docs", label: "Docs", icon: Book },
  about: { href: "/about", label: "About", icon: Info },
};

export const NAVIGATION_ITEMS_ARRAY: NavigationItem[] = Object.values(NAVIGATION_ITEMS);

export const DEFAULT_FILE_MARKDOWN_ICON = FileText;
