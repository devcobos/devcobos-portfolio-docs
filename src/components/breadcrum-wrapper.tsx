// components/breadcrumb-wrapper.tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DEFAULT_FILE_MARKDOWN_ICON,
  NAVIGATION_ITEMS,
  NAVIGATION_ITEMS_ARRAY,
  type NavigationItem,
} from "@/constants/navigation.constant";
import React from "react";

interface BreadcrumbWrapperProps {
  className?: string;
  currentPath: string;
}

type BreadcrumbItemWithNav = NavigationItem & {
  href: string;
  name: string;
  icon: NavigationItem["icon"];
};

export function BreadcrumbWrapper({
  className,
  currentPath,
}: BreadcrumbWrapperProps) {
  if (!currentPath || currentPath === "/") return null;

  const segments = currentPath.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItemWithNav[] = segments.map(
    (segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");

      const navItem = NAVIGATION_ITEMS_ARRAY.find((item) => item.href === href);

      return {
        href,
        label: navItem?.label ?? segment,
        icon: navItem?.icon ?? DEFAULT_FILE_MARKDOWN_ICON,
        name:
          navItem?.label ?? segment.charAt(0).toUpperCase() + segment.slice(1),
      } as BreadcrumbItemWithNav;
    },
  );

  const HomeIcon = NAVIGATION_ITEMS.home.icon;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            {HomeIcon && <HomeIcon className="h-4 w-4" />}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const Icon = crumb.icon;

          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    {Icon && <Icon className="h-4 w-4" />}
                    {crumb.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={crumb.href}
                    className="flex items-center gap-1.5"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
