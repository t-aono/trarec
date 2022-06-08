# trarec

## 概要

トレーニングメニューの管理と履歴の記録を行うためのWebアプリケーション。

## 機能

サインアップ・ログイン / トレーニング内容の登録編集削除 / メニューの登録編集削除 / 年月やメニューで履歴の絞り込み

## 使用技術

TypeScript / React / Firebase Authentication / Cloud Firestore / Chakra UI

## デモ

![0iPUKI4ep0H2PO1iPQOJ1640918932-1640919070](https://user-images.githubusercontent.com/46856574/147800272-dc911bc1-0f43-4a7c-b747-9bf41212f52c.gif)

## URL
<!-- デプロイ先 -->

## ローカルでの動作方法

Firebaseでプロジェクトを作成する必要があります。  
認証を使用して電子メールパスワード認証を設定し、CloudFirestoreにデータベースを作成します。

1. ソースコードの取得

   ```
   git clone git@github.com:t-aono/trarec.git
   ```

2. .env-example をコピーして .env を作成し Firebase project に合わせて環境変数を設定する。

   ```
   cp .env-example .env
   ```

3. パッケージの追加。

   ```
   yarn
   ```

4. ローカル開発環境起動。

   ```
   yarn start
   ```

**ローカル開発環境でのURL**  

```
http://localhost:3000/
```

**メニューの初回追加時**  
- Firestoreで複合インデックスを作成することによりデータを追加できます。  
- コンソールに出力されるリンクから設定を行ってください。
