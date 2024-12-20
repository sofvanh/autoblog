import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MarkdownRendererProps {
  markdown: string;
  isModified?: boolean;
}

export function MarkdownRenderer({ markdown, isModified = false }: MarkdownRendererProps) {
  const { data, content } = matter(markdown ?? '')
  const [title, setTitle] = useState<string | undefined>(data?.title);
  const [date, setDate] = useState<Date | undefined>(data?.date);
  const [metadata, setMetadata] = useState<[string, any][]>([]);

  useEffect(() => {
    if (data) {
      if (data.date) {
        setDate(data.date);
      }
      if (data.title) {
        setTitle(data.title);
      }
      const remainingData = Object.entries(data).filter(([key]) => key !== 'date' && key !== 'title');
      if (JSON.stringify(remainingData) !== JSON.stringify(metadata)) {
        setMetadata(remainingData);
      }
    } else {
      setMetadata([]);
    }
  }, [data, metadata]);

  return (
    <article className="prose">
      {title && (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}
      <div className="flex flex-col gap-2 text-gray-500 text-sm">
        {metadata && Object.keys(metadata).length > 0 && (
          <>
            {metadata.map(([key, value]) => (
              <div key={key}>
                <span>{key}: </span>
                <span>
                  {Array.isArray(value) ? value.join(', ') : value.toString()}
                </span>
              </div>
            ))}
          </>
        )}
        {date && (
          <div>
            <span>Date: </span>
            <span>{date.toLocaleDateString()}</span>
          </div>
        )}
      </div>
      {isModified && (
        <div className="border border-rose-300 bg-rose-50 text-rose-700 p-4 my-4 rounded flex justify-between items-center">
          <span>Please note that this text has been personalized by AI and might contain mistakes.</span>
          <button className="text-rose-500 font-bold">x</button> {/* TODO Make it so that this can actually be closed. */}
        </div>
      )}
      <div
        className={
          `mt-8 
        ${isModified ?
            'font-ai' :
            'font-handwritten text-xl'}`}
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
          {content}
        </ReactMarkdown>
      </div>
    </article>
  )
}