// Test della lezione effettivamente caricata, con l'ostinato della battuta 1.
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const html=fs.readFileSync(path.join(__dirname,'../pratica/ritmo/argomenti/quattro-strumenti/index.html'),'utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
assert(match,'script di riproduzione assente');
for(const absent of ['Schermo intero','Audio e opzioni','id="overviewSlide"','id="writeSlide"','id="full"','4/4','Strofa'])
 assert(!html.includes(absent),'Elemento da eliminare ancora presente: '+absent);
for(const id of ['play','pause','stop','score','tempo'])
 assert(html.includes('id="'+id+'"'),'Controllo non presente: '+id);
let clock=10,attacks=0,stops=0,seq=0,raf=null,rejectResume=false;
const timers=new Map(),elements=new Map(),listeners={};
function element(tag='div'){
 return {tagName:tag.toUpperCase(),attributes:{},children:[],dataset:{},classList:{toggle(k,v){this[k]=v}},
  style:{},textContent:'',value:'',disabled:false,events:{},
  setAttribute(k,v){this.attributes[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v)},
  appendChild(x){this.children.push(x);return x},replaceChildren(){this.children=[]},
  getBBox(){return {y:0,height:60}},
  addEventListener(k,cb){this.events[k]=cb}};
}
function byId(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)}
byId('tempo').value='80';
const document={getElementById:byId,createElementNS(_ns,tag){return element(tag)},
 addEventListener(k,cb){listeners[k]=cb},fonts:{load(){return Promise.resolve([{}])}}};
function param(){return {value:1,setValueAtTime(){},setTargetAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}}}
function node(){return {gain:param(),frequency:param(),threshold:param(),ratio:param(),
 connect(){},disconnect(){},start(t){assert(t>=clock-.01,'suono programmato nel passato');attacks++},stop(){stops++}}}
class Audio{
 constructor(){this.state='suspended';this.sampleRate=48000;this.destination={}}
 get currentTime(){return clock}
 resume(){if(rejectResume)return Promise.reject(Error('blocked'));this.state='running';return Promise.resolve()}
 createGain(){return node()}createOscillator(){return node()}createBufferSource(){return node()}
 createBiquadFilter(){return node()}createDynamicsCompressor(){return node()}
 createBuffer(_channels,size){return {getChannelData(){return new Float32Array(size)}}}
}
const window={AudioContext:Audio};
const sandbox={document,window,Uint8Array,Float32Array,Math,console,Promise,
 setInterval(fn){const id=++seq;timers.set(id,fn);return id},
 clearInterval(id){timers.delete(id)},
 requestAnimationFrame(fn){raf=fn;return ++seq},
 cancelAnimationFrame(){raf=null}};
vm.createContext(sandbox);vm.runInContext(match[1],sandbox);
const app=window.orchestra;
function advance(seconds){const total=Math.ceil(seconds/.05);for(let i=0;i<total;i++){
 clock+=seconds/total;
 for(const callback of [...timers.values()])callback();
 if(raf){const callback=raf;raf=null;callback()}
}}
(async()=>{
 await Promise.resolve();await Promise.resolve();
 assert.equal(app.song.length,1,'una sola battuta');
 assert.equal(JSON.stringify(Array.from(app.song[0],part=>Array.from(part))),JSON.stringify([[-2,2,-2,2],[2,1,1,2,-2],[2,-2,-4]]),'ostinato originale');
 assert(byId('score').children.length>0,'partitura SVG');
 await app.play();assert.equal(app.state.running,true);assert.equal(timers.size,1);
 advance(14);
 assert.equal(app.state.running,true,'loop continuo oltre quattro battute');
 assert(attacks>40,'strumenti e metronomo in riproduzione');
 app.pause();const saved=app.state.saved;
 assert.equal(app.state.running,false);assert.equal(timers.size,0);
 advance(2);assert.equal(app.state.saved,saved,'la pausa conserva il punto');
 await app.play();assert.equal(app.state.running,true,'ripresa');
 advance(1);app.stop();assert.equal(app.state.saved,-8);assert.equal(timers.size,0);
 byId('tempo').value='104';byId('tempo').events.input();
 assert.equal(app.state.bpm,104);assert.equal(byId('tempoOutput').textContent,'104 BPM');
 rejectResume=true;await app.play();
 assert.equal(app.state.running,false,'audio non disponibile');
 assert.equal(byId('play').disabled,false,'play riabilitato dopo errore');
 assert(byId('audioState').textContent.includes('Audio non disponibile'),'messaggio audio accessibile');
 rejectResume=false;await app.play();assert.equal(app.state.running,true,'retry');
 app.stop();
 console.log('PASS: unica battuta originale, SVG, loop, suono, pausa/ripresa, stop, BPM, gestione errore audio.');
})().catch(error=>{console.error(error);process.exitCode=1});
