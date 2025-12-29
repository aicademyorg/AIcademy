import "./global.css";
import "katex/dist/katex.css";
import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from "fumadocs-ui/i18n";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { i18n, uiDictionary } from "@/lib/i18n";
import { Metadata } from "next";

const { provider } = defineI18nUI(i18n, {
  translations: {
    en: {
      displayName: "English",
    },
    // Add other languages
    // cn: {
    //   displayName: 'Chinese',
    //   search: '搜尋文檔',
    // },
  },
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const t =
    uiDictionary[lang as keyof typeof uiDictionary]?.metadata ||
    uiDictionary.en.metadata;

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
        <RootProvider i18n={provider(lang)}>{children}</RootProvider>
      </body>
    </html>
  );
}
