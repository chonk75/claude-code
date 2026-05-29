import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
const EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const BASE = "http://localhost:3100";
const OUT = "/tmp/shots3";
mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath: EXE, args:["--no-sandbox","--use-gl=swiftshader","--enable-webgl"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1.5, reducedMotion:"reduce" });
const p = await ctx.newPage();
async function reveal(){ await p.evaluate(async()=>{const s=m=>new Promise(r=>setTimeout(r,m));for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await s(80);}window.scrollTo(0,0);await s(300);}); }
// HOME sections
await p.goto(BASE+"/",{waitUntil:"networkidle"}); await p.waitForTimeout(1600); await reveal();
const vh=900;
const shots=[["home-1-hero",0],["home-2-stats",vh*1.0],["home-3-problem",vh*1.95],["home-4-roi",vh*2.95],["home-5-agents",vh*3.95],["home-6-voice",vh*4.95],["home-7-chat",vh*5.95],["home-8-pricing",vh*6.95],["home-9-cta",vh*7.9]];
for(const [n,y] of shots){ await p.evaluate(yy=>window.scrollTo(0,yy),y); await p.waitForTimeout(550); await p.screenshot({path:`${OUT}/${n}.png`}); console.log("shot",n); }
// Ask Reva
await p.evaluate(()=>window.scrollTo(0,0)); const L=p.locator('button[aria-label="Ask Reva"]'); if(await L.count()){ await L.click(); await p.waitForTimeout(900); await p.screenshot({path:`${OUT}/home-10-askreva.png`}); console.log("shot askreva"); }
// other pages full
for(const [path,name] of [["/roi","roi"],["/team","team"],["/contact","contact"],["/about","about"]]){
  await p.goto(BASE+path,{waitUntil:"networkidle"}); await p.waitForTimeout(1200); await reveal(); await p.waitForTimeout(400);
  await p.screenshot({path:`${OUT}/page-${name}.png`, fullPage:true}); console.log("shot",name);
}
await b.close(); console.log("DONE");
