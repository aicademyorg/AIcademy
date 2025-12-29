import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n, uiDictionary } from "@/lib/i18n";
import Image from "next/image";
import DarkLogo from "@/public/logo-dark.png";
import LightLogo from "@/public/logo-light.png";
import { SiDiscord, SiGithub } from "react-icons/si";

export const linkItems: LinkItemType[] = [
  {
    type: "icon",
    icon: <SiGithub />,
    text: "Github",
    url: "https://github.com/aicademyorg/AIcademy",
  },
  {
    type: "icon",
    icon: <SiDiscord />,
    text: "Discord",
    url: "https://discord.com/invite/bxnwugmNZg",
  },
];

export const logo = (
  <>
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
  </>
);

export function baseOptions(locale: string): BaseLayoutProps {
  const navLinks =
    uiDictionary[locale as keyof typeof uiDictionary]?.nav?.navigation ||
    uiDictionary.en.nav.navigation;
  return {
    i18n,
    nav: {
      title: (
        <>
          {logo}
          <span className="text-[15px] font-medium">
            <span>AIcademy</span>
          </span>
        </>
      ),
      url: locale === i18n.defaultLanguage ? "/" : `/${locale}`,
      transparentMode: "top",
    },
    links: [
      ...navLinks.map((link) => ({
        text: link.name,
        url: link.href,
      })),
    ],
  };
}
