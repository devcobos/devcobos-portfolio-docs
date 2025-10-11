export const ROUTES = {
  HOME: "/",
  DOCS: "/docs",
  ABOUT: "/about",
} as const;

export const NAVIGATION_ITEMS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.ABOUT, label: "About" },
] as const;
