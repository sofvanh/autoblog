import { promises as fs } from 'fs';
import path from "path";

export async function getMarkdownContent(slug: string) {
  const contentDirectory = path.join(process.cwd(), 'public', 'content');
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContent = await fs.readFile(fullPath, 'utf8');
    return processWikiLinks(fileContent);
  } catch {
    throw new Error(`File not found: ${slug}`);
  }
}

export function processWikiLinks(content: string): string {
  return content.replace(/\[\[(.*?)\]\]/g, (_, text) => {
    const [display, path] = text.split('|').reverse();
    const linkPath = (path || display).replace(/\s+/g, '-').toLowerCase();
    return `[${display}](/${linkPath})`;
  });
}