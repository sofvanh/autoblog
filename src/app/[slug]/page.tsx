import { MarkdownCustomizer } from '@/components/MarkdownCustomizer';

export default function MarkdownPage({ params }: { params: { slug: string } }) {
  return (
    <MarkdownCustomizer path={params.slug} />
  );
}