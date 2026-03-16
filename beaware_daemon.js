const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

const INTERVAL = 5 * 60 * 1000; // 每 5 分鐘自動更新一次

function pulse() {
    console.log(`[${new Date().toLocaleTimeString()}] 🪐 正在觀測宇宙脈動...`);
    https.get('https://www.nasa.gov/rss/dyn/breaking_news.rss', (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            // 改進版解析：鎖定第一個 item 區塊
            const item = data.split('<item>')[1];
            const title = item ? item.match(/<title>(.*?)<\/title>/)[1] : 'Deep Space Silence';
            
            console.log('✅ 取得頭條:', title);
            
            // 注入 HTML
            let html = fs.readFileSync('index.html', 'utf8');
            const updatedHtml = html.replace(/🚨 即時觀測: .*?<\/p>/, `🚨 即時觀測: ${title}</p>`);
            fs.writeFileSync('index.html', updatedHtml);
            
            // 自動發布流程 (Git)
            try {
                execSync('git add index.html');
                execSync(`git commit -m "[Auto] beaware intelligence update: ${new Date().toISOString()}"`);
                // 注意：若尚未配置 SSH/PAT，此步可能需手動在 GitHub Desktop 推送，但 Commit 已自動完成
                console.log('📦 本地版本庫已自動封裝。');
            } catch (e) {
                console.log('ℹ️ 內容無變動，跳過封裝。');
            }
        });
    });
}

console.log('🛡️ beaware 守護進程啟動。日誌存於 daemon.log');
pulse();
setInterval(pulse, INTERVAL);
