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

  // меню шапки на узких экранах
  const bar=document.querySelector('.bar'),mb=bar&&bar.querySelector('.bar-menu');
  if(mb){
    const lbl=mb.querySelector('.bar-lbl');
    bar.classList.add('has-menu');
    const set=o=>{bar.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);lbl.textContent=o?mb.dataset.close:mb.dataset.open};
    mb.addEventListener('click',()=>set(!bar.classList.contains('open')));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&bar.classList.contains('open')){set(false);mb.focus()}});
    document.addEventListener('click',e=>{if(!bar.contains(e.target))set(false)});
    bar.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>set(false)));
    matchMedia('(min-width:821px)').addEventListener('change',e=>{if(e.matches)set(false)});
  }
})();
