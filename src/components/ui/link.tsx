import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<"a"> & {
  href: string;
};

export function Link({ href, className, children, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
