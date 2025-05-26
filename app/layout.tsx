import "./global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { Footer } from "@/components/footer";
// import { SiteBanner } from "@/components/banner";

export const metadata = createMetadata({
  title: {
    template: "%s | AIcademy",
    default: "AIcademy - Free AI Education for All",
  },
  description: "Free AI Education for All",
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
        <RootProvider>
          {/* <SiteBanner /> */}
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
