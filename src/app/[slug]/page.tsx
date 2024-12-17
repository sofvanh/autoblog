import { getMarkdownContent } from '@/utils/markdownLoader';
import { MarkdownCustomizer } from '@/components/MarkdownCustomizer';
import { notFound } from 'next/navigation';

export default async function MarkdownPage({ params }: { params: { slug: string } }) {
  try {
    const content = await getMarkdownContent(params.slug);
    return <MarkdownCustomizer initialContent={content} />;
  } catch (error) {
    notFound();
  }
}