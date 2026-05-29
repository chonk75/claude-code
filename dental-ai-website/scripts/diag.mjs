import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args:["--no-sandbox","--use-gl=swiftshader"] });
const p = await b.newContext({ viewport:{width:1440,height:900}, reducedMotion:"reduce" }).then(c=>c.newPage());
await p.goto("http://localhost:3100/roi",{waitUntil:"networkidle"}); await p.waitForTimeout(1500);
const info = await p.evaluate(()=>{
  const out=[]; let i=0;
  document.querySelectorAll("main > * , main section, main > div").forEach(()=>{});
  document.querySelectorAll("section").forEach(s=>{
    const r=s.getBoundingClientRect();
    out.push({i:i++, h:Math.round(r.height), top:Math.round(r.top+window.scrollY), label:(s.querySelector('h1,h2')?.innerText||'').slice(0,40)});
  });
  return { total: document.body.scrollHeight, sections: out };
});
console.log(JSON.stringify(info,null,2));
await b.close();
