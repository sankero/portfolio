---
title: 電子機器メーカーサイト
shortTitle: 電子機器メーカー
description: WordPressを使用したリニューアル案件
key: electronics
date: 2016-08-01
tags: [WordPress, PHP, オリジナルテーマ, Javascript]
---

電子機器製造メーカーのコーポレートサイトをリニューアルしました。

## 課題と取り組み

「WordPressで運用している自社サイトの商品データーの登録が使い辛いので改善したい」とのご相談が本件に携わるきっかけでした。
もともとは別制作会社で作成されたものを運用されていたものです。

オリジナルテーマで制作されていたもののようですが、WordPressのテンプレート作法に則ったコーディングではなく、Exec-PHPなどセキュリティリスクが高いプラグインと組み合わせて構築されていました。  
また、長期間バージョン更新がされておらず、モバイル表示にも非対応でスマートフォンではそのままPC画面のレイアウトで表示されている状態です。

まずは最初にご相談頂いた「商品データの登録」の使い辛さ解消のため、カスタムフィールド周りのコード改修などの対応を行いました。  
続いてバージョンアップの必要性と、問題のあるExec-PHPプラグインなどの排除、スマートフォン対応に合わせてのサイトリニューアルを先方に提案し承認頂きました。  

## 技術的な側面

サイトリニューアルにあたっては入力されている商品データなどの資源についてはそのまま活用しつつ、WordPressの新規オリジナルテーマを構築していきました。  
Exec-PHPで書かれていたコードは全てWordPressテーマに包括する形に書き直し、バージョンアップしたWordPress4.1系統のバージョンで動くようプラグインの動作検証、動かないプラグインの代替えなどを実施しました。

## 次に活かせる学び

ご依頼頂いたのが2016年頃でしたので、WordPress 4.1系統が安定期してきた頃でした。
そんな中で1世代前のWordPress 3系統のバージョンと仕様を比べながらのオリジナルテーマの再構築で、WordPressに関する仕様や作法について多くの知見を得る事ができました。
