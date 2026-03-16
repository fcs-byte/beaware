const fs = require('fs');

const payload = {
    title: '🛰️ 實時觀測：NASA 宇宙脈動訊號',
    content: fs.readFileSync('index.html', 'utf8'),
    status: 'publish', // 直接發佈
    categories: [1], // 預設分類
    tags: ['AI', 'NASA', 'beaware']
};

fs.writeFileSync('wp_payload.json', JSON.stringify(payload, null, 2));
console.log('✅ 已產出 WordPress 標準發佈 JSON 封包。');
