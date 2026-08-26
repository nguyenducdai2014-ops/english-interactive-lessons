/* Source-based correction layer: exact vocabulary + detailed grammar + selection translator */
window.SOURCE_VOCAB_6 = REPLACE_VOCAB;
window.SOURCE_GRAMMAR_6 = REPLACE_GRAMMAR;
(function(){
const V=window.SOURCE_VOCAB_6, G=window.SOURCE_GRAMMAR_6;
if(!window.units)return;
for(let i=1;i<=12;i++){const u=window.units.find(x=>x.id===i); if(!u)continue; u.vocab=V[i]; u.grammar=G[i];}
const root=document.getElementById('unit-content');
if(root&&typeof unitHTML==='function'){
 const active=document.querySelector('.unit-link.active');
 const id=active?parseInt((active.textContent.match(/Unit\s+(\d+)/)||[])[1]||'1'):1;
 root.innerHTML=unitHTML(window.units.find(x=>x.id===id));
}
const credit=document.querySelector('.top .credit');
if(credit)credit.textContent='Designed by Nguyễn Đức Đại | TH&THCS ĐỒNG TÂM';
const dict={}; Object.values(V).flat().forEach(v=>{dict[v[0].toLowerCase()]=v[2]});
let pop=document.getElementById('selection-translator');
if(!pop){pop=document.createElement('div');pop.id='selection-translator';pop.innerHTML='<button class="stx-close">×</button><div class="stx-word"></div><div class="stx-ipa"></div><div class="stx-label">NGHĨA TIẾNG VIỆT</div><div class="stx-meaning"></div><button class="stx-audio">🔊 Nghe tiếng Anh UK</button>';document.body.appendChild(pop);pop.querySelector('.stx-close').onclick=()=>pop.classList.remove('show');pop.querySelector('.stx-audio').onclick=()=>{const u=new SpeechSynthesisUtterance(pop.dataset.text||'');u.lang='en-GB';u.rate=.82;speechSynthesis.speak(u)}}
const norm=s=>s.toLowerCase().replace(/[.,!?;:()\[\]{}“”"']/g,'').replace(/\s+/g,' ').trim();
document.addEventListener('mouseup',()=>setTimeout(()=>{const s=window.getSelection(); if(!s||s.isCollapsed)return; const raw=s.toString().trim(); if(!raw||raw.length>100)return; const key=norm(raw); let meaning=dict[key], item=Object.values(V).flat().find(v=>norm(v[0])===key); if(!meaning){const hit=Object.keys(dict).find(k=>k===key||k.replace(/\([^)]*\)/g,'').trim()===key); if(hit){meaning=dict[hit]; item=Object.values(V).flat().find(v=>v[0].toLowerCase()===hit)}} if(!meaning){const parts=key.split(' '), vals=parts.map(x=>dict[x]).filter(Boolean); if(!vals.length)return; meaning=vals.join(' · ')} pop.querySelector('.stx-word').textContent=raw; pop.querySelector('.stx-ipa').textContent=item?item[1]:''; pop.querySelector('.stx-meaning').textContent=meaning; pop.dataset.text=raw; pop.classList.add('show'); const r=s.getRangeAt(0).getBoundingClientRect(); pop.style.left=Math.min(innerWidth-330,Math.max(10,r.left))+'px'; pop.style.top=(r.bottom+8)+'px';},0));
})();
