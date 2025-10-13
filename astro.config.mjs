import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://devcobos-docs.web.app",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    expressiveCode({
      themes: ["catppuccin-latte", "catppuccin-mocha"],
      themeCssSelector: (theme) => {
        return theme.name === "catppuccin-mocha" ? ".dark" : ":root:not(.dark)";
      },
      useDarkModeMediaQuery: false,
      tabWidth: 2,
      useThemedScrollbars: true,
      styleOverrides: {
        borderRadius: "0.5rem",
        borderWidth: "1px",
        borderColor: "var(--color-border)",
        codePaddingBlock: "1rem",
        codePaddingInline: "1.5rem",
        codeFontSize: "0.9rem",
        codeLineHeight: "1.7",
        uiLineHeight: "1.65",

        codeBackground: "var(--color-card)",

        frames: {
          shadowColor: "transparent",
          frameBoxShadowCssValue: "none",
          editorBackground: "var(--color-card)",
          editorTabBarBackground: "var(--color-muted)",
          editorTabBarBorderColor: "var(--color-border)",
          editorTabBarBorderBottomColor: "var(--color-border)",
          editorActiveTabBackground: "var(--color-card)",
          editorActiveTabForeground: "var(--color-foreground)",
          editorActiveTabBorderColor: "transparent",
          editorActiveTabIndicatorTopColor: "var(--color-primary)",
          editorActiveTabIndicatorBottomColor: "transparent",
          terminalBackground: "var(--color-card)",
          terminalTitlebarBackground: "var(--color-muted)",
          terminalTitlebarForeground: "var(--color-foreground)",
          terminalTitlebarBorderBottomColor: "var(--color-border)",
          inlineButtonForeground: "var(--color-foreground)",
          inlineButtonBackground: "var(--color-muted)",
          inlineButtonBorder: "var(--color-border)",
          inlineButtonBackgroundIdleOpacity: "0",
          inlineButtonBackgroundHoverOrFocusOpacity: "0.1",
          inlineButtonBackgroundActiveOpacity: "0.2",
          tooltipSuccessBackground: "var(--color-primary)",
          tooltipSuccessForeground: "var(--color-primary-foreground)",
        },
      },
      frames: {
        showCopyToClipboardButton: true,
        extractFileNameFromCode: true,
        removeCommentsWhenCopyingTerminalFrames: true,
      },
    }),
    sitemap(),
  ],
});
