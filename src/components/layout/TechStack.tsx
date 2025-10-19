import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { techStack, type Technology } from "@/constants/techStack";

interface TechBadgeProps extends Technology {
  isActive: boolean;
  onHover: (name: string | null) => void;
}

const TechBadge = ({
  name,
  icon,
  color,
  isActive,
  onHover,
}: TechBadgeProps) => (
  <Badge
    variant="secondary"
    onMouseEnter={() => onHover(name)}
    onMouseLeave={() => onHover(null)}
    className="relative gap-1 px-1.5 py-0.5 text-xs transition-all duration-300 hover:scale-105"
    style={
      isActive
        ? {
            boxShadow: `0 0 20px ${color}60, 0 0 40px ${color}30`,
            backgroundColor: `${color}10`,
          }
        : undefined
    }
  >
    <img src={icon} alt={name} className="relative z-10 h-3 w-3" />
    <span className="relative z-10">{name}</span>
  </Badge>
);

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex-1 space-y-3 select-none">
      {techStack.map(({ title, technologies }) => (
        <section key={title}>
          <header className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
            {title}
            <span className="text-muted-foreground text-[10px]">
              ({technologies.length})
            </span>
          </header>

          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <TechBadge
                key={tech.name}
                {...tech}
                isActive={hovered === tech.name}
                onHover={setHovered}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
