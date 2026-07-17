import { Link } from 'react-router-dom';
import StatusBadge from '../../components/StatusBadge';
import { Icon } from '../../components/icons';
import { useToast } from '../../components/ToastProvider';

/**
 * ポータル画面の「AIおすすめアクション」。クリックだけで完結する4つのショートカット。
 */
export default function QuickActionsGrid({ actions }) {
  const showToast = useToast();

  return (
    <section className="bg-white border border-gray-200 rounded-card-lg shadow-card mt-5 px-7 py-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-[15px] font-bold text-gray-900">AIおすすめアクション</h2>
        <StatusBadge variant="ai">AI推奨</StatusBadge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => {
          const inner = (
            <>
              <span className="w-9 h-9 rounded-[9px] bg-navy-900 text-white flex items-center justify-center">
                <Icon name={action.icon} size={17} />
              </span>
              <span className="text-[13.5px] font-semibold text-gray-800 leading-snug">{action.label}</span>
            </>
          );
          const className =
            'flex flex-col items-start gap-3 bg-gray-50 border border-gray-200 rounded-card p-4 text-left hover:bg-white hover:border-navy-700 hover:-translate-y-0.5 hover:shadow-card-sm transition-all duration-150 focus-ring';

          return action.to ? (
            <Link key={action.label} to={action.to} className={className}>
              {inner}
            </Link>
          ) : (
            <button key={action.label} type="button" onClick={() => showToast(action.toast)} className={className}>
              {inner}
            </button>
          );
        })}
      </div>
    </section>
  );
}
