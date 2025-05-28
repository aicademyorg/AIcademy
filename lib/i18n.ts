import type { I18nConfig } from "fumadocs-core/i18n";

export const languages = ["en", "cn", "ja", "ru", "fr"] as const;
export type Language = (typeof languages)[number];

export const i18n: I18nConfig = {
  defaultLanguage: "en",
  languages: [...languages],
  hideLocale: "default-locale",
};

export function localizeUrl(url: string, lang: Language): string {
  return lang === i18n.defaultLanguage ? url : `/${lang}${url}`;
}

interface FeedbackTranslations {
  wasHelpful: string;
  good: string;
  bad: string;
  thankYou: string;
  submitAgain: string;
  placeholder: string;
  submit: string;
}

interface UIDictionary {
  metadata: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
  };
  nav: {
    navigation: Array<{
      name: string;
      href: string;
    }>;
  };
  feedback: FeedbackTranslations;
}

export const uiDictionary: Record<Language, UIDictionary> = {
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
    feedback: {
      wasHelpful: "Was this helpful?",
      good: "Good",
      bad: "Bad",
      thankYou: "Thank you for your feedback!",
      submitAgain: "Submit Again?",
      placeholder: "Leave your feedback...",
      submit: "Submit",
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
    feedback: {
      wasHelpful: "这个对你有帮助吗？",
      good: "满意",
      bad: "不满意",
      thankYou: "感谢您的反馈！",
      submitAgain: "再次提交？",
      placeholder: "请留下您的反馈……",
      submit: "提交",
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
    feedback: {
      wasHelpful: "これは役に立ちましたか？",
      good: "良い",
      bad: "悪い",
      thankYou: "ご意見ありがとうございます！",
      submitAgain: "再度送信しますか？",
      placeholder: "ご意見をお書きください…",
      submit: "送信",
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
    feedback: {
      wasHelpful: "Это было полезно?",
      good: "Хорошо",
      bad: "Плохо",
      thankYou: "Спасибо за ваш отзыв!",
      submitAgain: "Отправить ещё раз?",
      placeholder: "Оставьте свой отзыв...",
      submit: "Отправить",
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
    feedback: {
      wasHelpful: "Est-ce que cela a été utile ?",
      good: "Bien",
      bad: "Mal",
      thankYou: "Merci pour votre retour !",
      submitAgain: "Envoyer à nouveau ?",
      placeholder: "Laissez vos commentaires...",
      submit: "Envoyer",
    },
  },
};
