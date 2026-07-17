import { NavLink } from 'react-router-dom';
import { SparkleIcon, BarChartIcon, MegaphoneIcon, DocumentIcon, CloseIcon } from '../components/icons';

const NAV_ITEMS = [
  { to: '/', label: 'ABPポータル', icon: SparkleIcon, end: true },
  { to: '/dashboard', label: 'AI分析ダッシュボード', icon: BarChartIcon },
  { to: '/marketing', label: 'AIマーケティング', icon: MegaphoneIcon },
  { to: '/knowledge', label: 'AIナレッジセンター', icon: DocumentIcon },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 px-3 py-2.5 rounded-card-sm text-[13.5px] font-semibold transition-colors',
              isActive ? 'bg-navy-900 text-white' : 'text-gray-600 hover:bg-gray-100',
            ].join(' ')
          }
        >
          <Icon size={17} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

/**
 * 画面遷移用サイドバー。
 * lg 以上では常時表示、それ未満ではオーバーレイのドロワーになる（open/onClose で制御）。
 */
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* デスクトップ：常時表示の固定カラム */}
      <aside className="hidden lg:block w-60 shrink-0 border-r border-gray-200 bg-white py-5">
        <NavItems />
      </aside>

      {/* モバイル／タブレット：オーバーレイドロワー */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-navy-950/40" onClick={onClose} aria-hidden="true" />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[80vw] bg-white shadow-card-lg py-5 transition-transform duration-200 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 mb-4">
            <span className="text-sm font-bold text-navy-900">メニュー</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="閉じる"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 focus-ring"
            >
              <CloseIcon size={16} />
            </button>
          </div>
          <NavItems onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
