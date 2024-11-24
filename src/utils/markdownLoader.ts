// TODO This should be done in the backend. When we do that, let's also allow a deeper file structure for the markdown files.

export async function loadMarkdownFile(path: string): Promise<string> {
  const normalizedPath = path || 'Home';
  let response = await fetch(`/src/content/${normalizedPath}.md`);

  if (!response?.ok) {
    throw new Error(`File not found: ${normalizedPath}`);
  }

  const text = await response.text();
  if (text.trim().toLowerCase().startsWith('<!doctype html>') ||
    text.trim().toLowerCase().startsWith('<html')) {
    throw new Error(`File is not a markdown file: ${normalizedPath}`);
  }

  return text;
}

export function processWikiLinks(content: string): string {
  return content.replace(/\[\[(.*?)\]\]/g, (_, text) => {
    const [display, path] = text.split('|').reverse();
    const linkPath = (path || display).replace(/\s+/g, '-').toLowerCase();
    return `[${display}](/${linkPath})`;
  });
}