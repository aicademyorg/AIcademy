import { source } from "@/lib/source";
import type { InferPageType } from "fumadocs-core/source";

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} 
URL: ${page.url}
Source: https://raw.githubusercontent.com/aicademyorg/AIcademy/refs/heads/main/content/docs/${page.path}

${page.data.description ?? ''}
${processed}`;
}

