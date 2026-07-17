/**
 * 星評価 + 総合グレード表示。
 * filledStars: 0-5 の整数。grade: "A" "A-" "B+" など自由文字列。
 */
export default function RatingBadge({ filledStars = 4, grade = 'A', size = 'md', tone = 'onDark' }) {
  const totalStars = 5;
  const filled = '★'.repeat(Math.max(0, Math.min(filledStars, totalStars)));
  const empty = '☆'.repeat(totalStars - filled.length);

  const starSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-xl';
  const gradeSize = size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm' : 'text-base';

  const starColor = tone === 'onDark' ? 'text-amber-400' : 'text-amber-500';
  const emptyColor = tone === 'onDark' ? 'text-white/25' : 'text-gray-300';
  const labelColor = tone === 'onDark' ? 'text-white/85' : 'text-gray-800';

  return (
    <div className="flex items-center gap-3.5 flex-wrap">
      <div className={`${starSize} tracking-[2px] leading-none`}>
        <span className={starColor}>{filled}</span>
        <span className={emptyColor}>{empty}</span>
      </div>
      <div className={`font-semibold whitespace-nowrap ${gradeSize} ${labelColor}`}>
        総合評価：<strong className="font-bold text-[1.15em]">{grade}</strong>
      </div>
    </div>
  );
}
