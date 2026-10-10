/* Увеличение иллюстраций в кейсах: тап по картинке открывает её крупно в <dialog> */
(function(){
  const imgs=document.querySelectorAll('.cfig img');
  if(!imgs.length||!window.HTMLDialogElement)return;

  const dlg=document.createElement('dialog');
  dlg.className='zoom';
  dlg.setAttribute('aria-label','Иллюстрация крупно');
  dlg.innerHTML='<button type="button" class="zoom-x">Закрыть</button><img alt="">';
  document.body.append(dlg);
  const big=dlg.querySelector('img');

  const open=img=>{
    big.src=img.currentSrc||img.src;
    big.alt=img.alt;
    dlg.showModal();
  };

  /* закрытие тапом, Esc и кнопкой; фокус возвращается на картинку сам */
  dlg.addEventListener('click',()=>dlg.close());

  imgs.forEach(img=>{
    img.tabIndex=0;
    img.dataset.zoom='';
    img.setAttribute('role','button');
    img.setAttribute('aria-haspopup','dialog');
    img.setAttribute('aria-label','Открыть крупно: '+img.alt);
    img.addEventListener('click',()=>open(img));
    img.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();open(img)}
    });
  });
})();
