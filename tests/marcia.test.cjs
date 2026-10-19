// Run with: node --test tests/marcia.test.cjs
// DOM/audio doubles exercise transport behavior; they do not replace a browser visual review.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const model = require('../js/marcia-score.js');
const root = path.resolve(__dirname, '..');

test('All 96 cells match the four-bar teaching arrangement', () => {
  for (const pattern of ['base', 'variante']) {
    for (let beat = 0; beat < 16; beat++) {
      assert.equal(model.hit(pattern, 0, beat), beat % 4 === 0 || beat % 4 === 2 || (pattern === 'variante' && beat % 4 === 3));
      assert.equal(model.hit(pattern, 1, beat), beat % 2 === 1);
      assert.equal(model.hit(pattern, 2, beat), beat === 0 || beat === 8);
    }
  }
});
test('Fractional clock, long playback and finale boundaries remain exact', () => {
  for (const bpm of [40, 60, 84, 120, 180]) {
    for (let beat = -4; beat < 2000; beat++) assert.equal(model.position(beat * 60 / bpm, bpm).index, beat);
    assert.equal(model.position(1.25 * 60 / bpm, bpm).pulse, 1);
  }
  assert.equal(model.nextBar(3), 4); assert.equal(model.nextBar(4), 8);
  for (let row = 0; row < 3; row++) {
    assert.equal(model.hit('base', row, 12, 12), true);
    for (let beat = 13; beat <= 16; beat++) assert.equal(model.hit('base', row, beat, 12), false);
  }
});

function fixture() {
  class Element {
    constructor() {
      this.children=[]; this.listeners={}; this.attributes={}; this.dataset={}; this.value=''; this.textContent='';
      this.style={setProperty:()=>{}}; this.disabled=false; this.checked=false; this.className='';
      this.classList={toggle:(name,on)=>{const s=new Set(this.className.split(' ').filter(Boolean));on?s.add(name):s.delete(name);this.className=[...s].join(' ');},contains:(name)=>this.className.split(' ').includes(name)};
    }
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this.children=children;}
    setAttribute(key,value){this.attributes[key]=value;}
    addEventListener(name,fn){(this.listeners[name] ||= []).push(fn);}
    async fire(name){for(const fn of this.listeners[name]||[]) await fn({target:this});}
    querySelectorAll(selector){return this.children.flatMap(c=>[...(c.classList.contains(selector.slice(1))?[c]:[]),...c.querySelectorAll(selector)]);}
    focus(){}
  }
  const html=fs.readFileSync(path.join(root,'pratica/ritmo/argomenti/marcia-di-topolino/index.html'),'utf8');
  const nodes=Object.fromEntries([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));
  nodes['march-offset'].value='0';nodes['march-bpm'].value='84';nodes['march-guide'].checked=true;
  const patterns=['base','variante'].map(p=>{const e=new Element();e.dataset.pattern=p;return e;});
  const markers=Array.from({length:4},()=>new Element());const details=new Element();
  const document=new Element();document.hidden=false;
  document.getElementById=id=>nodes[id];document.createElement=()=>new Element();
  document.querySelectorAll=s=>s==='[data-pattern]'?patterns:s==='.march-bars span'?markers:[];
  document.querySelector=()=>details;
  const media=new Element();media.matches=false;
  const scheduled=[];let context;let id=0;const intervals=new Map(),frames=new Map();
  const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){}});
  class AudioNode {constructor(){this.gain=param();this.frequency=param();}connect(){}disconnect(){}start(time,offset=0){this.time=time;this.offset=offset;scheduled.push(this);}stop(){this.stopped=true;}}
  class AudioContext {
    constructor(){context=this;this.currentTime=0;this.sampleRate=1000;this.state='running';}
    createGain(){return new AudioNode();}createOscillator(){return new AudioNode();}createBufferSource(){return new AudioNode();}createBiquadFilter(){return new AudioNode();}
    createBuffer(ch,length){return {getChannelData:()=>new Float32Array(length)};}
    addEventListener(){}async resume(){this.state='running';}async decodeAudioData(data){if(data==='invalid')throw Error();return {duration:30};}
  }
  const window=new Element();window.MarchScore=model;window.matchMedia=()=>media;window.AudioContext=AudioContext;
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/marcia-lesson.js'),'utf8'),{
    window,document,console,Math,Number,Infinity,Set,
    setInterval:fn=>{intervals.set(++id,fn);return id;},clearInterval:id=>intervals.delete(id),
    requestAnimationFrame:fn=>{frames.set(++id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id)
  });
  const advance=seconds=>{for(let t=0;t<seconds;t+=.01){context.currentTime+=Math.min(.01,seconds-t);for(const fn of [...intervals.values()])fn();const callbacks=[...frames.values()];frames.clear();callbacks.forEach(fn=>fn());}};
  return {nodes,patterns,media,document,scheduled,advance,get clock(){return context;}};
}

