// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://devcobos-docs.web.app",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    expressiveCode({
      themes: ["catppuccin-mocha", "everforest-light"],
      // themeCssSelector: (theme) => {
      //   return theme.name === "github-dark" ? ".dark" : ":not(.dark)";
      // },
      useDarkModeMediaQuery: false,
      tabWidth: 2,
      useThemedScrollbars: true,
      styleOverrides: {
        borderRadius: "0.5rem",
        borderWidth: "1px",
        codePaddingBlock: "1rem",
        codePaddingInline: "1.5rem",
        codeFontSize: "0.9rem",
        codeLineHeight: "1.7",
        uiLineHeight: "1.65",
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
