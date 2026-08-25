(() => {
  'use strict';

  // ==============================
  // English Quest - Text Lookup
  // ==============================
  // Bôi đen chữ để xem: từ loại, IPA, nghĩa tiếng Việt và nghe UK English.
  // Từ đơn: từ loại + IPA + nghĩa.
  // Phrasal verb: nhận diện cả cụm + nghĩa.
  // Cụm từ / câu: chỉ hiển thị bản dịch tiếng Việt.

  const style = document.createElement('style');
  style.textContent = `
    #text-lookup{
      position:fixed; z-index:99999; width:min(390px,calc(100vw - 24px));
      background:#fff; border:1px solid #dfe6f0; border-radius:16px;
      box-shadow:0 16px 45px rgba(36,54,83,.18); padding:15px;
      color:#293b5c; font-family:var(--body-font,Arial,sans-serif)
    }
    #text-lookup[hidden]{display:none}
    .lookup-top{display:flex;justify-content:space-between;gap:12px}
    .lookup-word{font:800 22px/1.2 var(--display-font,Georgia,serif);margin:0;word-break:break-word}
    .lookup-meta{color:#74839a;font-size:12px;margin-top:4px}
    .lookup-close{border:0;background:#f1f4f8;border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:18px;line-height:1}
    .lookup-meaning{margin-top:11px;padding-top:11px;border-top:1px solid #edf0f5;font-size:14px;line-height:1.5}
    .lookup-label{color:#8b98aa;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase}
    .lookup-actions{display:flex;gap:8px;margin-top:12px}
    .lookup-speak{border:0;border-radius:9px;background:#3959a9;color:#fff;padding:8px 11px;cursor:pointer;font:800 12px var(--body-font,Arial,sans-serif)}
    .lookup-note{color:#8b98aa;font-size:11px;margin-top:9px}
    .lookup-vn{font-size:16px;font-weight:700;color:#243653}
  `;
  document.head.appendChild(style);

  const box = document.createElement('aside');
  box.id = 'text-lookup';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Tra từ và dịch nghĩa');
  document.body.appendChild(box);

  // Từ vựng Unit 1 + các cụm thường gặp.
  // Các key có khoảng trắng phải đặt trong dấu nháy để JavaScript hợp lệ.
  const local = {
    school: ['noun', '/skuːl/', 'trường học'],
    classroom: ['noun', '/ˈklɑːs.ruːm/', 'phòng học, lớp học'],
    classmate: ['noun', '/ˈklɑːs.meɪt/', 'bạn cùng lớp'],
    student: ['noun', '/ˈstjuː.dənt/', 'học sinh'],
    teacher: ['noun', '/ˈtiː.tʃər/', 'giáo viên'],
    lesson: ['noun', '/ˈles.ən/', 'bài học'],
    subject: ['noun', '/ˈsʌb.dʒɪkt/', 'môn học'],
    book: ['noun', '/bʊk/', 'sách'],
    notebook: ['noun', '/ˈnəʊ.bʊk/', 'vở, sổ tay'],
    friend: ['noun', '/frend/', 'bạn'],
    schoolbag: ['noun', '/ˈskuːl.bæɡ/', 'cặp sách'],
    pen: ['noun', '/pen/', 'bút mực'],
    pencil: ['noun', '/ˈpen.səl/', 'bút chì'],
    ruler: ['noun', '/ˈruː.lər/', 'thước kẻ'],
    desk: ['noun', '/desk/', 'bàn học'],
    chair: ['noun', '/tʃeər/', 'ghế'],
    library: ['noun', '/ˈlaɪ.brər.i/', 'thư viện'],
    playground: ['noun', '/ˈpleɪ.ɡraʊnd/', 'sân chơi'],
    uniform: ['noun', '/ˈjuː.nɪ.fɔːm/', 'đồng phục'],
    new: ['adjective', '/njuː/', 'mới'],
    good: ['adjective', '/ɡʊd/', 'tốt'],
    happy: ['adjective', '/ˈhæp.i/', 'vui, hạnh phúc'],
    learn: ['verb', '/lɜːn/', 'học'],
    study: ['verb', '/ˈstʌd.i/', 'học, học tập'],
    start: ['verb', '/stɑːt/', 'bắt đầu'],
    meet: ['verb', '/miːt/', 'gặp'],
    listen: ['verb', '/ˈlɪs.ən/', 'nghe'],
    getup: ['phrasal verb', '/ɡet ʌp/', 'thức dậy, đứng dậy'],
    wakeup: ['phrasal verb', '/weɪk ʌp/', 'thức dậy'],
    lookfor: ['phrasal verb', '/lʊk fɔːr/', 'tìm kiếm'],
    'listen to': ['phrasal verb', '/ˈlɪs.ən tuː/', 'lắng nghe'],
    'go to': ['phrasal verb', '/ɡəʊ tuː/', 'đi đến'],
    'look at': ['phrasal verb', '/lʊk æt/', 'nhìn vào'],
    'look after': ['phrasal verb', '/lʊk ˈɑːf.tər/', 'chăm sóc'],
    'turn on': ['phrasal verb', '/tɜːn ɒn/', 'bật'],
    'turn off': ['phrasal verb', '/tɜːn ɒf/', 'tắt'],
    'put on': ['phrasal verb', '/pʊt ɒn/', 'mặc vào, đeo vào'],
    'take off': ['phrasal verb', '/teɪk ɒf/', 'cởi ra'],
    'sit down': ['phrasal verb', '/sɪt daʊn/', 'ngồi xuống'],
    'stand up': ['phrasal verb', '/stænd ʌp/', 'đứng lên'],
    'pick up': ['phrasal verb', '/pɪk ʌp/', 'nhặt lên'],
    'give up': ['phrasal verb', '/ɡɪv ʌp/', 'từ bỏ'],
    'grow up': ['phrasal verb', '/ɡrəʊ ʌp/', 'lớn lên'],
    'hang out': ['phrasal verb', '/hæŋ aʊt/', 'đi chơi, tụ tập'],
    'write down': ['phrasal verb', '/raɪt daʊn/', 'ghi lại, viết xuống'],
    'talk about': ['phrasal verb', '/tɔːk əˈbaʊt/', 'nói về']
  };

  const phrasal = new Set([
    'get up','wake up','look for','listen to','go to','look at','look after',
    'turn on','turn off','put on','take off','sit down','stand up','pick up',
    'give up','grow up','hang out','write down','talk about'
  ]);

  const esc = (s) => String(s).replace(/[&<>\"]/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
  }[c]));

  const clean = (s) => String(s)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

  // Giữ khoảng trắng để nhận diện phrasal verb; chỉ bỏ dấu câu.
  const normalize = (s) => clean(s).toLowerCase()
    .replace(/^[^a-z]+|[^a-z]+$/g, '')
    .replace(/[^a-z\s'-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const isWord = (s) => /^[A-Za-z][A-Za-z'-]*$/.test(s);

  function findLocal(text) {
    const n = normalize(text);
    if (local[n]) return local[n];
    const compact = n.replace(/\s+/g, '');
    return local[compact] || null;
  }

  function isPhrasal(text) {
    return phrasal.has(normalize(text));
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt hiện tại không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.82;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => /^en-GB$/i.test(v.lang)) || voices.find(v => /^en-GB/i.test(v.lang));
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  }

  function position(x, y) {
    // offsetWidth/Height cần có box đang hiển thị.
    const w = box.offsetWidth || 390;
    const h = box.offsetHeight || 180;
    box.style.left = Math.min(Math.max(12, x), window.innerWidth - w - 12) + 'px';
    box.style.top = Math.min(Math.max(12, y + 12), window.innerHeight - h - 12) + 'px';
  }

  function close() {
    box.hidden = true;
  }

  function bindButtons(text) {
    const closeBtn = box.querySelector('.lookup-close');
    const speakBtn = box.querySelector('.lookup-speak');
    if (closeBtn) closeBtn.onclick = close;
    if (speakBtn) speakBtn.onclick = () => speak(text);
  }

  function render(text, meta, vn, canSpeak = true) {
    box.innerHTML = `
      <div class="lookup-top">
        <div>
          <h3 class="lookup-word">${esc(text)}</h3>
          <div class="lookup-meta">${esc(meta)}</div>
        </div>
        <button class="lookup-close" type="button" aria-label="Đóng">×</button>
      </div>
      <div class="lookup-meaning">
        <div class="lookup-label">Nghĩa tiếng Việt</div>
        <div class="lookup-vn">${esc(vn)}</div>
      </div>
      ${canSpeak ? '<div class="lookup-actions"><button class="lookup-speak" type="button">🔊 Nghe tiếng Anh UK</button></div>' : ''}
    `;
    bindButtons(text);
  }

  async function remoteWord(text) {
    try {
      const response = await fetch(
        'https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(text),
        { cache: 'no-store' }
      );
      if (!response.ok) return null;
      const data = await response.json();
      const entry = data?.[0];
      const meaning = entry?.meanings?.[0];
      const phonetic = entry?.phonetic || entry?.phonetics?.find(x => x.text)?.text || '';
      return {
        pos: meaning?.partOfSpeech || 'English word',
        ipa: phonetic,
        def: meaning?.definitions?.[0]?.definition || ''
      };
    } catch {
      return null;
    }
  }

  async function remoteVi(text) {
    try {
      const response = await fetch(
        'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=en|vi',
        { cache: 'no-store' }
      );
      if (!response.ok) return '';
      const data = await response.json();
      return data?.responseData?.translatedText || '';
    } catch {
      return '';
    }
  }

  async function show(raw, x, y) {
    const text = clean(raw);
    if (!text || text.length > 180) return;

    box.hidden = false;
    box.innerHTML = `
      <div class="lookup-top">
        <div>
          <h3 class="lookup-word">${esc(text)}</h3>
          <div class="lookup-meta">Đang tra cứu…</div>
        </div>
        <button class="lookup-close" type="button" aria-label="Đóng">×</button>
      </div>
    `;
    bindButtons(text);
    position(x, y);

    const localInfo = findLocal(text);

    // 1. Từ/cụm có trong từ điển nội bộ: phản hồi ngay, không phụ thuộc API.
    if (localInfo) {
      render(
        text,
        `${localInfo[0]} · ${localInfo[1]}`,
        localInfo[2],
        true
      );
      position(x, y);
      return;
    }

    // 2. Phrasal verb: luôn ưu tiên dịch cả cụm.
    if (isPhrasal(text)) {
      const vn = await remoteVi(text);
      render(text, 'phrasal verb', vn || 'Chưa tìm thấy nghĩa tiếng Việt.', true);
      position(x, y);
      return;
    }

    // 3. Từ đơn: lấy từ loại + IPA + nghĩa tiếng Việt.
    if (isWord(text)) {
      const [info, vn] = await Promise.all([remoteWord(text), remoteVi(text)]);
      const meta = `${info?.pos || 'English word'}${info?.ipa ? ' · ' + info.ipa : ''}`;
      render(text, meta, vn || 'Chưa tìm thấy nghĩa tiếng Việt.', true);
      position(x, y);
      return;
    }

    // 4. Cụm từ / câu: chỉ dịch tiếng Việt.
    const vn = await remoteVi(text);
    render(text, 'Cụm từ / câu', vn || 'Chưa lấy được bản dịch.');
    position(x, y);
  }

  document.addEventListener('mouseup', (e) => {
    if (box.contains(e.target)) return;

    // Cho trình duyệt hoàn tất selection trước khi đọc getSelection().
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const text = selection.toString().trim();
      if (!text) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      show(text, rect.left, rect.bottom);
    }, 40);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', close);
})();
