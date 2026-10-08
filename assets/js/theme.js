(function(){
  const t=document.getElementById('themeToggle');
  const root=document.documentElement;
  const order=['auto','light','dark'];
  const names={auto:'авто',light:'светлая',dark:'тёмная'};
  let cur='auto';
  try{cur=localStorage.getItem('theme')||'auto'}catch(e){}
  const apply=()=>{
    if(cur==='auto')root.removeAttribute('data-theme');
    else root.setAttribute('data-theme',cur);
    if(t)t.textContent='тема: '+names[cur];
    document.dispatchEvent(new CustomEvent('themechange'));
  };
  if(t)t.addEventListener('click',()=>{
    cur=order[(order.indexOf(cur)+1)%3];
    try{localStorage.setItem('theme',cur)}catch(e){}
    apply();
  });
  apply();
})();
