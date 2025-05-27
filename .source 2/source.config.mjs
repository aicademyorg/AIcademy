// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// lib/i18n.ts
var i18n = {
  defaultLanguage: "en",
  languages: ["en", "es"]
};

// source.config.ts
var docs = defineDocs({
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  i18n,
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v]
  }
});
export {
  source_config_default as default,
  docs
};
