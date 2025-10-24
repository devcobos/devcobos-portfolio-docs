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
  siteTitle: "DevCobos",
  siteDescription: "Developer portfolio and documentation",
  siteUrl: "https://devcobos.vercel.app",

  // Social links
  social: {
    github: "https://github.com/devcobos",
    linkedin: "https://www.linkedin.com/in/leoncobos",
  },

  // Location
  location: "Sevilla, España",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
