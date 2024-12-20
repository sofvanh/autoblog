import { getMarkdownContent } from '@/utils/markdownLoader';
import { notFound } from 'next/navigation';
import { PostView } from '@/components/post/PostView';

export default async function Home() {
  try {
    const content = await getMarkdownContent('home');
    return <PostView initialContent={content} slug="home" />;
  } catch (error) {
    notFound();
  }
}