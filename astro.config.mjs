import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://devcobos.vercel.app",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(), 
    expressiveCode(), 
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000,
    })
  ],
});
