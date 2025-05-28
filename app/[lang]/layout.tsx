import "./global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { Footer } from "@/components/footer";
import { Translations } from "fumadocs-ui/contexts/i18n";
import { Language, uiDictionary } from "@/lib/i18n";
import { Metadata } from "next";
// import { SiteBanner } from "@/components/banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const t = uiDictionary[lang].metadata;

  return createMetadata({
    title: {
      template: t.titleTemplate,
      default: t.defaultTitle,
    },
    description: t.description,
    metadataBase: baseUrl,
  });
}

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const cn: Partial<Translations> = {
  search: "搜索",
  searchNoResult: "没有找到结果",
  toc: "目录",
  tocNoHeadings: "没有目录",
  lastUpdate: "最后更新",
  chooseLanguage: "选择语言",
  nextPage: "下一页",
  previousPage: "上一页",
  chooseTheme: "选择主题",
  editOnGithub: "在GitHub上编辑",
};

const ja: Partial<Translations> = {
  search: "検索",
  searchNoResult: "結果が見つかりません",
  toc: "目次",
  tocNoHeadings: "目次がありません",
  lastUpdate: "最後の更新",
  chooseLanguage: "言語を選択",
  nextPage: "次のページ",
  previousPage: "前のページ",
  chooseTheme: "テーマを選択",
  editOnGithub: "GitHubで編集",
};

const ru: Partial<Translations> = {
  search: "поиск",
  searchNoResult: "результатов не найдено",
  toc: "содержание",
  tocNoHeadings: "содержание отсутствует",
  lastUpdate: "последнее обновление",
  chooseLanguage: "выбор языка",
  nextPage: "следующая страница",
  previousPage: "предыдущая страница",
  chooseTheme: "выбор темы",
  editOnGithub: "редактировать на GitHub",
};

const fr: Partial<Translations> = {
  search: "rechercher",
  searchNoResult: "aucun résultat trouvé",
  toc: "sommaire",
  tocNoHeadings: "aucun sommaire",
  lastUpdate: "dernière mise à jour",
  chooseLanguage: "choisir la langue",
  nextPage: "page suivante",
  previousPage: "page précédente",
  chooseTheme: "choisir le thème",
  editOnGithub: "éditer sur GitHub",
};

const locales = [
  { name: "English", locale: "en" },
  { name: "中文", locale: "cn" },
  { name: "日本語", locale: "ja" },
  { name: "Français", locale: "fr" },
  { name: "Русский", locale: "ru" },
];

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const lang = (await params).lang;
  return (
    <html
      lang={lang}
      className={`${geist.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-neutral-100 dark:bg-neutral-900"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <RootProvider
          i18n={{
            locale: lang,
            locales,
            translations: { cn, ja, ru, fr }[lang],
          }}
        >
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
