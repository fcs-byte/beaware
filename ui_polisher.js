const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const styleInjections = `
<style>
  @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
  .signal-status { animation: blink 1.5s infinite; color: #0f0; }
  .magazine-article { max-width: 800px; margin: auto; padding: 20px; }
  h2, h3 { text-transform: uppercase; letter-spacing: 1px; }
  ul { list-style: square; }
  div[style*="border: 4px"] { box-shadow: 8px 8px 0px #000; transition: 0.3s; }
  div[style*="border: 4px"]:hover { transform: translate(-2px, -2px); box-shadow: 12px 12px 0px #000; }
</style>\n</head>`;

// 注入樣式並標記動態元素
html = html.replace('</head>', styleInjections);
html = html.replace('[📡 訊號解析成功]', '<span class="signal-status">[📡 訊號解析成功]</span>');

fs.writeFileSync('index.html', html);
console.log('✨ 視覺脈動與 UI 厚度已注入。');
