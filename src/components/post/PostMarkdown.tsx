import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

interface PostMarkdown {
  markdownContent: string;
  isModified?: boolean;
}

export function PostMarkdown({ markdownContent, isModified }: PostMarkdown) {

  return (
    <article className="prose">
      <div
        className={
          `mt-8 
        ${isModified ?
            'font-ai text-lg' :
            'font-mono text-sm text-gray-500'}`}
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              if (href?.startsWith('/')) {
                return <Link href={href}>{children}</Link>;
              }
              return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </article>
  )
}