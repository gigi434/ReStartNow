## 環境変数

Next.js では自動で環境変数が読み込まれる
[参照](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

例えば、開発環境では.env.development.local ファイルが優先され、最終的に.env ファイルが読み込まれる。

問題として、自動テストで開発環境用の環境変数ファイルを使用する際、本番環境用の環境変数ファイルを読み込んでしまう。

そのため、事前に下記環境変数ファイルを作成し、開発環境用の内容を.env.local ファイルにコピーすることで対応する。

- .env.dev.local
- .env.stag.local
- .env.prod.local
