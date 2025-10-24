import GithubIcon from "public/assets/static/github.svg";
import LinkedinIcon from "public/assets/static/linkedin.svg";
import { SITE_CONFIG } from "@/config/site.config";

export const SocialsLinks = {
  GitHub: SITE_CONFIG.social.github,
  LinkedIn: SITE_CONFIG.social.linkedin,
} as const;

export interface SocialItem {
  icon: any;
  url: string;
  label: string;
  ariaLabel?: string;
}

export const SocialsList: SocialItem[] = [
  {
    icon: GithubIcon,
    url: SocialsLinks.GitHub,
    label: "GitHub",
    ariaLabel: "Visit GitHub profile",
  },
  {
    icon: LinkedinIcon,
    url: SocialsLinks.LinkedIn,
    label: "LinkedIn",
    ariaLabel: "Visit LinkedIn profile",
  },
];
