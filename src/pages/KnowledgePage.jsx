import { useState } from 'react';
import knowledgeData from '../data/knowledge.json';
import KnowledgeSearch from '../features/knowledge/KnowledgeSearch';
import Filter from '../components/Filter';
import ScopeIndicator from '../features/workspace/ScopeIndicator';

export default function KnowledgePage() {
  const data = knowledgeData;
  const [categories, setCategories] = useState([]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1.5">{data.title}</h1>
      <p className="text-[13.5px] text-gray-500">{data.description}</p>
      <ScopeIndicator />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <KnowledgeSearch exampleQuestions={data.exampleQuestions} sampleAnswer={data.sampleAnswer} />

        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-5">
            <h3 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-3">ナレッジカテゴリ</h3>
            <Filter
              options={data.categories}
              value={categories}
              onChange={setCategories}
              multiSelect
              className="!gap-2"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-5">
            <h3 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-3">AIおすすめ検索</h3>
            <ol className="flex flex-col gap-2">
              {data.trendingSearches.map((s, idx) => (
                <li key={s} className="flex items-center gap-2.5 text-[13px] text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-5">
          <h3 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-4">ナレッジ登録状況</h3>
          <div className="grid grid-cols-3 gap-4">
            {data.registrationStats.map((s) => (
              <div key={s.label}>
                <div className="text-lg font-bold text-gray-900">{s.value}</div>
                <div className="text-[11px] text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-card-lg shadow-card-sm p-5">
          <h3 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-4">AI利用状況</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.usageStats.map((s) => (
              <div key={s.label}>
                <div className="text-lg font-bold text-gray-900">{s.value}</div>
                <div className="text-[11px] text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 mb-4">
        <div className="flex items-baseline gap-2.5 mb-4">
          <h2 className="text-[13px] font-bold tracking-[2px] uppercase text-gray-500">AI利用イメージ</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4">
          {data.usageExamples.map((ex) => (
            <div key={ex.question} className="flex flex-col gap-2 max-w-2xl">
              <div className="self-end bg-navy-900 text-white text-[13px] rounded-card-sm rounded-tr-none px-4 py-2.5">{ex.question}</div>
              <div className="self-start bg-gray-100 text-gray-800 text-[13px] rounded-card-sm rounded-tl-none px-4 py-2.5">{ex.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
