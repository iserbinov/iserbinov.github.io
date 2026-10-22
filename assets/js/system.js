/* /system/: один раздел за раз, адрес вида /system/#color; на узком экране разделы открываются меню */
(function(){
  var secs=[].slice.call(document.querySelectorAll('.sx'));
  if(!secs.length)return;
  var top=document.querySelector('.sx-top');
  var btn=document.getElementById('sxCur');
  var links=[].slice.call(document.querySelectorAll('.sys-idx a'));
  document.documentElement.classList.add('sx-js');
  function menu(open){
    if(!top||!btn)return;
    top.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    if(open){var c=top.querySelector('.sys-idx a[aria-current]');if(c)c.focus();}
  }
  function show(id,scroll){
    var n=0;
    secs.forEach(function(s,i){var on=s.id===id;s.hidden=!on;if(on)n=i+1;});
    if(!n){n=1;secs[0].hidden=false;}
    links.forEach(function(a,i){if(i===n-1)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    var cur=btn&&btn.querySelector('.sx-cur-n');
    if(cur)cur.textContent=n+' '+links[n-1].textContent.replace(/^\d+/,'');
    menu(false);
    offset();
    // переключатель языка ведёт на тот же раздел на другом языке
    document.querySelectorAll('[data-setlang]').forEach(function(a){a.setAttribute('href',a.getAttribute('href').split('#')[0]+'#'+secs[n-1].id);});
    if(scroll&&top){
      var sec=document.getElementById(secs[n-1].id);
      var stuck=parseFloat(getComputedStyle(top).top)||0;
      var y=window.pageYOffset+sec.getBoundingClientRect().top-(stuck+top.offsetHeight)-16;
      window.scrollTo({top:Math.max(0,y),behavior:'auto'});
    }
  }
  links.forEach(function(a){a.addEventListener('click',function(e){
    if(top&&top.classList.contains('open')&&a.getAttribute('aria-current')){e.preventDefault();menu(false);btn.focus();}
  });});
  if(btn)btn.addEventListener('click',function(){menu(!top.classList.contains('open'));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&top&&top.classList.contains('open')){menu(false);btn.focus();}});
  document.addEventListener('click',function(e){if(top&&top.classList.contains('open')&&!top.contains(e.target))menu(false);});
  window.addEventListener('hashchange',function(){show((location.hash||'').slice(1),true);});
  // отступ под липкой шапкой и вкладками: по нему встаёт и свой скролл, и родной переход браузера по якорю
  function offset(){
    if(!top)return;
    var stuck=parseFloat(getComputedStyle(top).top)||0;
    document.documentElement.style.setProperty('--sx-off',(stuck+top.offsetHeight+16)+'px');
  }
  offset();
  window.addEventListener('resize',offset);
  var h0=(location.hash||'').slice(1);
  show(h0,false);
  document.documentElement.classList.remove('sx-0','sx-h');
  // заход по адресу с разделом (в том числе после смены языка): раздел сразу встаёт под вкладками, без прыжка после загрузки
  if(h0)show(h0,true);
})();
