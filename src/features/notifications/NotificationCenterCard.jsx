import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { ArrowRightIcon } from '../../components/icons';

const SEVERITY_VARIANT = { 低: 'neutral', 中: 'warn', 高: 'detect' };

/**
 * Portalトップの「AI通知センター」入口カード。
 * 「AIに質問する」のではなく「AIから報告が来る」体験を表現する。
 * 目立たせつつも警告感を強くしすぎないトーン（ネイビー×ホワイト、警告色は控えめ）。
 */
export default function NotificationCenterCard({ data }) {
  return (
    <section className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm mt-5 p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
      <div className="w-12 h-12 rounded-card bg-navy-900 text-white flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>

      <div className="flex-1 min-w-[240px]">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <h3 className="text-[15px] font-bold text-gray-900">{data.title}</h3>
          <StatusBadge variant="pending">確認待ち {data.pendingCount}件</StatusBadge>
          <StatusBadge variant={SEVERITY_VARIANT[data.severity] ?? 'neutral'}>重要度：{data.severity}</StatusBadge>
        </div>
        <p className="text-[14px] font-semibold text-gray-800 mb-1">{data.mainNotice}</p>
        <p className="text-[13px] text-gray-500 leading-relaxed">{data.subText}</p>
      </div>

      <Button to={`/ai-notifications/${data.reportId}`} icon={<ArrowRightIcon size={16} />} className="shrink-0">
        {data.ctaLabel}
      </Button>
    </section>
  );
}
