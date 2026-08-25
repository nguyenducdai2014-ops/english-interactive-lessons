// English Quest — lesson loader
// Fixes duplicated lesson-data declarations before the engine is executed.
(async () => {
  try {
    const response = await fetch('app.js?v=7', { cache: 'no-store' });
    if (!response.ok) throw new Error(`app.js HTTP ${response.status}`);

    let source = await response.text();

    // The current app.js accidentally contains a second copy of the
    // challengeMCQ declaration. That duplicate const causes a SyntaxError,
    // which stops the entire lesson engine before Warm-up can render.
    function removeDuplicateConstArray(text, name) {
      const marker = `const ${name}=[`;
      const first = text.indexOf(marker);
      if (first < 0) return text;

      const second = text.indexOf(marker, first + marker.length);
      if (second < 0) return text;

      const end = text.indexOf('];', second);
      if (end < 0) return text;

      console.info(`English Quest: removed duplicated ${name} declaration.`);
      return text.slice(0, second) + text.slice(end + 2);
    }

    source = removeDuplicateConstArray(source, 'challengeMCQ');
    source = removeDuplicateConstArray(source, 'challengeWriting');

    const runLesson = new Function(source);
    runLesson();

    const lookupScript = document.createElement('script');
    lookupScript.src = 'lookup.js?v=7';
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
