const fs=require('fs'),vm=require('vm'),assert=require('assert');
let clock=10,starts=[],stops=0,intervals=new Set(),nextId=0,listeners={},rejectResume=false;
const elements=new Map();function element(id){if(!elements.has(id))elements.set(id,{id,innerHTML:'',textContent:'',value:({width:'2',tempo:'80',from:'0',to:'31'})[id]||'',checked:['metro','durations'].includes(id),style:{},dataset:{},classList:{toggle(){}},setAttribute(k,v){this[k]=v}});return elements.get(id)}
function param(){return {value:1,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(v){this.value=v}}}
function node(){return {gain:param(),frequency:param(),threshold:param(),ratio:param(),connect(){},disconnect(){},start(t){assert(t>=clock,'source scheduled in the past');starts.push(t)},stop(){stops++}}}
class Audio{constructor(){this.state='suspended';this.sampleRate=48000;this.destination={}}get currentTime(){return clock}resume(){if(rejectResume)return Promise.reject(Error('blocked'));this.state='running';return Promise.resolve()}createGain(){return node()}createOscillator(){return node()}createBufferSource(){return node()}createBiquadFilter(){return node()}createDynamicsCompressor(){return node()}createAnalyser(){return {...node(),getByteTimeDomainData(a){a.fill(128)}}}createBuffer(n,len){return{getChannelData:()=>new Float32Array(len)}}}
const c={document:{getElementById:element,querySelectorAll:()=>[],addEventListener(k,f){(listeners[k]??=[]).push(f)},fonts:{load:()=>Promise.resolve([{}])},body:{classList:{toggle(){}}}},window:{AudioContext:Audio,addEventListener(){}},innerWidth:1280,Uint8Array,Float32Array,Math,console,setInterval(fn){const id=++nextId;intervals.add(id);return id},clearInterval(id){intervals.delete(id)},requestAnimationFrame(){return ++nextId},cancelAnimationFrame(){}};vm.createContext(c);vm.runInContext(fs.readFileSync(require('path').join(__dirname,'../pratica/ritmo/argomenti/quattro-strumenti/index.html'),'utf8').split('<script>')[1].split('</script>')[0],c);
const run=code=>vm.runInContext(code,c);async function flush(){await Promise.resolve();await Promise.resolve()}
(async()=>{
 const app=c.window.orchestra;assert.equal(app.song.length,32);assert.equal(app.phases.reduce((n,p)=>n+p[1],0),60);assert.equal(app.exerciseSpecs.length,8);
 for(const bar of app.song)for(const p of bar)assert.equal(p.reduce((n,v)=>n+Math.abs(v),0),8);
 assert(element('score').innerHTML.includes('\uE1D5'),'real quarter-note glyph');assert(!element('score').innerHTML.includes('●'),'no pictograms in main score');assert(element('overview').innerHTML.includes('<circle'),'symbols in overview');
 await run("chooseMode('listen')");assert.equal(app.state.running,true);assert(starts.length>0,'Ascolta immediately schedules sound');assert.equal(intervals.size,1);
 for(let k=0;k<240;k++){clock+=.03;run('schedule();animate()')};assert(starts.length>20,'ensemble generates source nodes');
 run('pause()');const held=app.state.saved;assert.equal(intervals.size,0);assert.equal(app.state.running,false);assert(stops>0);
 clock+=5;await run('play()');assert(Math.abs(app.state.saved-held)<.001);assert.equal(intervals.size,1);
 element('tempo').value='120';element('tempo').oninput();await flush();assert.equal(app.state.bpm,120);assert.equal(intervals.size,1);
 run('reset()');assert.equal(app.state.saved,-8);assert.equal(intervals.size,0);
 element('from').value='31';element('to').value='31';run('reset()');await run('play()');clock+=6;run('schedule();animate()');assert.equal(app.state.running,false,'end of interval stops');assert.equal(intervals.size,0);
 element('loop').checked=true;run('reset()');await run('play()');clock+=7;run('schedule();animate()');assert.equal(app.state.running,true);assert(app.state.position>=248&&app.state.position<256,'loop stays in selected bar');
 run('reset()');element('loop').checked=false;
 starts=[];await run('testAudio(2)');assert(starts.length>0,'sound test schedules audible nodes');
 run('reset()');rejectResume=true;await run('play()');assert.equal(app.state.running,false);assert.equal(element('play').disabled,false);assert(element('audioState').textContent.includes('Audio non disponibile'));
 rejectResume=false;await run('play()');assert.equal(app.state.running,true,'can retry after rejection');run('reset()');
 // 32-bar execution at 80 BPM and long repeat with simulated audio clock.
 element('from').value='0';element('to').value='31';element('tempo').value='80';element('tempo').oninput();await run('play()');
 for(let i=0;i<4100;i++){clock+=.025;run('schedule();animate()')};assert.equal(app.state.running,false,'full score finishes');
 element('loop').checked=true;run('reset()');await run('play()');for(let i=0;i<12000;i++){clock+=.025;run('schedule();animate()')};assert.equal(app.state.running,true);assert.equal(intervals.size,1);run('reset()');
 console.log('PASS: 128 measures; 60 minutes; real note glyphs; symbolic overview; direct Ascolta; audio source generation; pause/resume; BPM; completion; 5-minute loop; audio test; permission error/retry.');
})().catch(e=>{console.error(e);process.exitCode=1});
