const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { chromium } = require(path.resolve('.qa-tools/node_modules/playwright-core'));
const localOrigin = 'http://127.0.0.1:43180';
const origin = process.env.RFQ_ORIGIN ?? localOrigin;
const demo = origin + '/demo/rfq-intake';
const message = 'Hi Daniel,\n\nCould you confirm the delivery date for Tuas?\nPlease include any certification requirement.';
const fields = ['Apex Industrial Pte Ltd', 'Fabricated mounting brackets', '250 pcs', 'SS316', 'Brushed', 'MBR-204 Rev C', 'Tuas', 'Friday'];
const shots = path.resolve('qa-evidence');
fs.mkdirSync(shots, { recursive: true });
const report = {};
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const assertState = (page, name, timeout = 10000) =>
  page.locator('[data-testid="demo-root"][data-demo-state="' + name + '"]').waitFor({state:'visible', timeout});
const getState = page => page.getByTestId('demo-root').getAttribute('data-demo-state');
const button = (page, name) => page.getByRole('button', {name, exact:true});
const screenshot = async (page, name) => {
  const bytes=await page.screenshot({path:path.join(shots, name + '.jpg'), type:'jpeg', quality:76, animations:'disabled'});
  const b64=bytes.toString('base64');
  console.log('::group::Preview image '+name);
  for (let i=0;i<b64.length;i+=1800) console.log('RFQ-SHOT '+name+' '+i+' '+b64.slice(i,i+1800));
  console.log('::endgroup::');
};
const record = (key, val) => { report[key] = val; console.log('QA ' + key + ' ' + JSON.stringify(val)); };

async function saveText(page, text) {
  await button(page,'Edit').click();
  await assertState(page,'editing');
  await page.getByRole('textbox',{name:'Clarification draft'}).fill(text);
  await button(page,'Save draft').click();
  await assertState(page,'draft');
}

async function checkEditedText(page) {
  const result = await page.getByTestId('demo-draft').locator('p').last().evaluate(el=>({
    rendered:el.innerText, raw:el.textContent, css:getComputedStyle(el).whiteSpace
  }));
  assert.equal(result.rendered,message);
  assert.equal(result.raw,message);
  assert.equal(result.css,'pre-wrap');
}

async function runInteractive(browser, mobile) {
  const label = mobile ? 'phone' : 'desktop';
  const ctx = await browser.newContext(mobile
    ? {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1}
    : {viewport:{width:1280,height:850},deviceScaleFactor:1});
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.setDefaultTimeout(10000);
  try {
    await page.goto(origin);
    if (mobile) await page.locator('header summary').filter({hasText:'Menu'}).tap();
    await page.getByRole('link',{name:'Demo',exact:true}).click();
    await assertState(page,'idle');
    assert.ok(await button(page,'Reset').isDisabled());
    assert.equal(await button(page,'Approve').count(),0);
    if (mobile) await button(page,'Check RFQ').tap(); else await button(page,'Check RFQ').click();
    await assertState(page,'draft');
    const review = page.getByRole('region',{name:'Intake review'});
    const cue = page.getByRole('button',{name:/Review ready/});
    const data = await review.locator('dl dd').evaluateAll(els=>els.map(e=>({
      text:e.innerText, clipped:e.scrollWidth>e.clientWidth+1, ellipsis:getComputedStyle(e).textOverflow==='ellipsis'
    })));
    assert.deepEqual(data.map(x=>x.text),fields);
    assert.ok(data.every(x=>!x.clipped && !x.ellipsis));
    assert.equal(await review.getByRole('listitem').count(),2);
    assert.match(await review.innerText(),/Required delivery date/);
    assert.match(await review.innerText(),/Material certification/);
    const canonical = await page.getByTestId('demo-draft').locator('p').last().innerText();
    if (mobile) {
      const geo = await cue.evaluate(el=>{const r=el.getBoundingClientRect();return {y:r.top,bottom:r.bottom,scrollY,height:window.innerHeight,width:window.innerWidth,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth}});
      assert.ok(geo.y>=0 && geo.bottom<=geo.height && geo.scrollY===0 && !geo.overflow,JSON.stringify(geo));
      await screenshot(page,'mobile-review-ready');
      await cue.tap();
      await page.waitForFunction(()=>{const e=document.querySelector('section[aria-label="Intake review"]');const y=e.getBoundingClientRect().top;return document.activeElement===e && y>=0 && y<=150});
      const landing = await review.evaluate(e=>Math.round(e.getBoundingClientRect().top));
      record('phone-cue',{cueTop:Math.round(geo.y),viewport:[geo.width,geo.height],reviewTopAfterTap:landing,focused:true});
    } else {
      assert.equal(await cue.isVisible(),false);
    }
    for(const blank of ['', '   ', ' \t\n ']){
      await saveText(page,blank);
      assert.ok(await button(page,'Approve').isDisabled());
      assert.ok(await review.getByText(/add a message before approving/i).isVisible());
      assert.equal(await page.getByTestId('demo-final').count(),0);
    }
    await saveText(page,message);
    assert.ok(await button(page,'Approve').isEnabled());
    await checkEditedText(page);
    const a = button(page,'Approve');
    if (mobile) {
      await a.scrollIntoViewIfNeeded();
      const b=await a.boundingBox();
      const x=b.x+b.width/2, y=b.y+b.height/2;
      await page.touchscreen.tap(x,y);
      await page.touchscreen.tap(x,y);
    } else { await a.dblclick(); }
    await assertState(page,'approved');
    assert.equal(await page.getByTestId('demo-final').count(),1);
    assert.equal(await a.count(),0);
    assert.match(await page.getByTestId('demo-final').innerText(),/Clarification approved/);
    await checkEditedText(page);
    assert.equal(new URL(page.url()).pathname,'/demo/rfq-intake');
    if(!mobile) await screenshot(page,'desktop-approved');
    await page.goBack();
    await page.waitForURL(url=>url.pathname==='/');
    await page.goForward();
    await page.waitForURL(url=>url.pathname==='/demo/rfq-intake');
    await page.getByTestId('demo-root').waitFor();
    const forward=await getState(page);
    await page.reload();
    await assertState(page,'idle');
    await page.goto(demo+'?step=draft');
    await assertState(page,'draft');
    await saveText(page,message);
    await button(page,'Approve').click();
    await assertState(page,'approved');
    await page.reload();
    await assertState(page,'draft');
    assert.equal(await page.getByTestId('demo-draft').locator('p').last().innerText(),canonical);
    await button(page,'Discard').click();
    await assertState(page,'discarded');
    assert.equal(await page.getByTestId('demo-draft').count(),0);
    await button(page,'Reset').click();
    await page.waitForURL(demo);
    await assertState(page,'idle');
    await button(page,'Check RFQ').click();
    await button(page,'Reset').click();
    await pause(1600);
    await assertState(page,'idle');
    assert.deepEqual(errors,[]);
    record(label,{fields:data.length,flags:2,blocked:['empty','spaces','mixed whitespace'],multilineReview:true,multilineApproved:true,doubleActivation:mobile?'double-tap':'double-click',finalPanels:1,back:'homepage',forward,refresh:'idle',deepLinkRefresh:'canonical draft',discard:true,resetCancelledTimers:true,consoleErrors:errors.length});
  } catch(e) { await screenshot(page,'failure-'+label).catch(()=>{}); throw e; }
  finally { await ctx.close(); }
}

