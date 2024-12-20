'use client'

import { BiRefresh } from 'react-icons/bi';
import { AiDisclaimer } from './AiDisclaimer';
import { PostMarkdown } from './PostMarkdown';
import { PostMetadata } from './PostMetadata';
import matter from 'gray-matter';
import { getCachedPage } from '@/utils/pageCache';
import { useEffect } from 'react';
import { cachePage } from '@/utils/pageCache';
import { useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { CachedPage } from '@/utils/pageCache';
import { fetchModifiedMarkdown } from '@/utils/aiApiConnector';

interface PersonalizedPostProps {
  markdown: string;
  slug: string;
}

export function PersonalizedPost({ markdown, slug }: PersonalizedPostProps) {
  const { data, content } = matter(markdown ?? '')
  const [modifiedContent, setModifiedContent] = useState('');
  const { selectedOptions, customPrompt, userHasWishes } = useUserContext();
  const [cachedPage, setCachedPage] = useState<CachedPage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersonalizedContent = () => {
    setIsGenerating(true);
    const cacheKey = `${slug}_${selectedOptions.join('_')}_${customPrompt}`;
    fetchModifiedMarkdown(content, selectedOptions, customPrompt)
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
    if (slug && markdown && userHasWishes) {
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
  }, [markdown, selectedOptions, customPrompt, slug, setCachedPage, setModifiedContent, userHasWishes]);

  return (
    <>
      <PostMetadata metadata={data} />
      <AiDisclaimer />
      <div className="text-sm text-gray-500 flex items-center gap-2 mt-6">
        <span>
          Generated on {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          }).format(new Date(cachedPage?.timestamp ?? Date.now()))}
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
      {isGenerating ? (
        <div className="text-center text-gray-500 mt-12">
          <span>Generating personalized version...</span>
        </div>
      ) : (
        <PostMarkdown markdownContent={modifiedContent} isModified={true} />
      )}
    </>
  )
}