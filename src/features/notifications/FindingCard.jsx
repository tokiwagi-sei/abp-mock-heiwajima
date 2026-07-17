import ComparisonList from './ComparisonList';

const ACCENT_BORDER = {
  ocr: 'border-l-warning-500',
  diff: 'border-l-gray-300',
  unknown: 'border-l-gray-200',
};

/**
 * セクション2〜4（誤植・OCR疑い／拠点差異／判断不可）で使う汎用カード。
 * 渡すpropsに応じて必要な行だけ表示する（対象・検出内容・推定・比較・判断理由・コメント・推奨対応）。
 */
export default function FindingCard({
  accent = 'diff',
  headingLabel,
  heading,
  quote,
  estimate,
  comparison,
  reasoning,
  comment,
  recommendedAction,
}) {
  return (
    <div className={`bg-white border border-gray-200 border-l-4 ${ACCENT_BORDER[accent]} rounded-card-lg shadow-card-sm p-5 flex flex-col gap-3`}>
      {heading && (
        <div className="text-[13px]">
          <span className="font-bold text-gray-400 mr-1.5">{headingLabel}</span>
          <span className="font-bold text-gray-800">{heading}</span>
        </div>
      )}

      {quote && (
        <div className="bg-gray-50 rounded-card-sm px-4 py-2.5">
          <span className="text-[14px] font-semibold text-gray-800">{quote}</span>
        </div>
      )}

      {estimate && (
        <div className="text-[13px] text-gray-700">
          <span className="font-bold text-gray-400 mr-1.5">推定</span>
          {estimate}
        </div>
      )}

      {comparison && <ComparisonList rows={comparison} />}

      {(reasoning || comment) && (
        <div className="bg-gray-50 rounded-card-sm px-4 py-3">
          <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">
            {reasoning ? 'AI判断理由（Evidence）' : 'コメント'}
          </div>
          <p className="text-[13px] text-gray-600 leading-relaxed">{reasoning ?? comment}</p>
        </div>
      )}

      {recommendedAction && (
        <div>
          <div className="text-[11px] font-bold text-gray-400 tracking-wide mb-1">推奨対応</div>
          <p className="text-[13px] text-gray-700 leading-relaxed">{recommendedAction}</p>
        </div>
      )}
    </div>
  );
}
