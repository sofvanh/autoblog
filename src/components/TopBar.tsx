import { useUserContext } from './UserContext';
import { useRef } from 'react';

export default function TopBar() {
  const { prompt, userDescription, setPrompt } = useUserContext();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPrompt = formData.get('background') as string;
    if (newPrompt && newPrompt !== prompt) {
      setPrompt(newPrompt);
    }
    modalRef.current?.close();
  };

  return (
    <>
      <div className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 flex flex-row items-center">
          <h1 className="text-lg font-semibold">Autoblog Demo</h1>
          <div className="ml-auto">
            {userDescription ? (
              <p className="text-sm">Viewing as:&nbsp;
                <button
                  onClick={() => modalRef.current?.showModal()}
                  className="font-bold text-white"
                >
                  {userDescription}
                </button>
              </p>
            ) : (
              <button
                onClick={() => modalRef.current?.showModal()}
                className="bg-sky-600 text-white py-1 px-3 rounded font-semibold"
              >
                Personalize!
              </button>
            )}
          </div>
        </div>
      </div>

      <dialog
        className="p-6 rounded-lg shadow-xl backdrop:bg-black backdrop:bg-opacity-50 w-full max-w-md"
        ref={modalRef}
      >
        <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>
        <p className="text-sm mb-4 text-gray-500">
          Your answer will help the AI customize the blog to your tastes! You can change this later.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="background"
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Describe your background, interests, and preferences, as relevant to the blog topic."
            defaultValue={prompt}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="px-4 py-2 text-gray-600 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}