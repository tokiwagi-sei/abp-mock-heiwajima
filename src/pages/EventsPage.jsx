import eventsData from '../data/events.json';
import KPICard from '../components/KPICard';
import AIInsightCard from '../components/AIInsightCard';
import Table from '../components/Table';
import Button from '../components/Button';
import ScopeIndicator from '../features/workspace/ScopeIndicator';
import { Icon, ArrowRightIcon } from '../components/icons';
import { useToast } from '../components/ToastProvider';

export default function EventsPage() {
  const data = eventsData;
  const showToast = useToast();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5">{data.title}</h1>
      <p className="text-[13.5px] text-gray-500">{data.description}</p>
      <ScopeIndicator />

      {/* KPIサマリー */}
      <section className="mt-6">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">KPIサマリー</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {data.kpis.map((k) => (
            <KPICard key={k.label} {...k} valueSize="sm" />
          ))}
        </div>
      </section>

      {/* AIインサイト */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">AIインサイト</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.insights.map((i) => (
            <AIInsightCard key={i.title} icon={<Icon name={i.icon} size={18} />} badgeType={i.badgeType} title={i.title} description={i.description} />
          ))}
        </div>
      </section>

      {/* AI提案 */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">今日のAI提案</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm divide-y divide-gray-100">
          {data.suggestions.map((s) => (
            <div key={s.text} className="flex items-center gap-4 px-5 py-4">
              <span className="w-8 h-8 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center shrink-0">
                <Icon name="sparkle" size={15} />
              </span>
              <p className="flex-1 text-[14px] text-gray-800">{s.text}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-navy-800 font-bold !px-1"
                icon={<ArrowRightIcon size={16} />}
                onClick={() => showToast(s.toast)}
              >
                {s.actionLabel}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 現地イベント */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">{data.onsiteEvents.title}</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Table columns={data.onsiteEvents.table.columns} rows={data.onsiteEvents.table.rows} rowVariant={(row) => row.variant} />
        <p className="text-xs text-gray-500 mt-3">AIコメント：{data.onsiteEvents.comment}</p>
      </section>

      {/* WEBイベント */}
      <section className="mt-10 mb-4">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">{data.webEvents.title}</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Table columns={data.webEvents.table.columns} rows={data.webEvents.table.rows} rowVariant={(row) => row.variant} />
        <p className="text-xs text-gray-500 mt-3">AIコメント：{data.webEvents.comment}</p>
      </section>
    </div>
  );
}
