import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  // Primero verifica localStorage
  const savedTheme = localStorage.getItem("selected_theme") as Theme;
  if (savedTheme) {
    return savedTheme;
  }

  // Luego verifica la clase en el DOM
  if (document.documentElement.classList.contains("dark")) {
    return "dark";
  }

  // Por defecto, usa la preferencia del sistema
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

const applyTheme = (theme: Theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  localStorage.setItem("selected_theme", theme);
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      applyTheme(newTheme);
      return { theme: newTheme };
    });
  },
}));
