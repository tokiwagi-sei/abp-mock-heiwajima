import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';

const STATUS_META = {
  draft: { label: '下書き', variant: 'neutral' },
  pending: { label: '承認待ち', variant: 'warn' },
  approved: { label: '承認済み', variant: 'analyze' },
  published: { label: '配信済み', variant: 'available' },
};

/**
 * SNS投稿の承認〜配信パイプラインを1件表示するカード。
 * プラットフォームをまたいだ投稿を、下書き→承認待ち→承認済み→配信済みの順に進める。
 * ローカルUI上の状態変更のみ（API接続・実配信・永続化なし）。
 */
export default function SNSPostCard({ post: initialPost }) {
  const [status, setStatus] = useState(initialPost.status);
  const meta = STATUS_META[status];

  return (
    <div className="bg-white border border-gray-200 rounded-card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-gray-900 mb-1.5">{initialPost.title}</p>
          <div className="flex flex-wrap gap-1.5">
            {initialPost.platforms.map((p) => (
              <span key={p} className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 border border-navy-100">
                {p}
              </span>
            ))}
          </div>
        </div>
        <StatusBadge variant={meta.variant} className="shrink-0">
          {meta.label}
        </StatusBadge>
      </div>

      <p className="text-xs text-gray-400">配信予定：{initialPost.scheduledAt}</p>

      <div className="flex gap-2 pt-1">
        {status === 'draft' && (
          <Button size="sm" variant="secondary" onClick={() => setStatus('pending')}>
            承認申請する
          </Button>
        )}
        {status === 'pending' && (
          <>
            <Button size="sm" variant="primary" onClick={() => setStatus('approved')}>
              承認する
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setStatus('draft')}>
              差し戻す
            </Button>
          </>
        )}
        {status === 'approved' && (
          <Button size="sm" variant="primary" onClick={() => setStatus('published')}>
            配信する
          </Button>
        )}
        {status === 'published' && <span className="text-xs text-gray-400">全プラットフォームへ配信済みです</span>}
      </div>
    </div>
  );
}
