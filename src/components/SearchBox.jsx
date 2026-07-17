import { SearchIcon, SendIcon } from './icons';

/**
 * 検索・質問入力ボックス。送信ボタン付き。
 */
export default function SearchBox({
  value,
  onChange,
  onSubmit,
  placeholder = '検索する...',
  size = 'md',
  className = '',
}) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit?.(value);
  }

  const padding = size === 'lg' ? 'py-4 px-5' : 'py-3 px-4';

  return (
    <div
      className={[
        'flex items-center gap-3 bg-white border border-gray-200 rounded-card-lg shadow-card-sm',
        'focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-100 transition-shadow',
        padding,
        className,
      ].join(' ')}
    >
      <SearchIcon size={18} className="text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={() => onSubmit?.(value)}
        aria-label="送信"
        className="shrink-0 w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-navy-700 transition-colors focus-ring"
      >
        <SendIcon size={15} />
      </button>
    </div>
  );
}
