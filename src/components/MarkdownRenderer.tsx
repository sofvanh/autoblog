import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const { data, content } = matter(markdown ?? '')
  const [date, setDate] = useState<Date | undefined>(data?.date);
  const [metadata, setMetadata] = useState<[string, any][]>([]);

  useEffect(() => {
    if (data) {
      if (data.date) {
        setDate(data.date);
      }
      const remainingData = Object.entries(data).filter(([key]) => key !== 'date');
      if (JSON.stringify(remainingData) !== JSON.stringify(metadata)) {
        setMetadata(remainingData);
      }
    } else {
      setMetadata([]);
    }
  }, [data, metadata]);

  return (
    <article className="pb-32">
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
      <div className="prose prose-lg mt-8">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  )
}