# 🚀 beaware 自架環境部署清單

### 1. 基礎環境
- [ ] 安裝 Docker & Docker-compose (推薦使用 Desktop 版)
- [ ] 確認 Node.js 版本 >= 20.0.0

### 2. WordPress 設定
- [ ] 安裝 WordPress (可使用官方 Docker Image)
- [ ] 進入後台「設定 > 網址結構」設定為「文章名稱 (Post name)」
- [ ] 於「使用者 > 個人資料」建立「應用程式密碼 (Application Password)」

### 3. Agent 介接
- [ ] 修改 `wp_connection_test.js` 中的 IP 與密碼
- [ ] 執行 `node wp_connection_test.js` 驗證握手狀態
