import RatingBadge from '../../components/RatingBadge';
import StatusBadge from '../../components/StatusBadge';

/**
 * 「AIが最初に結論を伝える」ダッシュボード冒頭のカード。
 * 数値ではなく、AIの診断結果（注目ポイント／診断結果）を先に見せる。
 */
export default function RatingHero({ rating }) {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-card-lg shadow-card-lg px-7 py-7">
      <div className="flex items-start justify-between gap-5 flex-wrap">
        <RatingBadge filledStars={rating.filledStars} grade={rating.grade} tone="onDark" />
        <div className="text-right shrink-0">
          <StatusBadge variant="real" className="!bg-white/15">
            {rating.badge}
          </StatusBadge>
          <div className="text-[11.5px] text-white/55 mt-1.5">{rating.metaSub}</div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-4">{rating.title}</h3>
      <p className="text-[13.5px] text-white/78 mt-2 mb-4 max-w-2xl leading-relaxed">{rating.lead}</p>

      <div className="text-[11px] font-bold tracking-wide text-white/50 mb-2.5">{rating.pointsLabel}</div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-2.5 list-none p-0 m-0">
        {rating.points.map((p, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-white/95">
            <span className="shrink-0">{p.icon}</span>
            {p.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
