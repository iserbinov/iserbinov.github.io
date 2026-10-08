
(function(){
  var t=document.getElementById('themeToggle'),root=document.documentElement,order=['auto','light','dark'],names={auto:'авто',light:'светлая',dark:'тёмная'},cur='auto';
  try{cur=localStorage.getItem('theme')||'auto'}catch(e){}
  function apply(){if(cur==='auto')root.removeAttribute('data-theme');else root.setAttribute('data-theme',cur);if(t)t.textContent='тема: '+names[cur]}
  if(t)t.addEventListener('click',function(){cur=order[(order.indexOf(cur)+1)%3];try{localStorage.setItem('theme',cur)}catch(e){}apply()});
  var sp=document.getElementById('specToggle');if(sp)sp.style.display='none';
  apply();
})();
