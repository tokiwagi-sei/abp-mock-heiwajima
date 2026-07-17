import StatusBadge from './StatusBadge';

/**
 * 汎用の機能／コンテンツカード（ポータル画面の「現在利用できる機能」「今後追加予定」等で使用）。
 * badges: [{ variant, label }]
 * accent: true にすると、アイコン背景がネイビー塗りつぶしになり「利用可能」感が強調される
 */
export default function DashboardCard({
  icon,
  badges = [],
  title,
  description,
  action,
  caption,
  accent = false,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col gap-3.5 rounded-card border p-5',
        accent ? 'bg-white border-navy-100 shadow-card-sm' : 'bg-gray-50 border-gray-200',
        className,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={[
            'w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0',
            accent ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-400',
          ].join(' ')}
        >
          {icon}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {badges.map((b, idx) => (
            <StatusBadge key={idx} variant={b.variant}>
              {b.label}
            </StatusBadge>
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-[15px] font-bold mb-1.5 ${accent ? 'text-gray-900' : 'text-gray-600'}`}>{title}</h4>
        <p className="text-[13px] text-gray-500 leading-relaxed min-h-[42px]">{description}</p>
      </div>

      {action}
      {caption && <p className="text-xs text-gray-400 -mt-1">{caption}</p>}
    </div>
  );
}
