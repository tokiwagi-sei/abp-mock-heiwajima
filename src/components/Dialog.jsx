import { createPortal } from 'react-dom';
import Button from './Button';
import { AlertCircleIcon } from './icons';
import useOverlayBehavior from '../hooks/useOverlayBehavior';

/**
 * 確認・通知用の小さいダイアログ（例：「AI社員機能は準備中です」）。
 * 大きめのコンテンツを表示したい場合は Modal を使う。
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = 'OK',
  onConfirm,
  cancelLabel,
}) {
  useOverlayBehavior(open, onClose);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative w-full max-w-sm bg-white rounded-card-lg shadow-card-lg border border-gray-200 p-6 text-center"
      >
        <div className="mx-auto mb-4 w-11 h-11 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center">
          <AlertCircleIcon size={22} />
        </div>
        {title && <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>}
        {description && <p className="text-[13.5px] text-gray-600 leading-relaxed">{description}</p>}
        <div className="mt-6 flex justify-center gap-3">
          {cancelLabel && (
            <Button variant="secondary" size="sm" onClick={onClose}>
              {cancelLabel}
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
