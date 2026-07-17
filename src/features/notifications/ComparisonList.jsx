/**
 * 「比較元／比較先」を2列（または1行）で見せる汎用コンポーネント。
 * rows: [{ label, value }]
 */
export default function ComparisonList({ rows }) {
  return (
    <div className="rounded-card-sm border border-gray-200 overflow-hidden divide-y divide-gray-200">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[minmax(0,180px)_1fr]">
          <div className="bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-500 sm:border-r sm:border-gray-200">
            {row.label}
          </div>
          <div className="px-4 py-2.5 text-[13.5px] font-semibold text-gray-800">{row.value}</div>
        </div>
      ))}
    </div>
  );
}
