import { createPortal } from 'react-dom';
import { CloseIcon } from './icons';
import useOverlayBehavior from '../hooks/useOverlayBehavior';

/**
 * 汎用モーダル（大きめのコンテンツ用）。
 * ヘッダー・本文・フッターをスロットとして渡す。
 */
export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useOverlayBehavior(open, onClose);

  if (!open) return null;

  const widthClass = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' }[size] ?? 'max-w-lg';

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px] animate-[fadeIn_0.15s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${widthClass} bg-white rounded-card-lg shadow-card-lg border border-gray-200 overflow-hidden`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="閉じる"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors focus-ring"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-gray-100 bg-gray-25 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
