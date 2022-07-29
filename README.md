# trarec

## 概要

トレーニングメニューの管理と履歴の記録を行うための PWA (Progressive Web Application)

## 機能

サインアップ・ログイン / メニューやトレーニング履歴の登録編集削除 / 年月で履歴の絞り込み　/ 履歴の折れ線グラフ表示

## 使用技術

TypeScript / React / Firebase Authentication / Cloud Firestore / Chakra UI / react-chartjs-2

## デモ

![how0GoC4X1OuVi5Jhych1655714271-1655714306](https://user-images.githubusercontent.com/46856574/174564000-ef5a21c7-4d9a-4a83-a687-5a5cd958cdfb.gif)

## URL

https://trarec-fe452.web.app/

## インストール

- iOS × Safari  
上記のURLにアクセスし画面下のメニューからホーム画面に追加をタップ

- Android × Chrome  
上記のURLにアクセスしインストールをタップ

- Mac × Chrome  
上記のURLにアクセスしアドレスバーの右にあるインストールアイコンをクリック

## アンインストール

- iOS × Safari  
ホーム画面でアイコンを長押ししてアンインストール

- Android × Chrome  
ホーム画面でアイコンを長押ししてアンインストール

- Mac × Chrome  
上記のURLにアクセスし右上のその他アイコンからアンインストールをクリック


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

## デプロイ

```
yarn build
firebase deploy --only hosting
```
