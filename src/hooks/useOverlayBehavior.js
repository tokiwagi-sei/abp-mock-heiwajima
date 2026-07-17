import { useEffect } from 'react';

/**
 * モーダル／ダイアログ共通の挙動：Escapeで閉じる・背面スクロールを止める。
 */
export default function useOverlayBehavior(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);
}
