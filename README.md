# PLC Conveyor Simulator

製造業向け設備制御を想定した、ブラウザ上で動作する簡易PLCシミュレータです。

## 概要
コンベア搬送ラインを模擬し、Start/Stop、非常停止、Reset、センサー入力、異常検知、ログ表示を実装しました。

## 実装機能
- Start / Stop
- 非常停止
- Reset
- コンベア搬送
- センサー（S1, S2）
- タイムアウト異常（ERROR）
- インターロック
- 操作ログ表示

## 工夫した点
- 状態管理（IDLE / RUNNING / ERROR / EMERGENCY）
- PLCのスキャン処理を意識した setInterval の採用
- 異常時の復帰は Reset のみ可能とする設計

## 使用技術
- HTML
- CSS
- JavaScript

## 動作方法
index.html をブラウザで開いてください。

## 状態遷移

```text
IDLE
 └─ Start → RUNNING
              ├─ Timeout → ERROR
              │            └─ Reset → IDLE
              ├─ Stop → STOP
              │         └─ Start → RUNNING
              └─ Emergency → EMERGENCY
                           └─ Reset → IDLE
```