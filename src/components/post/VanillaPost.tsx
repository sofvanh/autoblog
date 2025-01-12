'use client'

import { PostMarkdown } from './PostMarkdown';

export function VanillaPost({ markdown }: { markdown: string }) {

  return (
    <>
      <div className="text-sm text-gray-400 flex items-center gap-2 mt-6 h-6">
        Showing original content
      </div>
      <PostMarkdown markdownContent={markdown} isModified={false} />
    </>
  )
}