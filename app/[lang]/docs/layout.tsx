import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions, linkItems } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Language } from "@/lib/i18n";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree as any,
  links: linkItems,
  sidebar: {
    tabs: {
      transform(option, node) {
        const meta = source.getNodeMeta(node);
        if (!meta || !node.icon) return option;

        const color = `var(--${meta.file.dirname}-color, var(--ui-color))`;

        return {
          ...option,
          icon: (
            <div
              className="rounded-lg p-1.5 shadow-lg ring-2 m-px border [&_svg]:size-6.5 md:[&_svg]:size-5"
              style={
                {
                  color,
                  borderColor: `color-mix(in oklab, ${color} 50%, transparent)`,
                  "--tw-ring-color": `color-mix(in oklab, ${color} 20%, transparent)`,
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
    </DocsLayout>
  );
}
