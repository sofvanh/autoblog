interface ToggleButtonProps {
  showModified: boolean;
  toggleContent: () => void;
  optionOne: string;
  optionTwo: string;
}

export default function ToggleButton({ showModified, toggleContent, optionOne, optionTwo }: ToggleButtonProps) {
  return (
    <button
      onClick={toggleContent}
      className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-lg border border-emerald-200 hover:bg-emerald-50 transition-colors"
    >
      <span className="text-sm font-medium text-emerald-800">
        {optionOne}
      </span>

      <div className="relative w-14 h-7 flex items-center">
        <div
          className={`
        absolute w-full h-full rounded-full transition-colors duration-300 ease-in-out
        ${showModified ? 'bg-emerald-600' : 'bg-gray-300'}
      `}
        />
        <div
          className={`
        absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
        ${showModified ? 'translate-x-8' : 'translate-x-1'}
      `}
        />
      </div>

      <span className="text-sm font-medium text-gray-600">
        {optionTwo}
      </span>
    </button>
  )
}