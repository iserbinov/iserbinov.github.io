(function(){
  const t=document.getElementById('themeToggle');
  const root=document.documentElement;
  const order=['auto','light','dark'];
  const en=root.lang==='en';
  const names=en?{auto:'auto',light:'light',dark:'dark'}:{auto:'авто',light:'светлая',dark:'тёмная'};
  let cur='auto';
  try{cur=localStorage.getItem('theme')||'auto'}catch(e){}
  const apply=()=>{
    if(cur==='auto')root.removeAttribute('data-theme');
    else root.setAttribute('data-theme',cur);
    if(t)t.textContent=(en?'theme: ':'тема: ')+names[cur];
    document.dispatchEvent(new CustomEvent('themechange'));
  };
  if(t)t.addEventListener('click',()=>{
    cur=order[(order.indexOf(cur)+1)%3];
    try{localStorage.setItem('theme',cur)}catch(e){}
    apply();
  });
  apply();
  // ручной выбор языка запоминается и важнее автоопределения
  document.querySelectorAll('[data-setlang]').forEach(a=>a.addEventListener('click',()=>{
    try{localStorage.setItem('lang',a.dataset.setlang)}catch(e){}
  }));
})();
