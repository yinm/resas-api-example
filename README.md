# resas-api-example

## 開発環境の構築

### Project setup

```sh
npm install
```

### 開発環境の起動
RESASのAPIキー(秘匿情報)をクライアントに持たせないために、Netlify Functions経由でRESASにリクエストするようにしています。開発環境でもNetlify Functionsを使えるように、[Netlify Dev](https://www.netlify.com/products/dev/)を事前にインストールする必要があります。

```sh
npm i -g netlify-cli
```

開発環境の起動

```sh
netlify dev
```

### テストの実行

```sh
npm run test:unit
```

### Lintの実行
```sh
# チェックのみ
npm run lint 

# autofix
npm run lint:fix 
```

## ディレクトリ構成
基本は、[Vue CLIで環境を作っています (リンク先のコミットメッセージに、選択した機能も記載)](https://github.com/yinm/resas-api-example/commit/6a630dddedaf24b3c634d1892efc6525eec737e6)。

その他、開発中に追加したディレクトリの主要なものについて、こちらで説明します。

`serverless`
- Netlify Functionsで実行するコードを置く場所です。
  - クライアントサイドのコードとは直接関係しないので、別のディレクトリに分けておいた方がわかりやすいだろう思い、`src`には配置しませんでした。

`src/composables`
- Vue.jsのComposition Functionsの置き場です。

`src/types`
- クライアントのアプリケーション内で共有したい型定義の置き場です。

`src/utils`
- クライアントのアプリケーション内で共有したい関数や設定などの置き場です。
