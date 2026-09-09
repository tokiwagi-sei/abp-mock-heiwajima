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

## 作業ルール（二拠点運用）

このリポジトリは**会社PC（MINISFORUM M2 / `C:\Users\TAKUYA SEI`）と自宅PC（a9-max /
`C:\Users\tsei`）の両方**で作業する。拠点間の同期経路は **GitHub のみ**で、
会話履歴もローカルの未コミット変更も共有されない。

### Claude への指示：終了時の push 確認

ユーザーが「今日は終了」「作業終わり」「一旦ここまで」など、作業の区切りを示したら、
**必ず未 push の変更がないか確認して報告すること。** ユーザーからの依頼を待たない。

1. `git status --porcelain` と `git log origin/main..HEAD --oneline` を実行する
2. 未コミット、または未 push のコミットがあれば、その内容とともに
   **「push が必要です」と明示的に伝える**
3. clean かつ push 済みであれば「push 済み・持ち越しなし」と伝えて終える

未 push のまま拠点を移ると、次の拠点では古い状態から作業することになり、
履歴が枝分かれして衝突する。これを防ぐのがこのルールの目的。

### 中断時の扱い

コミットしたくない中途半端な状態で終える場合、**`git stash` は使わない。**
stash はそのPCのローカルにしか残らず、別拠点から取り出せない。
今回の移行で解消したはずの「片方にしか無い」問題を、また作ることになる。

作業用ブランチを切って push する。

```bash
git switch -c wip/<内容>
git add -A && git commit -m "WIP: 作業途中"
git push -u origin wip/<内容>
```

### 禁止

枝分かれしても **`git push --force` は使わない。** 相手側の拠点のコミットが消える。
`git pull --rebase` で自分のコミットを載せ直すこと。

### 引き継ぎ

会話履歴は拠点間で共有されない。作業の区切りでは、この CLAUDE.md か `_HANDOFF.md` に
**「どこまでやったか / 次の一手」**を追記して push する。それが次に別拠点で立てた
セッションへの唯一の申し送りになる。