test('Playback: count-in, correct lights, pause/resume, mobile pagination, reset', async()=>{
  const f=fixture(), n=f.nodes;
  assert.equal(n['march-grid'].querySelectorAll('.march-tile').length,24);
  assert.equal(n['march-play'].disabled,false);
  await n['march-play'].fire('click');
  f.advance(1); assert.match(n['march-count'].textContent,/Pronti/);
  assert.equal(n['march-grid'].querySelectorAll('.is-now').length,0);
  f.advance(2.1); // first pulse after 4 * 60/84 seconds and .12 start lead
  assert.equal(n['march-grid'].querySelectorAll('.march-tile').filter(t=>t.classList.contains('is-hit')&&t.classList.contains('is-now')).length,2);
  await n['march-play'].fire('click');
  assert.equal(n['march-count'].textContent,'Pausa');
  const before=f.scheduled.length;f.advance(2);assert.equal(f.scheduled.length,before);
  await n['march-play'].fire('click');f.advance(.2);assert.match(n['march-play'].textContent,/Pausa/);
  f.media.matches=true;await f.media.fire('change');
  assert.equal(n['march-grid'].querySelectorAll('.march-tile').length,12);
  f.advance(3);assert.match(n['march-bar'].textContent,/Battuta 2/);
  await n['march-reset'].fire('click');
  assert.equal(n['march-count'].textContent,'Pronti?');assert.match(n['march-play'].textContent,/Inizia/);
  assert.equal(n['march-grid'].querySelectorAll('.is-now').length,0);
});

test('Finale gives one simultaneous hit followed by three rests and stops',async()=>{
  const f=fixture(), n=f.nodes;await n['march-play'].fire('click');f.advance(3.1);
  await n['march-finale'].fire('click');assert.equal(n['march-finale'].disabled,true);
  f.advance(3);assert.match(n['march-bar'].textContent,/Finale/);
  const tiles=n['march-grid'].querySelectorAll('.march-tile');assert.equal(tiles.filter(t=>t.classList.contains('is-hit')).length,3);
  f.advance(3);assert.match(n['march-status'].textContent,/Bravi/);assert.match(n['march-play'].textContent,/Inizia/);
});

test('Uploaded audio uses the same clock/offset, pauses, and rejects invalid offsets/files',async()=>{
  const f=fixture(),n=f.nodes;
  n['march-audio'].files=[{name:'marcia.mp3',size:100,arrayBuffer:async()=>new ArrayBuffer(2)}];
  await n['march-audio'].fire('change');assert.match(n['march-file-status'].textContent,/marcia.mp3/);
  n['march-offset'].value='4';await n['march-offset'].fire('change');
  await n['march-play'].fire('click');
  const source=f.scheduled.find(s=>s.buffer&&s.buffer.duration===30);
  assert.equal(source.offset,4);assert.ok(Math.abs(source.time-(4*60/84+.12))<1e-8);
  f.advance(4);await n['march-play'].fire('click');assert.equal(source.stopped,true);
  await n['march-reset'].fire('click');n['march-offset'].value='40';await n['march-play'].fire('click');assert.match(n['march-status'].textContent,/punto di partenza/);
  await n['march-remove-audio'].fire('click');assert.match(n['march-file-status'].textContent,/Nessun brano/);
  n['march-audio'].files=[{name:'bad.wav',size:100,arrayBuffer:async()=>'invalid'}];await n['march-audio'].fire('change');assert.match(n['march-file-status'].textContent,/non leggibile/);assert.equal(n['march-play'].disabled,false);
});

test('Hidden page pauses; tempo and pattern changes reset the sequence',async()=>{
  const f=fixture(),n=f.nodes;await n['march-play'].fire('click');f.advance(3.2);
  f.document.hidden=true;await f.document.fire('visibilitychange');assert.match(n['march-play'].textContent,/Riprendi/);
  n['march-bpm'].value='120';await n['march-bpm'].fire('change');assert.equal(n['march-tempo'].value,'120');assert.match(n['march-play'].textContent,/Inizia/);
  await f.patterns[1].fire('click');assert.equal(f.patterns[1].attributes['aria-pressed'],'true');
  const legnetti=n['march-grid'].querySelectorAll('.march-row')[0];assert.equal(legnetti.querySelectorAll('.is-hit').length,6);
});
