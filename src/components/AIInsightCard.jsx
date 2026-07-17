import StatusBadge from './StatusBadge';

const BADGE_LABEL = {
  detect: 'AI検知',
  analyze: 'AI分析',
  suggest: 'AI提案',
};

/**
 * AIが気づいたこと・分析したこと・提案したことを1枚で見せるカード。
 * badgeType: 'detect' | 'analyze' | 'suggest'
 */
export default function AIInsightCard({ icon, badgeType = 'analyze', title, description, className = '' }) {
  return (
    <div
      className={[
        'bg-white border border-gray-200 rounded-card shadow-card-sm p-5',
        'hover:shadow-card hover:-translate-y-0.5 transition-all duration-150',
        className,
      ].join(' ')}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="w-9 h-9 rounded-[10px] bg-gray-50 text-gray-500 flex items-center justify-center">
          {icon}
        </div>
        <StatusBadge variant={badgeType}>{BADGE_LABEL[badgeType]}</StatusBadge>
      </div>
      <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">{title}</h4>
      <p className="text-[13.5px] text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
