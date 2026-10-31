/* Accordia · "Ora scrivo io": copia guidata in 4/4 su tre strumenti.
   Tutti i simboli musicali sono Bravura; nessun canvas o font decorativo. */
(() => {
  'use strict';
  const app = window.orchestra;
  const root = document.getElementById('writeSlide');
  if (!app || !root) return;
  const $ = id => document.getElementById(id);
  const instrument = $('writeInstrument');
  const section = $('writeSection');
  const model = $('modelScore');
  const entry = $('copyScore');
  const feedback = $('writeFeedback');
  const names = app.names;
  const patterns = app.writingPatterns;
  const sectionKeys = ['strofa', 'pre', 'ritornello'];
  const symbols = {Q:'\uE1D5', R:'\uE4E5', H:'\uE4E4'};
  const drafts = Object.create(null);
  let tool = 'Q';

  instrument.innerHTML = names.map((name,i) =>
    `<option value="${i}">${name}</option>`).join('');
  function selected() {
    return {i:Number(instrument.value),part:section.value};
  }
  function reference() {
    const {i,part} = selected();
    return patterns[i][part].slice();
  }
  function key() {
    const {i,part} = selected();
    return i+':'+part;
  }
  function draft() {
    const k=key();
    if(!drafts[k]) drafts[k]=[Array(4).fill(null),Array(4).fill(null)];
    return drafts[k];
  }
  function cleanText(s) {return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
  function note(x, y, token) {
    if(token==='EE'){
      /* Two eighth notes with a single beam: a readable pair, not overlapping flags. */
      const x1=x-25,x2=x+18;
      return `<text class="music staff-note" x="${x1}" y="${y}">${symbols.Q}</text>
       <text class="music staff-note" x="${x2}" y="${y}">${symbols.Q}</text>
       <rect x="${x1+18}" y="${y-52}" width="${x2-x1}" height="5" rx="1" fill="#283324"/>`;
    }
    const glyph=symbols[token];
    return glyph?`<text class="music ${token==='Q'?'staff-note':'staff-rest'}" x="${x-10}" y="${token==='Q'?y:y-13}">${glyph}</text>`:'';
  }
  function paint(svg,measures,editable) {
    const w=430,x0=75,y=106;
    let html='';
    for(let bar=0;bar<2;bar++){
      const start=x0+bar*w;
      html+=`<text class="staff-beat-label" x="${start+4}" y="26">Battuta ${bar+1}</text>`;
      html+=`<line class="staff-rule" x1="${start}" y1="${y}" x2="${start+w}" y2="${y}"/>`;
      html+=`<line class="bar-rule" x1="${start}" y1="62" x2="${start}" y2="124"/>`;
      html+=`<line class="bar-rule" x1="${start+w}" y1="62" x2="${start+w}" y2="124"/>`;
      for(let beat=0;beat<4;beat++){
        const x=start+w*(beat+.5)/4;
        const token=measures[bar][beat];
        if(token && token!=='CONT')html+=note(x,y,token);
        if(editable){
          const label=cleanText(`Battuta ${bar+1}, pulsazione ${beat+1}: ${token==='CONT'?'seconda metà della pausa di minima':token||'vuota'}`);
          html+=`<rect class="copy-hit" role="button" tabindex="0" aria-label="${label}" aria-pressed="false"
             data-write-bar="${bar}" data-write-beat="${beat}" x="${start+beat*w/4+3}" y="42"
             width="${w/4-6}" height="99" rx="4"/>`;
        }
      }
    }
    svg.innerHTML=html;
  }
  function show(message='Scegli una figura, poi tocca una pulsazione della seconda partitura.') {
    const p=reference();
    paint(model,[p,p],false);
    paint(entry,draft(),true);
    feedback.textContent=message;
    $('writeLabel').textContent=names[Number(instrument.value)]+' · '+section.options[section.selectedIndex].text;
  }
  function eraseAt(bar,beat) {
    const a=draft()[bar];
    if(a[beat]==='CONT'&&beat>0&&a[beat-1]==='H')a[beat-1]=null;
    if(a[beat]==='H'&&beat<3&&a[beat+1]==='CONT')a[beat+1]=null;
    a[beat]=null;
  }
  function write(bar,beat) {
    if(bar<0||bar>1||beat<0||beat>3)return;
    if(tool==='H'&&beat===3){
      feedback.textContent='La pausa di minima dura 2 pulsazioni: scegli una posizione precedente.';
      return;
    }
    eraseAt(bar,beat);
    if(tool==='H')eraseAt(bar,beat+1);
    if(tool==='X'){
      show('Figura cancellata. Puoi riscriverla.');
      return;
    }
    draft()[bar][beat]=tool;
    if(tool==='H')draft()[bar][beat+1]='CONT';
    show('Continua a ricopiare le figure della partitura.');
  }
  entry.addEventListener('click',e=>{
    const hit=e.target.closest('[data-write-beat]');
    if(hit)write(Number(hit.dataset.writeBar),Number(hit.dataset.writeBeat));
  });
  entry.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    const hit=e.target.closest('[data-write-beat]');
    if(hit){e.preventDefault();write(Number(hit.dataset.writeBar),Number(hit.dataset.writeBeat));}
  });
  root.querySelectorAll('[data-write-tool]').forEach(b=>{
    b.addEventListener('click',()=>{
      tool=b.dataset.writeTool;
      root.querySelectorAll('[data-write-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      feedback.textContent='Tocca una pulsazione della riga «Ora scrivo io».';
    });
  });
  for(const el of [instrument,section])el.addEventListener('change',()=>show());
  $('writeClear').addEventListener('click',()=>{
    drafts[key()]=[Array(4).fill(null),Array(4).fill(null)];
    show('Righi cancellati. Ricomincia dalla prima pulsazione.');
  });
  $('writeCheck').addEventListener('click',()=>{
    const expected=reference(),actual=draft();
    const correct=actual.reduce((sum,m)=>sum+m.filter((v,i)=>v===expected[i]).length,0);
    const total=8;
    show(correct===total?'Ottimo: tutte le 8 pulsazioni sono corrette.':`Hai ricopiato correttamente ${correct} pulsazioni su ${total}. Confronta i righi e riprova.`);
  });
  const first = root.querySelector('[data-write-tool="Q"]');
  if(first)first.setAttribute('aria-pressed','true');
  show();
})();
