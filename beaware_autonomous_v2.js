const { execSync } = require('child_process');
const schedule = ['🛠️ 技術週報', '🤖 AI 進化論', '🪙 數位貨幣', '🧬 未來實驗室', '🔭 太空觀測', '🛡️ 隱私守護', '☕ 週末特輯'];
function run() {
    const day = new Date().getDay();
    console.log(`[${new Date().toLocaleString()}] 啟動 ${schedule[day]} 自主掃描...`);
    try {
        execSync('node news_scout.js && node editorial_engine.js && git add index.html && git commit -m "[Auto-Observed] Daily Insight Update"');
        console.log('✅ 情報已更新並安全提交。');
    } catch (e) {
        console.log('⚠️ 本次掃描無新異動或執行中斷。');
    }
}
run();
setInterval(run, 3600000);
