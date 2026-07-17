import marketingData from '../data/marketing.json';
import KPICard from '../components/KPICard';
import AIInsightCard from '../components/AIInsightCard';
import Table from '../components/Table';
import RatingBadge from '../components/RatingBadge';
import { Icon } from '../components/icons';
import { useToast } from '../components/ToastProvider';
import ScopeIndicator from '../features/workspace/ScopeIndicator';

export default function MarketingPage() {
  const data = marketingData;
  const showToast = useToast();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5">{data.title}</h1>
      <p className="text-[13.5px] text-gray-500">{data.description}</p>
      <ScopeIndicator />

      {/* サマリー */}
      <section className="mt-6 bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
          <span className="text-xs font-bold tracking-wide uppercase text-gray-400">マーケティング総合評価</span>
          <RatingBadge filledStars={data.summary.rating.filledStars} grade={data.summary.rating.grade} tone="onLight" size="sm" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {data.summary.kpis.map((k) => (
            <KPICard key={k.label} {...k} />
          ))}
        </div>
      </section>

      {/* 今日やること */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">今日やること</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm divide-y divide-gray-100">
          {data.todayTasks.map((t) => (
            <div key={t.priority} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-7 h-7 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {t.priority}
              </span>
              <span className="w-24 shrink-0 text-xs font-bold text-accent-600">{t.channel}</span>
              <p className="flex-1 text-[13.5px] text-gray-800">{t.task}</p>
              <span className="text-xs font-semibold text-gray-500 shrink-0">{t.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI提案 */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">AI提案</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.insights.map((i) => (
            <AIInsightCard key={i.title} icon={<Icon name={i.icon} size={18} />} badgeType={i.badgeType} title={i.title} description={i.description} />
          ))}
        </div>
      </section>

      {/* 広告効果 */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">広告効果（チャネル比較）</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Table
          columns={data.channelPerformance.columns}
          rows={data.channelPerformance.rows}
          rowVariant={(row) => row.variant}
        />
      </section>

      {/* 配信依頼 */}
      <section className="mt-10 mb-4">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">配信依頼</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.requestCards.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={() => showToast(r.toast)}
              className="flex flex-col items-start gap-3 bg-white border border-gray-200 rounded-card p-5 text-left hover:border-navy-700 hover:-translate-y-0.5 hover:shadow-card-sm transition-all duration-150 focus-ring"
            >
              <span className="w-10 h-10 rounded-[10px] bg-navy-900 text-white flex items-center justify-center">
                <Icon name={r.icon} size={18} />
              </span>
              <div>
                <h4 className="text-[14.5px] font-bold text-gray-900 mb-1">{r.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{r.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
