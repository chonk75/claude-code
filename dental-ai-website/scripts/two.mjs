import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args:["--no-sandbox","--use-gl=swiftshader"] });
const p = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1.5, reducedMotion:"reduce" }).then(c=>c.newPage());
await p.goto("http://localhost:3100/roi",{waitUntil:"networkidle"}); await p.waitForTimeout(1200);
await p.evaluate(async()=>{const s=m=>new Promise(r=>setTimeout(r,m));for(let y=0;y<6000;y+=400){window.scrollTo(0,y);await s(70);}});
await p.evaluate(()=>window.scrollTo(0,1560)); await p.waitForTimeout(700); await p.screenshot({path:"/tmp/shots3/zz-roicalc.png"});
await p.evaluate(()=>window.scrollTo(0,6720)); await p.waitForTimeout(700); await p.screenshot({path:"/tmp/shots3/zz-cta.png"});
// home chat at right offset
await p.goto("http://localhost:3100/",{waitUntil:"networkidle"}); await p.waitForTimeout(1200);
await p.evaluate(async()=>{const s=m=>new Promise(r=>setTimeout(r,m));for(let y=0;y<6500;y+=400){window.scrollTo(0,y);await s(70);}});
await p.evaluate(()=>{const el=document.getElementById('chat'); if(el) el.scrollIntoView();}); await p.waitForTimeout(900);
await p.screenshot({path:"/tmp/shots3/zz-chat.png"});
await b.close(); console.log("DONE");
