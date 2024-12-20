'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUserContext } from './UserContext';
import { fetchModifiedMarkdown } from '@/utils/aiApiConnector';
import { MarkdownRenderer } from './MarkdownRenderer';
import ToggleButton from './ToggleButton';
import { getCachedPage, cachePage, CachedPage } from '@/utils/pageCache';
import { BiRefresh } from 'react-icons/bi';

interface MarkdownCustomizerProps {
  initialContent: string;
}

export function MarkdownCustomizer({ initialContent }: MarkdownCustomizerProps) {
  const params = useParams();
  const slug = params?.slug as string || 'home';
  const [modifiedContent, setModifiedContent] = useState('');
  const [showModified, setShowModified] = useState(true); // TODO This resets when the page is reloaded, it shouldn't
  const { selectedOptions, customPrompt } = useUserContext();
  const [cachedPage, setCachedPage] = useState<CachedPage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersonalizedContent = () => {
    setIsGenerating(true);
    const cacheKey = `${slug}_${selectedOptions.join('_')}_${customPrompt}`;
    fetchModifiedMarkdown(initialContent, selectedOptions, customPrompt)
      .then(response => {
        const newCachedPage = cachePage(cacheKey, response.text);
        setCachedPage(newCachedPage);
        setModifiedContent(response.text);
      })
      .catch(error => {
        console.error('Error fetching modified markdown:', error);
        setCachedPage(null);
        setModifiedContent('Error fetching personalized version');
      })
      .finally(() => {
        setIsGenerating(false);
      });
  }

  useEffect(() => {
    if (initialContent && (selectedOptions.length > 0 || customPrompt)) {
      const cacheKey = `${slug}_${selectedOptions.join('_')}_${customPrompt}`;
      const cached = getCachedPage(cacheKey);

      if (cached) {
        setCachedPage(cached);
        setModifiedContent(cached.content);
        return;
      }

      generatePersonalizedContent();
    } else {
      setCachedPage(null)
      setModifiedContent('');
    }
  }, [initialContent, selectedOptions, customPrompt, slug, setCachedPage, setModifiedContent]);

  return (
    <div className="w-full max-w-3xl">
      <div className="prose max-w-none">
        {isGenerating ? (
          <div className="text-center text-gray-500">
            <span>Generating personalized version...</span>
          </div>
        ) : (
          <MarkdownRenderer
            markdown={showModified && modifiedContent ? modifiedContent : initialContent}
            isModified={showModified && !!modifiedContent}
          />
        )}
      </div>

      {cachedPage && showModified && !isGenerating && (
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>
            Generated on {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short'
            }).format(new Date(cachedPage.timestamp))}
          </span>
          <button
            onClick={generatePersonalizedContent}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Regenerate content"
            disabled={isGenerating}
          >
            <BiRefresh className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="h-32">

      </div>
      {(selectedOptions.length > 0 || customPrompt) && (
        <ToggleButton
          showModified={showModified}
          toggleContent={() => setShowModified(!showModified)}
          optionOne="Original"
          optionTwo="Personalized"
        />
      )}
    </div>
  );
}