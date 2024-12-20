import { useEffect } from 'react';
import CloseButton from '../buttons/CloseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-10 backdrop-filter backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <dialog
        open={isOpen}
        className="relative z-10 p-8 rounded-xl shadow-xl w-full max-w-md border border-emerald-100 bg-gradient-to-b from-white to-emerald-50"
      >
        <CloseButton onClose={onClose} />
        <h2 className="text-2xl font-semibold mb-2 text-emerald-800">{title}</h2>
        {children}
      </dialog>
    </div>
  );
}