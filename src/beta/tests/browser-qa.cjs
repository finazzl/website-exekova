const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const base = process.env.BETA_QA_URL || 'http://localhost:3200';
const out = process.env.BETA_QA_OUTPUT || path.join(require('node:os').tmpdir(), 'exekova-visual-beta-qa');
fs.mkdirSync(out,{recursive:true});
(async () => {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = process.env.CHROME_PATH || (fs.existsSync(macChrome) ? macChrome : undefined);
  const browser = await chromium.launch({executablePath,headless:true});
  const errors=[];
  const results=[];
  try {
    for(const width of [390,320,1440,1024,768]) {
      const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce',acceptDownloads:true});
      const page=await context.newPage();
      page.on('pageerror',error=>{errors.push(error.message);console.error('BROWSER ERROR',error.message);});
      page.on('console',msg=>{if(msg.type()==='error' && /hydrat/i.test(msg.text())) errors.push(msg.text());});
      assert.equal((await page.goto(base,{waitUntil:'networkidle'})).status(),200);
      await page.evaluate(()=>document.fonts.ready);
      await page.locator('.footer-brand-block').scrollIntoViewIfNeeded();
      await page.locator('.footer-brand-block img').evaluate(img=>img.decode());
      await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
      await page.screenshot({path:path.join(out,`footer-${width}.png`)});
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      await page.screenshot({path:path.join(out,`hero-${width}.png`)});
      await page.screenshot({path:path.join(out,`full-${width}.png`),fullPage:true});
      assert.equal(await page.locator('main h1').count(),1);
      assert.equal((await page.locator('main h1').innerText()).replace(/\s+/g,' '),'Task. Repo. Done.');
      assert.equal(await page.locator('.hero-copy .beta-label').innerText(),'AUTONOMOUS WORK EXECUTION PLATFORM');
      for(const selector of ['.beta-hero','.integration-strip','.product-comparison','.how-story','.beta-features','.beta-trust','.beta-outcomes','.beta-faq','.beta-closing','.site-footer','.accepted-work-story','.accepted-work-meter','.beta-team','.beta-industries','.beta-vision']) assert.equal(await page.locator(selector).count(),1,selector);
      assert.equal(await page.locator('.site-footer .footer-column').count(),5);
      assert.equal(await page.locator('.feature-story-item').count(),4);
      for(const outcome of ['rejected','accepted']) {
        await page.locator(`.acceptance-card[data-outcome="${outcome}"]`).click();
        assert.equal(await page.locator('.accepted-work-meter').getAttribute('data-outcome'),outcome);
        assert.equal(await page.locator('[data-meter-units]').innerText(),outcome==='accepted'?'1':'0');
        assert.equal((await page.locator('[data-meter-amount]').textContent()),outcome==='accepted'?'$19USD':'$0USD');
      }
      for(const role of ['CEO','CTO','CIO','COO']) {
        await page.locator('.team-role-buttons').getByRole('button',{name:role,exact:true}).click();
        assert.equal(await page.locator('.team-value-panel').getAttribute('data-role'),role);
      }
      assert.deepEqual(await page.locator('.industry-card h4').allTextContents(),['Fintech','Banking','Insurance','Healthcare & life sciences','Public sector','Ecommerce & retail','SaaS & software','Telecommunications','Travel & hospitality','Education','Logistics & supply chain','Energy & utilities','Manufacturing']);
      assert.deepEqual(await page.locator('.industry-group>h3').allTextContents(),['01Financial & regulated','02Digital & service businesses','03Industrial operations']);
      if(width<=700) {
        await page.locator('.mobile-access-bar a').click();
        assert(await page.getByRole('dialog').isVisible());
        await page.keyboard.press('Escape');
        await page.getByRole('button',{name:'Dismiss access bar',exact:true}).click();
        assert.equal(await page.locator('.mobile-access-bar').count(),0);
      }
      assert.equal(await page.locator('.governance-rules dl>div').count(),5);
      assert((await page.locator('.vision-tomorrow').innerText()).includes('not yet available'));
      assert.equal(await page.locator('.task-ribbon').getAttribute('data-playing'),'false');
      assert.equal(await page.locator('.ribbon-result').count(),0);
      const ribbonBounds = await page.locator('.task-ribbon-svg').boundingBox();
      assert(ribbonBounds.x <= 0 && ribbonBounds.x + ribbonBounds.width >= width, 'Hero ribbon reaches both viewport edges');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://exekova.com');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,'Page overflow at '+width);
      const overflow=await page.locator('main section').evaluateAll(elements=>elements.filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+1 || r.left < -1;}).map(el=>el.className));
      assert.deepEqual(overflow,[]);
      const anchors=await page.locator('a[href^="#"]').evaluateAll(elements=>elements.map(el=>el.getAttribute('href')));
      for(const anchor of new Set(anchors)) assert.equal(await page.locator(anchor).count(),1,anchor);
      await page.locator('.demo-lab>summary').click();
      await page.locator('.beta-demo').scrollIntoViewIfNeeded();
      await page.locator('.beta-demo').screenshot({path:path.join(out,`demo-${width}.png`)});
      assert.equal(await page.locator('.beta-demo').getAttribute('data-stage'),'outcome');
      const journey=['Get','Set','Done'];
      assert.equal(await page.locator('.demo-timeline button').count(),3);
      assert.deepEqual(await page.locator('.demo-timeline button').allTextContents(),journey.map((label,index)=>index<2?label:'03'+label));
      assert.equal(await page.locator('.how-story-tabs button').count(),3);
      assert.deepEqual((await page.locator('.how-story-tabs button').allTextContents()),journey);
      assert.equal(await page.locator('.demo-source-options button').count(),5);
      for(const name of ['Slack','Teams','Excel']) {
        await page.locator(`.demo-source-options [data-source="${name}"]`).click();
        assert.equal(await page.locator('.beta-demo').getAttribute('data-stage'),'task');
        assert((await page.locator('.demo-source-note').innerText()).includes(`${name} task intake is planned`));
        assert(await page.locator('.demo-timeline button').nth(2).isDisabled());
        assert.equal(await page.locator('.demo-checks [data-passed="true"]').count(),0);
      }
      await page.locator('.demo-source-options [data-source="Work Intent form"]').click();
      assert((await page.locator('.demo-task .demo-card-top').innerText()).includes('Work Intent form'));
      await page.locator('.demo-timeline button').nth(2).click();
      assert.equal(await page.locator('.demo-checks [data-passed="true"]').count(),3);
      await page.locator('.demo-source-options [data-source="Jira"]').click();
      for(const [label,title] of [['Small feature','Add a note character count'],['Test coverage','Cover empty search results'],['Bug fix','Fix checkout validation']]) {
        await page.getByRole('button',{name:label,exact:true}).click();
        assert.equal(await page.locator('.demo-task h3').innerText(),title);
      }
      await page.locator('.demo-timeline').getByRole('button',{name:/Set$/}).click();
      assert.equal(await page.locator('.demo-checks [data-passed="true"]').count(),0);
      await page.locator('.demo-timeline').getByRole('button',{name:/Done$/}).click();
      assert.equal(await page.locator('.demo-checks [data-passed="true"]').count(),3);
      if(width>700) {
      await page.locator('.how-story-tabs').getByRole('button',{name:'Set',exact:true}).click();
      assert.equal(await page.locator('.how-story .how-story-stage').getAttribute('data-step'),'1');
      await page.locator('.how-story-tabs').getByRole('button',{name:'Done',exact:true}).click();
      assert.equal(await page.locator('.how-story .work-evidence li').count(),3);
      } else {
        assert.equal(await page.locator('.how-mobile-scene:visible').count(),3);
        assert.deepEqual(await page.locator('.how-mobile-scene .how-story-description h3').allTextContents(),journey);
        for(const scene of await page.locator('.how-mobile-scene').all()) assert(await scene.isVisible());
      }
      await page.locator('#feature-3').scrollIntoViewIfNeeded();
      const review=page.locator('.review-demo:visible');
      await review.getByRole('button',{name:'Review finds an issue',exact:true}).click();
      assert.equal(await review.getAttribute('data-corrected'),'false');
      assert((await review.locator('.review-result').innerText()).includes('$0'));
      await review.getByRole('button',{name:'After correction',exact:true}).click();
      assert.equal(await review.getAttribute('data-corrected'),'true');
      const faq=page.locator('.faq-items summary').nth(1);
      await faq.focus(); await page.keyboard.press('Enter');
      assert.equal(await faq.locator('..').getAttribute('open'),'');
      if(width>700) assert.equal(await page.locator('.faq-question-bubble').innerText(),await faq.innerText());
      // The header CTA lives in the bar on desktop and in the drawer under 1100px.
      const openAccess=async()=>{ if(width<=1100){ await page.locator('.navigation-toggle').click(); assert(await page.locator('.navigation-mobile').isVisible()); await page.locator('.navigation-mobile .navigation-cta').click(); } else await page.locator('.navigation-cta').first().click(); };
      if(width<=1100) {
        await page.locator('.navigation-toggle').click();
        assert(await page.locator('.navigation-mobile').isVisible());
        await page.locator('.navigation-mobile button').first().click();
        assert(await page.locator('.navigation-mobile-group').isVisible());
        await page.locator('.navigation-toggle').click();
        assert.equal(await page.locator('.navigation-mobile').count(),0);
      }
      await openAccess();
      assert(await page.getByRole('dialog').isVisible());
      await page.keyboard.press('Escape');
      assert(!(await page.getByRole('dialog').isVisible()));
      await openAccess();
      await page.getByLabel('Work email').fill('lead@example.test');
      await page.getByLabel('Company or team').fill('Example QA');
      await page.getByLabel('What needs to get done?').fill('Keep filters when changing pages.');
      await page.getByLabel('What does done look like?').fill('Filters persist and regression coverage passes.');
      await page.getByLabel('Task source',{exact:true}).selectOption('Linear');
      assert(await page.getByText(/cannot start a task yet/).isVisible());
      await page.getByLabel('Task source',{exact:true}).selectOption('Jira');
      const downloadPromise=page.waitForEvent('download');
      await page.getByRole('button',{name:'Download request',exact:true}).click();
      const download=await downloadPromise;
      const body=fs.readFileSync(await download.path(),'utf8');
      for(const text of ['lead@example.test','Example QA','Jira (Available)','GitHub (Available)','$19 USD','Keep filters']) assert(body.includes(text));
      assert((await page.locator('.request-status').innerText()).includes('has not been sent'));
      await page.getByRole('button',{name:'Open email request',exact:true}).click();
      assert((await page.locator('.request-status').innerText()).includes('has not been sent yet'));
      assert.equal(await page.getByLabel('What needs to get done?').inputValue(),'Keep filters when changing pages.');
      await page.getByRole('button',{name:'Close access request',exact:true}).click();
      await page.waitForFunction(()=>document.body.style.overflow === '');
      // The header CTA uses a root-relative URL; repeated clicks must still open access.
      for(let repeat=0;repeat<2;repeat++) {
        await openAccess();
        assert(await page.getByRole('dialog').isVisible());
        await page.keyboard.press('Escape');
        await page.waitForFunction(()=>document.body.style.overflow === '');
      }
      const schemas=(await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(text=>JSON.parse(text));
      const faqSchema=schemas.find(item=>item['@type']==='FAQPage');
      assert.equal(faqSchema.mainEntity.length,await page.locator('.faq-items details').count());
      for(const item of faqSchema.mainEntity) assert.equal(await page.locator('.faq-items details').filter({hasText:item.name}).locator('p').textContent(),item.acceptedAnswer.text);
      const copy=await page.locator('main').innerText();
      assert(!/Grok|Claude|OpenAI|Codex|Gemini|reviewer technolog|routing logic|execution engine|CLI\b/i.test(copy));
      results.push({width,layout:'pass',demo:'pass',review:'pass',form:'pass',faqSchema:'pass'});
      console.log('PASS',width);
      await context.close();
    }
    for(const motionWidth of [1440,390]) {
    const context=await browser.newContext({viewport:{width:motionWidth,height:1000},reducedMotion:'no-preference'});
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base,{waitUntil:'networkidle'});
    const ribbon=page.locator('.task-ribbon');
    await ribbon.scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('.task-ribbon')?.dataset.playing === 'true');
    const offset=()=>page.locator('.ribbon-input-copy:not(.ribbon-input-mobile) textPath').getAttribute('startOffset');
    const before=await offset();
    await page.waitForTimeout(250);
    assert(Number(await offset())>Number(before),'Task text must move forward toward EXEKOVA');
    await page.getByRole('button',{name:'Pause hero animation',exact:true}).click();
    const paused=await offset();
    await page.waitForTimeout(250);
    assert.equal(await offset(),paused,'Hero pause must stop the text');
    await page.getByRole('button',{name:'Play hero animation',exact:true}).click();
    await page.waitForTimeout(250);
    assert.notEqual(await offset(),paused,'Hero play must resume the text');
    await page.getByRole('button',{name:'Pause integration animation',exact:true}).click();
    assert.equal(await page.locator('.integration-marquee').getAttribute('data-paused'),'true');
    await page.locator('.integration-track').evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const logoPosition=await page.locator('.integration-track').evaluate(el=>getComputedStyle(el).transform);
    await page.waitForTimeout(150);
    assert.equal(await page.locator('.integration-track').evaluate(el=>getComputedStyle(el).transform),logoPosition);
    await page.getByRole('button',{name:'Play integration animation',exact:true}).click();
    await page.waitForTimeout(150);
    assert.notEqual(await page.locator('.integration-track').evaluate(el=>getComputedStyle(el).transform),logoPosition);
    await page.locator('.demo-lab').evaluate(el=>el.open=true);
    await page.locator('.beta-demo').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('.beta-demo')?.dataset.stage === 'outcome',{},{timeout:15000});
    assert.equal(await page.locator('.beta-demo').getAttribute('data-playing'),'false');
    await page.getByRole('button',{name:'Replay demo',exact:true}).click();
    await page.getByRole('button',{name:'Pause demo',exact:true}).click();
    const stage=await page.locator('.beta-demo').getAttribute('data-stage');
    await page.waitForTimeout(3000);
    assert.equal(await page.locator('.beta-demo').getAttribute('data-stage'),stage);
    await page.getByRole('button',{name:'Play demo',exact:true}).click();
    // Verify the actual scroll-driven story, not only its tab buttons.
    if(motionWidth>700) {
    const compare=page.locator('.product-comparison-scroll');
    const comparisonColumns=[];
    for(const progress of [0.1,0.9]) {
      await compare.evaluate((el,progress)=>scrollTo({top:scrollY+el.getBoundingClientRect().top-120+(el.offsetHeight-innerHeight+120)*progress,behavior:'instant'}),progress);
      await page.waitForTimeout(200);
      comparisonColumns.push(await page.locator('.coordination-panel').evaluate(el=>el.getBoundingClientRect().width));
      assert(Math.abs((await page.locator('.product-comparison').boundingBox()).y-120)<2,'Comparison stays pinned while expanding');
    }
    assert(comparisonColumns[1]<comparisonColumns[0]-20,'EXEKOVA panel expands on scroll');
    for(const index of [0,1,2]) {
      await page.locator('.how-story-scroll').evaluate((el,index)=>{
        const top=window.scrollY+el.getBoundingClientRect().top;
        const travel=el.offsetHeight-window.innerHeight+120;
        window.scrollTo({top:top-120+travel*((index+0.3)/3),behavior:'instant'});
      },index);
      await page.waitForFunction(index=>document.querySelector('.how-story-stage')?.dataset.step === String(index),index);
    }
    for(const index of [0,1,2,3]) {
      await page.locator(`.feature-story-item[data-index="${index}"]`).evaluate(el=>window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+el.clientHeight/2-window.innerHeight/2,behavior:'instant'}));
      await page.waitForFunction(index=>document.querySelector('.feature-sticky-visual .feature-visual')?.dataset.feature === String(index),index);
      await page.waitForFunction(index=>Number(getComputedStyle(document.querySelector(`.feature-story-item[data-index="${index}"] .feature-story-copy`)).opacity)>0.99,index);
      await page.screenshot({path:path.join(out,`feature-${index}-1440.png`)});
    }
    } else {
      for(const scene of await page.locator('.how-mobile-scene').all()) {
        await scene.scrollIntoViewIfNeeded();
        assert(await scene.locator('.how-story-stage').isVisible());
      }
    }
    for(const [name,selector] of [['meter','.accepted-work-story'],['team','.beta-team'],['industries','.beta-industries'],['vision','.beta-vision'],['trust','.beta-trust'],['outcomes','.beta-outcomes'],['faq','.beta-faq'],['closing','.beta-closing']]) {
      await page.locator(selector).evaluate(el=>window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-100,behavior:'instant'}));
      await page.screenshot({path:path.join(out,`${name}-${motionWidth}.png`)});
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.beta-demo').getAttribute('data-playing'),'false');
    assert.equal(await ribbon.getAttribute('data-playing'),'false');
    await context.close();
    console.log('PASS motion',motionWidth);
    }
    assert.deepEqual(errors,[]);
    fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,errors,motion:'pass'},null,2));
    console.log('PASS motion and runtime');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
