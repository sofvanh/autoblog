import { getMarkdownContent } from '@/utils/markdownLoader';
import { MarkdownCustomizer } from "@/components/post/MarkdownCustomizer";
import { notFound } from 'next/navigation';

export default async function Home() {
  try {
    const content = await getMarkdownContent('home');
    return <MarkdownCustomizer initialContent={content} />;
  } catch (error) {
    notFound();
  }
}