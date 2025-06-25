// Prismaが生成した、データベースを操作するためのクライアントをインポートする
import { PrismaClient } from "./generated/prisma/client";

// Prisma Clientのインスタンスを作成する。
const prisma = new PrismaClient({
  // Prismaが実行するクエリ（データベースへの命令）をコンソールに表示する設定
  log: ['query'],
});

// メインの処理を記述する非同期関数
async function main() {
  console.log("Prisma Client を初期化しました。");

  // --- 処理前のユーザー一覧を取得 ---
  let users = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", users);
  
  // --- 新しいユーザーを1人追加する ---
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // --- 処理後のユーザー一覧を再度取得 ---
  users = await prisma.user.findMany();
  console.log("After ユーザー一覧:", users);
}

// main関数を実行する
main()
  .catch(e => {
    // もし途中でエラーが起きたら、内容を表示する
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が成功しても失敗しても、必ず最後にデータベースとの接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });