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
import { getGithubLastEdit } from "fumadocs-core/content/github";
import { getPageTreePeers } from "fumadocs-core/page-tree";
import { Feedback } from "@/components/feedback";
import { onRateAction } from "@/lib/github";
import { i18n } from "@/lib/i18n";
import { Card, Cards } from "fumadocs-ui/components/card";
import { LLMCopyButtonWithDropdown } from "@/components/ai/page-actions";

function DocsCategory({ url, lang }: { url: string; lang: string }) {
  return (
    <Cards>
      {getPageTreePeers(source.pageTree[lang], url).map((peer) => (
        <Card key={peer.url} title={peer.name} href={peer.url}>
          {peer.description}
        </Card>
      ))}
    </Cards>
  );
}

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDXContent = page.data.body;

  // Construct file path from page slugs
  const filePath = page.slugs.join("/") + ".mdx";
  const contentPath =
    lang === i18n.defaultLanguage
      ? `content/docs/${filePath}`
      : `content/docs/${filePath.replace(/\.mdx$/, `.${lang}.mdx`)}`;

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
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1">
          <DocsTitle>{page.data.title}</DocsTitle>
          <div className="mt-4">
            <DocsDescription>{page.data.description}</DocsDescription>
          </div>
        </div>
        <div className="flex-shrink-0 sm:ml-4 pb-4 sm:pb-0">
          <LLMCopyButtonWithDropdown
            markdownUrl={`${page.url}.mdx`}
            githubUrl={`https://github.com/aicademyorg/aicademy/blob/main/content/docs/${filePath}`}
            colab={page.data.colab}
          />
        </div>
      </div>
      <DocsBody className="max-sm:pb-16">
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(source, page),
            DocsCategory: ({ url }) => {
              return <DocsCategory url={url ?? page.url} lang={lang} />;
            },
          })}
        />
        {page.data.index && <DocsCategory url={page.url} lang={lang} />}
      </DocsBody>
      <Feedback onRateAction={onRateAction} lang={lang} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams("slug", "lang");
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
