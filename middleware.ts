import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import { createI18nMiddleware } from "fumadocs-core/i18n";
import { i18n } from "@/lib/i18n";

const i18nMiddleware = createI18nMiddleware(i18n);

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;

  // Handle .md requests
  if (pathname.endsWith('.md')) {
    const pathWithoutMd = pathname.slice(0, -3);
    
    // Extract language from path if present
    const langMatch = pathWithoutMd.match(/^\/([a-z]{2})(\/.*)?$/);
    let lang = i18n.defaultLanguage; // Use default language from i18n config
    let docPath = pathWithoutMd;
    
    if (langMatch && i18n.languages.includes(langMatch[1])) {
      lang = langMatch[1];
      docPath = langMatch[2] || '';
    } else {
      // For default language, the path doesn't include language prefix
      // So /docs/python.md should be treated as /en/docs/python
      docPath = pathWithoutMd;
    }
    
    // Remove leading slash from docPath if present
    if (docPath.startsWith('/')) {
      docPath = docPath.slice(1);
    }
    
    // Handle root/index case
    if (!docPath || docPath === '') {
      docPath = 'index';
    }
    
    // Remove 'docs' prefix if present (since the source system handles docs structure)
    if (docPath.startsWith('docs/')) {
      docPath = docPath.slice(5); // Remove 'docs/'
    } else if (docPath === 'docs') {
      docPath = 'index';
    }
    
    // Construct the llms.mdx route with language and slug
    const slugParts = docPath.split('/').filter(Boolean);
    const llmsRoute = slugParts.length > 0 
      ? `/${lang}/llms.mdx/${slugParts.join('/')}`
      : `/${lang}/llms.mdx`;
    
    return NextResponse.rewrite(new URL(llmsRoute, request.url));
  }

  // Continue with i18n middleware for non-.md requests
  return i18nMiddleware(request, event);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` but including .md files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
