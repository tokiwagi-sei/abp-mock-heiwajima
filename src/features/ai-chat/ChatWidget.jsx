import { useState } from 'react';
import { ChatIcon, SendIcon } from '../../components/icons';
import { useToast } from '../../components/ToastProvider';

const SUGGESTED_QUESTIONS = ['売上が落ちた理由は？', '来場者数が伸びている拠点は？', '月次レポートを作成して'];

/**
 * 全画面共通のフローティングAIチャット入口。
 * このモックでは実際のAI応答は行わず、送信するとトーストで案内するのみ。
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const showToast = useToast();

  function handleSend() {
    showToast('AIチャットは提案用のプレビューです。実際の応答生成は今後実装します。');
    setInput('');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="AIに相談"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-navy-900 text-white shadow-card-lg flex items-center justify-center hover:bg-navy-700 transition-colors focus-ring"
      >
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-success-500 ring-2 ring-white" />
        <ChatIcon size={22} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[min(340px,calc(100vw-3rem))] bg-white rounded-card-lg border border-gray-200 shadow-card-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3.5 bg-navy-900 text-white">
            <h4 className="text-sm font-bold">AIに相談</h4>
            <span className="flex items-center gap-1.5 text-[11px] text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
              対応可能
            </span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <p className="text-[13px] text-gray-600 leading-relaxed bg-gray-50 rounded-card-sm px-3 py-2.5">
              こんにちは。売上・来場者数・拠点の状況について、気になることを聞いてください。
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setInput(q)}
                  className="text-[11.5px] px-2.5 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-navy-500 hover:text-navy-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="AIに質問する..."
                className="flex-1 min-w-0 border border-gray-200 rounded-full px-3.5 py-2 text-[13px] outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
              />
              <button
                type="button"
                onClick={handleSend}
                aria-label="送信"
                className="w-9 h-9 shrink-0 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-navy-700 focus-ring"
              >
                <SendIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
