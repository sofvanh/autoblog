import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {

  console.log(markdown)
  const { data, content } = matter(markdown ??
    ''
  )

  console.log(markdown)

  return (
    <article>
      {/* Metadata section */}
      {data && Object.keys(data).length > 0 && (
        <div className="pt-6">
          <div className="flex flex-col gap-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium text-gray-700">{key}: </span>
                <span className="text-gray-600">
                  {Array.isArray(value) ? value.join(', ') : value.toString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markdown content */}
      <div className="prose prose-lg mt-8">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  )
}