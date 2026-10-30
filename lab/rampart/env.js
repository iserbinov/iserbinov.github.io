// Language and theme, shared with serbinov.com.
// Theme: same localStorage key 'theme' (auto | light | dark) and the same data-theme attribute as the site,
// so the prototype opens in the theme the visitor chose on the site, and switching here carries back.
// Language: own choice ('rampart-lang') → the site's choice ('lang', ru | en) → browser languages.
// The site has only ru and en, so de, zh and ar are kept only in 'rampart-lang'.
// Arabic is right-to-left: dir on <html> flips the layout, the CSS uses logical properties only.
import I18N from './i18n.js';

export const LANGS = ['ru', 'en', 'de', 'zh', 'ar'];
export const RTL = new Set(['ar']);
const RU_FAMILY = /^(ru|be|uk|kk|ky|uz|tg|tk|az|hy|sr|mk|bg)(-|$)/i;
const RU_REGION = /-(RU|BY|UA|KZ|KG|UZ|TJ|TM|AZ|AM|MD|RS|ME)$/i;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

export function detectLang(list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']) {
  for (const l of list) {
    if (RU_FAMILY.test(l) || RU_REGION.test(l)) return 'ru';
    if (/^de(-|$)/i.test(l)) return 'de';
    if (/^zh(-|$)/i.test(l)) return 'zh';
    if (/^ar(-|$)/i.test(l)) return 'ar';
    if (/^en(-|$)/i.test(l)) return 'en';
  }
  return 'en';
}

export function initialLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(q)) return q;
  const own = store.get('rampart-lang');
  if (LANGS.includes(own)) return own;
  const site = store.get('lang');
  if (site === 'ru' || site === 'en') return site;
  return detectLang();
}
export function saveLang(l) { store.set('rampart-lang', l); }

export function initialTheme() {
  const q = new URLSearchParams(location.search).get('theme');
  if (['auto', 'light', 'dark'].includes(q)) return q;
  const t = store.get('theme');
  return ['light', 'dark'].includes(t) ? t : 'auto';
}
export function applyTheme(t, persist = false) {
  const root = document.documentElement;
  if (t === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
  if (persist) store.set('theme', t);
  document.dispatchEvent(new CustomEvent('themechange'));
}

export function translator(lang) {
  const dict = I18N[lang] || I18N.en;
  const product = dict['product.name'];
  // Latin digits in Arabic: codes in authenticator apps are 0–9, counters next to them should match
  const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-u-nu-latn' : lang);
  // In right-to-left text an inserted email or name is isolated (U+2068…U+2069), so its @ and dots keep their order
  const iso = RTL.has(lang) ? (v) => `\u2068${v}\u2069` : (v) => v;
  return (key, vars = {}) => {
    let s = dict[key] ?? I18N.en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, k) => k === 'product' && vars.product == null ? product : vars[k] == null ? `{${k}}` : typeof vars[k] === 'number' ? nf.format(vars[k]) : iso(vars[k]));
  };
}
export const langName = (l) => I18N[l]['lang.name'];
const HTML_LANG = { zh: 'zh-Hans' }; // Simplified Chinese; the tag also picks Simplified glyph shapes in CJK fonts
export function applyLang(l) { const r = document.documentElement; r.lang = HTML_LANG[l] || l; r.dir = RTL.has(l) ? 'rtl' : 'ltr'; }

// Another tab (the site or the kit) changed theme or language
export function onExternalChange(cb) {
  window.addEventListener('storage', (e) => { if (['theme', 'lang', 'rampart-lang'].includes(e.key)) cb(e.key); });
}
