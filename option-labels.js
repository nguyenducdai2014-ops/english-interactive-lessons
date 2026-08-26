// Add A/B/C/D labels to every multiple-choice option.
(function(){
  const letters=['A','B','C','D'];
  const style=document.createElement('style');
  style.textContent='.opts button .option-letter{display:inline-block;min-width:24px;font-weight:900;color:#3559ad}.opts button{display:flex;align-items:flex-start;gap:4px}';
  document.head.appendChild(style);
  function label(){
    document.querySelectorAll('.opts').forEach(group=>{
      [...group.querySelectorAll(':scope > button')].forEach((button,i)=>{
        if(i>3 || button.querySelector('.option-letter')) return;
        const letter=document.createElement('span');
        letter.className='option-letter';
        letter.textContent=letters[i]+'.';
        button.prepend(letter);
      });
    });
  }
  label();
  new MutationObserver(label).observe(document.body,{childList:true,subtree:true});
})();
