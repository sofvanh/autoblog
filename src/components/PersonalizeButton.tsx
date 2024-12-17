'use client';

import { useState } from 'react';
import { useUserContext } from '@/components/UserContext';
import PersonalizeModal from '@/components/modals/PersonalizeModal';

export default function PersonalizeButton() {
  const { prompt, userDescription, setPrompt } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {userDescription ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-emerald-800">Viewing as:</span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors hover:border-emerald-400"
          >
            {userDescription}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          Personalize!
        </button>
      )}

      <PersonalizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={setPrompt}
        initialPrompt={prompt}
      />
    </>
  );
}