import { NavigationLink } from "@/components/ui/navigation-link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_ITEMS_ARRAY } from "@/constants/navigation";

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
