import { useState } from 'react';
import Modal from './Modal';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => void;
  initialPrompt: string;
}

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

export default function PersonalizeModal({ isOpen, onClose, onSubmit, initialPrompt }: PersonalizeModalProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customText = formData.get('background') as string;
    const newPrompt = [
      ...selectedOptions,
      customText
    ].filter(Boolean).join('. ');

    onSubmit(newPrompt);
    onClose();
  };

  const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tell us about yourself">
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
          defaultValue={initialPrompt}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}