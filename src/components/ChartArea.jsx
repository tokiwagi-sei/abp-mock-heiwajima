/**
 * 軽量なチャート表示エリア（外部チャートライブラリ非依存）。
 * variant="bar"  … 縦棒（曜日別・月別推移など）
 * variant="rank" … 横棒ランキング（店舗比較・チャネル別ランキングなど）
 *
 * data: [{ label, value, highlight?: 'high' | 'low' }]
 */
export default function ChartArea({ variant = 'bar', data, valueFormatter, height = 160, className = '', title, segments }) {
  if (variant === 'pie') {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    let cursor = 0;
    const stops = segments
      .map((s) => {
        const from = (cursor / total) * 100;
        cursor += s.value;
        const to = (cursor / total) * 100;
        return `${s.color} ${from}% ${to}%`;
      })
      .join(', ');

    return (
      <div className={`flex flex-col items-center gap-3.5 ${className}`}>
        {title && <h5 className="text-xs font-bold text-gray-600">{title}</h5>}
        <div
          className="w-28 h-28 rounded-full"
          style={{ background: `conic-gradient(${stops})` }}
          role="img"
          aria-label={title}
        />
        <div className="flex flex-col gap-1.5 w-full">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span>
                {s.label} {s.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value), 1);
  const format = valueFormatter ?? ((v) => v.toLocaleString('ja-JP'));

  if (variant === 'rank') {
    return (
      <div className={`flex flex-col gap-2.5 ${className}`}>
        {data.map((d, idx) => {
          const widthPct = Math.max((d.value / max) * 100, 4);
          return (
            <div key={d.label} className="flex items-center gap-3">
              <span className="w-5 shrink-0 text-xs font-bold text-gray-400">{idx + 1}</span>
              <span className="w-40 shrink-0 truncate text-sm text-gray-700">{d.label}</span>
              <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={[
                    'h-full rounded-full',
                    d.highlight === 'high'
                      ? 'bg-gradient-to-r from-accent-500 to-accent-600'
                      : 'bg-gradient-to-r from-navy-600 to-navy-800',
                  ].join(' ')}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-sm font-semibold text-gray-800">
                {format(d.value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2.5 ${className}`} style={{ height }}>
      {data.map((d) => {
        const heightPct = Math.max((d.value / max) * 100, 4);
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
            <span className="text-[11px] text-gray-500">{format(d.value)}</span>
            <div
              className={[
                'w-full rounded-t-lg transition-all duration-300',
                d.highlight === 'high'
                  ? 'bg-gradient-to-t from-success-500 to-success-500/70'
                  : d.highlight === 'low'
                    ? 'bg-gradient-to-t from-danger-500 to-danger-500/70'
                    : 'bg-gradient-to-t from-navy-800 to-navy-500',
              ].join(' ')}
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-xs font-medium text-gray-500">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
