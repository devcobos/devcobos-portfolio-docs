import type { APIRoute } from "astro";

const pages = [
  {
    url: "",
    changefreq: "weekly",
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/about",
    changefreq: "monthly",
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/docs",
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date().toISOString(),
  },
];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      page => `
  <url>
    <loc>https://devcobos.vercel.app${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
