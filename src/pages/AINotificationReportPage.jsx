import { useParams, Link } from 'react-router-dom';
import notificationsData from '../data/aiNotifications.json';
import AIVerdictPanel from '../features/notifications/AIVerdictPanel';
import CriticalIssueCard from '../features/notifications/CriticalIssueCard';
import FindingCard from '../features/notifications/FindingCard';
import StatusBadge from '../components/StatusBadge';
import { ArrowRightIcon } from '../components/icons';

export default function AINotificationReportPage() {
  const { reportId } = useParams();
  const report = notificationsData.reports[reportId];

  if (!report) {
    return (
      <div>
        <p className="text-sm text-gray-600">指定されたレポートが見つかりませんでした。</p>
        <Link to="/" className="text-sm font-bold text-navy-800 mt-3 inline-block">
          ABPポータルへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-navy-800 mb-4">
        <span className="rotate-180 inline-flex"><ArrowRightIcon size={14} /></span>
        ABPポータルへ戻る
      </Link>

      <div className="flex items-center gap-2 flex-wrap mb-1.5">
        <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
        <StatusBadge variant="pending">{report.status}</StatusBadge>
      </div>
      <p className="text-[13.5px] font-semibold text-gray-700">対象：{report.target}</p>
      <p className="text-[13px] text-gray-400 mt-1">作成日時：{report.createdAt}</p>
      <p className="text-[13.5px] text-gray-500 mt-2 max-w-2xl leading-relaxed">{report.leadText}</p>

      <div className="mt-6">
        <AIVerdictPanel verdict={report.verdict} />
      </div>

      {/* セクション1：最優先で現物確認すべき矛盾 */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">
            🔴 最優先で現物確認すべき矛盾
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4">
          {report.criticalIssues.map((issue) => (
            <CriticalIssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      {/* セクション2：誤植・OCR誤変換の疑い */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">
            🟡 誤植・OCR誤変換の疑い
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {report.ocrIssues.map((issue) => (
            <FindingCard
              key={issue.id}
              accent="ocr"
              headingLabel="対象"
              heading={issue.target}
              quote={issue.detected}
              estimate={issue.estimate}
              reasoning={issue.reasoning}
            />
          ))}
        </div>
      </section>

      {/* セクション3：拠点間の数値・運用の不統一 */}
      <section className="mt-10">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">
            🟠 拠点間の数値・運用の不統一
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <p className="text-xs text-gray-400 mb-4">
          誤りではなく、拠点ごとの運用差異として扱っています。
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {report.storeDifferences.map((diff) => (
            <FindingCard
              key={diff.id}
              accent="diff"
              headingLabel="項目"
              heading={diff.topic}
              comparison={diff.comparison}
              comment={diff.comment}
            />
          ))}
        </div>
      </section>

      {/* セクション4：原文だけでは判断不可 */}
      <section className="mt-10 mb-4">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">
            ⚪ 原文だけでは判断不可
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {report.unknownIssues.map((issue) => (
            <FindingCard
              key={issue.id}
              accent="unknown"
              headingLabel="対象"
              heading={issue.target}
              quote={issue.detected}
              reasoning={issue.reasoning}
              recommendedAction={issue.recommendedAction}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
