// English Quest: load the lesson engine safely, then the text lookup tool.
// v5: repair duplicate const declarations in app.js before executing it.
(async () => {
  try {
    const response = await fetch('app.js?v=5', { cache: 'no-store' });
    if (!response.ok) throw new Error(`app.js HTTP ${response.status}`);

    let source = await response.text();

    // app.js currently contains two copies of these data declarations.
    // Converting both to var makes the declarations legal in one scope;
    // the second copy has the same data and safely replaces the first.
    source = source
      .replace(/\bconst challengeMCQ\s*=/g, 'var challengeMCQ =')
      .replace(/\bconst challengeWriting\s*=/g, 'var challengeWriting =');

    const runLesson = new Function(source);
    runLesson();

    const lookupScript = document.createElement('script');
    lookupScript.src = 'lookup.js?v=5';
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
