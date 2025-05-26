import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { baseUrl, createMetadata } from "@/lib/metadata";
import "katex/dist/katex.css";

export const metadata = createMetadata({
  title: {
    template: "%s | AIcademy",
    default: "AIcademy",
  },
  description: "Open source AI education for everyone",
  metadataBase: baseUrl,
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
