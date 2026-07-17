/**
 * 画面上部「AI総合判定」パネル。
 * AIが最初に結論（解析対象・検出内訳・総合コメント）を伝え、詳細はその後に続く。
 */
export default function AIVerdictPanel({ verdict }) {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-card-lg shadow-card-lg px-7 py-7">
      <div className="text-[11px] font-bold tracking-wide text-white/50 mb-2">AI総合判定</div>

      <div className="text-sm text-white/70 mb-5">
        解析対象：<span className="font-semibold text-white">{verdict.analysisTarget}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {verdict.resultCounts.map((r) => (
          <div key={r.label} className="bg-white/10 rounded-card-sm px-4 py-3">
            <div className="text-lg font-bold">
              {r.emoji} {r.count}件
            </div>
            <div className="text-[12px] text-white/70 mt-0.5">{r.label}</div>
          </div>
        ))}
      </div>

      <div className="text-[11px] font-bold tracking-wide text-white/50 mb-2">AI総合コメント</div>
      <p className="text-[13.5px] text-white/90 leading-relaxed max-w-3xl">{verdict.comment}</p>
    </section>
  );
}
