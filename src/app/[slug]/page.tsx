import { PostView } from '@/components/post/PostView';
import { getMarkdownContent } from '@/utils/markdownLoader';
import { notFound } from 'next/navigation';

export default async function MarkdownPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const content = await getMarkdownContent(slug);
    return <PostView initialContent={content} slug={slug} />;
  } catch {
    notFound();
  }
}