/* Highlight-to-Vietnamese translator for Interactive English.
   Select English text anywhere in the lesson to open a compact Vietnamese translation card. */
(() => {
  const DICT = {
    'my new school':'trường học mới của tôi','interactive english':'tiếng Anh tương tác','school':'trường học','classmate':'bạn cùng lớp','classmates':'các bạn cùng lớp','subject':'môn học','subjects':'các môn học','uniform':'đồng phục','classroom':'phòng học','playground':'sân chơi','library':'thư viện','timetable':'thời khóa biểu','schoolbag':'cặp sách','textbook':'sách giáo khoa','lesson':'bài học','teacher':'giáo viên','teachers':'các giáo viên','student':'học sinh','students':'các học sinh','friend':'bạn','friends':'các bạn','friendly':'thân thiện','new':'mới','school day':'ngày đi học','school days':'những ngày đi học','go to school':'đi học','get up':'thức dậy','have breakfast':'ăn sáng','after school':'sau giờ học','at break time':'vào giờ ra chơi','every day':'mỗi ngày','every week':'mỗi tuần','on monday':'vào thứ Hai','on mondays':'vào các ngày thứ Hai','usually':'thường','often':'thường xuyên','sometimes':'đôi khi','always':'luôn luôn','never':'không bao giờ','twice a week':'hai lần một tuần','present simple':'thì hiện tại đơn','adverbs of frequency':'trạng từ tần suất','affirmative':'thể khẳng định','negative':'thể phủ định','question':'câu hỏi','questions':'các câu hỏi','grammar':'ngữ pháp','vocabulary':'từ vựng','reading':'đọc hiểu','speaking':'nói','practice':'luyện tập','challenge':'thử thách','start':'bắt đầu','let’s get started':'hãy bắt đầu','welcome':'chào mừng','english':'tiếng Anh','maths':'môn Toán','science':'môn Khoa học','badminton':'cầu lông','calculator':'máy tính','compass':'com-pa','there is':'có','there are':'có','goes':'đi','studies':'học','does':'làm','doesn’t':'không','does not':'không','don’t':'không','do not':'không','like':'thích','near':'gần','house':'ngôi nhà','big':'lớn','small':'nhỏ','bright':'sáng sủa','interesting':'thú vị','useful':'hữu ích','activity':'hoạt động','activities':'các hoạt động','helpful':'hay giúp đỡ','happy':'vui','learn':'học','learning':'việc học','read':'đọc','reads':'đọc','book':'sách','books':'những cuốn sách','play':'chơi','plays':'chơi','study':'học','studies':'học','have':'có','has':'có','wear':'mặc','wears':'mặc','homework':'bài tập về nhà','morning':'buổi sáng','afternoon':'buổi chiều','evening':'buổi tối','today':'hôm nay','tomorrow':'ngày mai','Monday':'thứ Hai','Friday':'thứ Sáu','class':'lớp học','room':'phòng','desk':'bàn học','school building':'tòa nhà trường học','by bike':'bằng xe đạp','on time':'đúng giờ','where is your school':'trường của bạn ở đâu','what do you study':'bạn học gì','how often':'bao lâu một lần','what is your favourite subject':'môn học yêu thích của bạn là gì'
  };

  const cache = new Map();
  let card = null;
  let requestId = 0;

  const style = document.createElement('style');
  style.textContent = `
    #vi-translate-card{position:fixed;z-index:2147483647;max-width:min(430px,calc(100vw - 24px));min-width:260px;background:#fff;border:1px solid #d8e1ef;border-radius:16px;box-shadow:0 14px 38px rgba(26,49,85,.18);padding:13px 14px;color:#263b5b;font-family:Arial,sans-serif;display:none}
    #vi-translate-card .vt-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
    #vi-translate-card .vt-title{font-weight:900;color:#3559ad;font-size:13px}
    #vi-translate-card .vt-close{border:0;background:#f1f4f9;color:#667892;border-radius:8px;width:28px;height:28px;cursor:pointer;font-weight:900}
    #vi-translate-card .vt-source{font-size:12px;color:#71809a;background:#f6f8fc;border-radius:9px;padding:8px 9px;line-height:1.45;max-height:80px;overflow:auto}
    #vi-translate-card .vt-result{font-size:16px;line-height:1.5;font-weight:800;color:#183d69;margin-top:9px}
    #vi-translate-card .vt-note{font-size:11px;color:#7b8799;margin-top:6px;line-height:1.4}
    #vi-translate-card .vt-actions{display:flex;gap:7px;margin-top:9px}
    #vi-translate-card .vt-actions button{border:0;border-radius:9px;padding:7px 10px;font-weight:800;cursor:pointer}
    #vi-translate-card .vt-speak{background:#eaf0ff;color:#3157a7}.vt-copy{background:#eef8f3;color:#28745b}
    @media(max-width:560px){#vi-translate-card{min-width:0}}
  `;
  document.head.appendChild(style);

  function makeCard(){
    card=document.createElement('div'); card.id='vi-translate-card';
    card.innerHTML=`<div class="vt-head"><span class="vt-title">🇻🇳 Dịch sang tiếng Việt</span><button class="vt-close" type="button" aria-label="Đóng">×</button></div><div class="vt-source"></div><div class="vt-result">Đang tra...</div><div class="vt-note"></div><div class="vt-actions"><button class="vt-speak" type="button">🔊 Nghe tiếng Anh</button><button class="vt-copy" type="button">Sao chép nghĩa</button></div>`;
    document.body.appendChild(card);
    card.querySelector('.vt-close').onclick=()=>hide();
    card.querySelector('.vt-speak').onclick=()=>speak(card.dataset.english||'');
    card.querySelector('.vt-copy').onclick=async()=>{try{await navigator.clipboard.writeText(card.querySelector('.vt-result').textContent);card.querySelector('.vt-copy').textContent='✓ Đã sao chép';setTimeout(()=>card.querySelector('.vt-copy').textContent='Sao chép nghĩa',1200)}catch(e){}};
  }
  function hide(){if(card)card.style.display='none';}
  function clean(text){return text.replace(/\s+/g,' ').replace(/^[\s.,!?;:]+|[\s.,!?;:]+$/g,'').trim();}
  function lookupLocal(text){
    const key=text.toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,;:]+$/,'').trim();
    if(DICT[key])return DICT[key];
    const words=key.split(' ');
    if(words.length<=8){
      const translated=words.map(w=>DICT[w]||null);
      if(translated.every(Boolean))return translated.join(' ');
    }
    return null;
  }
  async function onlineTranslate(text){
    const key=text.toLowerCase();
    if(cache.has(key))return cache.get(key);
    const url='https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=en|vi';
    try{
      const r=await fetch(url,{headers:{Accept:'application/json'}});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const data=await r.json();
      const result=data?.responseData?.translatedText;
      if(result && result.toLowerCase()!==text.toLowerCase()){
        cache.set(key,result);return result;
      }
    }catch(e){}
    return null;
  }
  function speak(text){if(!('speechSynthesis' in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=.88;window.speechSynthesis.speak(u)}
  function position(rect){
    const margin=10,w=card.offsetWidth,h=card.offsetHeight;
    let left=Math.min(Math.max(margin,rect.left+rect.width/2-w/2),innerWidth-w-margin);
    let top=rect.bottom+10;
    if(top+h>innerHeight-margin)top=Math.max(margin,rect.top-h-10);
    card.style.left=left+'px';card.style.top=top+'px';
  }
  async function show(text,rect){
    if(!card)makeCard();
    const id=++requestId;
    card.dataset.english=text;
    card.querySelector('.vt-source').textContent=text;
    card.querySelector('.vt-result').textContent='Đang dịch…';
    card.querySelector('.vt-note').textContent='';
    card.style.display='block';position(rect);
    const local=lookupLocal(text);
    if(local){card.querySelector('.vt-result').textContent=local;card.querySelector('.vt-note').textContent='Nghĩa trong từ điển học tập của bài.';position(rect);return;}
    const result=await onlineTranslate(text);
    if(id!==requestId)return;
    card.querySelector('.vt-result').textContent=result||'Chưa có bản dịch phù hợp. Em hãy chọn một từ hoặc cụm ngắn hơn.';
    card.querySelector('.vt-note').textContent=result?'Dịch tự động Anh → Việt; với câu dài, nên kiểm tra lại ngữ cảnh.':'Mẹo: bôi đen 1 từ hoặc cụm từ 2–8 từ để có kết quả tốt hơn.';
    position(rect);
  }
  function validTarget(node){
    if(!node)return false;
    const el=node.nodeType===3?node.parentElement:node;
    return !!el && !!el.closest && !el.closest('button,input,textarea,select,#vi-translate-card');
  }
  document.addEventListener('mouseup',e=>{
    if(card && card.contains(e.target))return;
    setTimeout(()=>{
      const sel=window.getSelection();
      if(!sel || sel.isCollapsed || !sel.rangeCount || !validTarget(sel.anchorNode))return;
      const text=clean(sel.toString());
      if(!text || text.length>500)return;
      const rect=sel.getRangeAt(0).getBoundingClientRect();
      show(text,rect);
    },30);
  });
  document.addEventListener('touchend',()=>setTimeout(()=>{
    const sel=window.getSelection();
    if(!sel || sel.isCollapsed || !sel.rangeCount)return;
    const text=clean(sel.toString()); if(!text||text.length>500)return;
    show(text,sel.getRangeAt(0).getBoundingClientRect());
  },80),{passive:true});
  document.addEventListener('scroll',hide,{passive:true});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
})();
