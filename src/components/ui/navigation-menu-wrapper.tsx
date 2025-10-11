// src/components/NavigationMenuWrapper.jsx
import { NavigationLink } from "@/components/ui/navigation-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_ITEMS } from "@/constants/navigation";

export default function NavigationMenuWrapper() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <NavigationLink href={item.href}>{item.label}</NavigationLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
