import Image from "next/image";
import {
  SiDiscord,
  SiGithub,
  SiX,
  SiYoutube,
  SiInstagram,
  SiDiscourse,
} from "react-icons/si";
import DarkLogo from "@/public/logo-dark.png";
import LightLogo from "@/public/logo-light.png";

const YEAR = new Date().getFullYear();

export const Footer = (): React.ReactElement => {
  const socialLinks = [
    { href: "https://github.com/aicademyorg", icon: SiGithub, label: "GitHub" },
    {
      href: "https://discord.com/invite/bxnwugmNZg",
      icon: SiDiscord,
      label: "Discord",
    },
    { href: "https://twitter.com/aicademyorg", icon: SiX, label: "Twitter" },
    {
      href: "https://www.youtube.com/@aicademyorg",
      icon: SiYoutube,
      label: "YouTube",
    },
    {
      href: "https://www.instagram.com/aicademyorg",
      icon: SiInstagram,
      label: "Instagram",
    },
    { href: "#", icon: SiDiscourse, label: "Discourse" },
  ];

  return (
    <footer className="mt-auto border-t bg-fd-card py-12 text-fd-secondary-foreground">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between md:px-18">
        <div className="flex items-center gap-2">
          <Image
            src={LightLogo}
            className="dark:hidden w-5 md:w-5"
            alt="AIcademy Logo"
          />
          <Image
            src={DarkLogo}
            className="hidden dark:flex w-5 md:w-5"
            alt="AIcademy Logo"
          />
          <p className="text-[15px] font-medium">
            AIcademy{" "}
            <span className="text-[13px] font-normal text-[#757575] dark:text-[#989898] pl-[3px]">
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
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
