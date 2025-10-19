import GithubIcon from "public/assets/static/github.svg";
import LinkedinIcon from "public/assets/static/linkedin.svg";

export enum SocialsLinks {
  GitHub = "https://github.com/devcobos",
  LinkedIn = "https://www.linkedin.com/in/leoncobos",
}

export const SocialsList: any = [
  { icon: GithubIcon, url: SocialsLinks.GitHub, label: "GitHub" },
  { icon: LinkedinIcon, url: SocialsLinks.LinkedIn, label: "LinkedIn" },
];
