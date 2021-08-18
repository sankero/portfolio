---
title: 端末シュミレータ制作(Flash版)
shortTitle: 端末シュミレータ(Flash版)
description: FlashベースのRIA
key: simulator-flash
date: 2013-07-01
tags: [RIA, Flash, ActionScript, Photoshop]
---

コールセンター向けのアプリケーションとしてスマートフォンのシミュレータ制作に途中参画しました。

本アプリケーションの主な用途としては、スマートフォンのコールセンターにて電話オペレータが案内する際、スマートフォン実機の代わりとしてPC画面上で動作するスマートフォンのシミュレータです。
実機を揃えるコストを抑えるために開発されました。

## 技術的な側面

本アプリケーションはFlashベースのRIA（Rich Internet Application）で、ローカルネットワーク内に設置したウェブサーバーにアクセスして使用します。
実機からキャプチャーした画像などをActionScriptを駆使してそれらしい動作で再現します。
