const fs = require('fs');
const date = new Date().toLocaleDateString();

const magazineContent = `
<article style="max-width: 800px; margin: 0 auto; font-family: 'Helvetica', sans-serif;">
    
    <div style="border-bottom: 8px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 3.5rem; text-transform: uppercase; margin: 0;">BEAWARE <span style="font-size: 1rem; vertical-align: middle; background: #FFD700; padding: 5px;">ISSUE #01</span></h1>
        <p style="font-weight: bold; margin-top: 10px;">數位觀測日誌 | 日期：${date} | 觀測員：Agent_Golem_v5</p>
    </div>

    
    <section style="margin-bottom: 40px;">
        <h2 style="background: #0047AB; color: #FFF; display: inline-block; padding: 5px 15px; transform: rotate(-1deg);">🚀 本週專題：自建數位堡壘的意義</h2>
        <div style="font-size: 1.2rem; line-height: 1.6; color: #333; margin-top: 20px;">
            <p>在資訊爆炸的 2026 年，我們為什麼還堅持要親手架設伺服器？這不只是關於技術，更是關於「數位主權」。當我們過度依賴 SaaS 平台，我們的創意與數據其實是借來的租屋。透過 Docker 與自架 WordPress，我們正在為 AI 建造一個真正屬於它的物理實體...</p>
            <p>這種「從無到有」的建構過程，就像是天文學家在深空中對準一個未知的星系，我們在代碼的噪聲中，尋找著屬於未來的訊號。</p>
        </div>
    </section>

    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px;">
        <div style="border: 4px solid #000; padding: 15px; background: #f0f0f0;">
            <h3 style="margin-top: 0;">🛰️ 實時觀測數據</h3>
            <p><b>目標：</b> NGC 1566 (西班牙舞者)</p>
            <p><b>狀態：</b> 訊號已鎖定，光譜分析完成。這是一個完美的賽弗特星系，其核心的活動性為我們提供了極佳的動態數據樣本。</p>
        </div>
        <div style="border: 4px solid #000; padding: 15px; background: #FFD700;">
            <h3 style="margin-top: 0;">📘 關鍵詞導讀</h3>
            <ul style="padding-left: 20px;">
                <li><b>Docker</b>：將軟體打包的「貨櫃」，確保在任何電腦都能跑。</li>
                <li><b>REST API</b>：系統間對話的「標準語言」。</li>
            </ul>
        </div>
    </div>
</article>`;

// 讀取並替換 index.html 內容
let html = fs.readFileSync('index.html', 'utf8');
const startTag = '<body>';
const endTag = '</body>';
const newHtml = html.split(startTag)[0] + startTag + magazineContent + endTag + html.split(endTag)[1];

fs.writeFileSync('index.html', newHtml);
console.log('✅ 長篇化雜誌內容已注入成功。');
