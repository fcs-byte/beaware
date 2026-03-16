const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

const DAY = new Date().getDay();
const MATRIX = {
    1: { title: '🛠️ 技術週報：數位建築的秘密', desc: '網路世界跑得快不快，其實跟「地基」有關。', term: '開源 (Open Source)', def: '像公開食譜，大家一起改，菜才更好吃。', color: '#0047AB' },
    2: { title: '🤖 AI 進化論：你的數位超級助理', desc: 'AI 不再只是電影，它是能幫你規劃生活的人造大腦。', term: 'LLM', def: '讀過全世界書後，學會跟你聊天的人造大腦。', color: '#39FF14' },
    3: { title: '💰 數位金流：未來錢包的樣貌', desc: '除了紙鈔，數位世界也有像黃金一樣珍貴的東西。', term: '區塊鏈', def: '一本誰都沒辦法偷偷修改的數位記帳本。', color: '#FFEF00' },
    4: { title: '🚀 宇宙觀測：星際冒險說明書', desc: '我們與火星的距離，正因為科技突破而縮短。', term: '外星行星', def: '太陽系之外，可能也有生物居住的星球。', color: '#0A0A0A' }
};

function updateWeb(extraInfo = '') {
    const config = MATRIX[DAY] || MATRIX[1];
    const filePath = 'index.html';
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');
    const glossaryBox = `<div id="glossary" style="border:4px solid #000; padding:15px; margin:20px 0; background:#FFF; box-shadow:8px 8px 0px #000; color:#000;"><strong>💡 科普小辭典</strong><br><b>${config.term}</b>：${config.def}</div>`;
    
    html = html.replace(/<h1>.*?<\/h1>/, `<h1>${config.title}</h1>`)
               .replace(/🚨 即時觀測: .*?<\/p>/, `🚨 即時觀測: ${config.desc}${extraInfo}</p>`)
               .replace(/background:\s*#[A-Fa-f0-9]{3,6}/, `background: ${config.color}`)
               .replace(/<div id="glossary">[\s\S]*?<\/div>/s, glossaryBox);

    fs.writeFileSync(filePath, html);
    execSync('git add index.html');
    execSync(`git commit -m "[Data Sync] Update for ${config.title}"`);
    console.log('✅ [Success] 科普內容已對齊真實數據。');
}

if (DAY === 3) {
    https.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            const price = JSON.parse(data).bitcoin.usd;
            updateWeb(` (目前數位黃金身價: $${price} USD)`);
        });
    }).on('error', () => updateWeb());
} else {
    updateWeb();
}
