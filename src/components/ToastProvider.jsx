import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext(null);

/**
 * アプリ全体で使うトースト通知。
 * 「準備中です」のような軽い通知に使う（本格的なアラートには Dialog を使う）。
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, duration = 2600) => {
    clearTimeout(timerRef.current);
    setToast({ message, key: Date.now() });
    timerRef.current = setTimeout(() => setToast(null), duration);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        aria-live="polite"
        className={[
          'fixed bottom-7 right-7 z-[300] max-w-[360px] rounded-card-sm bg-navy-900 text-white',
          'px-5 py-3.5 text-[13.5px] shadow-card-lg transition-all duration-200',
          toast ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        {toast?.message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}
