const {chromium}=require('playwright-core');
const fs=require('node:fs');const assert=require('node:assert/strict');
const url=process.argv.find(a=>a.startsWith('--url='))?.slice(6)||'http://localhost:3201';
const selected=process.argv.find(a=>a.startsWith('--width='))?.slice(8);
const widths=selected?[Number(selected)]:[1440,390,320,768,1024,1920];
const out='/tmp/exekova-type-spacing/current';fs.mkdirSync(out,{recursive:true});
// Recorded from the live Wispr home, Business, Leaders and Students references.
const roles={
  'beta-title':'hero','product-title':'hero','how-title':'section','pricing-title':'section',
  'features-title':'chapter','integrations-title':'section','team-title':'chapter',
  'industries-title':'display','trust-title':'subheading','outcomes-title':'chapter',
  'vision-title':'chapter','faq-title':'chapter','closing-title':'display',
};
const dark=new Set(['product-title','pricing-title','integrations-title','outcomes-title']);
(async()=>{const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const errors=[],results=[];try{
for(const width of widths){const p=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));assert.equal((await p.goto(url,{waitUntil:'domcontentloaded'})).status(),200);await p.evaluate(()=>document.fonts.ready);await p.locator('[data-tools-ribbon][data-ready=true]').waitFor();
const mobile=width<768;const scale={hero:mobile?48:96,display:mobile?(width<=360?48:56):width<=1200?96:120,chapter:mobile?40:75,section:mobile?40:64,subheading:mobile?32:48};
const headings=[];for(const [id,role] of Object.entries(roles)){const value=await p.locator('#'+id).evaluate(el=>{const s=getComputedStyle(el),e=getComputedStyle(el.querySelector('em'));return {font:parseFloat(s.fontSize),line:parseFloat(s.lineHeight),family:s.fontFamily,color:s.color,accent:e.color,text:el.textContent};});assert.equal(value.font,scale[role],`${id}: reference type scale`);assert(/EB.Garamond/i.test(value.family));assert.equal(value.color,dark.has(id)?'rgb(250, 249, 252)':'rgb(20, 17, 45)',id+' primary colour');assert.equal(value.accent,dark.has(id)?'rgb(5, 204, 131)':'rgb(81, 60, 236)',id+' accent colour');const ratio=role==='display'?.85:role==='chapter'?1:.95;assert(Math.abs(value.line-value.font*ratio)<.1,id+' reference leading');headings.push({id,...value});}
const spacing=await p.locator('.beta-page>section,.beta-product-section').evaluateAll(els=>els.map(el=>{const s=getComputedStyle(el);return {section:el.id||el.className,top:parseFloat(s.paddingTop),bottom:parseFloat(s.paddingBottom),hero:el.classList.contains('beta-hero')};}));for(const value of spacing){assert.equal(value.top,mobile?72:112,value.section+' top inset');if(!value.hero)assert.equal(value.bottom,mobile?72:112,value.section+' bottom inset');}
for(const heading of await p.locator('.beta-page .beta-heading.is-centered').all())assert.equal(await heading.evaluate(el=>getComputedStyle(el).marginBottom),mobile?'48px':'64px','Consistent heading-to-content gap');
assert.equal(await p.locator('#sources').evaluate(el=>getComputedStyle(el).borderTopWidth),'0px');assert.equal(await p.locator('#sources').evaluate(el=>getComputedStyle(el,'::after').content),'none');for(const card of await p.locator('#sources article').all())assert.equal(await card.evaluate(el=>getComputedStyle(el).borderTopWidth),'0px');
assert.equal(await p.locator('.work-document').first().evaluate(el=>getComputedStyle(el).borderTopWidth),'0px','The added global border is reverted');
assert.equal(await p.locator('.site-footer .footer-row-links a').first().evaluate(el=>getComputedStyle(el).fontSize),mobile?'14px':'16px','Footer reference type');
for(const [name,selector] of [['hero','.beta-hero'],['flow','#product-title'],['features','#features-title'],['tools','#sources'],['team','#team-title'],['industries','#industries-title'],['trust','#boundaries'],['outcomes','#outcomes-title'],['vision','#vision-title'],['faq','#faq-title'],['closing','.beta-closing'],['footer','.site-footer']]){await p.locator(selector).evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-100,behavior:'instant'}));await p.screenshot({path:`${out}/${name}-${width}.png`});}
assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth),width,'No horizontal overflow');
const collisions=await p.locator('.beta-page>section').evaluateAll(els=>els.slice(1).filter((el,i)=>el.getBoundingClientRect().top<els[i].getBoundingClientRect().bottom-1).map(el=>el.id||el.className));assert.deepEqual(collisions,[],'Sections never overlap');
results.push({width,headings,spacing});console.log('PASS presentation',width);await p.close();}
assert.deepEqual(errors,[]);fs.writeFileSync(`${out}/${selected?'results-'+selected:'results'}.json`,JSON.stringify({results,errors},null,2));}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
