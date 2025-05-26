import defaultMdxComponents from "fumadocs-ui/mdx";
import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import * as icons from "lucide-react";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Mermaid } from "@/components/mdx/mermaid";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    Accordion,
    Accordions,
    Mermaid,
    ...components,
  };
}
