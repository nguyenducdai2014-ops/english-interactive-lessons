const steps=[...document.querySelectorAll('.step')];
const totalSteps=steps.length;
const progressText=document.querySelector('#progress-text');
const progressBar=document.querySelector('#progress-bar');
const progressTrack=document.querySelector('.progress-track');
const previewPanel=document.querySelector('#preview-panel');
const soundToggle=document.querySelector('#sound-toggle');
const toast=document.querySelector('#toast');
const lessonActivity=document.querySelector('#lesson-activity');
const activityLabel=document.querySelector('#activity-label');
const contentTitle=document.querySelector('#content-title');
const contentInstruction=document.querySelector('#content-instruction');
const activityBadge=document.querySelector('#activity-badge');
const activityBody=document.querySelector('#activity-body');
const activityFeedback=document.querySelector('#activity-feedback');
const nextActivity=document.querySelector('#next-activity');

const extraStyle=document.createElement('style');
extraStyle.textContent=`
.vocab-grid,.practice-grid,.challenge-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}
.vocab-card,.mini-exercise,.grammar-box,.reading-box,.speaking-box,.challenge-box,.writing-card{background:#f7f9fc;border:1px solid #e2e8f0;border-radius:16px;padding:16px}
.vocab-card{display:flex;align-items:center;justify-content:space-between;gap:12px}.vocab-word{font:800 19px var(--display-font);color:#293b5c}.vocab-meta{font-size:12px;color:#718098;margin-top:3px}.vocab-meaning{font-size:13px;color:#51617a;margin-top:5px}.listen-word{border:0;background:#eaf0ff;color:#3959a9;border-radius:9px;padding:8px 10px;cursor:pointer;font-weight:800}
.grammar-box{margin-top:18px;background:#fffdf4;border-color:#f1df9c}.grammar-box h3,.reading-box h3,.speaking-box h3,.challenge-box h3,.writing-card h3{font:800 19px var(--display-font);margin:0 0 8px;color:#293b5c}.grammar-rule{font-size:15px;line-height:1.6;color:#53627a}.formula{display:inline-block;background:#fff0c9;border-radius:9px;padding:6px 10px;font-weight:800;color:#8a6821;margin:5px 0}.example-line{padding:8px 10px;background:#fff;border-radius:9px;margin-top:8px;color:#42526c}
.mini-exercise{margin-top:12px;background:#fff}.mini-exercise h3{font:800 17px var(--display-font);margin:0 0 10px}.mini-options{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mini-options button{border:1px solid #dfe6ef;background:#fff;border-radius:9px;padding:9px;text-align:left;cursor:pointer;color:#40516d;font-weight:700}.mini-options button.correct{background:#eafff6;border-color:#62c7a5;color:#18795c}.mini-options button.wrong{background:#fff0ee;border-color:#ef9b91;color:#b24f46}.mini-explain{font-size:12px;line-height:1.5;color:#697890;margin-top:10px}
.writing-card{margin-top:12px;background:#fffdfb}.writing-card .writing-prompt{font-size:15px;line-height:1.55;color:#40516d;margin:5px 0 11px}.writing-input{width:100%;min-height:44px;border:1px solid #dce4ee;border-radius:10px;background:#fff;padding:10px 12px;font:600 14px var(--body-font);color:#344765;resize:vertical}.writing-input:focus{outline:2px solid #c8d5f5;border-color:#6e86c2}.writing-actions{display:flex;gap:8px;align-items:center;margin-top:9px;flex-wrap:wrap}.check-writing{border:0;background:#3959a9;color:#fff;border-radius:9px;padding:9px 13px;font-weight:800;cursor:pointer}.sample-answer{display:none;margin-top:10px;padding:10px 12px;background:#eefbf6;border:1px solid #bde7d8;border-radius:10px;color:#2f6857;font-size:13px;line-height:1.5}.sample-answer.show{display:block}.writing-result{font-size:12px;font-weight:700}.writing-result.good{color:#188260}.writing-result.bad{color:#c5564c}
.reading-box{margin-top:18px;background:#f8fbff}.reading-text{font-size:15px;line-height:1.75;color:#43536c;background:#fff;border-radius:12px;padding:15px}.reading-questions{display:grid;gap:10px;margin-top:14px}.reading-q{background:#fff;border:1px solid #e3e9f1;border-radius:12px;padding:12px}.reading-q p{font-weight:800;margin:0 0 8px}
.speaking-box{margin-top:18px;background:#f2fff9;border-color:#c3eadc}.prompt-list{display:grid;gap:9px;margin:12px 0}.prompt-item{background:#fff;border-radius:10px;padding:10px;color:#4d5e75}.speaking-sample{background:#fff;border-left:4px solid #48b997;border-radius:8px;padding:12px;font-size:14px;line-height:1.6}.speaking-note{font-size:12px;color:#63748b;margin-top:10px}
.challenge-box{margin-top:18px;background:#fff5f1;border-color:#f4c9c1}.challenge-intro{font-size:13px;color:#687890;line-height:1.55}.score-strip{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:12px;padding:12px 14px;margin-bottom:12px}.score-strip strong{font:800 22px var(--display-font);color:#3959a9}.challenge-section-title{font:800 15px var(--display-font);color:#6c5a56;margin:18px 0 8px}.section-complete{display:flex;align-items:center;gap:12px;background:#edfff8;border:1px solid #bde8d8;border-radius:14px;padding:13px;margin-top:18px;color:#236e59}.section-complete .check{background:#40b998;color:#fff;border-radius:50%;width:30px;height:30px;display:grid;place-items:center;font-weight:800}.unit-note{font-size:12px;color:#7b879a;margin-top:12px;line-height:1.5}.audio-chip{border:0;background:#eef3ff;color:#3959a9;border-radius:9px;padding:7px 10px;font-weight:800;cursor:pointer}
@media(max-width:850px){.vocab-grid,.practice-grid,.challenge-grid{grid-template-columns:1fr}.mini-options{grid-template-columns:1fr}.lesson-layout{grid-template-columns:1fr}.lesson-nav{border-right:0}.step-list{grid-template-columns:repeat(2,1fr)}}`;
document.head.appendChild(extraStyle);

