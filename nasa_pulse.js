const https = require('https');
const fs = require('fs');

console.log('📡 [beaware] 正在執行高精度情報提煉...');

https.get('https://www.nasa.gov/rss/dyn/breaking_news.rss', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // 精確鎖定第一個 <item> 內的 <title>
        const itemMatch = data.match(/<item>([\s\S]*?)<title>(.*?)<\/title>/);
        const latestTitle = itemMatch ? itemMatch[2] : '📡 訊號解析中...';
        
        console.log(`🚀 [Intelligence] 偵測到頭條新聞: ${latestTitle}`);
        
        let html = fs.readFileSync('index.html', 'utf8');
        // 使用正則替換之前的標題內容
        const updatedHtml = html.replace(/🚨 即時觀測: .*?<\/p>/, `🚨 即時觀測: ${latestTitle}</p>`);
        
        fs.writeFileSync('index.html', updatedHtml);
        console.log('✅ [Update] beaware 首頁內容已精確同步。');
    });
}).on('error', (err) => { console.error('⚠️ [Error] NASA 連線失敗: ' + err.message); });
