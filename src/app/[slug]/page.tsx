import { PostView } from '@/components/post/PostView';
import { getMarkdownContent } from '@/utils/markdownLoader';
import { notFound } from 'next/navigation';

export default async function MarkdownPage({ params }: { params: { slug: string } }) {
  try {
    const content = await getMarkdownContent(params.slug);
    return <PostView initialContent={content} slug={params.slug} />;
  } catch {
    notFound();
  }
}