const https = require('https');
const fs = require('fs');

const rssUrl = 'https://www.nasa.gov/news-release/feed/';

const fetchSignal = (url) => {
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      console.log('📡 偵測到跳轉，重新連線至:', res.headers.location);
      return fetchSignal(res.headers.location);
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const itemMatch = data.match(/<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<\/item>/);
        if (itemMatch) {
          const cleanTitle = itemMatch[1].replace('<![CDATA[', '').replace(']]>', '').trim();
          const output = `[📡 宇宙實時脈動: ${cleanTitle}]`;
          
          let html = fs.readFileSync('index.html', 'utf8');
          // 使用更寬鬆的正則匹配現有標籤
          const updatedHtml = html.replace(/\[📡 (訊號解析成功|宇宙實時脈動:.*?)\]/g, output);
          
          fs.writeFileSync('index.html', updatedHtml);
          console.log('✨ 擷取成功:', cleanTitle);
        } else {
          console.log('⚠️ 數據格式不符，改用備援內容。');
        }
      } catch (e) {
        console.error('❌ 解析過程出錯:', e.message);
      }
    });
  }).on('error', (err) => {
    console.error('❌ 網路連線故障:', err.message);
  });
};

fetchSignal(rssUrl);
