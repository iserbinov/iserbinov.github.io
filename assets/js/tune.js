/* Живые токены на первом экране: акцент, скругления и плотность пересчитывают всю страницу.
   Значения справа можно задать вручную. Состояние не сохраняется: перезагрузка возвращает значения по умолчанию. */
(function(){
  const box=document.getElementById('tune');
  if(!box)return;
  const root=document.documentElement;
  const $=s=>box.querySelector(s);
  const out=$('#tuneHueV'),color=$('#tuneColor');
  const field={rk:$('#tuneRkV'),dk:$('#tuneDkV')};
  const reset=document.getElementById('tuneX');
  const BASE={rk:8,dk:16};
  const RANGE={rk:[0,24],dk:[8,28]};
  const STEP=4;
  const S={hex:null,rk:8,dk:16};
  const fmt=n=>String(+n.toFixed(1)).replace('.',root.lang==='ru'?',':'.')+' px';
  const parse=t=>parseFloat(t.replace(/[px\s]/gi,'').replace(',','.'));

  const cx=document.createElement('canvas').getContext('2d',{willReadFrequently:true});
  cx.canvas.width=cx.canvas.height=1;
  const rgb=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='#000';cx.fillStyle=c;cx.fillRect(0,0,1,1);return cx.getImageData(0,0,1,1).data};
  const lum=([r,g,b])=>{const f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(r)+.7152*f(g)+.0722*f(b)};
  const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
  const probe=document.createElement('i');
  probe.style.cssText='position:absolute;visibility:hidden;color:var(--accent);background:var(--accent-fill)';
  document.body.append(probe);
  const token=n=>getComputedStyle(root).getPropertyValue(n).trim();
  const hex=c=>'#'+[...rgb(c)].slice(0,3).map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();

  /* цвет в oklch: нужен оттенок и насыщенность выбранного акцента */
  const oklch=h=>{
    const [r,g,b]=[...rgb(h)].slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});
    const l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b);
    const m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b);
    const s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
    const a=1.9779984951*l-2.428592205*m+.4505937099*s;
    const bb=.0259040371*l+.7827717662*m-.808675766*s;
    return {c:Math.hypot(a,bb),h:(Math.atan2(bb,a)*180/Math.PI+360)%360};
  };

  /* текстовый акцент обязан держать контраст AA на фоне и на поверхности: при необходимости сдвигаем яркость */
  const fit=()=>{
    root.style.setProperty('--dl',0);
    const bg=rgb(token('--bg')),sf=rgb(token('--surface'));
    for(let dl=0;dl<.4;dl+=.01){
      root.style.setProperty('--dl',dl.toFixed(2));
      const c=rgb(getComputedStyle(probe).color);
      if(Math.min(ratio(c,bg),ratio(c,sf))>=4.6)break;
    }
  };

  const setAccent=h=>{
    S.hex=h;
    const st=root.style;
    if(!h){for(const k of ['--accent-fill','--hue','--ct','--dl','--on-accent'])st.removeProperty(k);return}
    const o=oklch(h);
    st.setProperty('--accent-fill',h);
    st.setProperty('--hue',o.h.toFixed(2));
    st.setProperty('--ct',Math.min(o.c,.15).toFixed(4));
    const f=rgb(h);
    st.setProperty('--on-accent',ratio(f,[26,26,26])>=ratio(f,[255,255,255])?'#1A1A1A':'#FFFFFF');
    fit();
  };

  /* пресеты подсвечиваются, только если значение совпало с ними */
  const sync=()=>{
    const cur=S.hex||'#6CBAD3';
    box.querySelectorAll('input[name=ac]').forEach(r=>r.checked=!!S.hex?r.value.toLowerCase()===cur.toLowerCase():r===box.querySelector('input[name=ac]'));
    for(const n of ['rk','dk'])box.querySelectorAll(`input[name=${n}]`).forEach(r=>r.checked=+r.value===S[n]);
    out.textContent=hex(getComputedStyle(probe).backgroundColor);
    color.value=out.textContent.toLowerCase();
    for(const n of ['rk','dk'])if(document.activeElement!==field[n])field[n].value=fmt(S[n]);
  };

  const done=()=>{sync();document.dispatchEvent(new CustomEvent('themechange'))};

  const commit=()=>{
    for(const n of ['rk','dk'])S[n]===BASE[n]?root.style.removeProperty('--'+n):root.style.setProperty('--'+n,S[n]/BASE[n]);
    done();
  };
  /* значения кратны 4: ввод округляется, стрелки двигают на шаг */
  const snap=(n,v)=>Math.min(RANGE[n][1],Math.max(RANGE[n][0],Math.round(v/STEP)*STEP));

  box.addEventListener('input',e=>{
    const t=e.target;
    if(t.name==='ac')setAccent(t.value==='#6CBAD3'?null:t.value);
    else if(t===color)setAccent(t.value.toUpperCase()==='#6CBAD3'?null:t.value.toUpperCase());
    else if(t.name==='rk'||t.name==='dk')S[t.name]=+t.value;
    else return;
    commit();
  });
  for(const n of ['rk','dk']){
    const el=field[n];
    el.addEventListener('focus',()=>el.select());
    el.addEventListener('change',()=>{const v=parse(el.value);if(!isNaN(v)){S[n]=snap(n,v);commit()}el.value=fmt(S[n])});
    el.addEventListener('keydown',e=>{
      if(e.key==='Enter')el.blur();
      if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();S[n]=snap(n,S[n]+(e.key==='ArrowUp'?STEP:-STEP));commit();el.value=fmt(S[n]);el.select()}
    });
  }

  reset.addEventListener('click',()=>{
    S.rk=BASE.rk;S.dk=BASE.dk;
    root.style.removeProperty('--rk');root.style.removeProperty('--dk');
    setAccent(null);
    done();
  });
  /* смена темы меняет яркость фона: пересчитываем контраст акцента */
  document.addEventListener('themechange',()=>{if(S.hex)fit();sync()});
  sync();
})();
