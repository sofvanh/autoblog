export default function CloseButton({ onClose, className = "btn-close-emerald" }: { onClose: () => void, className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={`${className} absolute top-2 right-2`}
      aria-label="Close"
    >
      &times;
    </button>
  );
}