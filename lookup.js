(() => {
  const style = document.createElement('style');
  style.textContent = `
    #text-lookup{position:fixed;z-index:99999;width:min(360px,calc(100vw - 24px));background:#fff;border:1px solid #dfe6f0;border-radius:16px;box-shadow:0 16px 45px rgba(36,54,83,.18);padding:15px;color:#293b5c;font-family:var(--body-font)}
    #text-lookup[hidden]{display:none}.lookup-top{display:flex;justify-content:space-between;gap:12px}.lookup-word{font:800 22px/1.2 var(--display-font);margin:0}.lookup-meta{color:#74839a;font-size:12px;margin-top:4px}.lookup-close{border:0;background:#f1f4f8;border-radius:8px;width:28px;height:28px;cursor:pointer}.lookup-meaning{margin-top:11px;padding-top:11px;border-top:1px solid #edf0f5;font-size:14px;line-height:1.5}.lookup-label{color:#8b98aa;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase}.lookup-actions{display:flex;gap:8px;margin-top:12px}.lookup-speak{border:0;border-radius:9px;background:#3959a9;color:#fff;padding:8px 11px;cursor:pointer;font:800 12px var(--body-font)}.lookup-note{color:#8b98aa;font-size:11px;margin-top:9px}
  `;
  document.head.appendChild(style);

  const box = document.createElement('aside');
  box.id = 'text-lookup'; box.hidden = true; box.setAttribute('role','dialog');
  box.innerHTML = '<div id="lookup-content"></div>';
  document.body.appendChild(box);

  const phrasalVerbs = new Set('get up|go on|go out|come back|come in|look at|look for|look after|look up|find out|turn on|turn off|put on|take off|wake up|sit down|stand up|pick up|give up|grow up|hang out|work out|carry on|check in|check out|fill in|write down|talk about|listen to'.split('|'));

  const esc = s => String(s).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const clean = s => s.replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
  const isPhrasal = s => phrasalVerbs.has(s.toLowerCase()) || (/^[a-z]+\s+(up|down|out|off|on|in|away|back|over|after|for)$/.test(s.toLowerCase()));

  function speak(text){
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang='en-GB'; u.rate=.88;
    const v=speechSynthesis.getVoices().find(x=>/en-GB/i.test(x.lang)); if(v) u.voice=v;
    speechSynthesis.speak(u);
  }
  async function translate(text){
    const r=await fetch('https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=en|vi');
    const d=await r.json(); return d?.responseData?.translatedText || '';
  }
  async function dictionary(word){
    const r=await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(word));
    if(!r.ok) throw new Error('not found'); const d=await r.json(), e=d[0];
    return {pos:e.meanings?.[0]?.partOfSpeech||'',ipa:e.phonetics?.find(x=>x.text)?.text||e.phonetic||'',def:e.meanings?.[0]?.definitions?.[0]?.definition||'',audio:e.phonetics?.find(x=>x.audio)?.audio||''};
  }
  function position(x,y){box.style.left=Math.min(Math.max(12,x),window.innerWidth-372)+'px';box.style.top=Math.min(Math.max(12,y+12),window.innerHeight-230)+'px';}
  function close(){box.hidden=true;}

  async function show(text,x,y){
    text=clean(text); if(!text||text.length<2||text.length>180)return;
    position(x,y); box.hidden=false;
    box.innerHTML='<div id="lookup-content"><div class="lookup-top"><div><h3 class="lookup-word">'+esc(text)+'</h3><div class="lookup-meta">Đang tra cứu…</div></div><button class="lookup-close">×</button></div></div>';
    box.querySelector('.lookup-close').onclick=close;
    const one=/^[A-Za-z][A-Za-z'-]*$/.test(text), phrase=isPhrasal(text);
    try{
      if(one||phrase){
        let info=null; if(one){try{info=await dictionary(text)}catch(e){}}
        const vi=await translate(text).catch(()=> 'Chưa lấy được nghĩa tiếng Việt.');
        const pos=info?.pos || (phrase?'phrasal verb':'English word');
        box.innerHTML='<div id="lookup-content"><div class="lookup-top"><div><h3 class="lookup-word">'+esc(text)+'</h3><div class="lookup-meta">'+esc(pos)+(info?.ipa?' · '+esc(info.ipa):'')+'</div></div><button class="lookup-close">×</button></div><div class="lookup-meaning"><div class="lookup-label">Nghĩa tiếng Việt</div><div>'+esc(vi)+'</div>'+(info?.def?'<div class="lookup-note">English definition: '+esc(info.def)+'</div>':'')+'</div><div class="lookup-actions"><button class="lookup-speak">🔊 Nghe phát âm UK</button>'+(info?.audio?'<button class="lookup-speak" id="dict-audio">🔊 Audio</button>':'')+'</div></div>';
        box.querySelector('.lookup-close').onclick=close; box.querySelector('.lookup-speak').onclick=()=>speak(text);
        const a=box.querySelector('#dict-audio'); if(a)a.onclick=()=>new Audio(info.audio).play();
      }else{
        const vi=await translate(text).catch(()=> 'Chưa lấy được bản dịch.');
        box.innerHTML='<div id="lookup-content"><div class="lookup-top"><div><h3 class="lookup-word">'+esc(text)+'</h3><div class="lookup-meta">Cụm từ / câu</div></div><button class="lookup-close">×</button></div><div class="lookup-meaning"><div class="lookup-label">Dịch tiếng Việt</div><div>'+esc(vi)+'</div></div><div class="lookup-actions"><button class="lookup-speak">🔊 Nghe tiếng Anh</button></div></div>';
        box.querySelector('.lookup-close').onclick=close; box.querySelector('.lookup-speak').onclick=()=>speak(text);
      }
    }catch(e){box.querySelector('#lookup-content').innerHTML+='<div class="lookup-note">Không tra được lúc này. Hãy kiểm tra mạng và thử lại.</div>'}
  }

  document.addEventListener('mouseup',e=>{if(box.contains(e.target))return;const s=window.getSelection();const t=s?.toString().trim();if(!t)return;const r=s.getRangeAt(0).getBoundingClientRect();show(t,r.left,r.bottom)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();
