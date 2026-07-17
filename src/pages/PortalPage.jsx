import portalData from '../data/portal.json';
import notificationsData from '../data/aiNotifications.json';
import AssistantCard from '../features/portal/AssistantCard';
import QuickActionsGrid from '../features/portal/QuickActionsGrid';
import AIEmployeeCard from '../features/portal/AIEmployeeCard';
import NotificationCenterCard from '../features/notifications/NotificationCenterCard';
import DashboardCard from '../components/DashboardCard';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import ScopeIndicator from '../features/workspace/ScopeIndicator';
import { Icon, ArrowRightIcon, SettingsIcon } from '../components/icons';

export default function PortalPage() {
  const { hero, assistant, quickActions, availableFeatures, aiEmployee, upcomingFeatures, settings } = portalData;

  return (
    <div className="-mx-4 md:-mx-8 -mt-6 md:-mt-8">
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white px-4 md:px-8 pt-10 pb-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.06] blur-2xl pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative">
          <span className="inline-block text-xs font-bold tracking-[3px] border border-white/20 rounded-full px-3.5 py-1 mb-4">
            {hero.kicker}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{hero.title}</h1>
          <p className="text-[15px] text-white/70 max-w-xl leading-relaxed">{hero.sub}</p>
          <p className="text-[13.5px] text-white/50 mt-1.5">{hero.subSupport}</p>
          <ScopeIndicator className="!bg-white/10 !text-white/85" />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-16">
        <AssistantCard data={assistant} />
        <NotificationCenterCard data={notificationsData.summary} />
        <QuickActionsGrid actions={quickActions} />

        {/* 現在利用できる機能 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-2.5 mb-4">
            <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">現在利用できる機能</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableFeatures.map((f) => (
              <DashboardCard
                key={f.title}
                accent
                icon={<Icon name={f.icon} size={20} />}
                badges={f.badges}
                title={f.title}
                description={f.description}
                action={
                  <Button to={f.to} icon={<ArrowRightIcon size={16} />}>
                    開く
                  </Button>
                }
              />
            ))}
          </div>
        </section>

        {/* ABPの将来像：AI社員 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-2.5 mb-4">
            <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">ABPの将来像</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <AIEmployeeCard data={aiEmployee} />
        </section>

        {/* 今後追加予定 */}
        <section className="mt-14">
          <div className="flex items-baseline gap-2.5 mb-4">
            <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">今後追加予定</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFeatures.map((f) => (
              <DashboardCard
                key={f.title}
                icon={<Icon name={f.icon} size={20} />}
                badges={[{ variant: 'soon', label: '準備中' }, { variant: 'comingsoon', label: 'Ver2.0予定' }]}
                title={f.title}
                description={f.description}
                action={
                  <Button variant="disabled" disabled>
                    準備中
                  </Button>
                }
              />
            ))}
          </div>
        </section>

        {/* 設定エリア */}
        <section className="mt-14 flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-card px-6 py-5">
          <div className="w-10 h-10 rounded-[10px] bg-white border border-gray-200 text-gray-500 flex items-center justify-center shrink-0">
            <SettingsIcon size={19} />
          </div>
          <div className="flex-1">
            <div className="text-[14.5px] font-bold text-gray-700">{settings.title}</div>
            <div className="text-[12.5px] text-gray-500">{settings.description}</div>
          </div>
          <StatusBadge variant="soon">準備中</StatusBadge>
        </section>
      </div>
    </div>
  );
}
