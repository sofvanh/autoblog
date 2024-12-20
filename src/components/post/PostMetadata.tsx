'use client'

import { useEffect, useState } from "react";

export function PostMetadata({ metadata }: { metadata: { [key: string]: any } }) {
  const [title, setTitle] = useState<string | undefined>(metadata?.title);
  const [date, setDate] = useState<Date | undefined>(metadata?.date);
  const [remainingMetadata, setRemainingMetadata] = useState<[string, any][]>([]);

  useEffect(() => {
    if (metadata) {
      if (metadata.date) {
        setDate(metadata.date);
      }
      if (metadata.title) {
        setTitle(metadata.title);
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
    </>
  )
}