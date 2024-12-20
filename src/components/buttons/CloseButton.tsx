export default function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="btn-close absolute top-2 right-2"
      aria-label="Close"
    >
      &times;
    </button>
  );
}