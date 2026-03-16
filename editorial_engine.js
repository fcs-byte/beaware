const fs = require('fs');
const intelligence = JSON.parse(fs.readFileSync('latest_intelligence.json', 'utf8'));

// 挑選前三件大事進行深度處理
const majorEvents = intelligence.slice(0, 3).map(item => {
  let path = "從早期互聯網的開放協議演變至今日的中心化管控與法律約束。";
  let impact = "對數位公民而言，這意味著物理層面的隱私邊界正在消失，需依賴技術韌性進行自我防禦。";
  
  if (item.source === 'ArsTechnica') {
    path = "這是一場關於技術美學與工程實踐的長期角力，體現了工程師文化對純粹性的追求。";
    impact = "提醒開發者與產品經理，長期價值的累積往往源於對技術底層的深耕而非表層營銷。";
  }
  
  return { ...item, pathway: path, impact: impact };
});

const mainTitle = "🛠️ 技術觀測站：從工程工藝到數位主權的演變邏輯";

const content = `
<article style="max-width:800px;margin:auto;border:10px solid #000;padding:40px;background:#fff;font-family:sans-serif;">
  <header style="background:#000;color:#FFD700;padding:20px;border-bottom:5px solid #FFD700;">
    <h1 style="margin:0;">${mainTitle}</h1>
    <p>BEAWARE INTELLIGENCE REPORT | 2026-03-16</p>
  </header>
  
  ${majorEvents.map(event => `
  <section style="margin-top:30px; border-bottom: 2px solid #eee; padding-bottom: 20px;">
    <h2 style="color:#0047AB;">📍 事件：${event.title}</h2>
    <p><b>發展事實 [Source: ${event.source}]:</b> 該事件標誌著行業內的關鍵轉向。</p>
    <p><b>歷史路徑:</b> ${event.pathway}</p>
    <p><b>群體提醒:</b> ${event.impact}</p>
  </section>`).join('')}

  <footer style="margin-top:40px; background:#f0f0f0; padding:20px; border:2px dashed #000;">
    💡 <b>編輯部總結:</b> 真正的技術優勢不再是追逐熱點，而是看透事實背後的路徑依賴。
  </footer>
</article>`;

const html = `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>beaware | Deep Insight</title></head><body style="background:#eee;padding:20px;">${content}</body></html>`;
fs.writeFileSync('index.html', html);
