// English Quest: load the lesson app first, then the text lookup tool.
// v4 forces browsers/GitHub Pages to fetch the newest lesson engine.
const lessonScript = document.createElement('script');
lessonScript.src = 'app.js?v=4';
lessonScript.onload = () => {
  const lookupScript = document.createElement('script');
  lookupScript.src = 'lookup.js?v=4';
  document.body.appendChild(lookupScript);
};
lessonScript.onerror = () => {
  console.error('English Quest: app.js could not be loaded.');
};
document.body.appendChild(lessonScript);
