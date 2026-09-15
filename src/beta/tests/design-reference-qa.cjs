/* Geometry checks against measurements of https://wisprflow.ai/ on 2026-09-15.
 * These compare layout and typography, not pixel identity across different
 * copy, colours and product artwork. Screenshots remain a separate review. */
const {chromium}=require('playwright-core');
const fs=require('node:fs');
const path=require('node:path');
const base=process.env.BETA_QA_URL || 'http://localhost:3200';
const out=process.env.BETA_DESIGN_OUTPUT || path.join(require('node:os').tmpdir(),'exekova-reference-layout-qa');
fs.mkdirSync(out,{recursive:true});
const viewports=[1440,390];
const reference={
  1440:{navWidth:912,navHeight:68,navY:89,h1Width:992,h1Y:301.375,h1Height:182.375,heroFont:96,heroLine:91.2,heroLetter:-2.88,eyebrowY:259.1875,eyebrowFont:14,featureFont:75,featureLine:75,howFont:64,trustFont:48,trustPadding:64,trustRadius:32,faqWidth:816,faqFont:75,closingFont:120,closingLine:102,footerFont:16,heroEnd:996},
  390:{navWidth:348,navHeight:54,navY:50,h1Width:350,h1Y:202.1875,h1Height:91.1875,heroFont:48,heroLine:45.6,heroLetter:-1.44,eyebrowY:160,eyebrowFont:14,featureFont:40,featureLine:40,howFont:40,trustFont:32,trustPadding:32,trustRadius:32,faqWidth:350,faqFont:40,closingFont:56,closingLine:47.6,footerFont:14,heroEnd:697},
};
(async()=>{
  const mac='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || (fs.existsSync(mac)?mac:undefined),headless:true});
  const report={reference:'https://wisprflow.ai/',measured:'2026-09-15',scope:'Layout and type measurements. EXEKOVA copy, palette, logo, product artwork and additional requested chapters intentionally differ.',viewports:[],errors:[]};
  try {
    for(const width of viewports){
      const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
      page.on('pageerror',error=>report.errors.push(error.message));
      await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
      const actual=await page.evaluate(()=>{
        const el=s=>document.querySelector(s),style=s=>getComputedStyle(el(s)),rect=s=>el(s).getBoundingClientRect(),number=(s,p)=>parseFloat(style(s)[p]);
        return {navWidth:rect('.site-header').width,navHeight:rect('.site-header').height,navY:rect('.site-header').y,h1Width:rect('h1').width,h1Y:rect('h1').y,h1Height:rect('h1').height,heroFont:number('h1','fontSize'),heroLine:number('h1','lineHeight'),heroLetter:number('h1','letterSpacing'),eyebrowY:rect('.hero-copy>.beta-label').y,eyebrowFont:number('.hero-copy>.beta-label','fontSize'),featureFont:number('#features-title','fontSize'),featureLine:number('#features-title','lineHeight'),howFont:number('#how-title','fontSize'),trustFont:number('.trust-panel h2','fontSize'),trustPadding:number('.trust-panel','paddingTop'),trustRadius:number('.trust-panel','borderTopLeftRadius'),faqWidth:rect('.faq-conversation').width,faqFont:number('#faq-title','fontSize'),closingFont:number('#closing-title','fontSize'),closingLine:number('#closing-title','lineHeight'),footerFont:number('.footer-columns','fontSize'),displayFont:style('h1').fontFamily,bodyFont:style('body').fontFamily,heroEnd:rect('.beta-hero').bottom,overflow:document.documentElement.scrollWidth>innerWidth};
      });
      const checks=Object.entries(reference[width]).map(([name,expected])=>({name,expected,actual:actual[name],difference:Number((actual[name]-expected).toFixed(3)),pass:Math.abs(actual[name]-expected)<=0.5}));
      checks.push({name:'display font is EB Garamond',pass:/EB.Garamond/i.test(actual.displayFont)},{name:'body font is Figtree',pass:/Figtree/i.test(actual.bodyFont)},{name:'no horizontal overflow',pass:!actual.overflow});
      await page.screenshot({path:path.join(out,`exekova-hero-${width}.png`)});
      for(const [name,selector] of [['comparison','.product-comparison'],['how','.beta-how'],['features','.beta-features'],['team','.beta-team'],['industries','.beta-industries'],['trust','.beta-trust'],['faq','.beta-faq'],['closing','.beta-closing'],['footer','.beta-footer']]){
        await page.locator(selector).evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-110,behavior:'instant'}));
        await page.waitForTimeout(100);
        await page.screenshot({path:path.join(out,`exekova-${name}-${width}.png`)});
      }
      await page.locator('.footer-brand-block img').evaluate(img=>img.decode());
      await page.screenshot({path:path.join(out,`exekova-full-${width}.png`),fullPage:true});
      report.viewports.push({width,actual,checks});
      console.log(width,checks.filter(c=>!c.pass));await page.close();
    }
    fs.writeFileSync(path.join(out,'measurements.json'),JSON.stringify(report,null,2));
    const failed=report.viewports.flatMap(v=>v.checks.filter(c=>!c.pass));
    console.log(`${report.viewports.flatMap(v=>v.checks).length-failed.length} layout checks passed; ${failed.length} failed. Artifacts: ${out}`);
    if(failed.length || report.errors.length) process.exitCode=1;
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
