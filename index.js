// Node.jsに標準で備わっているhttpの機能を読み込む
import http from 'node:http';

// サーバーが待ち受けるポート番号を設定する。環境変数PORTがあればそれ使い、なければ8888番を使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // アクセスされたURLをパース（解析）して、扱いやすくする
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(`アクセスがありました。Path: ${url.pathname}`);

  // 日本語が文字化けしないように、ヘッダーで文字コードをUTF-8に設定する
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパス（ルート以降の部分）によって処理を分岐する
  if (url.pathname === '/') {
    // ルートパス ("/") へのアクセスだった場合
    console.log("ルートパスへのアクセスです。");
    res.writeHead(200); // ステータスコード200 (成功) を返す
    res.end('こんにちは！'); // "こんにちは！" という文字列を返す
  } else if (url.pathname === '/ask') {
    // "/ask" へのアクセスだった場合
    console.log("/ask へのアクセスです。");
    const question = url.searchParams.get('q'); // URLの?q=... の部分を取得
    res.writeHead(200);
    res.end(`Your question is '${question}'`); // 取得した質問を返す
  } else {
    // それ以外のパスへのアクセスだった場合
    console.log("未定義のパスへのアクセスです。");
    res.writeHead(404); // ステータスコード404 (Not Found) を返す
    res.end('ページが見つかりません');
  }
});

// 設定したポート番号でサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(`サーバーが起動しました。 http://localhost:${PORT} で待ち受け中です。`);
});