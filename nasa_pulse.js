const fs = require('fs');
const https = require('https');

const options = { hostname: 'api.nasa.gov', path: '/planetary/apod?api_key=DEMO_KEY', method: 'GET' };

const req = https.request(options, res => {
    let data = '';
    res.on('data', d => { data += d; });
    res.on('end', () => {
        const info = JSON.parse(data);
        let html = fs.readFileSync('index.html', 'utf8');
        const entry = `<div style="border:3px solid #000; padding:10px; margin-top:10px; background:#e0e0e0;"><b>🛰️ 實時訊號:</b> ${info.title} (${info.date})</div>`;
        if (!html.includes('🛰️ 實時訊號')) {
            html = html.replace('</h1>', '</h1>' + entry);
            fs.writeFileSync('index.html', html);
            console.log('✅ NASA 數據心跳已成功同步至首頁');
        }
    });
});
req.on('error', error => { console.error(error); });
req.end();
