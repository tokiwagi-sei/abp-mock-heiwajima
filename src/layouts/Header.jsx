import WorkspaceSelector from '../features/workspace/WorkspaceSelector';
import { MenuIcon, SettingsIcon } from '../components/icons';

/**
 * 全画面共通ヘッダー。ロゴ／ワークスペース選択／ユーザー表示／設定を持つ。
 * onMenuClick はスマホ幅でのサイドバー開閉トリガー。
 */
export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 flex items-center">
      <div className="w-full px-4 md:px-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="メニューを開く"
            className="lg:hidden w-9 h-9 -ml-1 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 focus-ring shrink-0"
          >
            <MenuIcon size={20} />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-navy-700 to-navy-900 text-white flex items-center justify-center font-bold text-[13px] shrink-0">
              ABP
            </div>
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-[15px] font-bold text-navy-900 truncate">ABP</span>
              <span className="text-[10.5px] text-gray-500 truncate">AI Business Platform</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <WorkspaceSelector />

          <div className="hidden md:flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-navy-800 text-white flex items-center justify-center text-xs font-bold">
              管
            </div>
            <span className="text-[13px] text-gray-700">管理者</span>
          </div>

          <button
            type="button"
            aria-label="設定"
            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 focus-ring"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
