# trarec

## 概要

トレーニングメニューの管理と履歴の記録を行うためのウェブアプリケーション。

## 機能

サインアップ・ログイン / メニューやトレーニング履歴の登録編集削除 / 年月やメニューで履歴の絞り込み

## 使用技術

TypeScript / React / Firebase Authentication / Cloud Firestore / Chakra UI

## デモ

![0iPUKI4ep0H2PO1iPQOJ1640918932-1640919070](https://user-images.githubusercontent.com/46856574/147800272-dc911bc1-0f43-4a7c-b747-9bf41212f52c.gif)

## URL

https://trarec-fe452.web.app/

## ローカルでの動作方法

Firebase でプロジェクトを作成する必要があります。  
認証を使用してメールパスワード認証を設定し CloudFirestore にデータベースを作成します。

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

   ローカル環境 URL
   http://localhost:3000


5. データベースのセットアップ

- Firebase CLI で対象のログインして対象のプロジェクトを選択します。

  ```
  firebase login
  firebase use <your project name>
  ```

- 設定ファイルをもとに Firestore のセキュリティルールを更新してデータの読み書きを可能にします。

  ```
  firebase deploy --only firestore:rules
  ```

- 設定ファイルをもとに Firestore のインデックスを作成します。

  ```
  firebase deploy --only firestore:indexes
  ```
