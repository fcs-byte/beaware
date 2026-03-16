const https = require('http'); // 自架環境通常先從 http 開始測試

const config = {
    host: 'YOUR_SERVER_IP', // 待硬體升級後填入
    user: 'admin',
    app_pass: 'xxxx xxxx xxxx xxxx' // WordPress 申請的應用程式密碼
};

console.log('🚀 WordPress 自架連線模組已就緒。待硬體升級完成後，請修改設定檔即可執行發佈測試。');
