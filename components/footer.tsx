import Image from "next/image";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaInstagram,
  FaDiscourse,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import DarkLogo from "@/public/logo-dark.png";
import LightLogo from "@/public/logo-light.png";

const YEAR = new Date().getFullYear();

export const Footer = (): React.ReactElement => {
  const socialLinks = [
    { href: "https://github.com/aicademyorg", icon: FaGithub, label: "GitHub" },
    { href: "https://discord.com/invite/bxnwugmNZg", icon: FaDiscord, label: "Discord" },
    { href: "https://twitter.com/aicademyorg", icon: FaXTwitter, label: "Twitter" },
    { href: "https://www.youtube.com/@aicademyorg", icon: FaYoutube, label: "YouTube" },
    { href: "https://www.instagram.com/aicademyorg", icon: FaInstagram, label: "Instagram" },
    { href: "#", icon: FaDiscourse, label: "Discourse" },
  ];

  return (
    <footer className="mt-auto border-t bg-fd-card py-13 text-fd-secondary-foreground">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between md:px-18">
        <div className="flex items-center gap-2">
          <Image
            src={LightLogo}
            className="dark:hidden w-5 md:w-[18px]"
            alt="AIcademy Logo"
          />
          <Image
            src={DarkLogo}
            className="hidden dark:flex w-5 md:w-[18px]"
            alt="AIcademy Logo"
          />
          <p className="text-sm font-medium">
            AIcademy{" "}
            <span className="text-xs font-normal text-[#757575] dark:text-[#989898] pl-[3px]">
              &copy; {YEAR}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#757575] dark:text-[#989898] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
