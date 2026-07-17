import { useWorkspace } from './WorkspaceContext';
import { GridIcon } from '../../components/icons';

/**
 * 「〇〇の経営状況を表示しています。」という現在の表示範囲を示すピル。
 * ヘッダーのワークスペース選択と連動する。
 */
export default function ScopeIndicator({ overrideText, className = '' }) {
  const { summary } = useWorkspace();
  return (
    <div
      className={`inline-flex items-center gap-2 mt-2.5 px-4 py-2 bg-navy-100 rounded-full text-[12.5px] font-semibold text-navy-700 ${className}`}
    >
      <GridIcon size={14} className="text-navy-500" />
      <span>{overrideText ?? summary}</span>
    </div>
  );
}