async function checkModes(browser){
  const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  try{
    const page=await ctx.newPage();
    const modes=['idle','checking','flags','draft','approved'];
    for(const step of modes){
      await page.goto(demo+'?step='+step);
      await assertState(page,step);
      assert.equal(await page.getByTestId('demo-missing').isVisible(),['flags','draft','approved'].includes(step));
      assert.equal(await page.getByTestId('demo-draft').isVisible(),['draft','approved'].includes(step));
    }
    await page.goto(demo+'?step=nope'); await assertState(page,'idle');
    await page.goto(demo);await button(page,'Check RFQ').click();await assertState(page,'draft');
    const play=async query=>{
      const p=await ctx.newPage();
      await p.goto(demo+query);
      await assertState(p,'draft',33000);
      assert.equal(await p.getByRole('button',{name:/Review ready/}).count(),0);
      await assertState(p,'approved',24000);
      return query;
    };
    const completed=await Promise.all([play('?play=1'),play('?demo=record&play=1')]);
    assert.equal(await getState(page),'draft');
    record('modes',{fixed:modes,invalid:'idle',autoplay:completed,manualHeldWhileBothPlayed:true});
  } finally {await ctx.close();}
}

async function main(){
  const server=origin===localOrigin ? spawn(process.execPath,['server.js'],{cwd:path.resolve('.qa-app'),env:{...process.env,PORT:'43180',HOSTNAME:'127.0.0.1',NODE_ENV:'production'},windowsHide:true,stdio:['ignore','pipe','pipe']}) : null;
  server?.stdout.on('data',b=>process.stdout.write(b));server?.stderr.on('data',b=>process.stderr.write(b));
  let browser;
  try{
    let up=false;
    for(let i=0;i<45;i++){try{const r=await fetch(demo);if(r.ok){up=true;break}}catch{}await pause(400)}
    assert.ok(up,'The compiled RFQ server did not start');
    const candidate=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(p=>fs.existsSync(p));
    assert.ok(candidate,'Chrome is missing on the runner');
    browser=await chromium.launch({executablePath:candidate,headless:true,args:['--disable-background-timer-throttling']});
    record('target',demo);
    record('browser',browser.version());
    await runInteractive(browser,false);
    await runInteractive(browser,true);
    await checkModes(browser);
  } finally {
    if(browser) await browser.close();
    server?.kill();
    fs.writeFileSync(path.join(shots,'report.json'),JSON.stringify(report,null,2)+'\n');
  }
}
main().catch(e=>{console.error(e.stack);process.exitCode=1});
