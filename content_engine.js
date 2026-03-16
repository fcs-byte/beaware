const fs = require('fs');
const date = new Date().toLocaleDateString();
const narrative = `
<article style="border: 4px solid #000; padding: 20px; background: #FFF; box-shadow: 10px 10px 0px #000; margin-top: 20px;">
    <h2 style="color: #0047AB;">🚀 週一技術專題：數位研究員的誕生</h2>
    <p><b>觀測日期：</b> ${date}</p>
    <p>今天，我們不談生澀的代碼遷移，而是談談如何賦予 AI 一個「實體家園」。透過 GitHub Pages，我們的 Agent 擁有了自主發布的能力，這就像是給了研究員一支永不乾涸的筆。</p>
    <div style="background: #f0f0f0; border-left: 5px solid #0047AB; padding: 10px; margin: 15px 0;">
        <i>「技術的終點不是複雜，而是讓人一眼看穿其價值。」</i>
    </div>
</article>`;

let html = fs.readFileSync('index.html', 'utf8');
// 注入科普敘事至辭典上方
if (!html.includes('週一技術專題')) {
    html = html.replace('<section', narrative + '<section');
    fs.writeFileSync('index.html', html);
    console.log('✅ 科普敘事已成功注入首頁');
} else {
    console.log('ℹ️ 今日敘事內容已存在');
}
