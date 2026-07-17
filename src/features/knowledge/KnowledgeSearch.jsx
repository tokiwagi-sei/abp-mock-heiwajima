import { useState } from 'react';
import SearchBox from '../../components/SearchBox';
import StatusBadge from '../../components/StatusBadge';
import { CheckIcon } from '../../components/icons';

function confidenceTone(score) {
  if (score >= 90) return 'text-success-600 bg-success-50';
  if (score >= 70) return 'text-warning-600 bg-warning-50';
  return 'text-danger-600 bg-danger-50';
}

/**
 * AIに質問する検索ボックス〜回答表示までの一連の体験。
 * 実際の検索・AI推論は行わず、固定サンプル回答を約1秒の遅延後に表示する。
 */
export default function KnowledgeSearch({ exampleQuestions, sampleAnswer }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | answered

  function handleSubmit(value) {
    if (!value?.trim()) return;
    setStatus('loading');
    setTimeout(() => setStatus('answered'), 900);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-card-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">AIに質問する</h2>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-success-600">
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'loading' ? 'bg-warning-500 animate-pulse' : 'bg-success-500 animate-pulse'}`} />
          AI Knowledge Engine・{status === 'loading' ? '分析中' : 'オンライン'}
        </span>
      </div>

      <SearchBox value={query} onChange={setQuery} onSubmit={handleSubmit} placeholder="質問を入力する（例：セルフ休憩のルールは？）" size="lg" />

      <div className="flex flex-wrap gap-1.5 mt-3">
        {exampleQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuery(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-navy-500 hover:text-navy-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {status === 'loading' && (
        <div className="flex items-center gap-2.5 mt-6 text-sm text-gray-500">
          <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-navy-700 animate-spin" />
          AIがナレッジを検索しています…
        </div>
      )}

      {status === 'answered' && (
        <div className="mt-6 border border-gray-200 rounded-card p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <StatusBadge variant="ai">AI回答</StatusBadge>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${confidenceTone(sampleAnswer.confidence)}`}>
              信頼度 {sampleAnswer.confidence}%
            </span>
          </div>
          <p className="text-[14px] text-gray-800 leading-relaxed mb-4">{sampleAnswer.answer}</p>
          <p className="text-xs text-gray-500 mb-3">対象拠点：{sampleAnswer.targetStore}</p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {sampleAnswer.checklist.map((c) => (
              <div key={c} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckIcon size={13} className="text-success-500 shrink-0" />
                {c}
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-400 mb-4">参照元：{sampleAnswer.sources.join(' / ')}</div>

          <div className="bg-gray-50 rounded-card-sm p-3.5">
            <div className="text-xs font-bold text-gray-600 mb-2">関連して質問されること</div>
            <div className="flex flex-wrap gap-1.5">
              {sampleAnswer.relatedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuery(q)}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-navy-500 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
