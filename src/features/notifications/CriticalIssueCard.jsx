import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import ComparisonList from './ComparisonList';

const SEVERITY_VARIANT = { 高: 'detect', 中: 'warn', 低: 'low' };

const STATUS_OPTIONS = [
  { value: 'confirmed', label: '確認済み' },
  { value: 'hold', label: '保留' },
  { value: 'task', label: 'タスク化' },
];

const STATUS_TONE = {
  confirmed: 'bg-success-50 text-success-600',
  hold: 'bg-gray-100 text-gray-600',
  task: 'bg-accent-50 text-accent-700',
};

/**
 * セクション1「最優先で現物確認すべき矛盾」の1件を表示するカード。
 * 比較元／比較先・AI判断理由・推奨対応を明示し、確認済み／保留／タスク化の状態変更ができる
 * （ローカルUIのみ、API接続・永続化なし）。
 */
export default function CriticalIssueCard({ issue }) {
  const [status, setStatus] = useState(null);

  return (
    <div className="bg-white border border-gray-200 border-l-4 border-l-danger-500 rounded-card-lg shadow-card-sm p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-bold text-navy-800">{issue.store}</span>
          <span className="text-gray-300">／</span>
          <span className="text-[13px] font-semibold text-gray-700">{issue.topic}</span>
          <StatusBadge variant={SEVERITY_VARIANT[issue.severity] ?? 'neutral'}>重要度：{issue.severity}</StatusBadge>
        </div>
        {status && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_TONE[status]}`}>
            {STATUS_OPTIONS.find((s) => s.value === status)?.label}
          </span>
        )}
      </div>

      <div>
        <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1.5">AI検出内容</div>
        <p className="text-[14px] text-gray-800 leading-relaxed">{issue.detection}</p>
      </div>

      <div>
        <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1.5">比較表示</div>
        <ComparisonList rows={issue.comparison} />
      </div>

      <div className="bg-gray-50 rounded-card-sm px-4 py-3">
        <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">AI判断理由（Evidence）</div>
        <p className="text-[13px] text-gray-600 leading-relaxed">{issue.reasoning}</p>
      </div>

      <div>
        <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">推奨対応</div>
        <p className="text-[13px] text-gray-700 leading-relaxed">{issue.recommendedAction}</p>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setStatus(opt.value)}
            aria-pressed={status === opt.value}
            className={[
              'text-xs font-semibold px-3.5 py-2 rounded-card-sm border transition-colors focus-ring',
              status === opt.value
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-navy-500',
            ].join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
