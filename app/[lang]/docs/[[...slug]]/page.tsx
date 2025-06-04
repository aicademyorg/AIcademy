import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { getGithubLastEdit } from "fumadocs-core/server";
import { Rate } from "@/components/rate";
import { onRateAction } from "@/lib/github";
import { i18n } from "@/lib/i18n";

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDXContent = page.data.body;

  const contentPath =
    lang === i18n.defaultLanguage
      ? `content/docs/${page.file.path}`
      : `content/docs/${page.file.path.replace(/\.mdx$/, `.${lang}.mdx`)}`;

  const lastEdit = await getGithubLastEdit({
    path: contentPath,
    owner: "aicademyorg",
    repo: "aicademy",
    token: process.env.GITHUB_TOKEN,
  });

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
        single: false,
      }}
      lastUpdate={lastEdit ?? undefined}
      editOnGithub={{
        sha: "main",
        owner: "aicademyorg",
        repo: "aicademy",
        path: contentPath,
      }}
      article={{
        className: "max-sm:pb-16",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <div className="-mb-4">
        <Rate onRateAction={onRateAction} lang={lang} />
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
