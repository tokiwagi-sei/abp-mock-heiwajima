/**
 * ピル型のフィルター／セレクター。単一選択・複数選択どちらにも使える。
 * options: [{ value, label }]
 * value: string（単一選択） | string[]（複数選択）
 */
export default function Filter({ options, value, onChange, multiSelect = false, className = '' }) {
  const selected = multiSelect ? new Set(value ?? []) : null;

  function isActive(optionValue) {
    return multiSelect ? selected.has(optionValue) : value === optionValue;
  }

  function handleClick(optionValue) {
    if (!multiSelect) {
      onChange?.(optionValue);
      return;
    }
    const next = new Set(selected);
    if (next.has(optionValue)) next.delete(optionValue);
    else next.add(optionValue);
    onChange?.(Array.from(next));
  }

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {options.map((opt) => {
        const active = isActive(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleClick(opt.value)}
            aria-pressed={active}
            className={[
              'text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors focus-ring',
              active
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-navy-500',
            ].join(' ')}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
