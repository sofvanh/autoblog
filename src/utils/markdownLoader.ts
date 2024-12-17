export async function loadMarkdownFile(path: string): Promise<string> {
  const normalizedPath = path || 'Home';
  let response = await fetch(`/content/${normalizedPath}.md`);

  if (!response?.ok) {
    throw new Error(`File not found: ${normalizedPath}`);
  }

  const text = await response.text();
  return text;
}

export function processWikiLinks(content: string): string {
  return content.replace(/\[\[(.*?)\]\]/g, (_, text) => {
    const [display, path] = text.split('|').reverse();
    const linkPath = (path || display).replace(/\s+/g, '-').toLowerCase();
    return `[${display}](/${linkPath})`;
  });
}