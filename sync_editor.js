const fs = require('fs');
const data = fs.readFileSync('nasa_raw.xml', 'utf8');
const itemMatch = data.match(/<item>[\s\S]*?<title>(.*?)<\/title>/);
const cleanTitle = itemMatch ? itemMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim() : '觀測站運行中';
const pulseOutput = `[📡 宇宙實時脈動: ${cleanTitle}]`;

let html = fs.readFileSync('index.html', 'utf8');
const updatedHtml = html.replace(/\[📡 (訊號解析成功|宇宙實時脈動:.*?)\]/g, pulseOutput);
fs.writeFileSync('index.html', updatedHtml);
console.log('✨ 內容已同步校準:', cleanTitle);
