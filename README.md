URL ( https://attendance-management-rouge.vercel.app/ )

## 使用技術

* TypeScript(Next)
* drizzleORM
* supabase
* slack API
  
## 使用準備
---
* slackアカウント（できれば二つあると確認しやすい）
  複数のメールアドレスを作成する際には下記を参考にしてみてください
  
## 導入手順
---
* slack側で下記の招待からワークスペースに入ってください
  （https://join.slack.com/t/w1740385716-adu148397/shared_invite/zt-32lz6pgw7-3YUyLyTK6yguvuLy284~Dg）

* web上で講師として登録してください(/admin/teacher/create)
  この時にメールアドレスはslackアカウントのメールアドレスと同じで登録してください

* web上でシフトを登録してください（/teachers/[id]/shifts/register）
idがわからない場合には講師管理から名前をクリックしてください

上記で初期設定は完了です


## 機能概要
---

### シフト交換機能

***シフト交換のワークフロー***
* slackの勤怠管理ワーク上で/コマンド(/シフト交換)を打ってください
* 先ほど登録したシフトを選択して交換申請に出してください
  

### 事務管理の自動抽出



