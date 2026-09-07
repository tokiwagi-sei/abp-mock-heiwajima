# CLAUDE.md — ABP モック（ボートレース平和島様向け提案）

別PC・新規セッションで作業を再開するための実務ルール。
画面仕様・組織構造・瑞鳳版との違いは **README.md** が正本なので、ここには書き写さない。

## このリポジトリの位置づけ

ボートレース平和島様への提案用モック。瑞鳳グループ様向け abp-mock のデザインシステムを
流用して新規構築した**独立プロジェクト**。

**表示データはすべて平和島様向けのダミーで、瑞鳳グループ様の実データは一切含まない。**
これは意図的な設計判断なので、実データを持ち込んで「リアルにする」ことはしない。

## 開発

```bash
npm install
npm run dev      # Vite 既定ポート（vite.config.js に port 指定なし）
npm run build    # dist/ へ出力
npm run lint     # oxlint
npm run preview
```

React 19 + Vite + Tailwind CSS v4。画面は `src/data/*.json` だけで動作し、API・DB接続はない。

> README には「`http://localhost:5174` で確認」とあるが、`"dev": "vite"` にポート指定が
> 無いため実際は Vite の既定ポート。同時起動で衝突する場合は `--port` を付ける。

## デプロイ

**Vercel CLI からの直接デプロイ。GitHub 連携ではない**（2026-09-07 に実測確認）。

```bash
npx vercel deploy --prod
```

Vercel プロジェクト: `abp-mock-heiwajima` / scope `tsei-4807s-projects`
公開URL: https://abp-mock-heiwajima.vercel.app

> README の「GitHub Push → Vercel自動デプロイの運用を想定」は**構想であって現状ではない**。
> 自動デプロイに切り替えるなら Vercel 側で Git 連携の設定が別途必要。

## 環境変数

`.env.local` に `VERCEL_OIDC_TOKEN` のみ。`vercel link` が自動生成する短命トークンで、
サイト自体は使っていない。**実値はここにも他のどこにも書かない。**

共有が必要なキーができたら `.env.example` にキー名と説明だけを書く（値は空）。

## 注意

- **`vercel link` は `.gitignore` の末尾に `.vercel` と `.env*` を自動追記する。**
  `.gitignore` は後勝ちなので `.env*` が復活すると `.env.example` まで無視される。
  link を実行したら毎回 `.gitignore` の末尾を確認し、重複行があれば削除すること。
- Feature ID / CHANGELOG 運用は未導入（瑞鳳版とは異なる）。必要になった時点で起票する。

## 保存場所

- 正本: `C:\dev\abp-mock-heiwajima`（OneDrive 同期対象外）
- 旧: `OneDrive\TOKIWAGI\01_案件\ボートレース平和島_OLD`（2026-09-07 リネーム・削除待ち）

バックアップは OneDrive 同期ではなく **GitHub への push** が担う。
