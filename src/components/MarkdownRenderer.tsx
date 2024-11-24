import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { useEffect, useState } from 'react';

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
    <article className="pb-32">
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
      <div className={`prose prose-lg mt-8 ${isModified ? '!font-ai' : '!font-handwritten text-xl'}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  )
}