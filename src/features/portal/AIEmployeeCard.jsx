import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import Dialog from '../../components/Dialog';
import { ChatIcon, ArrowRightIcon } from '../../components/icons';

/**
 * 「AI社員」への入口カード（将来機能）。
 * チャット機能・AI接続は未実装。クリックすると準備中であることをダイアログで案内する。
 */
export default function AIEmployeeCard({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="w-14 h-14 rounded-card bg-gradient-to-br from-navy-700 to-navy-900 text-white flex items-center justify-center shrink-0">
        <ChatIcon size={25} />
      </div>

      <div className="flex-1 min-w-[240px]">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <h3 className="text-[17px] font-bold text-gray-900">{data.title}</h3>
          {data.badges.map((b, idx) => (
            <StatusBadge key={idx} variant={b.variant}>
              {b.label}
            </StatusBadge>
          ))}
        </div>
        <p className="text-[13.5px] text-gray-600 leading-relaxed">{data.description}</p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <Button variant="secondary" icon={<ArrowRightIcon size={16} />} onClick={() => setOpen(true)}>
          {data.actionLabel}
        </Button>
        <p className="text-[11.5px] text-gray-400 text-right max-w-[230px] leading-relaxed">{data.caption}</p>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title={data.dialogTitle}
        description={data.dialogDescription}
        confirmLabel="閉じる"
      />
    </section>
  );
}
