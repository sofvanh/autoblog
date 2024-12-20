'use client';

import { useState } from 'react';
import { useUserContext } from '@/components/contexts/UserContext';
import ToggleButton from './ToggleButton';
import { PersonalizedPost } from './PersonalizedPost';
import { VanillaPost } from './VanillaPost';

interface PostViewProps {
  initialContent: string;
  slug: string;
}

export function PostView({ initialContent, slug }: PostViewProps) {
  const [showModified, setShowModified] = useState(true);
  const { userHasWishes } = useUserContext();

  // TODO If the user hasn't made wishes, show a default modified version
  return (
    <>
      <article className="prose pb-32">
        {showModified && userHasWishes ? (
          <PersonalizedPost markdown={initialContent} slug={slug} />
        ) : (
          <VanillaPost markdown={initialContent} />
        )}
      </article>
      {userHasWishes && (
        <ToggleButton
          showModified={showModified}
          toggleContent={() => setShowModified(!showModified)}
          optionOne="Original"
          optionTwo="Personalized"
        />
      )}
    </>
  );
}