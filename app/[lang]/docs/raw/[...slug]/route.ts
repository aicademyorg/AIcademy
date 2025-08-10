import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';

async function findFileWithParentheses(
  basePath: string,
  segments: string[],
): Promise<string | null> {
  if (segments.length === 0) return null;

  const [current, ...rest] = segments;
  const currentPath = join(basePath, current);

  if (rest.length === 0) {
    if (existsSync(currentPath)) {
      return currentPath;
    }
  } else if (existsSync(currentPath)) {
    const found = await findFileWithParentheses(currentPath, rest);
    if (found) return found;
  }

  try {
    const entries = await readdir(basePath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith('(') && entry.name.endsWith(')')) {
        const parenthesesPath = join(basePath, entry.name);

        if (rest.length === 0) {
          const filePath = join(parenthesesPath, current);
          if (existsSync(filePath)) {
            return filePath;
          }
        } else {
          const found = await findFileWithParentheses(parenthesesPath, [current, ...rest]);
          if (found) return found;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  try {
    const { slug = [] } = await params;
    const basePath = join(process.cwd(), 'content/docs');

    const directPath = join(basePath, ...slug);
    if (existsSync(directPath)) {
      const content = await readFile(directPath, 'utf-8');
      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      });
    }

    const foundPath = await findFileWithParentheses(basePath, slug);
    if (foundPath) {
      const content = await readFile(foundPath, 'utf-8');
      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      });
    }

    return new NextResponse('File not found', { status: 404 });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
