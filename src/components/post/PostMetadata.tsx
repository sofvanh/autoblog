'use client'

import { useEffect, useState } from "react";

export function PostMetadata({ metadata }: { metadata: Record<string, unknown> }) {
  const [title, setTitle] = useState<string | undefined>(metadata?.title as string | undefined);
  const [date, setDate] = useState<Date | undefined>(metadata?.date as Date | undefined);
  const [remainingMetadata, setRemainingMetadata] = useState<[string, unknown][]>([]);

  useEffect(() => {
    if (metadata) {
      if (metadata.date) {
        setDate(metadata.date as Date);
      }
      if (metadata.title) {
        setTitle(metadata.title as string);
      }
      const remainingData = Object.entries(metadata).filter(([key]) => key !== 'date' && key !== 'title');
      if (JSON.stringify(remainingData) !== JSON.stringify(remainingMetadata)) {
        setRemainingMetadata(remainingData);
      }
    } else {
      setRemainingMetadata([]);
    }
  }, [metadata, remainingMetadata]);

  return (
    <>
      {title && (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}
      <div className="flex flex-col gap-2 text-gray-500 text-sm">
        {remainingMetadata && Object.keys(remainingMetadata).length > 0 && (
          <>
            {remainingMetadata.map(([key, value]) => (
              <div key={key}>
                <span>{key}: </span>
                <span>
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </span>
              </div>
            ))}
          </>
        )}
        {date && (
          <div>
            <span>Date: </span>
            <span>{date.toLocaleDateString('en-US')}</span>
          </div>
        )}
      </div>
    </>
  )
}