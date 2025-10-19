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
} from "@/constants/navigation";
import { ChevronsRightIcon } from "lucide-react";
import React from "react";

interface BreadcrumbsProps {
  className?: string;
  currentPath: string;
}

export default function Breadcrumbs({
  className,
  currentPath,
}: BreadcrumbsProps) {
  if (!currentPath || currentPath === "/") return null;

  const segments = currentPath.split("/").filter(Boolean);

  const breadcrumbs: NavigationItem[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const navItem = NAVIGATION_ITEMS_ARRAY.find((item) => item.href === href);

    return (
      navItem ?? {
        href,
        label:
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
        icon: DEFAULT_FILE_MARKDOWN_ICON,
      }
    );
  });

  const HomeIcon = NAVIGATION_ITEMS.home.icon;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            {HomeIcon && <HomeIcon className="h-4 w-4" />}
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronsRightIcon />
        </BreadcrumbSeparator>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const Icon = crumb.icon;

          return (
            <React.Fragment key={crumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1.5">
                    {Icon && <Icon className="h-4 w-4" />}
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={crumb.href}
                    className="flex items-center gap-1.5"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronsRightIcon />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
