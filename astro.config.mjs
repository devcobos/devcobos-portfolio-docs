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

  integrations: [react(), expressiveCode(), sitemap()],
});
