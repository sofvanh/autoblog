'use client';

import Link from 'next/link';
import { useUserContext } from '@/components/UserContext';
import { useRef, useState } from 'react';


// TODO Refactor this file into smaller, more manageable components

// TODO In the future these should be generated from the blog posts
const presetOptions = [
  "Artificial intelligence",
  "Utopias",
  "Digital democracy",
  "Interface design",
  "Effective altruism",
  "I know the author",
  "I have a technical background",
  "I have a governance background"
];

export default function TopBar() {
  const { prompt, userDescription, setPrompt } = useUserContext();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // TODO Store these better, right now the buttons get reset
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customText = formData.get('background') as string;
    const newPrompt = [
      ...selectedOptions,
      customText
    ].filter(Boolean).join('. ');

    if (newPrompt !== prompt) {
      setPrompt(newPrompt);
    }
    modalRef.current?.close();
  };

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <>
      <div className="py-4 bg-gradient-to-r from-green-100 to-teal-200 shadow-sm">
        <div className="container mx-auto px-4 flex flex-row items-center">
          <div className="flex items-center space-x-2">
            <a href="/" className="text-xl bg-clip-text text-emerald-800">
              Sofi's Working Notes
            </a>
          </div>

          <div className="ml-auto">
            {userDescription ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-emerald-800">Viewing as:</span>
                <button
                  onClick={() => modalRef.current?.showModal()}
                  className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors hover:border-emerald-400"
                >
                  {userDescription}
                </button>
              </div>
            ) : (
              <button
                onClick={() => modalRef.current?.showModal()}
                className="btn-primary"
              >
                Personalize!
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog
        className="p-8 rounded-xl shadow-xl backdrop:bg-black backdrop:bg-opacity-50 w-full max-w-md border border-emerald-100 bg-gradient-to-b from-white to-emerald-50"
        ref={modalRef}
      >
        <h2 className="text-2xl font-semibold mb-2 text-emerald-800">Tell us about yourself</h2>
        <p className="text-sm mb-4 text-emerald-600">
          Your answer will help the AI customize the blog to your tastes! You can change this later.
        </p>
        <p className="text-sm font-semibold mb-2 text-emerald-600">
          Select all options that are relevant to you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2 mb-4">
            {presetOptions.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`${selectedOptions.includes(option)
                  ? 'btn-primary text-xs px-2 py-1'
                  : 'btn-secondary text-xs px-2 py-1'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
          <textarea
            name="background"
            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white text-sm"
            placeholder="Additional information about your background, interests, and preferences"
            defaultValue={prompt}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}