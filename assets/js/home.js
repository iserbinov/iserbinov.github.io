(function(){
  const NS='http://www.w3.org/2000/svg';
  const wrap=document.getElementById('wrap');
  const name=document.getElementById('name');
  const bl=document.getElementById('bl');
  const btn=document.getElementById('specToggle');
  // по умолчанию разметка только на первом экране, кнопка включает её на всей странице
  let full=btn.getAttribute('aria-pressed')==='true';
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('class','ov');
  svg.setAttribute('aria-hidden','true');
  wrap.appendChild(svg);
  const hex=c=>{
    const m=c.match(/[\d.]+/g);
    if(!m)return c;
    return '#'+m.slice(0,3).map(v=>(+v|0).toString(16).padStart(2,'0')).join('').toUpperCase();
  };

  function layoutRuler(){
    const g=document.getElementById('gantt');
    const tr=document.getElementById('gtrack');
    if(!g||!tr)return;
    tr.innerHTML='';
    if(innerWidth<=820)return;
    const a=+g.dataset.from;
    const b=+g.dataset.to;
    const W=tr.clientWidth;
    const X=y=>(y-a)/(b-a)*W;
    const T=tr.getBoundingClientRect().top;
    for(let y=a;y<=b;y++){
      const t=document.createElement('div');
      t.className='g-tick'+((y-a)%2?' minor':'');
      t.style.left=X(y)+'px';
      t.innerHTML='<span>'+y+'</span>';
      tr.appendChild(t);
    }
    g.querySelectorAll('.g-row').forEach(r=>{
      const lab=r.querySelector('.g-lab').getBoundingClientRect();
      const cy=lab.top-T+lab.height/2;
      const s0=X(+r.dataset.s);
      const e0=X(+r.dataset.e);
      const bar=document.createElement('i');
      bar.className='bar';
      bar.style.cssText=`left:${s0}px;width:${Math.max(e0-s0,6)}px;top:${cy-6}px`;
      const wrapRow=document.createElement('div');
      wrapRow.className='g-row '+r.className.replace('g-row','');
      wrapRow.style.display='contents';
      wrapRow.appendChild(bar);
      const ln=document.createElement('i');
      ln.className='g-line';
      ln.style.top=(lab.top-T)+'px';
      tr.appendChild(ln);
      tr.appendChild(wrapRow);
    });
  }

  function draw(){
    svg.innerHTML='';
    // скрываем svg на время замера, чтобы он не растягивал страницу
    svg.style.display='none';
    const S=wrap.getBoundingClientRect();
    const W=S.width;
    const H=wrap.scrollHeight;
    svg.style.display='';
    svg.setAttribute('width',W);
    svg.setAttribute('height',H);
    svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const small=W<700;
    const E=(t,a)=>{
      const e=document.createElementNS(NS,t);
      for(const k in a)e.setAttribute(k,a[k]);
      svg.appendChild(e);
      return e;
    };
    const R=el=>{
      const r=el.getBoundingClientRect();
      return{x:r.left-S.left,y:r.top-S.top,w:r.width,h:r.height,r:r.right-S.left,b:r.bottom-S.top};
    };
    const label=(x,y,txt,anchor,sw)=>{
      const off=sw?14:0;
      const t=E('text',{x:anchor==='start'?x+off:x,y,'text-anchor':anchor||'start','dominant-baseline':'middle'});
      t.textContent=txt;
      const b=t.getBBox();
      const bx=b.x-4-off;
      svg.insertBefore(E('rect',{class:'chipbg',x:bx,y:b.y-2,width:b.width+8+off,height:b.height+4}),t);
      if(sw){
        const s=E('rect',{class:'swc',x:bx+3,y:b.y,width:9,height:b.height});
        s.style.fill=sw;
      }
    };

    // имя
    const n=R(name);
    const b=R(bl);
    const ns=getComputedStyle(name);
    const yd=n.y-22;
    E('line',{x1:n.x,y1:yd,x2:n.r,y2:yd});
    E('line',{x1:n.x,y1:yd-5,x2:n.x,y2:yd+5});
    E('line',{x1:n.r,y1:yd-5,x2:n.r,y2:yd+5});
    label((n.x+n.r)/2,yd,Math.round(n.w)+' px','middle');
    E('path',{class:'d',d:`M${n.x} ${n.y}H${n.r}V${n.b}H${n.x}Z`});
    [[n.x,n.y],[n.r,n.y],[n.x,n.b],[n.r,n.b]].forEach(([x,y])=>E('rect',{class:'h',x:x-2.5,y:y-2.5,width:5,height:5}));
    label(n.x,n.b+16,W<560?`type/display · ${Math.round(parseFloat(ns.fontSize))}/${Math.round(parseFloat(ns.lineHeight))}`:`type/display · Geologica ${ns.fontWeight} · ${Math.round(parseFloat(ns.fontSize))}/${Math.round(parseFloat(ns.lineHeight))} · −4.5%`);
    if(small)return;

    // поле страницы
    const sh=document.getElementById('specimen');
    const sr=R(sh);
    const scs=getComputedStyle(sh);
    const sp=parseFloat(scs.paddingLeft);
    const st=parseFloat(scs.paddingTop);
    const rad=parseFloat(scs.borderTopLeftRadius);
    const ym=n.y+n.h*.3;
    E('line',{x1:sr.x,y1:ym,x2:sr.x+sp,y2:ym});
    label(sr.x+sp/2,ym,Math.round(sp)+'','middle');
    E('line',{class:'d',x1:sr.x,y1:b.y,x2:sr.r,y2:b.y});
    label(sr.r-8,b.y,'baseline','end');
    const xt=sr.r-sp/2;
    E('line',{x1:xt,y1:sr.y,x2:xt,y2:n.y});
    E('line',{x1:xt-5,y1:n.y,x2:xt+5,y2:n.y});
    E('line',{class:'d',x1:n.r,y1:n.y,x2:xt-5,y2:n.y});
    label(xt,sr.y+st/2,Math.round(st)+'','middle');
    E('path',{class:'d',d:`M${sr.x} ${sr.y+rad} A${rad} ${rad} 0 0 1 ${sr.x+rad} ${sr.y}`});
    label(sr.x+rad+8,sr.y+14,'radius/card · '+Math.round(rad),'start');

    // аннотации
    const intro=sh.closest('.frame');
    wrap.querySelectorAll('[data-a]').forEach(el=>{
      if(!full&&!intro.contains(el))return;
      const dt=el.closest('details');
      if(dt&&!dt.open&&!el.closest('summary'))return;
      const r=R(el);
      const a=el.dataset.a;
      const tok=el.dataset.tok;
      const s=getComputedStyle(el);
      if(!r.w)return;
      if(a==='type'){
        E('path',{class:'d',d:`M${r.x} ${r.y}H${r.r}V${r.b}H${r.x}Z`});
        label(r.x,r.y-10,`${tok} · ${Math.round(parseFloat(s.fontSize))}/${Math.round(parseFloat(s.lineHeight))} · ${s.fontWeight}`,'start',s.color);
      }
      if(a==='fill-text'){
        label(r.x,r.y-12,`${tok} ${hex(getComputedStyle(el.querySelector('dt')).color)} · accent ${hex(getComputedStyle(el.querySelector('.now')).color)}`,'start',getComputedStyle(el.querySelector('dt')).color);
      }
      if(a==='img'){
        E('path',{class:'d',d:`M${r.x} ${r.y}H${r.r}V${r.b}H${r.x}Z`});
        const rr=parseFloat(s.borderTopLeftRadius);
        const rtxt=rr>=r.w/2?'full':Math.round(rr);
        const txt=`${tok} · ${Math.round(r.w)}×${Math.round(r.h)} · r ${rtxt}${el.dataset.ratio?' · '+el.dataset.ratio:''}`;
        if(el.dataset.pos==='below')label(r.x,r.b+14,txt,'start');
        else label(r.r-8,r.y+14,txt,'end');
      }
      if(a==='fill'){
        E('path',{class:'d',d:`M${r.x} ${r.y}H${r.r}V${r.b}H${r.x}Z`});
        label(r.r-8,r.y+14,`${tok} ${hex(s.backgroundColor)} · r ${Math.round(parseFloat(s.borderTopLeftRadius))} ${el.dataset.ratio?' · '+el.dataset.ratio:''}`,'end',s.backgroundColor);
      }
      if(a==='gap'){
        const prev=el.previousElementSibling;
        if(!prev)return;
        const p=R(prev);
        const hd=el.querySelector('.head');
        const top=hd?R(hd).y:r.y;
        const gx=r.r-40;
        E('line',{x1:gx,y1:p.b,x2:gx,y2:top});
        E('line',{x1:gx-5,y1:p.b,x2:gx+5,y2:p.b});
        E('line',{x1:gx-5,y1:top,x2:gx+5,y2:top});
        label(gx-8,(p.b+top)/2,`${tok} · ${Math.round(top-p.b)}`,'end');
      }
    });
    // радиус и колонки индекса
    const sum=wrap.querySelector('.row summary');
    if(full&&sum){
      const cols=getComputedStyle(sum).gridTemplateColumns.split(' ').map(parseFloat);
      const r=R(sum);
      label(r.x,r.y+r.h-2,`grid ${cols.slice(0,4).map(Math.round).join(' / ')} · gap 16`,'start');
    }
  }
  const sizes=()=>document.querySelectorAll('.frame').forEach(f=>{
    const sh=f.querySelector('.sheet');
    const z=f.querySelector('.size');
    if(sh&&z){
      const r=sh.getBoundingClientRect();
      z.textContent=Math.round(r.width)+' × '+Math.round(r.height);
    }
  });
  let raf;
  const sch=()=>{
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      layoutRuler();
      draw();
      sizes();
    });
  };
  addEventListener('resize',sch);
  wrap.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',sch));
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sch);
  document.addEventListener('themechange',sch);
  sch();
  btn.addEventListener('click',()=>{
    full=!full;
    btn.setAttribute('aria-pressed',full);
    wrap.classList.toggle('spec-all',full);
    sch();
  });
})();
