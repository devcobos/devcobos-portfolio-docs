import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<"a"> & {
  href: string;
};

export function NavigationLink({
  href,
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "text-foreground hover:text-primary px-4 py-2 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
