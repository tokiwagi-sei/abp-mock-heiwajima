/**
 * 汎用データテーブル。
 * columns: [{ key, label, align?: 'left'|'right'|'center', render?: (row) => node }]
 * rows: object[]
 * rowVariant: (row) => 'best' | 'worst' | undefined  … 行の強調表示
 */
export default function Table({ columns, rows, rowVariant, caption, className = '' }) {
  const ROW_VARIANT_CLASSES = {
    best: 'bg-success-50/60',
    worst: 'bg-danger-50/60',
  };

  return (
    <div className={`overflow-x-auto rounded-card border border-gray-200 ${className}`}>
      {caption && <p className="px-4 pt-3 text-xs text-gray-500">{caption}</p>}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wide">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 whitespace-nowrap ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const variant = rowVariant?.(row);
            return (
              <tr
                key={row.id ?? idx}
                className={[
                  'border-t border-gray-100 text-gray-700',
                  ROW_VARIANT_CLASSES[variant] ?? '',
                ].join(' ')}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 whitespace-nowrap ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
