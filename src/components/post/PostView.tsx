'use client';

import { useState } from 'react';
import { useUserContext } from '@/components/contexts/UserContext';
import { PersonalizedPost } from './PersonalizedPost';
import { VanillaPost } from './VanillaPost';
import ToggleButton from '../buttons/ToggleButton';

interface PostViewProps {
  initialContent: string;
  slug: string;
}

export function PostView({ initialContent, slug }: PostViewProps) {
  const [showModified, setShowModified] = useState(true);
  const { userHasWishes } = useUserContext();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowModified(!showModified);
    }, 150);
  };

  // TODO If the user hasn't made wishes, show a default modified version
  return (
    <>
      <article className={`prose pb-32 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        onTransitionEnd={() => setIsTransitioning(false)}>
        {showModified && userHasWishes ? (
          <PersonalizedPost markdown={initialContent} slug={slug} />
        ) : (
          <VanillaPost markdown={initialContent} />
        )}
      </article>
      {userHasWishes && (
        <ToggleButton
          showModified={showModified}
          toggleContent={handleToggle}
          optionOne="Original"
          optionTwo="Personalized"
        />
      )}
    </>
  );
}