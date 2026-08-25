// English Quest — stable lesson loader
// The lesson file has a duplicated challenge section. Remove the whole
// second challenge section before compiling the lesson engine.
(async () => {
  const body = document.querySelector('#activity-body');
  try {
    const response = await fetch('app.js?v=8', { cache: 'no-store' });
    if (!response.ok) throw new Error(`app.js HTTP ${response.status}`);

    let source = await response.text();

    const challengeMarker = 'const challengeMCQ=[';
    const renderStepMarker = 'function renderStep(n)';
    const firstChallenge = source.indexOf(challengeMarker);
    const secondChallenge = firstChallenge >= 0
      ? source.indexOf(challengeMarker, firstChallenge + challengeMarker.length)
      : -1;

    if (firstChallenge >= 0 && secondChallenge >= 0) {
      const secondRenderStep = source.indexOf(renderStepMarker, secondChallenge);
      if (secondRenderStep >= 0) {
        // Keep the first complete challenge section and first renderStep.
        // Remove only the accidental second challenge section/functions.
        source = source.slice(0, secondChallenge) + source.slice(secondRenderStep);
        console.info('English Quest: removed duplicate challenge block.');
      }
    }

    const runLesson = new Function(source);
    runLesson();

    const lookupScript = document.createElement('script');
    lookupScript.src = 'lookup.js?v=8';
    lookupScript.onload = () => console.log('English Quest: lookup ready.');
    lookupScript.onerror = () => console.warn('English Quest: lookup.js could not be loaded.');
    document.body.appendChild(lookupScript);
  } catch (error) {
    console.error('English Quest: lesson engine failed to start.', error);
    if (body) {
      body.innerHTML = `<div style="padding:18px;background:#fff2f0;border:1px solid #efb0a8;border-radius:12px;color:#9b4037;font-weight:700">Không thể tải phần Khởi động: ${String(error.message || error)}</div>`;
    }
  }
})();
