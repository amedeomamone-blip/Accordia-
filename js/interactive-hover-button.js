/* Native adapter for the static pages; keeps button identity and click handlers. */
(()=>{
const skip='.slide-dot,.figure-lesson__dot,.bintro-progress__dot,.figure-card,.figure-pair,.meter-card,.btt-play,[data-bar],[data-overview-pattern],.figure-quiz__options button,.pv-options button,.topic-rail button';
function enhance(b){
 if(b.matches(skip)||b.querySelector('.ihb-label,svg,img,.notation-glyph,input')||!b.textContent.trim()||b.querySelector('span:not(.ui-sr-only),div'))return;
 const text=b.textContent.trim();if(text.length>65)return;
 b.classList.add('ihb');const label=document.createElement('span');label.className='ihb-label';label.textContent=text;
 const hover=document.createElement('span');hover.className='ihb-hover';hover.setAttribute('aria-hidden','true');hover.textContent=text;
 b.replaceChildren(label,hover);
}
function scan(root){if(root.nodeType!==1)return;if(root.matches('button,a.button,.lesson-button'))enhance(root);root.querySelectorAll('button,a.button,.lesson-button').forEach(enhance)}
scan(document.body);
new MutationObserver(records=>{const roots=new Set();for(const m of records){if(m.target.nodeType===1){const b=m.target.closest('button,a.button,.lesson-button');if(b)roots.add(b)}for(const n of m.addedNodes)if(n.nodeType===1&&!n.matches('.ihb-label,.ihb-hover'))roots.add(n)}roots.forEach(scan)}).observe(document.body,{childList:true,subtree:true});
})();
