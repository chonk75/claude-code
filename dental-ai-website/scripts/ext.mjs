import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath:"/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args:["--no-sandbox","--ignore-certificate-errors","--use-gl=swiftshader"] });
const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:1, ignoreHTTPSErrors:true });
const p = await ctx.newPage();
try {
  await p.goto("https://thoughtly.com/", { waitUntil:"domcontentloaded", timeout:30000 });
  await p.waitForTimeout(4000);
  await p.evaluate(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<5000;y+=500){window.scrollTo(0,y);await s(150);}window.scrollTo(0,0);await s(500);});
  await p.screenshot({ path:"/tmp/thoughtly-top.png" });
  await p.screenshot({ path:"/tmp/thoughtly-full.png", fullPage:true });
  // extract palette + fonts
  const info = await p.evaluate(() => {
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const bodyColor = getComputedStyle(document.body).color;
    const ff = getComputedStyle(document.body).fontFamily;
    const h1 = document.querySelector("h1");
    const h1ff = h1 ? getComputedStyle(h1).fontFamily : null;
    const h1text = h1?.innerText?.slice(0,120);
    // sample colors from many elements
    const colors = {};
    document.querySelectorAll("*").forEach(el=>{const c=getComputedStyle(el); [c.backgroundColor,c.color,c.borderColor].forEach(v=>{if(v&&v!=="rgba(0, 0, 0, 0)"){colors[v]=(colors[v]||0)+1;}});});
    const top = Object.entries(colors).sort((a,b)=>b[1]-a[1]).slice(0,18);
    return { bodyBg, bodyColor, bodyFont:ff, h1Font:h1ff, h1text, topColors: top };
  });
  console.log(JSON.stringify(info,null,2));
} catch(e){ console.log("ERR", e.message); }
await b.close(); console.log("DONE");
