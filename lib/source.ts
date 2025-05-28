import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { i18n } from '@/lib/i18n';
import { icons } from "lucide-react";
import { createElement } from "react";
import * as SiIcons from "react-icons/si";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  i18n,
  baseUrl: "/docs",
  icon(icon) {
    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons]);
    if (icon && icon in SiIcons)
      return createElement(SiIcons[icon as keyof typeof SiIcons]);
  },
  source: docs.toFumadocsSource(),
});
