const fs = require('fs');
const { execSync } = require('child_process');

const sources = [
  { name: 'ArsTechnica', url: 'http://feeds.arstechnica.com/arstechnica/index' },
  { name: 'TheRegister', url: 'https://www.theregister.com/headlines.atom' },
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'HackerNews', url: 'https://news.ycombinator.com/rss' },
  { name: 'NASA', url: 'https://www.nasa.gov/news-release/feed/' }
];

const decode = (str) => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();

console.log('🚀 beaware 偵察機升空：全維度掃描開始...');
let report = [];

sources.forEach(source => {
  try {
    execSync(`curl -L -s --max-time 10 "${source.url}" -o "raw_${source.name}.xml"`);
    const data = fs.readFileSync(`raw_${source.name}.xml`, 'utf8');
    const titleMatch = data.match(/<item>[\s\S]*?<title>(.*?)<\/title>/) || data.match(/<entry>[\s\S]*?<title>(.*?)<\/title>/);
    if (titleMatch) {
      const cleanTitle = decode(titleMatch[1]);
      console.log(`✅ [${source.name}]: ${cleanTitle}`);
      report.push({ source: source.name, title: cleanTitle });
    }
  } catch (e) {
    console.log(`⚠️ [${source.name}]: 訊號弱，自動跳過`);
  }
});

fs.writeFileSync('latest_intelligence.json', JSON.stringify(report, null, 2));
