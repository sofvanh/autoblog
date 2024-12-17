'use client';

import { useEffect, useState } from 'react';
import { useUserContext } from './UserContext';
import { fetchModifiedMarkdown } from '@/utils/aiApiConnector';
import { MarkdownRenderer } from './MarkdownRenderer';
import ToggleButton from './ToggleButton';

interface MarkdownCustomizerProps {
  initialContent: string;
}

export function MarkdownCustomizer({ initialContent }: MarkdownCustomizerProps) {
  const [modifiedContent, setModifiedContent] = useState('');
  const [showModified, setShowModified] = useState(true);
  const { prompt } = useUserContext();

  useEffect(() => {
    if (initialContent && prompt) {
      setModifiedContent('Generating personalized version...');
      fetchModifiedMarkdown(initialContent, prompt)
        .then(response => {
          setModifiedContent(response.text);
          setShowModified(true);
        })
        .catch(error => {
          console.error('Error fetching modified markdown:', error);
          setModifiedContent('(error)');
        });
    } else {
      setModifiedContent('');
    }
  }, [initialContent, prompt]);

  const toggleContent = () => setShowModified(!showModified);

  return (
    <div className="w-full max-w-3xl">
      <div className="prose max-w-none">
        <MarkdownRenderer
          markdown={showModified && modifiedContent ? modifiedContent : initialContent}
          isModified={showModified && !!modifiedContent}
        />
      </div>
      {prompt && (
        <ToggleButton
          showModified={showModified}
          toggleContent={toggleContent}
          optionOne="Original"
          optionTwo="Personalized"
        />
      )}
    </div>
  );
}