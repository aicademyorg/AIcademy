import type { I18nConfig } from "fumadocs-core/i18n";

export const languages = ["en", "cn", "ja", "ko", "ru", "es", "fr"] as const;
export type Language = (typeof languages)[number];

export const i18n: I18nConfig = {
  defaultLanguage: "en",
  languages: [...languages],
  hideLocale: "default-locale",
};

export function localizeUrl(url: string, lang: Language): string {
  return lang === i18n.defaultLanguage ? url : `/${lang}${url}`;
}

export const uiDictionary = {
  en: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - Free AI Education for All",
      description: "A friendly community offering free AI education",
    },
    nav: {
      navigation: [
        { name: "Courses", href: "/courses" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
      ],
    },
  },
  cn: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - 免费人工智能教育",
      description: "提供免费人工智能教育的友好社区",
    },
    nav: {
      navigation: [
        { name: "课程", href: "/cn/courses" },
        { name: "博客", href: "/cn/blog" },
        { name: "关于", href: "/cn/about" },
      ],
    },
  },
  ja: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - 無料のAI教育",
      description: "無料のAI教育を提供するフレンドリーなコミュニティ",
    },
    nav: {
      navigation: [
        { name: "コース", href: "/ja/courses" },
        { name: "ブログ", href: "/ja/blog" },
        { name: "について", href: "/ja/about" },
      ],
    },
  },
  ko: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - 무료 AI 교육",
      description: "무료 AI 교육을 제공하는 친화적인 커뮤니티",
    },
    nav: {
      navigation: [
        { name: "코스", href: "/ko/courses" },
        { name: "블로그", href: "/ko/blog" },
        { name: "关于", href: "/ko/about" },
      ],
    },
  },
  ru: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - бесплатное образование в области AI",
      description:
        "Дружественная общность, предлагающая бесплатное образование в области AI",
    },
    nav: {
      navigation: [
        { name: "Курсы", href: "/ru/courses" },
        { name: "Блог", href: "/ru/blog" },
        { name: "О нас", href: "/ru/about" },
      ],
    },
  },
  es: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - Educación de IA gratuita",
      description: "Una comunidad amigable que ofrece educación de IA gratuita",
    },
    nav: {
      navigation: [
        { name: "Cursos", href: "/es/courses" },
        { name: "Blog", href: "/es/blog" },
        { name: "Acerca de", href: "/es/about" },
      ],
    },
  },
  fr: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - Éducation en IA gratuite",
      description:
        "Une communauté amicale offrant une éducation en IA gratuite",
    },
    nav: {
      navigation: [
        { name: "Cours", href: "/fr/courses" },
        { name: "Blog", href: "/fr/blog" },
        { name: "À propos", href: "/fr/about" },
      ],
    },
  },
};
