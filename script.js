// English Quest — lesson loader
// Loads the complete Unit 1 engine from a single source so the lesson can work
// on static hosting without a build step.
(async () => {
  const body = document.querySelector('#activity-body');
  try {
    const response = await fetch('app.js?v=14', { cache: 'no-store' });
    if (!response.ok) throw new Error(`app.js HTTP ${response.status}`);
    const source = await response.text();
    new Function(source)();

    const lookupScript = document.createElement('script');
    lookupScript.src = 'lookup.js?v=13';
    lookupScript.onerror = () => console.warn('Interactive English: lookup.js could not be loaded.');
    document.body.appendChild(lookupScript);
  } catch (error) {
    console.error('Interactive English: lesson engine failed to start.', error);
    if (body) body.innerHTML = `<div style="padding:18px;background:#fff2f0;border:1px solid #efb0a8;border-radius:12px;color:#9b4037;font-weight:700">Không thể tải bài học: ${String(error.message || error)}</div>`;
  }
})();
