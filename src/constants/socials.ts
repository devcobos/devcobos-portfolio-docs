import GithubIcon from "public/assets/static/github.svg";
import LinkedinIcon from "public/assets/static/linkedin.svg";

export enum SocialsLinks {
  GitHub = "https://github.com/devcobos",
  LinkedIn = "https://www.linkedin.com/in/leoncobos",
}

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
