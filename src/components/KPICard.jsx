import { TrendUpIcon, TrendDownIcon } from './icons';

/**
 * KPI（売上・粗利・客数など）を1枚で見せるカード。
 * delta.direction: 'up' | 'down' | 'flat'
 */
export default function KPICard({ label, value, delta, valueSize = 'md', wrap = false, className = '' }) {
  const DELTA_STYLES = {
    up: 'text-success-600',
    down: 'text-danger-500',
    flat: 'text-gray-500',
  };

  const valueTextSize = valueSize === 'lg' ? 'text-2xl' : valueSize === 'sm' ? 'text-lg' : 'text-xl';

  return (
    <div
      className={[
        'bg-white border border-gray-200 rounded-card shadow-card-sm px-5 py-4',
        'hover:shadow-card transition-shadow duration-150',
        className,
      ].join(' ')}
    >
      <div className="text-xs font-semibold text-gray-500 mb-1.5">{label}</div>
      <div className={`font-bold text-gray-900 ${valueTextSize} mb-1.5 ${wrap ? '' : 'truncate'}`}>{value}</div>
      {delta && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${DELTA_STYLES[delta.direction] ?? DELTA_STYLES.flat}`}>
          {delta.direction === 'up' && <TrendUpIcon size={12} />}
          {delta.direction === 'down' && <TrendDownIcon size={12} />}
          <span>{delta.text}</span>
        </div>
      )}
    </div>
  );
}
