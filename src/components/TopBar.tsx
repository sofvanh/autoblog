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
      <div className="py-4 bg-gradient-to-r from-green-100 to-teal-400 shadow-sm">
        <div className="container mx-auto px-4 flex flex-row items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl bg-clip-text text-emerald-800">
              Sofi's Working Notes
            </h1>
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
                className="bg-emerald-600 text-white py-1.5 px-4 rounded-full font-medium hover:bg-emerald-700 transition-colors"
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
        <p className="text-sm mb-6 text-emerald-600">
          Your answer will help the AI customize the blog to your tastes! You can change this later.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            name="background"
            className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white min-h-[100px]"
            rows={4}
            placeholder="Describe your background, interests, and preferences, as relevant to the blog topic."
            defaultValue={prompt}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="px-4 py-2 text-emerald-700 border border-emerald-300 rounded-full hover:bg-emerald-50 hover:border-emerald-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-300 text-emerald-800 rounded-full font-medium hover:bg-emerald-400 transition-colors border border-emerald-400 hover:border-emerald-500"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}