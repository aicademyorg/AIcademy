import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://aicademyorg.netlify.app",
      images: "/banner.png",
      siteName: "AIcademy",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@aicademyorg",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.png",
      ...override.twitter,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development" || !process.env.VERCEL_URL
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL}`);
