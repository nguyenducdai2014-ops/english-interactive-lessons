// English Quest — lesson loader
// Fix: app.js had a duplicated lesson-engine block. We keep the first complete
// block and ignore any accidental second copy before executing it.
(async () => {
  try {
    const response = await fetch('app.js?v=6', { cache: 'no-store' });
    if (!response.ok) throw new Error(`app.js HTTP ${response.status}`);

    let source = await response.text();

    // The current app.js contains the lesson engine twice. Both copies start
    // with the same top-level `const steps = ...` declaration. Executing both
    // copies causes duplicate-identifier errors and prevents the warm-up
    // questions from rendering. Keep only the first complete copy.
    const marker = 'const steps=';
    const first = source.indexOf(marker);
    const second = first >= 0 ? source.indexOf(marker, first + marker.length) : -1;

    if (first >= 0 && second >= 0) {
      source = source.slice(0, second);
      console.info('English Quest: removed duplicated lesson-engine block.');
    }

    const runLesson = new Function(source);
    runLesson();

    const lookupScript = document.createElement('script');
    lookupScript.src = 'lookup.js?v=6';
    lookupScript.onload = () => console.log('English Quest: lookup ready.');
    lookupScript.onerror = () => console.error('English Quest: lookup.js could not be loaded.');
    document.body.appendChild(lookupScript);
  } catch (error) {
    console.error('English Quest: lesson engine failed to start.', error);
    const body = document.querySelector('#activity-body');
    if (body) {
      body.innerHTML = '<div style="padding:18px;background:#fff2f0;border:1px solid #efb0a8;border-radius:12px;color:#9b4037;font-weight:700">Không thể tải phần Khởi động. Hãy tải lại trang.</div>';
    }
  }
})();
