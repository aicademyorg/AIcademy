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
  viewOnGitHub: string;
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
      wasHelpful: "Was this page helpful?",
      good: "Yes",
      bad: "No",
      thankYou: "Thank you for your feedback!",
      submitAgain: "Submit Again?",
      placeholder: "Leave your feedback...",
      submit: "Submit",
      viewOnGitHub: "View on GitHub",
    },
  },
  cn: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - 免费AI教育平台",
      description: "一个提供免费AI教育的友好社区",
    },
    nav: {
      navigation: [
        { name: "课程", href: "/cn/courses" },
        { name: "博客", href: "/cn/blog" },
        { name: "关于我们", href: "/cn/about" },
      ],
    },
    feedback: {
      wasHelpful: "这个页面对您有帮助吗？",
      good: "有帮助",
      bad: "没帮助",
      thankYou: "感谢您的反馈！",
      submitAgain: "要再次提交吗？",
      placeholder: "欢迎留下您的反馈……",
      submit: "提交",
      viewOnGitHub: "在 GitHub 查看",
    },
  },

  ja: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - 無料で学べるAI教育",
      description: "誰でも無料で学べる、フレンドリーなAI教育コミュニティ",
    },
    nav: {
      navigation: [
        { name: "コース", href: "/ja/courses" },
        { name: "ブログ", href: "/ja/blog" },
        { name: "概要", href: "/ja/about" },
      ],
    },
    feedback: {
      wasHelpful: "このページは役に立ちましたか？",
      good: "はい",
      bad: "いいえ",
      thankYou: "ご意見ありがとうございます！",
      submitAgain: "もう一度送信しますか？",
      placeholder: "ご意見・ご感想をご記入ください…",
      submit: "送信する",
      viewOnGitHub: "GitHub で見る",
    },
  },
  ru: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy — бесплатное образование в сфере ИИ",
      description:
        "Дружелюбное сообщество, предлагающее бесплатное обучение ИИ",
    },
    nav: {
      navigation: [
        { name: "Курсы", href: "/ru/courses" },
        { name: "Блог", href: "/ru/blog" },
        { name: "О проекте", href: "/ru/about" },
      ],
    },
    feedback: {
      wasHelpful: "Эта страница была полезной?",
      good: "Да",
      bad: "Нет",
      thankYou: "Спасибо за отзыв!",
      submitAgain: "Отправить снова?",
      placeholder: "Оставьте свой отзыв...",
      submit: "Отправить",
      viewOnGitHub: "Посмотреть на GitHub",
    },
  },
  fr: {
    metadata: {
      titleTemplate: "%s | AIcademy",
      defaultTitle: "AIcademy - Éducation gratuite à l'IA",
      description:
        "Une communauté bienveillante proposant une éducation gratuite à l'IA",
    },
    nav: {
      navigation: [
        { name: "Cours", href: "/fr/courses" },
        { name: "Blog", href: "/fr/blog" },
        { name: "À propos", href: "/fr/about" },
      ],
    },
    feedback: {
      wasHelpful: "Cette page vous a-t-elle été utile ?",
      good: "Oui",
      bad: "Non",
      thankYou: "Merci pour votre retour !",
      submitAgain: "Envoyer un autre retour ?",
      placeholder: "Laissez-nous votre avis...",
      submit: "Envoyer",
      viewOnGitHub: "Voir sur GitHub",
    },
  },
};
