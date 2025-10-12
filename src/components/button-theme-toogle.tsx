import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme.store";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ButtonThemeToggle() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();

    setTimeout(() => setIsAnimating(false), 500);
  };

  const buttonClasses = `cursor-pointer ${
    isAnimating ? "animate-in zoom-in-95 duration-200" : ""
  }`;

  const sunClasses =
    "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90";

  const moonClasses =
    "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={buttonClasses}
      style={{
        animation: isAnimating ? "jelly 0.5s ease-in-out" : "none",
      }}
    >
      <Sun className={sunClasses} data-state={isAnimating ? "hide" : "show"} />
      <Moon
        className={moonClasses}
        data-state={isAnimating ? "show" : "hide"}
      />
      <span className="sr-only">Toggle theme</span>

      <style>{`
        @keyframes jelly {
          0%, 100% { transform: scale(1, 1); }
          25% { transform: scale(0.9, 1.1); }
          50% { transform: scale(1.1, 0.9); }
          75% { transform: scale(0.95, 1.05); }
        }
      `}</style>
    </Button>
  );
}
