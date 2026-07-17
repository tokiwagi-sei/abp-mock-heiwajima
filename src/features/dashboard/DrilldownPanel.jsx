import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../components/icons';
import ChartArea from '../../components/ChartArea';
import Table from '../../components/Table';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { ArrowRightIcon } from '../../components/icons';

/**
 * ドリルダウンメニュー＋詳細分析。
 * 「AIが要約 → 必要な時だけ詳細分析」という設計思想を体現するパネル。
 * details のキー構成（chart / table / pies / marketingTeaser / note / comment）を見て
 * 自動的に適切な表示形式を選ぶため、タブを増やす時はデータを足すだけでよい。
 */
export default function DrilldownPanel({ drilldown, details }) {
  const [activeKey, setActiveKey] = useState(drilldown[0]?.key);
  const panelRef = useRef(null);
  const detail = details[activeKey];

  // タブの並び自体が変わった（表示モード切り替え）場合は先頭タブへ戻す
  useEffect(() => {
    setActiveKey(drilldown[0]?.key);
  }, [drilldown]);

  function handleSelect(key) {
    setActiveKey(key);
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-2">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">ドリルダウンメニュー</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <p className="text-xs text-gray-500 mb-4">気になる項目をクリックすると、下に詳細分析が表示されます。</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {drilldown.map((d) => {
            const active = d.key === activeKey;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => handleSelect(d.key)}
                className={[
                  'flex flex-col items-center justify-center gap-2 rounded-card border py-4 px-2 transition-colors focus-ring',
                  active
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-navy-500',
                ].join(' ')}
              >
                <Icon name={d.icon} size={19} />
                <span className="text-xs font-semibold text-center leading-snug">{d.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section ref={panelRef} className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">詳細分析</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-6">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-5 pb-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">{detail?.title}</h3>
            <StatusBadge variant="ai">AI要約はここまで／ここからは詳細データ</StatusBadge>
          </div>

          {detail?.note && <p className="text-xs text-gray-500 mb-3">{detail.note}</p>}

          {detail?.chart && (
            <ChartArea
              variant={detail.chart.variant}
              data={detail.chart.data}
              valueFormatter={
                detail.chart.valueSuffix
                  ? (v) => `${v.toLocaleString('ja-JP')}${detail.chart.valueSuffix}`
                  : undefined
              }
            />
          )}

          {detail?.pies && (
            <div className="flex flex-wrap justify-around gap-6 py-2">
              {detail.pies.map((p) => (
                <ChartArea key={p.title} variant="pie" title={p.title} segments={p.segments} />
              ))}
            </div>
          )}

          {detail?.table && (
            <Table
              columns={detail.table.columns}
              rows={detail.table.rows}
              rowVariant={(row) => row.variant}
              className={detail.chart || detail.pies ? 'mt-5' : ''}
            />
          )}

          {detail?.marketingTeaser && (
            <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-card p-6">
              <p className="text-[13.5px] text-white/85 leading-relaxed mb-4">{detail.marketingTeaser}</p>
              <Button to="/marketing" variant="accent" icon={<ArrowRightIcon size={16} />}>
                AIマーケティングで施策を見る
              </Button>
            </div>
          )}

          {detail?.comment && (
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">AIコメント：{detail.comment}</p>
          )}
        </div>
      </section>
    </>
  );
}
