---
title: オーナーズクラブ
shortTitle: オーナーズクラブ
description: 既存PHPコードへ機能追加とメンテナンス
key: horse
date: 2019-02-01
tags: [PHP, docker]
---

既存サイトへの機能追加とメンテナンスのご依頼いただきました。
管理画面から編集できるスライダーの設置と全体のデザイン調整が主な依頼内容です。

## 課題と取り組み

サイトを開設されたのが2005年頃で、その後は長年メンテナンスされずに運用されていました。コードはPHPの古いバージョンで動作しており、吐き出されるタグはHTML4です。

PHPでのロジック部分は独自に作成されたものでした。
まずはローカルの仮想環境(docker)で最新バージョンのPHPが動作するよう一部のコードを修正、動作検証した上で、サーバー側のPHP環境を更新しました。
その際に併せて吐き出されるタグをHTML5の規格に沿ったものに修正しました。

スライダー部分のフロント側はbxsliderを組み込み、バックエンド側は既存の管理画面に選択画面を組み込む形で制作しました。