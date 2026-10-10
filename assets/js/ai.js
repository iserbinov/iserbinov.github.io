(function(){
  const tools=document.getElementById('aiTools');
  const eq=document.getElementById('aiEq');
  if(!tools)return;
  const sheet=tools.closest('.sheet');
  const top=sheet&&sheet.querySelector('.ai-top');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  const items=[...tools.children];
  let played=false;

  /* ——— линейка: случайное поле без заданного направления ——— */
  let hov=false,bars=[],wave=null,raf=0,hold=0,t0=0,crestT=-1,crestC=0,crestA=0;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  function build(){
    if(!eq||reduce)return;
    const pitch=innerWidth<=480?6:8;
    const n=Math.max(8,Math.round((eq.clientWidth-2)/pitch)+1);
    if(bars.length===n)return;
    eq.textContent='';
    const f=document.createDocumentFragment();
    for(let i=0;i<n;i++){const b=document.createElement('i');b.style.left='calc((100% - 2px) * '+(i/(n-1))+')';f.appendChild(b)}
    eq.appendChild(f);
    bars=[...eq.children];
  }
  function roll(){
    // каждый запуск: своё направление, своя скорость, своя высота
    wave={
      k1:rnd(.05,.3)*(Math.random()<.5?-1:1), w1:rnd(.7,2.2), p1:rnd(0,6.3), a1:rnd(.15,.4),
      k2:rnd(.02,.5)*(Math.random()<.5?-1:1), w2:rnd(.4,3), p2:rnd(0,6.3), a2:rnd(.1,.35),
      base:rnd(.3,.5), jit:rnd(.05,.22)
    };
  }
  function frame(ts){
    raf=0;
    if(!wave||!bars.length)return;
    if(!t0)t0=ts;
    const t=(ts-t0)/1000;
    // гребень плавно догоняет курсор и так же плавно гаснет
    if(crestT>=0){
      crestC=crestA<.05?crestT:crestC+(crestT-crestC)*.3;
      crestA+=(1-crestA)*.2;
    }else crestA*=.88;
    for(let i=0;i<bars.length;i++){
      const v=wave.base
        +wave.a1*Math.sin(i*wave.k1+t*wave.w1+wave.p1)
        +wave.a2*Math.sin(i*wave.k2+t*wave.w2+wave.p2)
        +(Math.random()-.5)*wave.jit
        +.55*crestA*Math.exp(-Math.pow((i-crestC)/4,2));
      bars[i].style.transform='scaleY('+Math.max(.14,Math.min(1,v)).toFixed(3)+')';
    }
    raf=requestAnimationFrame(frame);
  }
  function waveOn(ms){
    if(!eq||reduce)return;
    build();
    clearTimeout(hold);
    roll();
    t0=0;
    eq.classList.add('go');
    if(!raf)raf=requestAnimationFrame(frame);
    if(ms)hold=setTimeout(()=>{if(!hov)waveOff()},ms);
  }
  function waveOff(){
    if(!eq)return;
    cancelAnimationFrame(raf);raf=0;wave=null;crestT=-1;crestA=0;
    eq.classList.remove('go');
    bars.forEach(b=>{b.style.transform=''});
  }
  /* ——— указатель: гребень идёт за курсором и за пальцем, тап запускает новую волну ——— */
  if(top&&!reduce){
    let down=false,moved=false;
    top.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hov=true});
    top.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')hov=false});
    const aim=e=>{
      if(!bars.length)return;
      const r=eq.getBoundingClientRect();
      crestT=Math.max(0,Math.min(bars.length-1,(e.clientX-r.left)/r.width*(bars.length-1)));
    };
    const release=ms=>{crestT=-1;clearTimeout(hold);hold=setTimeout(waveOff,ms)};
    top.addEventListener('pointerenter',e=>{
      if(e.pointerType!=='mouse')return;
      waveOn(0);aim(e);
    });
    top.addEventListener('pointerleave',e=>{
      if(e.pointerType==='mouse')release(700);
    });
    top.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse')return;
      down=true;moved=false;clearTimeout(hold);
    });
    top.addEventListener('pointermove',e=>{
      if(e.pointerType==='mouse'){aim(e);return}
      if(!down)return;
      if(!moved){moved=true;if(!raf)waveOn(0)}
      aim(e);
    });
    top.addEventListener('pointerup',e=>{
      if(e.pointerType==='mouse'||!down)return;
      down=false;
      if(moved)release(1500);else waveOn(2500);
    });
    top.addEventListener('pointercancel',()=>{down=false;if(raf)release(1000)});
  }

  /* ——— появление: ряд за рядом ——— */
  const later=[];
  const at=(ms,f)=>later.push(setTimeout(f,ms));
  function show(){items.forEach(el=>el.classList.add('on'))}
  if(reduce)show();
  else tools.classList.add('anim');
  function play(){
    if(played)return;
    played=true;
    if(reduce){show();return}
    waveOn(3000);
    items.forEach((el,i)=>at(200+i*85,()=>el.classList.add('on')));
  }

  build();
  let rb=0;
  addEventListener('resize',()=>{cancelAnimationFrame(rb);rb=requestAnimationFrame(()=>{bars=[];build()})});

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{
      if(es.some(e=>e.isIntersecting)){io.disconnect();play()}
    },{threshold:.2});
    io.observe(sheet||tools);
  }else play();
})();
