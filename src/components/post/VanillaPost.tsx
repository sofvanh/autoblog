'use client'

import { PostMarkdown } from './PostMarkdown';
import { PostMetadata } from './PostMetadata';
import matter from 'gray-matter';

export function VanillaPost({ markdown }: { markdown: string }) {
  const { data, content } = matter(markdown ?? '')

  return (
    <>
      <PostMetadata metadata={data} />
      <PostMarkdown markdownContent={content} isModified={false} />
    </>
  )
}