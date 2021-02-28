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
