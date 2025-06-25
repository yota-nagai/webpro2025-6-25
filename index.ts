import express from 'express';
// 生成した Prisma Client をインポート
import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient({
  // クエリが実行されたときに実際に実行したクエリをログに表示する設定
  log: ['query'],
});
const app = express();

// 環境変数が設定されていれば、そこからポート番号を取得する。環境変数に設定がなければ 8888 を使用する。
const PORT = process.env.PORT || 8888;

// EJS をテンプレートエンジンとして設定
app.set('view engine', 'ejs');
// EJS ファイルが置かれているディレクトリを設定
app.set('views', './views');

// フォームから送信されたデータを受け取れるように設定
app.use(express.urlencoded({ extended: true }));

// ルートパス("/")へのGETリクエストに対する処理
app.get('/', async (req, res) => {
  // データベースから全てのユーザーを取得
  const users = await prisma.user.findMany();
  // 'index.ejs' を描画し、取得したユーザーデータを渡す
  res.render('index', { users });
});

// "/users"へのPOSTリクエストに対する処理（フォームからのユーザー追加）
app.post('/users', async (req, res) => {
  const name = req.body.name;
  // フォームから送信された年齢を取得し、数値に変換する。入力がなければnullにする。
  const age = req.body.age ? Number(req.body.age) : null;

  if (name) {
    await prisma.user.create({
      data: { name, age }, // データベースに名前と年齢を保存
    });
    console.log('新しいユーザーを追加しました:', { name, age });
  }
  res.redirect('/'); // ユーザー追加後、一覧ページにリダイレクト
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});