import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_ITEMS_ARRAY } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-row gap-1 sm:gap-2">
        {NAVIGATION_ITEMS_ARRAY.map(item => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <NavigationLink
                href={item.href}
                className="flex items-center gap-1.5 px-2 py-1.5 text-sm sm:px-3 sm:py-2 sm:text-base"
              >
                <span>{item.label}</span>
              </NavigationLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type LinkProps = ComponentProps<"a"> & {
  href: string;
};

export function NavigationLink({ href, className, children, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn("text-foreground hover:text-primary px-4 py-2 transition-colors", className)}
      {...props}
    >
      {children}
    </a>
  );
}
