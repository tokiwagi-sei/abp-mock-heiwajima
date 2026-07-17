import { useEffect, useRef, useState } from 'react';
import { useWorkspace } from './WorkspaceContext';
import Filter from '../../components/Filter';
import { ChevronDownIcon } from '../../components/icons';

/**
 * ヘッダーに置く「ワークスペース／表示軸」セレクター。
 * 組織が複数の階層・団体にまたがるため、単純な会社プルダウンではなく
 * 「表示軸＋対象」を切り替えるパネルにしている。
 */
export default function WorkspaceSelector() {
  const { workspaceName, axes, axis, axisConfig, target, setAxis, setTarget, chipLabel } = useWorkspace();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full bg-gray-50 hover:bg-white hover:border-gray-300 transition-colors text-left focus-ring"
      >
        <span className="hidden sm:flex flex-col leading-tight">
          <span className="text-[12.5px] font-bold text-gray-800">{workspaceName}</span>
          <span className="text-[11px] text-gray-500">{chipLabel}</span>
        </span>
        <ChevronDownIcon size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[300px] bg-white border border-gray-200 rounded-card shadow-card-lg p-[18px] z-50">
          <div className="mb-4">
            <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-2">ワークスペース</div>
            <div className="text-sm font-bold text-navy-900">{workspaceName}</div>
          </div>

          <div className="mb-4">
            <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-2">表示軸</div>
            <Filter
              options={axes.map((a) => ({ value: a.value, label: a.label }))}
              value={axis}
              onChange={setAxis}
            />
          </div>

          {axisConfig?.targets && (
            <div>
              <div className="text-[10.5px] font-bold tracking-wide uppercase text-gray-400 mb-2">対象</div>
              <select
                value={target ?? ''}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-card-sm text-[13px] text-gray-800 bg-white focus-ring"
              >
                {axisConfig.targets.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {axisConfig.note && (
                <p className="mt-2.5 text-[11px] leading-relaxed text-navy-600 bg-navy-50 px-2.5 py-2 rounded-lg">
                  {axisConfig.note}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
