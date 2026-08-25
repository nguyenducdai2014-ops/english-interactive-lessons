// English Quest: load the lesson app first, then the text lookup tool.
const lessonScript = document.createElement('script');
lessonScript.src = 'app.js?v=3';
lessonScript.onload = () => {
  const lookupScript = document.createElement('script');
  lookupScript.src = 'lookup.js?v=3';
  document.body.appendChild(lookupScript);
};
document.body.appendChild(lessonScript);
