// src/components/ButtonThemeToggle.tsx
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme";
import { Moon, Sun } from "lucide-react";

export function ButtonThemeToggle() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
