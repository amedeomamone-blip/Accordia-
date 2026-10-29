/* Run against make serve: BASE_URL=http://127.0.0.1:8000 node scripts/test_reading_lessons.cjs.
   Requires Playwright; set CHROME_PATH for an installed Chrome executable. */
const assert = require('node:assert/strict');
const {chromium} = require('playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
// Independent answer key: fractions are relative to a whole note, pulse questions to a quarter.
const dots = ['3/4','3/8','3/2','3/16','1/4','1/8','1/8','3/8','1/4','Minima puntata · 3/4','Semiminima puntata · 3/8','3/8'];
const ties = ['1/2','Minima puntata','1/2','3','1','1/4','Due note della stessa altezza','sostieni il suono senza riattaccare'];
const mixed = dots.flatMap((answer,i)=>i<ties.length?[answer,ties[i]]:[answer]);
const scales = ['Un semitono','Un tono','Si–Do','T–T–S–T–T–T–S','5 toni e 2 semitoni','3','Un semitono','III–IV e VII–VIII','un’ottava sopra il primo','S–T–T–T–S–T–T'];
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try {
 const page=await browser.newPage({reducedMotion:'reduce'}), errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400) errors.push(response.status()+' '+response.url());});
 for(const [slug,answers] of [['punto-di-valore',mixed],['scala-diatonica',scales]]) {
  await page.setViewportSize({width:1280,height:720});
  await page.goto(base+'/pratica/lettura/argomenti/'+slug+'/');
  assert.equal(await page.locator('.figure-screen').count(),6);
  for(const size of [{width:1440,height:900},{width:1280,height:720},{width:390,height:844},{width:320,height:640}]) {
   await page.setViewportSize(size);
   for(let i=0;i<6;i++) {
    await page.locator('.figure-lesson__dot').nth(i).click();
    assert.equal(await page.locator('.figure-lesson__dot').nth(i).getAttribute('aria-current'),'step');
   }
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow: '+slug+' '+size.width);
  }
  await page.setViewportSize({width:1280,height:720});
  await page.locator('.figure-lesson__dot').last().click();
  for(let i=0;i<answers.length;i++) {
   const buttons=page.locator('#pv-options button');
   const texts=await buttons.evaluateAll(items=>items.map(button=>(button.querySelector('small') || button).textContent));
   const correct=texts.findIndex(text=>text.trim()===answers[i]);
   assert(correct>=0,slug+' '+i+': missing answer '+answers[i]);
   await buttons.nth((correct+1)%4).click();
   assert.match(await page.locator('#pv-feedback').innerText(),/Riprova/);
   assert.equal(await page.locator('#pv-score').textContent(),i+' / '+answers.length+' risolti');
   await buttons.nth(correct).click();
   assert.match(await page.locator('#pv-feedback').innerText(),/Esatto/);
   assert.equal(await page.locator('#pv-options button:disabled').count(),4);
   assert.equal(await page.locator('#pv-score').textContent(),(i+1)+' / '+answers.length+' risolti');
   if(i===1) {
    await page.locator('#pv-prev').click();
    assert.equal(await page.locator('#pv-options button:disabled').count(),4);
    await page.locator('#pv-next').click();
   }
   if(i===answers.length-1) assert.match(await page.locator('#pv-feedback').innerText(),/Hai completato tutti/);
   await page.locator('#pv-next').click();
  }
  assert.equal(await page.locator('#pv-score').textContent(),'0 / '+answers.length+' risolti');
  assert.equal(await page.locator('#pv-options button:disabled').count(),0);
  await page.locator('.figure-lesson__dot').first().click();
  await page.locator('#lesson-viewport').focus();await page.keyboard.press('ArrowDown');
  assert.equal(await page.locator('.figure-lesson__dot').nth(1).getAttribute('aria-current'),'step');
  if(slug==='scala-diatonica') {
   await page.locator('.figure-lesson__dot').nth(4).click();
   await page.locator('[data-interval="2"]').click();
   assert.match(await page.locator('#interval-feedback').innerText(),/Mi–Fa: un semitono/);
   assert.equal(await page.locator('[aria-pressed="true"]').count(),1);
   await page.locator('[data-interval="0"]').click();
   assert.match(await page.locator('#interval-feedback').innerText(),/Do–Re: un tono/);
   await page.locator('#scale-listen').click();
   await page.waitForFunction(()=>document.getElementById('scale-audio-status').textContent==='Ascolto concluso.');
  }
  console.log('PASS '+slug+': '+answers.length+' solutions, retry, score, revisit, reset, keyboard, four viewports.');
 }
 await page.goto(base+'/pratica/lettura/');
 assert.equal(await page.locator('a[href="argomenti/scala-diatonica/index.html"]').count(),1);
 assert.deepEqual(errors,[]);
 console.log('PASS no browser errors or missing assets.');
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
