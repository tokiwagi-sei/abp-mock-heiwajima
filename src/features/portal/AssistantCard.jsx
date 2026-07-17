import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { SparkleIcon, ArrowRightIcon } from '../../components/icons';
import { useToast } from '../../components/ToastProvider';

const DOT_COLOR = {
  warn: 'bg-warning-500',
  good: 'bg-success-500',
  info: 'bg-accent-500',
};

/**
 * ポータル画面上部の「AIアシスタント」カード。AIが話しかけてくる形式で今日の要点を伝える。
 */
export default function AssistantCard({ data }) {
  const showToast = useToast();

  return (
    <section className="bg-white border border-gray-200 rounded-card-lg shadow-card-lg -mt-[52px] relative z-10 p-7">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-[9px] bg-navy-900 text-white flex items-center justify-center shrink-0">
          <SparkleIcon size={17} />
        </div>
        <h2 className="text-base font-bold text-gray-900">AIアシスタント</h2>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
          分析中
        </span>
      </div>

      <p
        className="bg-gray-50 rounded-card px-[18px] py-3.5 text-sm text-gray-700 leading-relaxed mb-5"
        dangerouslySetInnerHTML={{ __html: data.greeting }}
      />

      <div className="flex flex-col mb-1">
        {data.items.map((item, idx) => (
          <div
            key={item.title}
            className={`flex items-start gap-3.5 py-4 ${idx > 0 ? 'border-t border-gray-100' : ''}`}
          >
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${DOT_COLOR[item.dot]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-[14.5px] font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
                {item.title}
                <StatusBadge variant="ai">{item.badge}</StatusBadge>
              </p>
              {item.meta && <p className="text-[13px] text-gray-500 mt-1">{item.meta}</p>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="!px-1 text-navy-800 font-bold"
              icon={<ArrowRightIcon size={16} />}
              {...(item.to ? { to: item.to } : { onClick: () => showToast(item.toast) })}
            >
              {item.actionLabel}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-5 border-t border-gray-100">
        <Button to="/dashboard" icon={<ArrowRightIcon size={16} />}>
          {data.footerActionLabel}
        </Button>
      </div>
    </section>
  );
}
