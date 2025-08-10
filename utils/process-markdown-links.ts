/**
 * Processes markdown content to convert relative links to absolute URLs with .md extension
 * This is used when copying markdown content for LLMs
 */
export function processMarkdownLinks(
    content: string,
    baseUrl: string = 'https://aicademyorg.netlify.app/',
  ): string {
    // Process standard markdown links: [text](/path)
    content = content.replace(/\[([^\]]+)\]\(\/([^)]+)\)/g, (match, text, path) => {
      // Skip if it's already an absolute URL
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return match;
      }
  
      // Remove any trailing slashes
      const cleanPath = path.replace(/\/$/, '');
  
      // Don't add .md if it already has an extension or is an anchor
      if (cleanPath.includes('.') || cleanPath.includes('#')) {
        return `[${text}](${baseUrl}/${cleanPath})`;
      }
  
      // Add .md extension for documentation links
      return `[${text}](${baseUrl}/${cleanPath}.md)`;
    });
  
    // Process HTML links: <a href="/path">
    content = content.replace(/href="\/([^"]+)"/g, (match, path) => {
      // Skip if it's already an absolute URL
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return match;
      }
  
      // Remove any trailing slashes
      const cleanPath = path.replace(/\/$/, '');
  
      // Don't add .md if it already has an extension or is an anchor
      if (cleanPath.includes('.') || cleanPath.includes('#')) {
        return `href="${baseUrl}/${cleanPath}"`;
      }
  
      // Add .md extension for documentation links
      return `href="${baseUrl}/${cleanPath}.md"`;
    });
  
    // Process reference-style links: [text]: /path
    content = content.replace(/^\[([^\]]+)\]:\s*\/(.+)$/gm, (match, ref, path) => {
      // Skip if it's already an absolute URL
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return match;
      }
  
      // Remove any trailing slashes
      const cleanPath = path.replace(/\/$/, '');
  
      // Don't add .md if it already has an extension
      if (cleanPath.includes('.') || cleanPath.includes('#')) {
        return `[${ref}]: ${baseUrl}/${cleanPath}`;
      }
  
      // Add .md extension for documentation links
      return `[${ref}]: ${baseUrl}/${cleanPath}.md`;
    });
  
    return content;
  }
  