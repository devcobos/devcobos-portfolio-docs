import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { techStack, type Technology } from "@/constants/techStack";

interface TechBadgeProps extends Technology {
  isActive: boolean;
  onHover: (name: string | null) => void;
}

const TechBadge = ({ name, icon, color, isActive, onHover }: TechBadgeProps) => {
  const handleMouseEnter = useCallback(() => onHover(name), [name, onHover]);
  const handleMouseLeave = useCallback(() => onHover(null), [onHover]);

  const activeStyles = isActive
    ? {
        boxShadow: `0 0 15px ${color}50, 0 2px 8px rgba(0,0,0,0.1)`,
        backgroundColor: `${color}12`,
        borderColor: `${color}40`,
      }
    : undefined;

  return (
    <Badge
      variant="secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer gap-1.5 px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105"
      style={activeStyles}
    >
      <img
        src={icon}
        alt={`${name} icon`}
        className="h-3 w-3 transition-transform duration-200 group-hover:scale-105"
      />
      <span className="transition-colors duration-200">{name}</span>

      {isActive && (
        <div
          className="absolute inset-0 rounded-md opacity-30"
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent 60%)`,
          }}
        />
      )}
    </Badge>
  );
};

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <header className="mb-2 flex items-center gap-2">
    <div className="flex items-center gap-1.5">
      <div className="from-primary to-primary/60 h-0.5 w-4 rounded-full bg-gradient-to-r transition-all duration-300 group-hover/section:w-6" />
      <h3 className="text-foreground/80 group-hover/section:text-foreground text-xs font-semibold tracking-wide transition-colors duration-300">
        {title}
      </h3>
    </div>
    <span className="text-muted-foreground/60 text-[10px] font-medium">({count})</span>
  </header>
);

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex-1 space-y-4 select-none">
      {techStack.map(({ title, technologies }, index) => (
        <section key={title} className="group/section">
          <SectionHeader title={title} count={technologies.length} />

          <div className="flex flex-wrap gap-1.5">
            {technologies.map(tech => (
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
