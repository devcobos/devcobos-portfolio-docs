/**
 * Site Configuration
 * Configuración centralizada del sitio
 */

export const SITE_CONFIG = {
  // Información personal
  name: "Joaquín León Cobos",
  displayName: "DevCobos",
  description:
    "Desarrollador apasionado por crear experiencias digitales únicas. Especializado en tecnologías modernas y siempre en busca de nuevos desafíos.",
  avatar: "/assets/avatar.webp",

  // Experiencia
  experienceStartDate: "05/2022", // MM/YYYY

  // Site metadata
  siteTitle: "DevCobos - Joaquín León Cobos | Desarrollador Web",
  siteDescription:
    "DevCobos - Portfolio de Joaquín León Cobos, desarrollador web especializado en React, TypeScript y tecnologías modernas. Experiencias digitales únicas desde Sevilla, España.",
  siteUrl: "https://devcobos.vercel.app",

  // SEO Keywords
  keywords: [
    "DevCobos",
    "Joaquín León Cobos",
    "desarrollador web",
    "React developer",
    "TypeScript",
    "frontend developer",
    "Sevilla",
    "España",
    "portfolio",
    "web development",
  ],

  // Social links
  social: {
    github: "https://github.com/devcobos",
    linkedin: "https://www.linkedin.com/in/leoncobos",
  },

  // Location
  location: "Sevilla, España",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
