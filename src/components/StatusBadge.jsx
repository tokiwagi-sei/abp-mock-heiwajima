import { CheckIcon } from './icons';

// バッジの見た目をここで一元管理する。新しい種類が必要になったらここへ追加するだけでよい。
const VARIANTS = {
  available: { className: 'bg-success-50 text-success-600', withDot: true },
  preview: { className: 'bg-accent-50 text-accent-700' },
  soon: { className: 'bg-gray-100 text-gray-500' },
  comingsoon: { className: 'bg-transparent text-gray-400 border border-dashed border-gray-300' },
  ai: { className: 'bg-navy-900 text-white' },
  version: { className: 'bg-white text-navy-800 border border-navy-800' },
  detect: { className: 'bg-danger-50 text-danger-500' },
  analyze: { className: 'bg-navy-100 text-navy-600' },
  suggest: { className: 'bg-success-50 text-success-500' },
  real: { className: 'bg-success-500 text-white' },
  neutral: { className: 'bg-gray-100 text-gray-600' },
  pending: { className: 'bg-navy-100 text-navy-700' },
  warn: { className: 'bg-warning-50 text-warning-600' },
  low: { className: 'bg-accent-50 text-accent-700' },
};

/**
 * 汎用ステータスバッジ。variant で見た目を切り替える。
 * 例: <StatusBadge variant="available">利用可能</StatusBadge>
 */
export default function StatusBadge({ variant = 'neutral', children, className = '' }) {
  const cfg = VARIANTS[variant] ?? VARIANTS.neutral;
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide',
        cfg.className,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {cfg.withDot && <CheckIcon size={10} />}
      {children}
    </span>
  );
}
