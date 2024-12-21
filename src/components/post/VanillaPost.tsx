'use client'

import { PostMarkdown } from './PostMarkdown';
import { PostMetadata } from './PostMetadata';
import matter from 'gray-matter';

export function VanillaPost({ markdown }: { markdown: string }) {
  const { data, content } = matter(markdown ?? '')

  return (
    <>
      <PostMetadata metadata={data} />
      <div className="text-xs text-gray-400 flex items-center gap-2 mt-6 h-6">
        Showing original content
      </div>
      <PostMarkdown markdownContent={content} isModified={false} />
    </>
  )
}