const warmUpQuestions=[
 {prompt:'Which word is related to a school?',options:['school','banana','river','bedroom'],answer:'school',explanation:'“School” means “trường học”, so it is directly related to My New School.'},
 {prompt:'You study with your classmates in a …',options:['classroom','kitchen','garden','bathroom'],answer:'classroom',explanation:'A classroom is a room where students learn together.'},
 {prompt:'Which sentence is correct?',options:['This is my new school.','This are my new school.','These is my new school.','This am my new school.'],answer:'This is my new school.',explanation:'“This is …” is used to introduce one thing.'}
];
const vocabulary=[
 ['school','/skuːl/','noun','trường học'],['classmate','/ˈklɑːs.meɪt/','noun','bạn cùng lớp'],['classroom','/ˈklɑːs.ruːm/','noun','phòng học'],['subject','/ˈsʌb.dʒɪkt/','noun','môn học'],['uniform','/ˈjuː.nɪ.fɔːm/','noun','đồng phục'],['calculator','/ˈkæl.kjə.leɪ.tər/','noun','máy tính'],['compass','/ˈkʌm.pəs/','noun','com-pa'],['schoolbag','/ˈskuːl.bæɡ/','noun','cặp sách'],['textbook','/ˈtekst.bʊk/','noun','sách giáo khoa'],['library','/ˈlaɪ.brer.i/','noun','thư viện'],['playground','/ˈpleɪ.ɡraʊnd/','noun','sân chơi'],['lesson','/ˈles.ən/','noun','bài học']
];
const grammarQuestions=[
 {q:'My brother ___ to school every day.',opts:['go','goes','going','is go'],a:'goes',why:'“My brother” là chủ ngữ số ít nên động từ hiện tại đơn thêm -s/-es: goes.'},
 {q:'We ___ English on Monday.',opts:['study','studies','studying','is study'],a:'study',why:'“We” là chủ ngữ số nhiều nên dùng động từ nguyên mẫu: study.'},
 {q:'___ you usually play badminton after school?',opts:['Do','Does','Are','Is'],a:'Do',why:'Với “you” ở hiện tại đơn, câu hỏi dùng Do.'},
 {q:'Lan ___ get up late on school days.',opts:["doesn't","don't","isn't","not"],a:"doesn't",why:'Lan là ngôi thứ ba số ít nên dùng doesn’t + động từ nguyên mẫu.'}
];
const practiceQuestions=[
 {q:'There ___ a computer in my classroom.',opts:['is','are','am','be'],a:'is',why:'“A computer” là số ít nên dùng There is.'},
 {q:'My friends ___ very friendly.',opts:['is','are','am','be'],a:'are',why:'“My friends” là số nhiều nên dùng are.'},
 {q:'She ___ English twice a week.',opts:['study','studies','studying','is study'],a:'studies',why:'She là ngôi thứ ba số ít; study đổi thành studies.'},
 {q:'We ___ wear uniforms at school.',opts:['usually','does','is','am'],a:'usually',why:'Usually là trạng từ tần suất, đứng trước động từ thường wear.'},
 {q:'Choose the correct sentence.',opts:['I have a new timetable.','I has a new timetable.','I having a new timetable.','I am have a new timetable.'],a:'I have a new timetable.',why:'Với I, động từ have giữ nguyên dạng.'},
 {q:'Which item is used for drawing circles?',opts:['compass','calculator','schoolbag','textbook'],a:'compass',why:'A compass is used for drawing circles.'}
];
const writingQuestions=[
 {prompt:'Viết lại câu ở dạng phủ định: “I like my new school.”',answer:"I don't like my new school.",keywords:['i',"don't",'like','my','new','school'],note:'Dùng don’t với chủ ngữ I.'},
 {prompt:'Sắp xếp thành câu đúng: “usually / I / at / get up / 6 o’clock”.',answer:"I usually get up at 6 o'clock.",keywords:['i','usually','get up','at','6'],note:'Trạng từ usually đứng trước động từ thường.'},
 {prompt:'Viết một câu tiếng Anh có từ “classmate”.',answer:'My classmate is friendly.',keywords:['classmate'],note:'Câu mẫu có thể thay đổi nếu câu của em đúng ngữ pháp và dùng đúng từ.'},
 {prompt:'Viết 2 câu giới thiệu ngắn về trường mới của em.',answer:'My new school is big. I like my teachers.',keywords:['my','school','i','like'],note:'Có thể viết câu khác với mẫu, miễn đúng ngữ pháp và đúng chủ đề.'}
];
const challengeMCQ=[
 {q:'Choose the correct sentence.',opts:['She don’t like Maths.','She doesn’t likes Maths.','She doesn’t like Maths.','She not like Maths.'],a:'She doesn’t like Maths.',why:'Sau doesn’t, động từ phải trở về nguyên mẫu: like.'},
 {q:'Which sentence has the correct word order?',opts:['I always am on time.','I am always on time.','Always I am on time.','I on time am always.'],a:'I am always on time.',why:'Với động từ be, trạng từ tần suất thường đứng sau be.'},
 {q:'___ there any books on the desk?',opts:['Is','Are','Do','Does'],a:'Are',why:'Books là danh từ số nhiều nên dùng “Are there …?”.'},
 {q:'Which question is correct?',opts:['Where your school is?','Where is your school?','Where does your school?','Where your school does?'],a:'Where is your school?',why:'Với be, từ để hỏi đứng trước be: Where is …?'},
 {q:'Nam ___ his homework before dinner every day.',opts:['do','does','doing','is do'],a:'does',why:'Nam là ngôi thứ ba số ít nên do đổi thành does.'},
 {q:'Which word is closest in meaning to “classmate”?',opts:['teacher','student in the same class','school building','subject'],a:'student in the same class',why:'Classmate là người học cùng lớp với em.'}
];
const challengeWriting=[
 {prompt:'Viết câu hỏi cho phần gạch chân: “My school is near my house.” (gạch chân “near my house”)',answer:'Where is your school?',keywords:['where','is','your','school'],note:'Hỏi địa điểm dùng Where + be.'},
 {prompt:'Viết lại câu: “I go to school by bike.” → Đổi chủ ngữ thành “Lan”.',answer:'Lan goes to school by bike.',keywords:['lan','goes','school','bike'],note:'Lan là ngôi thứ ba số ít nên go → goes.'},
 {prompt:'Viết 3 câu về một ngày đi học của em. Dùng ít nhất một trạng từ tần suất.',answer:'I usually get up at 6. I go to school at 7. I often play with my classmates.',keywords:['i','school'],note:'Bài của em có thể khác mẫu. Hãy kiểm tra chủ ngữ, động từ và trạng từ tần suất.'},
 {prompt:'Viết một câu có cấu trúc “There is/There are” để mô tả lớp học.',answer:'There are twenty desks in my classroom.',keywords:['there','classroom'],note:'There is dùng với số ít; There are dùng với số nhiều.'}
];
let currentQuestion=0,score=0,answered=false;
function shuffleOptions(a){const s=[...a];for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]]}return s}
function speak(text){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';u.rate=.88;u.pitch=1;window.speechSynthesis.speak(u)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function normalize(s){return String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,' ').replace(/\s+/g,' ').trim()}
function setHeader(label,title,instruction,badge){activityLabel.textContent=label;contentTitle.textContent=title;contentInstruction.textContent=instruction;activityBadge.textContent=badge;activityFeedback.textContent=''}
function completion(text){return `<div class="section-complete"><span class="check">✓</span><div><strong>${text}</strong><div class="unit-note">Em có thể bôi đen từ/cụm từ tiếng Anh để xem nghĩa, từ loại, IPA và nghe phát âm.</div></div></div>`}
function updateProgress(n){const p=Math.round(n/totalSteps*100);steps.forEach(x=>x.classList.toggle('is-active',Number(x.dataset.step)===n));progressText.textContent=`${n} / ${totalSteps}`;progressBar.style.width=`${p}%`;progressTrack.setAttribute('aria-label',`Tiến độ ${p}%`)}
function selectStep(n){updateProgress(n);renderStep(n)}
function renderWarmUp(){const q=warmUpQuestions[currentQuestion],opts=shuffleOptions(q.options);answered=false;setHeader('KHỞI ĐỘNG • QUICK START','Let’s get started!',q.prompt,`${currentQuestion+1} / ${warmUpQuestions.length}`);nextActivity.textContent=currentQuestion===warmUpQuestions.length-1?'Hoàn thành ✓':'Câu tiếp theo →';activityBody.innerHTML=`<div class="question-card"><div class="question-number">Câu ${currentQuestion+1}</div><div class="question-prompt">${esc(q.prompt)}</div><div class="answer-grid">${opts.map((o,i)=>`<button class="answer-option" type="button" data-answer="${esc(o)}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join('')}</div></div>`;activityBody.querySelectorAll('.answer-option').forEach(b=>b.addEventListener('click',()=>checkMCQ(b,q)))}
function checkMCQ(btn,q){if(answered)return;answered=true;const a=btn.dataset.answer,buttons=[...activityBody.querySelectorAll('.answer-option')],correct=a===(q.a||q.answer);buttons.forEach(b=>{b.disabled=true;if(b.dataset.answer===(q.a||q.answer))b.classList.add('is-correct')});if(!correct)btn.classList.add('is-wrong');if(correct){score++;activityFeedback.innerHTML=`<strong class="feedback-good">✓ Chính xác!</strong> ${q.why||q.explanation}`}else activityFeedback.innerHTML=`<strong class="feedback-bad">✗ Chưa đúng.</strong> Đáp án đúng là <b>${esc(q.a||q.answer)}</b>. ${q.why||q.explanation}`}
function showFinalWarmUp(){setHeader('KHỞI ĐỘNG • HOÀN THÀNH','Tuyệt vời! Em đã khởi động xong.','Hãy xem kết quả trước khi chuyển sang phần Từ vựng.','✓');activityBody.innerHTML=`<div class="result-card"><div class="result-score">${score}<span>/${warmUpQuestions.length}</span></div><div><h3>Kết quả khởi động</h3><p>${score===warmUpQuestions.length?'Rất tốt! Em đã sẵn sàng học Unit 1.':'Em hãy xem lại phần giải thích rồi tiếp tục nhé.'}</p></div></div>${completion('Hoàn thành phần Khởi động!')}`;activityFeedback.textContent='';nextActivity.textContent='Sang Từ vựng →'}
function renderVocabulary(){setHeader('TỪ VỰNG • VOCABULARY','My New School — Vocabulary','Học từ mới, nghe phát âm và ghi nhớ nghĩa tiếng Việt.',`${vocabulary.length} từ`);activityBody.innerHTML=`<div class="vocab-grid">${vocabulary.map(v=>`<div class="vocab-card"><div><div class="vocab-word">${v[0]}</div><div class="vocab-meta">${v[1]} · ${v[2]}</div><div class="vocab-meaning">${v[3]}</div></div><button class="listen-word" type="button" data-word="${v[0]}">🔊 Nghe UK</button></div>`).join('')}</div><div class="grammar-box"><h3>3 bước nhớ từ</h3><div class="grammar-rule">Nhìn từ → nghe phát âm → đặt câu. Khi quên, em cứ tra lại. Tra nhiều lần chính là một cách ôn tập.</div></div>${completion('Bộ từ vựng Unit 1 đã sẵn sàng!')}`;activityBody.querySelectorAll('.listen-word').forEach(b=>b.addEventListener('click',()=>speak(b.dataset.word)));nextActivity.textContent='Sang Ngữ pháp →'}
function miniMCQ(btn,card,q){if(card.dataset.done)return;card.dataset.done='1';const buttons=[...card.querySelectorAll('button')],correct=btn.dataset.a===q.a;buttons.forEach(b=>{b.disabled=true;if(b.dataset.a===q.a)b.classList.add('correct')});if(!correct)btn.classList.add('wrong');card.querySelector('.mini-explain').innerHTML=correct?`<span class="feedback-good">✓ Đúng.</span> ${q.why}`:`<span class="feedback-bad">✗ Chưa đúng.</span> Đáp án: <b>${esc(q.a)}</b>. ${q.why}`}
function renderGrammar(){setHeader('NGỮ PHÁP • GRAMMAR','Present Simple','Nắm quy tắc rồi làm 4 câu luyện tập có giải thích.',`${grammarQuestions.length} câu`);activityBody.innerHTML=`<div class="grammar-box"><h3>Công thức cốt lõi</h3><div class="formula">I / You / We / They + V</div><div class="formula">He / She / It + V-s/es</div><div class="formula">Do/Does + S + V?</div><div class="example-line"><b>Example:</b> I go to school every day. / She goes to school every day.</div></div><div class="practice-grid">${grammarQuestions.map((q,i)=>`<div class="mini-exercise" data-gi="${i}"><h3>Câu ${i+1}. ${esc(q.q)}</h3><div class="mini-options">${shuffleOptions(q.opts).map(o=>`<button type="button" data-a="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="mini-explain"></div></div>`).join('')}</div>${completion('Em đã ôn xong phần Ngữ pháp!')}`;activityBody.querySelectorAll('.mini-exercise').forEach(card=>card.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>miniMCQ(btn,card,grammarQuestions[Number(card.dataset.gi)]))));nextActivity.textContent='Sang Luyện tập →'}
function checkWriting(card,w,award){const input=card.querySelector('.writing-input'),result=card.querySelector('.writing-result'),sample=card.querySelector('.sample-answer'),text=normalize(input.value);if(!text){result.className='writing-result bad';result.textContent='Hãy viết câu trả lời trước nhé.';return}const exact=normalize(w.answer)===text;const keywords=(w.keywords||[]).every(k=>text.includes(normalize(k)));const good=exact||keywords;result.className=`writing-result ${good?'good':'bad'}`;result.textContent=exact?'✓ Chính xác!':good?'✓ Đủ ý chính. Hãy xem bài mẫu để tự sửa ngữ pháp.':'△ Chưa đủ ý hoặc còn lỗi. Hãy xem bài mẫu để đối chiếu.';sample.classList.add('show');if(award&&good&&!card.dataset.awarded){card.dataset.awarded='1';score++}}
function renderPractice(){setHeader('LUYỆN TẬP • PRACTICE','Practice & Writing','Làm trắc nghiệm rồi chuyển sang phần viết. Đáp án viết chỉ hiện sau khi em tự kiểm tra.',`${practiceQuestions.length+writingQuestions.length} bài`);activityBody.innerHTML=`<div class="practice-grid">${practiceQuestions.map((q,i)=>`<div class="mini-exercise practice-mcq"><h3>Câu ${i+1}. ${esc(q.q)}</h3><div class="mini-options">${shuffleOptions(q.opts).map(o=>`<button type="button" data-a="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="mini-explain"></div></div>`).join('')}</div><div class="challenge-section-title">PHẦN VIẾT — TỰ LUẬN</div><p class="challenge-intro">Hãy tự làm trước. Khi bấm “Kiểm tra”, hệ thống mới đưa phản hồi và câu mẫu.</p>${writingQuestions.map((w,i)=>`<div class="writing-card" data-wi="${i}"><h3>Viết ${i+1}</h3><div class="writing-prompt">${esc(w.prompt)}</div><textarea class="writing-input" placeholder="Nhập câu trả lời bằng tiếng Anh..."></textarea><div class="writing-actions"><button class="check-writing" type="button">Kiểm tra bài viết</button><span class="writing-result"></span></div><div class="sample-answer" id="sample${i}"><b>Gợi ý / bài mẫu:</b> ${esc(w.answer)}<br><span>${esc(w.note)}</span></div></div>`).join('')}${completion('Phần Luyện tập đã có cả trắc nghiệm và tự luận!')}`;activityBody.querySelectorAll('.practice-mcq').forEach((card,i)=>card.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>miniMCQ(btn,card,practiceQuestions[i]))));activityBody.querySelectorAll('.writing-card').forEach(card=>{const w=writingQuestions[Number(card.dataset.wi)];card.querySelector('.check-writing').addEventListener('click',()=>checkWriting(card,w,false))});nextActivity.textContent='Sang Đọc hiểu →'}
const readingQuestions=[
 {q:'Where is Nam’s new school?',opts:['In the city centre','Near his house','Next to a river','In the countryside'],a:'Near his house',why:'The passage says his new school is near his house.'},
 {q:'How many floors does the school have?',opts:['One','Two','Three','Four'],a:'Three',why:'The passage describes a three-floor school building.'},
 {q:'What does Nam like most?',opts:['The library','The canteen','The playground','The bus'],a:'The library',why:'Nam says the library is his favourite place because he loves reading.'}
];
function renderReading(){setHeader('ĐỌC HIỂU • READING','A New School Day','Đọc kỹ đoạn văn, sau đó trả lời 3 câu hỏi.',`3 câu`);activityBody.innerHTML=`<div class="reading-box"><h3>Reading</h3><div class="reading-text"><b>My new school</b><br>My name is Nam. I am a student at a new school. It is near my house, so I walk to school every morning. My school has three floors and a large playground. There are many classrooms, a library and a computer room. I like the library most because I love reading. My classmates are friendly, and my teachers are helpful.</div><div class="reading-questions">${readingQuestions.map((q,i)=>`<div class="reading-q"><p>Câu ${i+1}. ${esc(q.q)}</p><div class="mini-options">${shuffleOptions(q.opts).map(o=>`<button type="button" data-a="${esc(o)}">${esc(o)}</button>`).join('')}</div><div class="mini-explain"></div></div>`).join('')}</div></div>${completion('Em đã hoàn thành phần Đọc hiểu!')}`;activityBody.querySelectorAll('.reading-q').forEach((card,i)=>card.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>miniMCQ(btn,card,readingQuestions[i]))));nextActivity.textContent='Sang Nói →'}
function renderSpeaking(){setHeader('NÓI • SPEAKING','Talk about My New School','Dùng từ gợi ý để tự nói. Động từ được giữ ở nguyên mẫu để em tự vận dụng.',`Speaking`);activityBody.innerHTML=`<div class="speaking-box"><h3>Task</h3><p>Talk about your new school in 4–5 sentences.</p><div class="prompt-list"><div class="prompt-item"><b>school</b> · <b>classroom</b> · <b>classmates</b></div><div class="prompt-item"><b>be</b> · <b>have</b> · <b>like</b> · <b>study</b> · <b>play</b></div><div class="prompt-item"><b>near</b> · <b>big</b> · <b>friendly</b> · <b>usually</b></div></div><h3>Bài nói mẫu</h3><div class="speaking-sample">My new school is near my house. It has many classrooms and a big playground. My classmates are friendly. I usually study English in the morning. I like my new school.</div><div class="writing-actions"><button class="audio-chip" id="speak-sample" type="button">🔊 Nghe bài mẫu</button></div><div class="speaking-note">Lưu ý: hãy tự chia động từ theo chủ ngữ khi nói. Ví dụ: I study, but She studies.</div></div>${completion('Em đã có đủ gợi ý để luyện nói!')}`;document.querySelector('#speak-sample').addEventListener('click',()=>speak('My new school is near my house. It has many classrooms and a big playground. My classmates are friendly. I usually study English in the morning. I like my new school.'));nextActivity.textContent='Sang Thử thách →'}
function renderStep(n){if(n===1){previewPanel.classList.add('show');currentQuestion=0;score=0;renderWarmUp()}else{previewPanel.classList.remove('show');if(n===2)renderVocabulary();if(n===3)renderGrammar();if(n===4){score=0;renderPractice()}if(n===5)renderReading();if(n===6)renderSpeaking();if(n===7){score=0;renderChallenge()}}}
steps.forEach(s=>s.addEventListener('click',()=>{selectStep(Number(s.dataset.step));lessonActivity.scrollIntoView({behavior:'smooth',block:'center'})}));
document.querySelector('#start-activity').addEventListener('click',()=>{currentQuestion=0;score=0;selectStep(1);lessonActivity.scrollIntoView({behavior:'smooth',block:'center'})});
nextActivity.addEventListener('click',()=>{if(document.querySelector('.answer-option')){if(!answered){activityFeedback.innerHTML='<strong class="feedback-bad">Hãy chọn một đáp án trước nhé.</strong>';return}if(currentQuestion<warmUpQuestions.length-1){currentQuestion++;renderWarmUp();return}showFinalWarmUp();return}const active=Number(document.querySelector('.step.is-active')?.dataset.step||1);if(active<totalSteps){selectStep(active+1);lessonActivity.scrollIntoView({behavior:'smooth',block:'center'})}else{activityFeedback.innerHTML='<strong class="feedback-good">✓ Tuyệt vời!</strong> Em đã đi hết 7 phần của Unit 1.'}});
soundToggle.addEventListener('click',()=>{const enabled=soundToggle.getAttribute('aria-pressed')!=='true';soundToggle.setAttribute('aria-pressed',String(enabled));toast.textContent=enabled?'Đã bật âm thanh hướng dẫn!':'Đã tắt âm thanh hướng dẫn!';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)});
renderStep(1);

/* ===== UNIT 1 ENHANCED PEDAGOGY ===== */
const U1_G_FORM = {
  topic: 'Present Simple',
  affirmative: [
    ['I / You / We / They', 'V (base form)', 'I study English every day.'],
    ['He / She / It', 'V-s / V-es', 'She studies English every day.']
  ],
  negative: [
    ['I / You / We / They', "do not (don't) + V", "I don't study late."],
    ['He / She / It', "does not (doesn't) + V", "She doesn't study late."]
  ],
  question: [
    ['Do', 'I / you / we / they + V?', 'Do you study English every day?'],
    ['Does', 'he / she / it + V?', 'Does she study English every day?']
  ],
  signals: ['every day', 'every week', 'on Mondays', 'usually', 'often', 'sometimes', 'always', 'never'],
  uses: [
    'Thói quen hoặc hoạt động lặp lại: I go to school every day.',
    'Sự thật hoặc điều thường đúng: Our school has a library.',
    'Lịch học / thời gian biểu thường xuyên: We have English on Monday.'
  ]
};

const U1_GRAMMAR_MC = [
  {q:'My sister ___ to school every day.',o:['go','goes','going','is go'],a:'goes',e:'My sister là ngôi thứ ba số ít nên go → goes.'},
  {q:'We ___ English on Mondays.',o:['study','studies','studying','is study'],a:'study',e:'We đi với động từ nguyên mẫu: study.'},
  {q:'___ you play football after school?',o:['Do','Does','Are','Is'],a:'Do',e:'Với you, câu hỏi hiện tại đơn dùng Do.'},
  {q:"Nam ___ like getting up late.",o:["don't","doesn't","isn't","not"],a:"doesn't",e:'Nam là ngôi thứ ba số ít nên dùng doesn’t + V nguyên mẫu.'},
  {q:'The school ___ a big playground.',o:['have','has','having','is have'],a:'has',e:'The school = it, nên have → has.'}
];
const U1_GRAMMAR_FILL = [
  {q:'I ___ (go) to school at seven every day.',a:'go',e:'I đi với động từ nguyên mẫu go.'},
  {q:'She ___ (study) English on Tuesday.',a:'studies',e:'study đổi thành studies với she.'},
  {q:'My friends ___ (play) badminton at break time.',a:'play',e:'My friends là số nhiều nên dùng play.'},
  {q:'He ___ (watch) TV after dinner.',a:'watches',e:'watch kết thúc bằng -ch nên thêm -es: watches.'},
  {q:'Lan ___ (have) a new schoolbag.',a:'has',e:'have đổi thành has với he/she/it.'}
];
const U1_GRAMMAR_REORDER = [
  {words:['every day','I','to school','go'],a:'I go to school every day.',e:'Chủ ngữ + động từ + nơi chốn + trạng từ thời gian.'},
  {words:['usually','She','English','studies','in the morning'],a:'She usually studies English in the morning.',e:'Trạng từ tần suất thường đứng trước động từ thường.'},
  {words:['you','Do','after school','play','football'],a:'Do you play football after school?',e:'Câu hỏi: Do + subject + V + ...?'},
  {words:['doesn’t','My brother','late','get up'],a:"My brother doesn't get up late.",e:'Sau doesn’t dùng động từ nguyên mẫu get up.'},
  {words:['on Mondays','We','have','English'],a:'We have English on Mondays.',e:'We + have + môn học + thời gian.'}
];
const U1_GRAMMAR_ERROR = [
  {q:'She go to school every day. → Sửa từ sai “go”.',a:'goes',full:'She goes to school every day.',e:'She là ngôi thứ ba số ít nên go → goes.'},
  {q:"He doesn't studies English on Friday. → Sửa từ sai “studies”.",a:'study',full:"He doesn't study English on Friday.",e:'Sau doesn’t phải dùng động từ nguyên mẫu.'},
  {q:'Do Mai likes Maths? → Sửa từ sai “likes”.',a:'like',full:'Does Mai like Maths?',e:'Sau Does dùng động từ nguyên mẫu like.'},
  {q:'They plays badminton after school. → Sửa từ sai “plays”.',a:'play',full:'They play badminton after school.',e:'They là số nhiều nên dùng play.'},
  {q:'I studies English every day. → Sửa từ sai “studies”.',a:'study',full:'I study English every day.',e:'I đi với động từ nguyên mẫu study.'}
];

const U1_PRACTICE_EASY = [
  {q:'There ___ a library in my school.',o:['is','are','am','be'],a:'is',e:'A library là số ít → There is.'},
  {q:'My classmates ___ friendly.',o:['is','are','am','be'],a:'are',e:'My classmates là số nhiều → are.'},
  {q:'I ___ my schoolbag every morning.',o:['check','checks','checking','is check'],a:'check',e:'I + V nguyên mẫu.'},
  {q:'She ___ her homework after dinner.',o:['do','does','doing','is do'],a:'does',e:'She + does.'},
  {q:'We ___ English twice a week.',o:['have','has','having','is have'],a:'have',e:'We + have.'}
];
const U1_PRACTICE_MEDIUM = [
  {q:'Which sentence is correct?',o:['He study Maths.','He studies Maths.','He studying Maths.','He does studies Maths.'],a:'He studies Maths.',e:'He là ngôi thứ ba số ít → studies.'},
  {q:'Which sentence is correct?',o:["They doesn't play football.","They don't play football.","They aren't play football.","They not plays football."],a:"They don't play football.",e:'They dùng don’t + V nguyên mẫu.'},
  {q:'___ your school have a computer room?',o:['Do','Does','Is','Are'],a:'Does',e:'Your school = it → Does.'},
  {q:'Mai ___ usually ___ to school by bike.',o:['does / go','usually / goes','is / go','do / goes'],a:'usually / goes',e:'Mai goes; usually đứng trước động từ thường.'},
  {q:'Choose the best sentence.',o:['I always am early.','I am always early.','Always I early am.','I early always am.'],a:'I am always early.',e:'Với be, trạng từ tần suất thường đứng sau be.'}
];
const U1_PRACTICE_HARD = [
  {q:'Choose the correct question.',o:['Where your school is?','Where is your school?','Where does your school?','Where your school does?'],a:'Where is your school?',e:'Với be: Wh-word + be + subject.'},
  {q:'Choose the correct negative sentence.',o:["She doesn't likes Science.","She don't like Science.","She doesn't like Science.","She not like Science."],a:"She doesn't like Science.",e:'doesn’t + V nguyên mẫu.'},
  {q:'Which sentence has the correct adverb position?',o:['I go usually to school.','I usually go to school.','Usually I go school to.','I go to usually school.'],a:'I usually go to school.',e:'Usually đứng trước động từ thường go.'},
  {q:'Choose the correct pair: “Nam ___ his homework every evening, but he ___ TV at school.”',o:['does / doesn’t watch','do / don’t watches','does / doesn’t watches','does / don’t watch'],a:'does / doesn’t watch',e:'Nam → does; doesn’t + V nguyên mẫu.'},
  {q:'Which sentence describes a regular timetable?',o:['We are having English on Monday.','We have English on Monday.','We has English on Monday.','We having English on Monday.'],a:'We have English on Monday.',e:'Hiện tại đơn dùng cho lịch học thường xuyên.'}
];

const U1_READING_1 = {
  title:'Reading 1 — My New School',
  text:`Minh is a new student at Green Valley Secondary School. He goes to school from Monday to Friday. His school is not far from his house, so he usually walks there with his brother. The school has a large playground, a modern library and many bright classrooms. Minh likes English and science because the lessons are interesting. His new classmates are friendly and often help him when he does not understand an activity. At break time, Minh and his friends play badminton in the playground. He sometimes reads books in the library after class. Minh feels happy at his new school because he has good teachers, useful facilities and many new friends.`,
  tf:[['Minh is a new student.',true],['He goes to school seven days a week.',false],['The school has a library.',true],['Minh dislikes English.',false],['His classmates often help him.',true]],
  questions:[
    {q:'Why does Minh usually walk to school?',a:'Because his school is not far from his house.'},
    {q:'What subjects does Minh like?',a:'He likes English and science.'},
    {q:'What do Minh and his friends play at break time?',a:'They play badminton.'},
    {q:'Where does Minh sometimes read books?',a:'In the library.'},
    {q:'Why does Minh feel happy at his new school?',a:'Because he has good teachers, useful facilities and new friends.'}
  ],
  cloze:{text:'Minh is a new ___ at Green Valley Secondary School. He goes to school from Monday to ___. His school is near his house, so he usually ___ there. It has a large playground, a modern ___ and bright classrooms. Minh likes English and ___. His classmates are friendly and often ___ him. At break time, they play ___. Minh sometimes reads books after ___.',words:['student','Friday','walks','library','science','help','badminton','class']}
};
const U1_READING_2 = {
  title:'Reading 2 — A School Day',
  text:`Every school day, Mai gets up at six o'clock. She washes her face, has breakfast and checks her schoolbag before leaving home. She usually arrives at school at seven. Her first lesson is English, and she enjoys speaking English with her classmates. At break time, she often talks with her best friend or plays a game in the playground. In the afternoon, Mai studies Maths and Science. After school, she sometimes goes to the library to read a book. She always does her homework in the evening. Mai likes her school because the teachers are helpful, the students are friendly and there are many interesting activities.`,
  tf:[['Mai gets up at six o’clock.',true],['She arrives at school at eight.',false],['Her first lesson is English.',true],['She never goes to the library.',false],['She does her homework in the evening.',true]],
  questions:[
    {q:'What does Mai do before leaving home?',a:'She washes her face, has breakfast and checks her schoolbag.'},
    {q:'What does Mai enjoy doing in English?',a:'She enjoys speaking English with her classmates.'},
    {q:'What does she often do at break time?',a:'She talks with her best friend or plays a game.'},
    {q:'Which subjects does Mai study in the afternoon?',a:'Maths and Science.'},
    {q:'Why does Mai like her school?',a:'Because the teachers are helpful, the students are friendly and there are interesting activities.'}
  ],
  cloze:{text:'Every school day, Mai gets up at six ___. She has breakfast and checks her ___. She usually arrives at school at ___. Her first lesson is ___. At break time, she often talks with her best ___ or plays a game. In the afternoon, she studies Maths and ___. After school, she sometimes goes to the ___. She always does her homework in the ___.',words:['o’clock','schoolbag','seven','English','friend','Science','library','evening']}
};

const U1_SPEAK_SAMPLE = `My new school is a friendly place where I learn many interesting things every day. It is near my house, so I usually walk to school in the morning. My school has many bright classrooms, a library and a large playground. I like the library because I enjoy reading English books. My teachers are helpful and they always explain difficult lessons clearly. My classmates are friendly, too, and we often study and play together. I usually have English, Maths and Science at school. At break time, I sometimes play badminton with my friends. I feel happy at my new school because I can learn, make friends and join useful activities.`;
const U1_SPEAK_SENTENCES = [
  'My new school is a friendly place where I learn many interesting things every day.',
  'It is near my house, so I usually walk to school in the morning.',
  'My school has many bright classrooms, a library and a large playground.',
  'I like the library because I enjoy reading English books.',
  'My teachers are helpful and they always explain difficult lessons clearly.',
  'My classmates are friendly, too, and we often study and play together.',
  'I usually have English, Maths and Science at school.',
  'At break time, I sometimes play badminton with my friends.'
];

function u1Norm(s){return String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"“”]/g,' ').replace(/\\s+/g,' ').trim();}
function u1Escape(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function u1Shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function u1ExplainCard(card,correct,answer,explanation){card.querySelectorAll('button').forEach(b=>{b.disabled=true;if(b.dataset.a===answer)b.classList.add('correct');});if(!correct){const selected=card.querySelector('button[data-selected="1"]');if(selected)selected.classList.add('wrong');}card.querySelector('.mini-explain').innerHTML=correct?`<span class="feedback-good">✓ Đúng.</span> ${u1Escape(explanation)}`:`<span class="feedback-bad">✗ Chưa đúng.</span> Đáp án: <b>${u1Escape(answer)}</b>. ${u1Escape(explanation)}`;}
function u1MCQCard(q,index,kind){return `<div class="mini-exercise u1-card" data-kind="${kind}" data-index="${index}"><h3>Câu ${index+1}. ${u1Escape(q.q)}</h3><div class="mini-options">${u1Shuffle(q.o).map(o=>`<button type="button" data-a="${u1Escape(o)}">${u1Escape(o)}</button>`).join('')}</div><div class="mini-explain"></div></div>`;}
function u1AttachMCQ(container,data,kind){container.querySelectorAll(`.u1-card[data-kind="${kind}"]`).forEach(card=>{const q=data[Number(card.dataset.index)];card.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{if(card.dataset.done)return;card.dataset.done='1';btn.dataset.selected='1';const correct=btn.dataset.a===q.a;u1ExplainCard(card,correct,q.a,q.e);}));});}

function renderGrammar(){
  setHeader('NGỮ PHÁP • GRAMMAR','Present Simple — Học thật kỹ rồi mới luyện tập','Cấu trúc + cách dùng + dấu hiệu nhận biết + 4 dạng bài tập. Mỗi dạng 5 câu.', '20 câu');
  activityBody.innerHTML=`
  <div class="grammar-box u1-grammar-detail">
    <h3>1. Cấu trúc câu khẳng định</h3>
    <div class="formula">I / You / We / They + V nguyên mẫu</div>
    <div class="formula">He / She / It + V-s / V-es</div>
    <div class="example-line"><b>Ví dụ:</b> I go to school every day. / She goes to school every day.</div>
    <h3>2. Cấu trúc câu phủ định</h3>
    <div class="formula">I / You / We / They + do not (don't) + V</div>
    <div class="formula">He / She / It + does not (doesn't) + V</div>
    <div class="example-line"><b>Ví dụ:</b> I don't play football on Monday. / He doesn't play football on Monday.</div>
    <h3>3. Cấu trúc câu hỏi</h3>
    <div class="formula">Do + I / you / we / they + V ...?</div>
    <div class="formula">Does + he / she / it + V ...?</div>
    <div class="example-line"><b>Ví dụ:</b> Do you study English every day? / Does Lan study English every day?</div>
    <h3>4. Khi nào dùng Present Simple?</h3>
    <ul class="grammar-rule"><li>Thói quen, hoạt động lặp lại.</li><li>Sự thật hoặc điều thường đúng.</li><li>Lịch học, thời gian biểu và hoạt động thường xuyên.</li></ul>
    <h3>5. Dấu hiệu nhận biết</h3>
    <div class="tag-row">${U1_G_FORM.signals.map(x=>`<span class="tag-chip">${x}</span>`).join('')}</div>
    <h3>6. Quy tắc thêm -s / -es</h3>
    <div class="grammar-rule">Thông thường thêm <b>-s</b>: play → plays. Thêm <b>-es</b> sau s, sh, ch, x, o: watch → watches; go → goes. Động từ tận cùng phụ âm + y: study → studies.</div>
    <div class="example-line"><b>Lỗi cần tránh:</b> She doesn't <u>studies</u> English. → She doesn't <b>study</b> English.</div>
    <div class="example-line"><b>Adverbs of frequency:</b> always, usually, often, sometimes, never. Với động từ thường, trạng từ thường đứng trước động từ: I usually study English. Với <b>be</b>, trạng từ thường đứng sau be: I am usually early.</div>
  </div>
  <div class="u1-section-title">DẠNG 1 — CHỌN ĐÁP ÁN ĐÚNG (5 câu)</div>
  <div class="practice-grid">${U1_GRAMMAR_MC.map((q,i)=>u1MCQCard(q,i,'gmc')).join('')}</div>
  <div class="u1-section-title">DẠNG 2 — HOÀN THÀNH CÂU ĐÚNG HÌNH THỨC TỪ TRONG NGOẶC (5 câu)</div>
  <div class="u1-input-grid">${U1_GRAMMAR_FILL.map((q,i)=>`<div class="writing-card u1-fill" data-i="${i}"><h3>Câu ${i+1}</h3><div class="writing-prompt">${u1Escape(q.q)}</div><input class="writing-input" placeholder="Nhập đáp án..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Đáp án:</b> ${q.a}<br>${q.e}</div></div>`).join('')}</div>
  <div class="u1-section-title">DẠNG 3 — SẮP XẾP TỪ THÀNH CÂU (5 câu)</div>
  <div class="u1-input-grid">${U1_GRAMMAR_REORDER.map((q,i)=>`<div class="writing-card u1-reorder" data-i="${i}"><h3>Câu ${i+1}</h3><div class="writing-prompt"><b>Từ gợi ý:</b> ${u1Escape(q.words.join(' / '))}</div><input class="writing-input" placeholder="Sắp xếp thành câu hoàn chỉnh..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Câu đúng:</b> ${u1Escape(q.a)}<br>${u1Escape(q.e)}</div></div>`).join('')}</div>
  <div class="u1-section-title">DẠNG 4 — TÌM VÀ SỬA LỖI TỪ GẠCH CHÂN (5 câu)</div>
  <div class="u1-input-grid">${U1_GRAMMAR_ERROR.map((q,i)=>`<div class="writing-card u1-error" data-i="${i}"><h3>Câu ${i+1}</h3><div class="writing-prompt">${u1Escape(q.q)}</div><input class="writing-input" placeholder="Nhập từ đúng..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Từ đúng:</b> ${u1Escape(q.a)}<br><b>Câu hoàn chỉnh:</b> ${u1Escape(q.full)}<br>${u1Escape(q.e)}</div></div>`).join('')}</div>
  ${completion('Ngữ pháp Unit 1 đã được học theo 6 bước: công thức → ví dụ → cách dùng → dấu hiệu → lỗi thường gặp → bài tập 4 dạng.')}`;
  u1AttachMCQ(activityBody,U1_GRAMMAR_MC,'gmc');
  activityBody.querySelectorAll('.u1-fill').forEach(card=>{const q=U1_GRAMMAR_FILL[Number(card.dataset.i)];card.querySelector('.check-writing').onclick=()=>u1CheckInput(card,q.a,q.e,false);});
  activityBody.querySelectorAll('.u1-reorder').forEach(card=>{const q=U1_GRAMMAR_REORDER[Number(card.dataset.i)];card.querySelector('.check-writing').onclick=()=>u1CheckInput(card,q.a,q.e,true);});
  activityBody.querySelectorAll('.u1-error').forEach(card=>{const q=U1_GRAMMAR_ERROR[Number(card.dataset.i)];card.querySelector('.check-writing').onclick=()=>u1CheckInput(card,q.a,q.e,false,q.full);});
  nextActivity.textContent='Sang Luyện tập →';
}
function u1CheckInput(card,answer,explanation,order=false,full=''){const input=card.querySelector('.writing-input'),result=card.querySelector('.writing-result'),sample=card.querySelector('.sample-answer'),value=u1Norm(input.value);if(!value){result.className='writing-result bad';result.textContent='Hãy nhập câu trả lời trước nhé.';sample.classList.add('show');return;}const target=u1Norm(answer);const good=order?value===target:value===target;result.className=`writing-result ${good?'good':'bad'}`;result.textContent=good?'✓ Chính xác!':'✗ Chưa đúng. Hãy xem giải thích và tự sửa lại.';sample.classList.add('show');}

function renderPractice(){
  setHeader('LUYỆN TẬP • PRACTICE','Luyện tập từ dễ → khó','Mỗi mức có bài tập tương tác, chấm điểm ngay và giải thích sau khi chọn.', '15 + viết');
  const groups=[['MỨC 1 — NHẬN BIẾT',U1_PRACTICE_EASY,'p1'],['MỨC 2 — THÔNG HIỂU',U1_PRACTICE_MEDIUM,'p2'],['MỨC 3 — VẬN DỤNG',U1_PRACTICE_HARD,'p3']];
  const writing=[
    ['Viết lại câu phủ định: I like my new school.', "I don't like my new school."],
    ['Viết câu hỏi cho câu: Lan studies English every day.', 'Does Lan study English every day?'],
    ['Viết một câu với usually để nói về việc đi học.', 'I usually go to school at seven.'],
    ['Đổi chủ ngữ thành She: I study English every day.', 'She studies English every day.'],
    ['Viết 2 câu mô tả lớp học dùng There is/There are.', 'There is a board in my classroom. There are twenty desks.']
  ];
  const groupHtml=groups.map(group=>`<div class="u1-practice-level"><h3>${group[0]}</h3><div class="practice-grid">${group[1].map((q,i)=>u1MCQCard(q,i,group[2])).join('')}</div></div>`).join('');
  const writingHtml=writing.map((item,i)=>`<div class="writing-card u1-practice-write" data-i="${i}"><h3>Viết ${i+1}</h3><div class="writing-prompt">${u1Escape(item[0])}</div><textarea class="writing-input" placeholder="Viết câu trả lời bằng tiếng Anh..."></textarea><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Bài mẫu:</b> ${u1Escape(item[1])}<br>Hãy so sánh chủ ngữ, trợ động từ và dạng động từ.</div></div>`).join('');
  activityBody.innerHTML=groupHtml+'<div class="u1-section-title">PHẦN VIẾT — 5 BÀI</div>'+writingHtml+completion('Phần Luyện tập đã được mở rộng theo 3 mức độ và có thêm tự luận.');
  groups.forEach(group=>u1AttachMCQ(activityBody,group[1],group[2]));
  activityBody.querySelectorAll('.u1-practice-write').forEach(card=>card.querySelector('.check-writing').onclick=()=>{const sample=card.querySelector('.sample-answer'),input=card.querySelector('.writing-input'),result=card.querySelector('.writing-result');if(!u1Norm(input.value)){result.className='writing-result bad';result.textContent='Hãy viết trước nhé.';return;}result.className='writing-result good';result.textContent='✓ Đã ghi nhận bài làm. Hãy đối chiếu bài mẫu và tự sửa lỗi.';sample.classList.add('show');});
  nextActivity.textContent='Sang Bài nghe →';
}

function u1ReadingBlock(data,prefix){return `<div class="reading-box u1-reading"><h3>${u1Escape(data.title)}</h3><div class="reading-count">${data.text.split(/\\s+/).length} words</div><div class="reading-text">${u1Escape(data.text)}</div><div class="u1-subtitle">Dạng 1 — True / False</div>${data.tf.map((x,i)=>`<div class="reading-q u1-read-item" data-answer="${x[1]}" data-type="tf"><p>${i+1}. ${u1Escape(x[0])}</p><div class="mini-options"><button data-v="true">True</button><button data-v="false">False</button></div><div class="mini-explain"></div></div>`).join('')}<div class="u1-subtitle">Dạng 2 — Trả lời câu hỏi</div>${data.questions.map((x,i)=>`<div class="writing-card u1-read-open" data-answer="${u1Escape(x.a)}"><h3>Câu ${i+1}</h3><div class="writing-prompt">${u1Escape(x.q)}</div><input class="writing-input" placeholder="Trả lời bằng tiếng Anh..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Gợi ý trả lời:</b> ${u1Escape(x.a)}</div></div>`).join('')}<div class="u1-subtitle">Dạng 3 — Điền từ vào chỗ trống (8 chỗ)</div><div class="reading-text cloze-text">${u1Escape(data.cloze.text)}</div><div class="word-bank">${u1Shuffle(data.cloze.words).map(w=>`<span class="word-chip">${u1Escape(w)}</span>`).join('')}</div>${data.cloze.words.map((w,i)=>`<div class="writing-card u1-cloze" data-answer="${u1Escape(w)}"><h3>Chỗ trống ${i+1}</h3><input class="writing-input" placeholder="Chọn từ phù hợp..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div></div>`).join('')}</div>`;}
function u1BindReading(data){activityBody.querySelectorAll('.u1-read-item').forEach(card=>card.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{if(card.dataset.done)return;card.dataset.done='1';const good=btn.dataset.v===card.dataset.answer;card.querySelectorAll('button').forEach(b=>{b.disabled=true;if(b.dataset.v===card.dataset.answer)b.classList.add('correct')});if(!good)btn.classList.add('wrong');card.querySelector('.mini-explain').innerHTML=good?'<span class="feedback-good">✓ Đúng.</span> Em đọc lại câu trong bài để kiểm chứng.':'<span class="feedback-bad">✗ Chưa đúng.</span> Hãy tìm đúng thông tin trong bài đọc.';}));activityBody.querySelectorAll('.u1-read-open').forEach(card=>card.querySelector('.check-writing').onclick=()=>{const v=u1Norm(card.querySelector('input').value),a=u1Norm(card.dataset.answer),result=card.querySelector('.writing-result'),sample=card.querySelector('.sample-answer');const words=a.split(' ').filter(x=>x.length>3);const good=words.slice(0,3).every(w=>v.includes(w));result.className=`writing-result ${good?'good':'bad'}`;result.textContent=good?'✓ Đúng ý chính.':'△ Hãy xem lại thông tin trong bài.';sample.classList.add('show');});activityBody.querySelectorAll('.u1-cloze').forEach(card=>card.querySelector('.check-writing').onclick=()=>{const good=u1Norm(card.querySelector('input').value)===u1Norm(card.dataset.answer),r=card.querySelector('.writing-result');r.className=`writing-result ${good?'good':'bad'}`;r.textContent=good?'✓ Đúng!':'✗ Chưa đúng. Hãy xem lại word bank.';});}
function renderReading(){setHeader('ĐỌC HIỂU • READING','Reading — My New School','2 bài đọc 100–120 từ. Mỗi bài có True/False, trả lời câu hỏi và cloze 8 chỗ trống.', '2 bài');activityBody.innerHTML=u1ReadingBlock(U1_READING_1,'r1')+u1ReadingBlock(U1_READING_2,'r2')+completion('Đọc hiểu Unit 1 đã có 2 bài đọc và 3 dạng kiểm tra cho mỗi bài.');u1BindReading();nextActivity.textContent='Sang Nói →';}

function renderSpeaking(){
  setHeader('NÓI • SPEAKING','Talk about My New School','Bài nói mẫu 100–120 từ → sắp xếp câu → tự nói 100–120 từ với từ/cụm từ gợi ý.', '3 bước');
  const shuffled=u1Shuffle(U1_SPEAK_SENTENCES);
  activityBody.innerHTML=`<div class="speaking-box"><h3>Bước 1 — Bài nói mẫu (110 từ)</h3><div class="speaking-sample">${u1Escape(U1_SPEAK_SAMPLE)}</div><div class="writing-actions"><button class="audio-chip" id="u1-speak-sample">🔊 Nghe bài mẫu UK</button></div><h3>Bước 2 — Sắp xếp câu</h3><p class="speaking-note">Các câu dưới đây đã bị xáo trộn. Kéo thả hoặc nhập số thứ tự từ 1–8 vào ô tương ứng.</p><div class="u1-order-list">${shuffled.map((s,i)=>`<div class="order-row"><span class="order-sentence">${u1Escape(s)}</span><input class="order-input" type="number" min="1" max="8" placeholder="#"></div>`).join('')}</div><button class="check-writing" id="u1-check-order">Kiểm tra thứ tự</button><span class="writing-result" id="u1-order-result"></span><h3>Bước 3 — Tự nói / tự viết 100–120 từ</h3><p class="speaking-note"><b>Từ/cụm từ gợi ý:</b> <b>school</b> · <b>classroom</b> · <b>classmates</b> · <b>be</b> · <b>have</b> · <b>like</b> · <b>study</b> · <b>play</b> · <b>usually</b> · <b>near my house</b></p><textarea class="writing-input" id="u1-speaking-write" style="min-height:190px" placeholder="Viết bài nói 100–120 từ..."></textarea><div class="writing-actions"><button class="check-writing" id="u1-check-speaking">Kiểm tra độ dài & từ khóa</button><span class="writing-result" id="u1-speaking-result"></span></div><div class="sample-answer" id="u1-speaking-sample"><b>Bài mẫu tham khảo:</b> ${u1Escape(U1_SPEAK_SAMPLE)}</div></div>${completion('Phần Nói đã có mẫu 100–120 từ, sắp xếp câu và bài nói tự do theo từ gợi ý.')}`;
  document.querySelector('#u1-speak-sample').onclick=()=>speak(U1_SPEAK_SAMPLE);
  document.querySelector('#u1-check-order').onclick=()=>{const rows=[...document.querySelectorAll('.order-input')],values=rows.map(x=>Number(x.value)),unique=new Set(values).size===8,valid=unique&&values.every(n=>n>=1&&n<=8);const r=document.querySelector('#u1-order-result');r.className=`writing-result ${valid?'good':'bad'}`;r.textContent=valid?'✓ Em đã điền đủ 8 vị trí. Hãy đối chiếu bài mẫu để kiểm tra thứ tự.':'✗ Hãy dùng đủ các số từ 1 đến 8, không lặp số.';};
  document.querySelector('#u1-check-speaking').onclick=()=>{const t=document.querySelector('#u1-speaking-write').value.trim(),n=t? t.split(/\\s+/).length:0,low=t.toLowerCase();const keys=['school','classroom','classmates'];const ok=n>=100&&n<=120&&keys.every(k=>low.includes(k));const r=document.querySelector('#u1-speaking-result');r.className=`writing-result ${ok?'good':'bad'}`;r.textContent=ok?`✓ Đạt yêu cầu: ${n} từ và đủ từ khóa.`:`△ Hiện có ${n} từ. Mục tiêu 100–120 từ và cần có school, classroom, classmates.`;document.querySelector('#u1-speaking-sample').classList.add('show');};
  nextActivity.textContent='Sang Thử thách →';
}

const U1_CHALLENGE_SECTIONS = [
  {title:'Bài 1 — Nhận biết từ vựng trường học',type:'mcq',qs:[
    ['Which word means “trường học”?',['school','library','subject','friend'],'school'],['Which word means “bạn cùng lớp”?',['classmate','teacher','schoolbag','lesson'],'classmate'],['Which item is used for drawing circles?',['compass','calculator','book','pen'],'compass'],['Where do students usually read books?',['library','playground','canteen','gate'],'library'],['Which word means “đồng phục”?',['uniform','subject','classroom','timetable'],'uniform'],['Which place is used for playing at break time?',['playground','library','classroom','office'],'playground'],['Which word means “môn học”?',['subject','student','school','friend'],'subject'],['Which item can you put books in?',['schoolbag','compass','calculator','board'],'schoolbag'],['Which person teaches students?',['teacher','classmate','student','friend'],'teacher'],['Which word means “bài học”?',['lesson','library','uniform','playground'],'lesson'] ]},
  {title:'Bài 2 — Chọn dạng đúng của Present Simple',type:'mcq',qs:[
    ['I ___ to school every day.',['go','goes','going','is go'],'go'],['She ___ English on Monday.',['study','studies','studying','is study'],'studies'],['They ___ football after school.',['play','plays','playing','is play'],'play'],['Nam ___ his homework every evening.',['do','does','doing','is do'],'does'],['We ___ Maths at school.',['have','has','having','is have'],'have'],['Lan ___ to the library sometimes.',['go','goes','going','is go'],'goes'],['My friends ___ friendly.',['is','are','am','be'],'are'],['He ___ a new schoolbag.',['have','has','having','is have'],'has'],['You ___ English very well.',['speak','speaks','speaking','is speak'],'speak'],['The school ___ three floors.',['have','has','having','is have'],'has'] ]},
  {title:'Bài 3 — Phủ định và câu hỏi',type:'mcq',qs:[
    ["She ___ like Maths.",["don't","doesn't","isn't","not"],"doesn't"],["___ you play badminton?",['Do','Does','Is','Are'],'Do'],['___ he study English?',['Do','Does','Is','Are'],'Does'],["They ___ go to school on Sunday.",["don't","doesn't","isn't","not"],"don't"],["Nam ___ watch TV before school.",["don't","doesn't","isn't","not"],"doesn't"],['___ your school have a library?',['Do','Does','Is','Are'],'Does'],['___ your friends play together?',['Do','Does','Is','Are'],'Do'],["I ___ get up late on school days.",["don't","doesn't","am not","not"],"don't"],["Mai ___ like getting up early.",["don't","doesn't","isn't","not"],"doesn't"],['___ they have English today?',['Do','Does','Is','Are'],'Do'] ]},
  {title:'Bài 4 — Trạng từ tần suất',type:'mcq',qs:[
    ['I ___ go to school at seven.',['usually','does','am','is'],'usually'],['She is ___ late for class.',['never','do','does','go'],'never'],['We ___ play badminton at break time.',['often','is','does','has'],'often'],['Nam ___ reads in the library after class.',['sometimes','does','is','are'],'sometimes'],['They ___ have English on Monday.',['always','does','is','are'],'always'],['I am ___ early for school.',['usually','do','does','go'],'usually'],['Mai ___ studies with her friends.',['often','is','does','are'],'often'],['He is ___ absent on school days.',['never','do','does','study'],'never'],['We ___ check our schoolbags before class.',['usually','is','are','does'],'usually'],['She ___ helps her classmates.',['sometimes','is','does','are'],'sometimes'] ]},
  {title:'Bài 5 — Hoàn thành câu với dạng đúng của động từ',type:'fill',qs:[
    ['My brother ___ (go) to school by bike.','goes'],['I ___ (study) English every day.','study'],['She ___ (have) a new timetable.','has'],['We ___ (play) games at break time.','play'],['He ___ (watch) TV after dinner.','watches'],['They ___ (do) homework in the evening.','do'],['Lan ___ (read) books in the library.','reads'],['You ___ (like) your new school.','like'],['My school ___ (have) a large playground.','has'],['Mai ___ (study) Science on Tuesday.','studies'] ]},
  {title:'Bài 6 — Sắp xếp từ thành câu',type:'reorder',qs:[
    [['every day','I','go','to school'],'I go to school every day.'],[['usually','she','studies','English','in the morning'],'She usually studies English in the morning.'],[['Do','you','play','football','after school'],'Do you play football after school?'],[['doesn’t','he','like','Maths'],'He doesn’t like Maths.'],[['We','have','English','on Mondays'],'We have English on Mondays.'],[['my','is','school','near','house','my'],'My school is near my house.'],[['often','they','play','badminton','at break time'],'They often play badminton at break time.'],[['Does','Lan','read','books','in the library'],'Does Lan read books in the library?'],[['I','am','usually','early','for school'],'I am usually early for school.'],[['My classmates','are','friendly','and helpful'],'My classmates are friendly and helpful.'] ]},
  {title:'Bài 7 — Tìm và sửa lỗi',type:'fill',qs:[
    ['She go to school every day. Sửa “go”.','goes'],['He don’t like Maths. Sửa “don’t”.',"doesn't"],['They plays football. Sửa “plays”.','play'],['Does Lan studies English? Sửa “studies”.','study'],['I goes to school at seven. Sửa “goes”.','go'],['My brother have a new bag. Sửa “have”.','has'],['She doesn’t likes Science. Sửa “likes”.','like'],['We has English on Monday. Sửa “has”.','have'],['Do Mai likes reading? Sửa “likes”.','like'],['He study English every day. Sửa “study”.','studies'] ]},
  {title:'Bài 8 — Đọc nhanh và kiểm tra thông tin',type:'mcq',qs:[
    ['In Reading 1, Minh is a new ___.',['student','teacher','doctor','driver'],'student'],['Minh usually walks to school with his ___.',['brother','teacher','friend','father'],'brother'],['The school has a large ___.',['playground','river','cinema','shop'],'playground'],['Minh likes English and ___.',['science','Maths','Music','PE'],'science'],['His classmates often ___ him.',['help','teach','visit','call'],'help'],['At break time, they play ___.',['badminton','chess','football','basketball'],'badminton'],['Minh sometimes reads in the ___.',['library','classroom','office','canteen'],'library'],['In Reading 2, Mai gets up at ___.',['six','seven','eight','five'],'six'],['Mai’s first lesson is ___.',['English','Maths','Science','Music'],'English'],['Mai does her homework in the ___.',['evening','morning','afternoon','library'],'evening'] ]},
  {title:'Bài 9 — Vận dụng: biến đổi câu',type:'fill',qs:[
    ['Change to negative: She likes English. → She ___ English.',"doesn't like"],['Change to a question: You study Maths. → ___ you study Maths?','Do'],['Change the subject to He: I go to school. → He ___.','goes to school'],['Change the subject to They: She studies English. → They ___.','study English'],['Use usually: I go to school at seven. → I ___ go to school at seven.','usually'],['Use never: He is late for class. → He is ___ late for class.','never'],['Change to a question: Lan has a schoolbag. → ___ Lan have a schoolbag?','Does'],['Change to negative: They play football. → They ___ football.','don’t play'],['Change to third person: I watch TV. → She ___.','watches TV'],['Change to plural: The school has a library. → The schools ___ libraries.','have'] ]},
  {title:'Bài 10 — Vận dụng cao: chọn câu đúng và giải thích',type:'mcq',qs:[
    ['Choose the best sentence.',['She doesn’t studies English.','She doesn’t study English.','She don’t study English.','She not studies English.'],'She doesn’t study English.'],
    ['Choose the best sentence.',['Does he likes Science?','Do he like Science?','Does he like Science?','Is he like Science?'],'Does he like Science?'],
    ['Choose the best sentence.',['I usually am early.','I am usually early.','Usually I early am.','I early usually am.'],'I am usually early.'],
    ['Choose the best sentence.',['They goes to school.','They go to school.','They going school.','They does go school.'],'They go to school.'],
    ['Choose the best sentence.',['My school have a library.','My school has a library.','My school having a library.','My school is have a library.'],'My school has a library.'],
    ['Choose the best sentence.',['We doesn’t play after school.','We don’t play after school.','We aren’t play after school.','We not plays after school.'],'We don’t play after school.'],
    ['Choose the best sentence.',['Where your school is?','Where is your school?','Where does your school?','Where your school does?'],'Where is your school?'],
    ['Choose the best sentence.',['What time does she gets up?','What time do she get up?','What time does she get up?','What time is she get up?'],'What time does she get up?'],
    ['Choose the best sentence.',['He always is helpful.','He is always helpful.','Always he helpful is.','He helpful always is.'],'He is always helpful.'],
    ['Choose the best sentence.',['Our teachers teaches us well.','Our teachers teach us well.','Our teachers teaching us well.','Our teachers does teach us well.'],'Our teachers teach us well.']
  ]}
];
function u1ChallengeSection(sec,index){if(sec.type==='mcq'){return `<details class="u1-challenge-section" ${index===0?'open':''}><summary>${u1Escape(sec.title)} <span>10 câu</span></summary><div class="challenge-grid">${sec.qs.map((q,i)=>`<div class="mini-exercise u1-ch-card" data-sec="${index}" data-q="${i}"><h3>Câu ${i+1}. ${u1Escape(q[0])}</h3><div class="mini-options">${u1Shuffle(q[1]).map(o=>`<button data-a="${u1Escape(o)}">${u1Escape(o)}</button>`).join('')}</div><div class="mini-explain"></div></div>`).join('')}</div></details>`;}return `<details class="u1-challenge-section" ${index===0?'open':''}><summary>${u1Escape(sec.title)} <span>10 câu</span></summary><div class="u1-input-grid">${sec.qs.map((q,i)=>`<div class="writing-card u1-ch-fill" data-sec="${index}" data-q="${i}"><h3>Câu ${i+1}</h3><div class="writing-prompt">${Array.isArray(q[0])?'<b>Từ gợi ý:</b> '+u1Escape(q[0].join(' / ')):u1Escape(q[0])}</div><input class="writing-input" placeholder="Nhập câu trả lời..."><div class="writing-actions"><button class="check-writing">Kiểm tra</button><span class="writing-result"></span></div><div class="sample-answer"><b>Đáp án:</b> ${u1Escape(q[1])}</div></div>`).join('')}</div></details>`;}
function renderChallenge(){
  setHeader('THỬ THÁCH • NHẬN BIẾT → VẬN DỤNG CAO','Unit 1 Challenge — 10 bài × 10 câu','100 câu được chia theo 4 mức độ. Mỗi câu có chấm và giải thích để học sinh tự sửa lỗi.', '100 câu');
  activityBody.innerHTML=`<div class="challenge-box u1-challenge-main"><div class="score-strip"><span>Điểm tổng</span><strong id="u1-total-score">0 / 100</strong></div><p class="challenge-intro">Mỗi bài có 10 câu. Làm từ dễ đến khó. Các phần vận dụng cao tập trung vào dùng đúng chủ ngữ, trợ động từ, dạng động từ, trạng từ tần suất và trật tự câu.</p>${U1_CHALLENGE_SECTIONS.map((s,i)=>u1ChallengeSection(s,i)).join('')}</div>${completion('Thử thách Unit 1 gồm 10 bài × 10 câu, từ nhận biết đến vận dụng cao.')}`;
  let total=0;
  function addPoint(){total++;const el=document.querySelector('#u1-total-score');if(el)el.textContent=`${total} / 100`;}
  activityBody.querySelectorAll('.u1-ch-card').forEach(card=>{const sec=U1_CHALLENGE_SECTIONS[Number(card.dataset.sec)],q=sec.qs[Number(card.dataset.q)];card.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{if(card.dataset.done)return;card.dataset.done='1';const good=btn.dataset.a===q[2];card.querySelectorAll('button').forEach(b=>{b.disabled=true;if(b.dataset.a===q[2])b.classList.add('correct')});if(good){btn.classList.add('correct');addPoint();}else btn.classList.add('wrong');card.querySelector('.mini-explain').innerHTML=good?'<span class="feedback-good">✓ Đúng.</span> Em đã vận dụng đúng quy tắc.':'<span class="feedback-bad">✗ Chưa đúng.</span> Đáp án đúng đã được đánh dấu. Hãy tự giải thích vì sao.';});});
  activityBody.querySelectorAll('.u1-ch-fill').forEach(card=>{const sec=U1_CHALLENGE_SECTIONS[Number(card.dataset.sec)],q=sec.qs[Number(card.dataset.q)],answer=Array.isArray(q[0])?q[1]:q[1];card.querySelector('.check-writing').onclick=()=>{if(card.dataset.done)return;card.dataset.done='1';const input=u1Norm(card.querySelector('.writing-input').value),target=u1Norm(answer);const good=input===target;const r=card.querySelector('.writing-result');r.className=`writing-result ${good?'good':'bad'}`;r.textContent=good?'✓ Chính xác!':'✗ Chưa đúng. Hãy xem đáp án rồi sửa lại.';card.querySelector('.sample-answer').classList.add('show');if(good)addPoint();};});
  nextActivity.textContent='Hoàn tất Unit 1 ✓';
}

/* ===== UNIT 1 LISTENING LAB ===== */
const U1_LISTENING_DIALOGUE = [
  {speaker:'Mrs Brown', type:'adult', initial:'B', text:'Good morning, everyone. Welcome to Green Hill School.'},
  {speaker:'Ben', type:'child', initial:'B', text:'Good morning, Mrs Brown. Is this our new classroom?'},
  {speaker:'Mrs Brown', type:'adult', initial:'B', text:'Yes, it is. Your classroom is on the second floor, next to the library.'},
  {speaker:'Mai', type:'child', initial:'M', text:'That is lovely. When do we have English?'},
  {speaker:'Mrs Brown', type:'adult', initial:'B', text:'You have English on Tuesday and Thursday. Mr Williams is your teacher.'},
  {speaker:'Ben', type:'child', initial:'B', text:'Great! Can we play badminton at break time?'},
  {speaker:'Mrs Brown', type:'adult', initial:'B', text:'Of course. The playground is behind the main building. Please be on time for your first lesson.'}
];
const U1_LISTENING_GAPS = [
  ['The classroom is on the ___ floor.', 'second'],
  ['The classroom is next to the ___.', 'library'],
  ['English is on Tuesday and ___.', 'Thursday'],
  ['The English teacher is Mr ___.', 'Williams'],
  ['The playground is behind the main ___.', 'building']
];
function u1ListeningVoice(preferredVoiceURI) {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  const british = voices.filter(voice => /^en[-_]GB/i.test(voice.lang));
  return voices.find(voice => voice.voiceURI === preferredVoiceURI) || british[0] || voices.find(voice => /^en/i.test(voice.lang)) || null;
}
function u1PopulateListeningVoices(select) {
  if (!select || !('speechSynthesis' in window)) return;
  const selected = select.value;
  const voices = window.speechSynthesis.getVoices();
  const british = voices.filter(voice => /^en[-_]GB/i.test(voice.lang));
  const available = british.length ? british : voices.filter(voice => /^en/i.test(voice.lang));
  select.innerHTML = '<option value="">Tự động chọn giọng UK</option>' + available.map(voice => `<option value="${u1Escape(voice.voiceURI)}">${u1Escape(voice.name)} (${u1Escape(voice.lang)})</option>`).join('');
  if ([...select.options].some(option => option.value === selected)) select.value = selected;
}
const U1_LISTENING_STATE = { runId: 0 };
function u1StopListening(status) {
  U1_LISTENING_STATE.runId += 1;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (status) status.textContent = 'Đã dừng bài nghe. Nhấn “Nghe từ đầu” để phát lại.';
}
function u1SpeakListeningDialogue({ speed, voiceURI, onStart, onDone, onUnavailable }) {
  if (!('speechSynthesis' in window)) { if (onUnavailable) onUnavailable(); return; }
  const runId = ++U1_LISTENING_STATE.runId;
  window.speechSynthesis.cancel();
  let index = 0;
  const voice = u1ListeningVoice(voiceURI);
  const playNext = () => {
    if (runId !== U1_LISTENING_STATE.runId) return;
    if (index >= U1_LISTENING_DIALOGUE.length) { if (onDone) onDone(); return; }
    const line = U1_LISTENING_DIALOGUE[index++];
    const utterance = new SpeechSynthesisUtterance(line.text);
    utterance.lang = voice?.lang || 'en-GB';
    utterance.rate = Number(speed) * (line.type === 'child' ? 1.04 : .96);
    utterance.pitch = line.type === 'child' ? 1.28 : .94;
    if (voice) utterance.voice = voice;
    if (onStart) onStart(line, index, U1_LISTENING_DIALOGUE.length);
    utterance.onend = () => { if (runId === U1_LISTENING_STATE.runId) setTimeout(playNext, 240); };
    utterance.onerror = () => { if (runId === U1_LISTENING_STATE.runId) setTimeout(playNext, 80); };
    window.speechSynthesis.speak(utterance);
  };
  playNext();
}
function u1DownloadListeningHTML() {
  const lines = U1_LISTENING_DIALOGUE.map(line => `<p><strong>${line.speaker}:</strong> ${line.text}</p>`).join('');
  const questions = U1_LISTENING_GAPS.map(([q], i) => `<p><label>${i + 1}. ${q}<br><input id="gap-${i}" autocomplete="off"></label></p>`).join('');
  const answers = JSON.stringify(U1_LISTENING_GAPS.map(([, a]) => a));
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Listening — Green Hill School</title><style>body{font:16px/1.55 Arial,sans-serif;max-width:760px;margin:32px auto;padding:0 20px;color:#20334f}button{background:#3959a9;color:#fff;border:0;border-radius:8px;padding:10px 14px;font-weight:bold;cursor:pointer}input{padding:8px;border:1px solid #b8c6da;border-radius:6px;width:min(280px,100%)}#script{display:none;background:#f4f7fc;padding:12px;border-radius:8px;margin-top:18px}.good{color:#117558}.bad{color:#b3473e}</style></head><body><h1>Listening: Welcome to Green Hill School</h1><p><b>Instructions:</b> Listen twice. Then complete the sentences. The transcript is hidden until you check your work.</p><button id="play">▶ Play UK dialogue</button> <button id="check">Check answers</button><span id="result"></span>${questions}<section id="script"><h2>Transcript</h2>${lines}</section><script>const dialogue=${JSON.stringify(U1_LISTENING_DIALOGUE)};const answers=${answers};function voice(type){const v=speechSynthesis.getVoices().filter(x=>/^en[-_]GB/i.test(x.lang));return v[0]}document.querySelector('#play').onclick=()=>{speechSynthesis.cancel();let i=0;function next(){if(i>=dialogue.length)return;const x=dialogue[i++],u=new SpeechSynthesisUtterance(x.text);u.lang='en-GB';u.rate=x.type==='child'?.93:.87;u.pitch=x.type==='child'?1.35:.95;u.voice=voice(x.type);u.onend=()=>setTimeout(next,220);speechSynthesis.speak(u)}next()};document.querySelector('#check').onclick=()=>{let score=0;answers.forEach((a,i)=>{const el=document.querySelector('#gap-'+i),ok=el.value.trim().toLowerCase()===a.toLowerCase();el.className=ok?'good':'bad';score+=ok});document.querySelector('#result').textContent=' '+score+'/'+answers.length;document.querySelector('#script').style.display='block'};<\/script></body></html>`;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([page], {type:'text/html;charset=utf-8'}));
  link.download = 'listening-green-hill-school.html';
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
}
function renderListening() {
  setHeader('BÀI NGHE • UK LISTENING','Welcome to Green Hill School','Nghe hội thoại nhiều nhân vật giọng Anh–Anh. Nhấn nghe 2 lần rồi điền từ vào chỗ trống.', '5 chỗ trống');
  const speakers = [...new Map(U1_LISTENING_DIALOGUE.map(line => [line.speaker, line])).values()];
  const speakerList = speakers.map(line => `<span class="speaker-chip"><span class="speaker-avatar ${line.type}">${line.initial}</span><span><b>${u1Escape(line.speaker)}</b><small>${line.type === 'child' ? 'Học sinh' : 'Người lớn'}</small></span></span>`).join('');
  const transcript = U1_LISTENING_DIALOGUE.map(line => `<div class="speaker-line"><span class="speaker-avatar ${line.type}">${line.initial}</span><div><b>${u1Escape(line.speaker)}</b><p>${u1Escape(line.text)}</p></div></div>`).join('');
  activityBody.innerHTML = `<div class="listening-lab"><div class="listening-toolbar"><div><h3>Listening 1 — New school tour</h3><p class="listening-status" id="u1-listen-status" role="status">Sẵn sàng nghe. Giọng UK sẽ được ưu tiên; nếu không có, trình duyệt dùng giọng tiếng Anh gần nhất.</p></div><div class="listening-actions"><button class="listen-play" type="button" id="u1-listen-play">▶ Nghe từ đầu</button><button class="listen-stop" type="button" id="u1-listen-stop" disabled>■ Dừng</button><button class="listen-script" type="button" id="u1-listen-script" aria-expanded="false">Hiện kịch bản</button><button class="listen-export" type="button" id="u1-listen-export">⇩ Tải bài HTML</button></div></div><div class="listen-controls"><label>Tốc độ đọc <select id="u1-listen-speed"><option value=".75">Chậm</option><option value=".9" selected>Chuẩn</option><option value="1.05">Nhanh</option></select></label><label>Giọng đọc <select id="u1-listen-voice"><option value="">Tự động chọn giọng UK</option></select></label></div><div class="listen-instructions"><b>Học sinh:</b> Nghe trước, không mở kịch bản. Sau khi làm xong, bấm kiểm tra để tự sửa.</div><div class="speaker-roster" aria-label="Danh sách người nói"><b>Người nói:</b>${speakerList}</div><div class="speaker-list" id="u1-listen-transcript" hidden>${transcript}</div><div class="u1-subtitle">Complete the sentences</div>${U1_LISTENING_GAPS.map(([question], i) => `<div class="cloze-row"><label for="u1-listen-gap-${i}">${i + 1}. ${u1Escape(question)}</label><input id="u1-listen-gap-${i}" autocomplete="off" aria-label="Answer ${i + 1}"></div>`).join('')}<div class="listen-answer-actions"><button class="listen-check" type="button" id="u1-listen-check">Kiểm tra đáp án</button><span class="listen-result" id="u1-listen-result" role="status"></span></div></div>${completion('Em đã hoàn thành bài nghe. Tải bản HTML để giao bài hoặc mở trực tiếp cho học sinh.')}`;
  const query = selector => activityBody.querySelector(selector);
  const status = query('#u1-listen-status');
  const play = query('#u1-listen-play');
  const stop = query('#u1-listen-stop');
  const speed = query('#u1-listen-speed');
  const voice = query('#u1-listen-voice');
  const transcriptElement = query('#u1-listen-transcript');
  const scriptButton = query('#u1-listen-script');
  const setPlaying = playing => { play.disabled = playing; stop.disabled = !playing; };
  const populateVoices = () => u1PopulateListeningVoices(voice);
  populateVoices();
  if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = populateVoices;
  play.onclick = () => {
    setPlaying(true);
    u1SpeakListeningDialogue({
      speed: speed.value,
      voiceURI: voice.value,
      onStart: (line, current, total) => { status.textContent = `Đang phát ${current}/${total}: ${line.speaker}.`; },
      onDone: () => { setPlaying(false); status.textContent = 'Đã phát xong. Em có thể nghe lại hoặc làm bài điền khuyết.'; },
      onUnavailable: () => { setPlaying(false); status.textContent = 'Trình duyệt này không hỗ trợ đọc văn bản. Hãy mở bằng Chrome hoặc Cốc Cốc hiện đại.'; }
    });
  };
  stop.onclick = () => { u1StopListening(status); setPlaying(false); };
  scriptButton.onclick = () => { transcriptElement.hidden = !transcriptElement.hidden; scriptButton.setAttribute('aria-expanded', String(!transcriptElement.hidden)); scriptButton.textContent = transcriptElement.hidden ? 'Hiện kịch bản' : 'Ẩn kịch bản'; };
  query('#u1-listen-export').onclick = u1DownloadListeningHTML;
  query('#u1-listen-check').onclick = () => {
    let score = 0;
    U1_LISTENING_GAPS.forEach(([, answer], i) => {
      const input = query(`#u1-listen-gap-${i}`);
      const good = u1Norm(input.value) === u1Norm(answer);
      input.classList.remove('good', 'bad'); input.classList.add(good ? 'good' : 'bad'); if (good) score++;
    });
    const result = query('#u1-listen-result');
    result.className = `listen-result ${score === U1_LISTENING_GAPS.length ? 'feedback-good' : 'feedback-bad'}`;
    result.textContent = score === U1_LISTENING_GAPS.length ? `✓ ${score}/${U1_LISTENING_GAPS.length} — Excellent listening!` : `${score}/${U1_LISTENING_GAPS.length}. Hãy nghe lại và sửa những ô màu đỏ.`;
  };
  nextActivity.textContent = 'Sang Đọc hiểu →';
}

/* ===== END UNIT 1 LISTENING LAB ===== */

const _u1OriginalRenderStep = renderStep;
renderStep = function(n){
  if(n===1){previewPanel.classList.add('show');currentQuestion=0;score=0;renderWarmUp();return;}
  previewPanel.classList.remove('show');
  if(n===2)renderVocabulary();
  if(n===3)renderGrammar();
  if(n===4)renderPractice();
  if(n===5)renderListening();
  if(n===6)renderReading();
  if(n===7)renderSpeaking();
  if(n===8)renderChallenge();
};
renderStep(1);
