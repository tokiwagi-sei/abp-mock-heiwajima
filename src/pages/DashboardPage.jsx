import { useState } from 'react';
import dashboardData from '../data/dashboard.json';
import RatingHero from '../features/dashboard/RatingHero';
import DrilldownPanel from '../features/dashboard/DrilldownPanel';
import KPICard from '../components/KPICard';
import AIInsightCard from '../components/AIInsightCard';
import Filter from '../components/Filter';
import Button from '../components/Button';
import ScopeIndicator from '../features/workspace/ScopeIndicator';
import { Icon, ArrowRightIcon } from '../components/icons';
import { useToast } from '../components/ToastProvider';

const VIEW_OPTIONS = [
  { value: 'all', label: '全拠点集計' },
  { value: 'venue', label: '拠点別' },
];

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState('all');
  const showToast = useToast();

  const allData = dashboardData.all;
  const venueData = dashboardData.venue;
  const [locationId, setLocationId] = useState(venueData.locations[0].id);
  const location = venueData.locations.find((l) => l.id === locationId);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-bold text-gray-500">表示対象</span>
        <Filter options={VIEW_OPTIONS} value={viewMode} onChange={setViewMode} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
        {viewMode === 'all' ? allData.title : venueData.title}
      </h1>
      <p className="text-[13.5px] text-gray-500">{viewMode === 'all' ? allData.description : venueData.description}</p>
      <ScopeIndicator />

      <div className="flex items-center gap-2.5 bg-warning-50 border border-warning-500/25 rounded-card px-4 py-3 mt-5 text-[13px] text-warning-600">
        <Icon name="alert" size={17} className="shrink-0" />
        <span>この画面は提案用のプレビューモックです。表示データは架空のものであり、実際のAI分析・データ連携は今後のフェーズで実装します。</span>
      </div>

      {viewMode === 'all' ? (
        <>
          <div className="mt-6">
            <RatingHero rating={allData.rating} />
          </div>

          {/* KPIサマリー */}
          <section className="mt-10">
            <div className="flex items-baseline gap-2.5 mb-4">
              <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">KPIサマリー</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {allData.kpis.map((k) => (
                <KPICard key={k.label} {...k} />
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
              {allData.insights.map((i) => (
                <AIInsightCard key={i.title} icon={<Icon name={i.icon} size={18} />} badgeType={i.badgeType} title={i.title} description={i.description} />
              ))}
            </div>
          </section>

          {/* 今日のAI提案 */}
          <section className="mt-10">
            <div className="flex items-baseline gap-2.5 mb-4">
              <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">今日のAI提案</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm divide-y divide-gray-100">
              {allData.suggestions.map((s) => (
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
                    {...(s.to ? { to: s.to } : { onClick: () => showToast(s.toast) })}
                  >
                    {s.actionLabel}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <DrilldownPanel drilldown={allData.drilldown} details={allData.details} />
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mt-6 mb-5">
            <span className="text-xs font-bold text-gray-500">拠点を選択</span>
            <Filter
              options={venueData.locations.map((l) => ({ value: l.id, label: l.name }))}
              value={locationId}
              onChange={setLocationId}
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">{location.name}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {location.kpis.map((k) => (
              <KPICard key={k.label} {...k} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {location.insights.map((i) => (
              <AIInsightCard key={i.title} icon={<Icon name={i.icon} size={18} />} badgeType={i.badgeType} title={i.title} description={i.description} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
