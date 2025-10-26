import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

interface LinkCardProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function LinkCard({ href, children, className = "" }: LinkCardProps) {
  return (
    <div
      className={`group bg-card text-card-foreground hover:border-primary/50 hover:bg-primary/5 relative cursor-pointer overflow-hidden rounded-lg border shadow-sm transition-all ${className}`}
    >
      <a href={href} className="block h-full">
        <div className="relative h-full p-6 sm:p-8">
          {/* Icono estilo nota en la esquina */}
          <div className="bg-muted/80 border-border/50 group-hover:bg-primary/20 group-hover:border-primary/30 absolute top-0 right-0 flex h-8 w-8 items-center justify-center rounded-bl-lg border-b border-l transition-all sm:h-10 sm:w-10">
            <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-all sm:h-5 sm:w-5" />
          </div>
          {children}
        </div>
      </a>
    </div>
  );
}
