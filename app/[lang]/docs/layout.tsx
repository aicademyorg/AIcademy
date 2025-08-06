import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions, linkItems } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Language } from "@/lib/i18n";
import { Footer } from "@/components/footer";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree as any,
  links: linkItems,
  sidebar: {
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node);
        if (!meta || !node.icon) return option;

        const color = `var(--ui-color)`;

        return {
          ...option,
          icon: (
            <div
              className="[&_svg]:size-11/12 rounded-lg size-full max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
              style={
                {
                  color,
                  "--tab-color": color,
                } as object
              }
            >
              {node.icon}
            </div>
          ),
        };
      },
    },
  },
};

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: Language }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <DocsLayout
      {...baseOptions(lang)}
      {...docsOptions}
      tree={source.pageTree[lang]}
    >
      {children}
      <Footer />
    </DocsLayout>
  );
}
