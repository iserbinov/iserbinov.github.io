// Kit: every component in every state, rendered twice — in a light and a dark token scope.
// Same DOM, same classes: the theme comes only from [data-theme] on the wrapper.
import { h, Button, Link, TextField, PasswordField, CodeInput, Checkbox, InlineAlert, Divider, TenantOption, LanguageSwitcher, ThemeSwitcher, BrandMark } from '../components.js';
import { typo } from '../typo.js';
import { LANGS, initialLang, saveLang, initialTheme, applyTheme, translator, langName, onExternalChange, applyLang } from '../env.js';

const K = {
  ru: { title: 'Компоненты и токены', back: 'Открыть прототип', intro: 'Каждый компонент нарисован дважды: в светлой и тёмной области. Вариантов «dark» нет — компонент читает компонентные токены, те ссылаются на семантические, а тема подменяет только семантический слой.', themes: 'Темы', components: 'Компоненты', tokens: 'Токены', semantic: 'Семантические', component: 'Компонентные', primitive: 'Примитивы', dimension: 'Размеры', type: 'Типографика', contrast: 'Контраст', token: 'Токен', css: 'CSS', light: 'Светлая', dark: 'Тёмная', ref: 'Ссылка', value: 'Значение', pair: 'Пара', min: 'Минимум', ratio: 'Контраст', states: { default: 'обычное', hover: 'наведение', pressed: 'нажатие', focus: 'фокус', disabled: 'недоступно', loading: 'загрузка', filled: 'заполнено', error: 'ошибка', readonly: 'только чтение', checked: 'выбрано', empty: 'пусто', partial: 'ввод' }, sample: 'Съешь ещё этих мягких французских булок' },
  en: { title: 'Components and tokens', back: 'Open the prototype', intro: 'Each component is drawn twice, in a light and a dark scope. There are no “dark” variants: a component reads component tokens, they point to semantic tokens, and a theme swaps only the semantic layer.', themes: 'Themes', components: 'Components', tokens: 'Tokens', semantic: 'Semantic', component: 'Component', primitive: 'Primitives', dimension: 'Dimensions', type: 'Typography', contrast: 'Contrast', token: 'Token', css: 'CSS', light: 'Light', dark: 'Dark', ref: 'Reference', value: 'Value', pair: 'Pair', min: 'Minimum', ratio: 'Ratio', states: { default: 'default', hover: 'hover', pressed: 'pressed', focus: 'focus', disabled: 'disabled', loading: 'loading', filled: 'filled', error: 'error', readonly: 'read-only', checked: 'checked', empty: 'empty', partial: 'typing' }, sample: 'The quick brown fox jumps over the lazy dog' },
  de: { title: 'Komponenten und Tokens', back: 'Prototyp öffnen', intro: 'Jede Komponente erscheint zweimal, in einem hellen und einem dunklen Bereich. Es gibt keine „dunklen“ Varianten: Die Komponente liest Komponenten-Tokens, diese verweisen auf semantische Tokens, und ein Theme tauscht nur die semantische Ebene.', themes: 'Themes', components: 'Komponenten', tokens: 'Tokens', semantic: 'Semantisch', component: 'Komponente', primitive: 'Primitive', dimension: 'Maße', type: 'Typografie', contrast: 'Kontrast', token: 'Token', css: 'CSS', light: 'Hell', dark: 'Dunkel', ref: 'Verweis', value: 'Wert', pair: 'Paar', min: 'Minimum', ratio: 'Verhältnis', states: { default: 'Standard', hover: 'Hover', pressed: 'gedrückt', focus: 'Fokus', disabled: 'deaktiviert', loading: 'lädt', filled: 'ausgefüllt', error: 'Fehler', readonly: 'schreibgeschützt', checked: 'aktiv', empty: 'leer', partial: 'Eingabe' }, sample: 'Zwölf Boxkämpfer jagen Viktor quer über den großen Sylter Deich' },
  zh: { title: '组件与令牌', back: '打开原型', intro: '每个组件都绘制两次：浅色区域和深色区域各一次。没有“深色”变体：组件读取组件令牌，组件令牌引用语义令牌，切换主题只替换语义层。', themes: '主题', components: '组件', tokens: '令牌', semantic: '语义', component: '组件级', primitive: '基础值', dimension: '尺寸', type: '字体排印', contrast: '对比度', token: '令牌', css: 'CSS', light: '浅色', dark: '深色', ref: '引用', value: '值', pair: '组合', min: '最低', ratio: '对比度', states: { default: '默认', hover: '悬停', pressed: '按下', focus: '聚焦', disabled: '禁用', loading: '加载中', filled: '已填写', error: '错误', readonly: '只读', checked: '已选中', empty: '空', partial: '输入中' }, sample: '一个控制台，守护公司所有办公室和设备' },
  ar: { title: 'المكوّنات والرموز', back: 'فتح النموذج الأولي', intro: 'يظهر كل مكوّن مرتين: في منطقة فاتحة وأخرى داكنة. لا توجد نسخ «داكنة»: يقرأ المكوّن رموز المكوّنات، وهي تشير إلى الرموز الدلالية، والمظهر يبدّل الطبقة الدلالية فقط.', themes: 'المظاهر', components: 'المكوّنات', tokens: 'الرموز', semantic: 'دلالية', component: 'رموز المكوّنات', primitive: 'القيم الأساسية', dimension: 'المقاسات', type: 'الطباعة', contrast: 'التباين', token: 'الرمز', css: 'CSS', light: 'فاتح', dark: 'داكن', ref: 'المرجع', value: 'القيمة', pair: 'الزوج', min: 'الحد الأدنى', ratio: 'النسبة', states: { default: 'عادي', hover: 'تمرير', pressed: 'ضغط', focus: 'تركيز', disabled: 'معطّل', loading: 'تحميل', filled: 'معبّأ', error: 'خطأ', readonly: 'للقراءة فقط', checked: 'محدّد', empty: 'فارغ', partial: 'إدخال' }, sample: 'وحدة تحكم أمنية واحدة لكل مكاتب الشركة وأجهزتها' }
};

// Kit copy goes through the same typograph as the prototype strings
const typoDeep = (o, l) => typeof o === 'string' ? typo(o, l) : Object.fromEntries(Object.entries(o).map(([key, v]) => [key, typoDeep(v, l)]));
for (const l of Object.keys(K)) K[l] = typoDeep(K[l], l);
let lang = initialLang(), theme = initialTheme(), t = translator(lang), k = K[lang];
const root = document.getElementById('kit');
const tokens = await (await fetch('tokens.json')).json();
const contrast = await (await fetch('contrast.json')).json();
const css = (p) => '--r-' + p.replace(/\./g, '-');

const cell = (state, el) => h('div', { class: 'k-cell' }, el, h('p', { class: 'k-state' }, k.states[state] || state));
const pair = (build) => h('div', { class: 'k-pair' }, ['light', 'dark'].map((th) => h('div', { class: 'k-pane', 'data-theme': th }, h('p', { class: 'k-pane__label' }, k[th]), build(th))));

const demos = {
  Button: () => h('div', { style: 'display:flex;flex-direction:column;gap:var(--r-space-4)' }, ['primary', 'secondary', 'ghost'].map((v) => h('div', { class: 'k-row' },
    ['default', 'hover', 'pressed', 'focus', 'disabled', 'loading'].map((s) => {
      const b = Button({ label: t('action.sign-in'), variant: v, size: 'm', state: ['hover', 'pressed', 'focus'].includes(s) ? s : null, disabled: s === 'disabled', attrs: { tabindex: '-1' } });
      if (s === 'loading') b.setLoading(true, t('a11y.loading'));
      return cell(s, b);
    })))),
  TextField: () => h('div', { class: 'k-grid' }, [
    ['default', {}], ['filled', { value: 'alex@northwind.example' }], ['hover', { state: 'hover' }], ['focus', { state: 'focus', value: 'alex@' }],
    ['error', { value: 'alex@', error: t('error.invalid-email') }], ['disabled', { disabled: true }], ['readonly', { readonly: true, value: 'alex@northwind.example' }],
  ].map(([s, o]) => { const f = TextField({ label: t('field.email'), placeholder: t('field.email-placeholder'), ...o }); f.input.tabIndex = -1; if (o.error) f.setError(o.error); return cell(s, f.el); })),
  PasswordField: () => h('div', { class: 'k-grid' }, [
    cell('default', PasswordField({ label: t('field.password'), t, aside: Link({ label: t('action.forgot'), href: '#' }) }).el),
    cell('Caps Lock', (() => { const f = PasswordField({ label: t('field.password'), t, value: 'rampart' }); f.setNote(t('hint.caps-lock')); return f.el; })()),
    cell('error', (() => { const f = PasswordField({ label: t('field.password-new'), mode: 'new', t, value: 'short-pass' }); f.setError(t('error.short-password', { n: 15 })); return f.el; })()),
    cell('new · ok', (() => { const f = PasswordField({ label: t('field.password-new'), mode: 'new', t, value: 'correct horse battery' }); f.input.dispatchEvent(new Event('input')); return f.el; })()),
  ]),
  CodeInput: () => h('div', { class: 'k-grid' }, [
    cell('empty', CodeInput({ label: t('field.code') }).el),
    cell('partial', CodeInput({ label: t('field.code'), value: '123', state: 'focus' }).el),
    cell('error', (() => { const f = CodeInput({ label: t('field.code'), value: '111111' }); f.setError(t('error.code')); return f.el; })()),
  ]),
  Checkbox: () => h('div', { class: 'k-row' }, cell('default', Checkbox({ label: t('action.remember') }).el), cell('checked', Checkbox({ label: t('action.remember'), checked: true }).el), cell('disabled', Checkbox({ label: t('action.remember'), disabled: true }).el)),
  Link: () => h('div', { class: 'k-row' }, cell('default', Link({ label: t('action.forgot'), href: '#' })), cell('hover', Link({ label: t('action.forgot'), href: '#', state: 'hover' }))),
  InlineAlert: () => h('div', { style: 'display:flex;flex-direction:column;gap:var(--r-space-3)' },
    InlineAlert({ tone: 'error', text: t('error.credentials') }), InlineAlert({ tone: 'warning', title: t('error.locked-title'), text: t('error.locked', { n: 15 }) }),
    InlineAlert({ tone: 'info', text: t('expired.text') }), InlineAlert({ tone: 'success', text: t('hint.password-ok') })),
  Divider: () => h('div', { style: 'display:flex;flex-direction:column;gap:var(--r-space-4)' }, Divider(t('divider.or')), Divider()),
  TenantOption: () => h('ul', { class: 'r-tenants' }, TenantOption({ name: 'Northwind Logistics', meta: t('tenant.devices', { n: 1240 }) })),
  'BrandMark · Switchers': () => h('div', { class: 'k-row', style: 'align-items:center' }, BrandMark(), LanguageSwitcher({ t, lang, langs: LANGS.map((c) => ({ code: c, name: langName(c) })), onChange: () => {} }), ThemeSwitcher({ t, theme, onChange: () => {} })),
};

const resolve = (v, th) => {
  const r = typeof v === 'string' && v.match(/^\{(.+)\}$/)?.[1];
  if (!r) return v;
  const walk = (o, p) => p.split('.').reduce((a, x) => (a == null ? a : a[x]), o);
  if (walk(tokens.primitive, r) !== undefined) return resolve(walk(tokens.primitive, r), th);
  if (tokens.semantic[th][r] !== undefined) return resolve(tokens.semantic[th][r], th);
  if (tokens.component[r] !== undefined) return resolve(tokens.component[r], th);
  if (tokens.dimension[r] !== undefined) return resolve(tokens.dimension[r], th);
  return v;
};
const sw = (v, th) => { const hex = resolve(v, th); return h('span', { class: 'k-sw' }, h('i', { style: `background:${hex}` }), h('code', {}, v.replace(/[{}]/g, '')), h('span', { class: 'r-secondary' }, hex)); };
const table = (head, rows) => h('div', { class: 'k-table-wrap', tabindex: '0', role: 'region', 'aria-label': head.join(' · ') }, h('table', { class: 'k-table' }, h('thead', {}, h('tr', {}, head.map((x) => h('th', { scope: 'col' }, x)))), h('tbody', {}, rows.map((r) => h('tr', {}, r.map((c) => h('td', {}, c)))))));

function render() {
  applyLang(lang);
  document.title = `Rampart · ${k.title}`;
  const sections = [
    ['components', k.components, Object.entries(demos).map(([name, build]) => h('div', { class: 'k-section', style: 'gap:var(--r-space-3)' }, h('h3', { class: 'r-heading-m', style: 'font-size:var(--r-font-size-16)' }, name), pair(build)))],
    ['semantic', k.semantic, table([k.token, k.css, k.light, k.dark], Object.keys(tokens.semantic.light).map((n) => [h('code', {}, n), h('code', {}, css(n)), sw(tokens.semantic.light[n], 'light'), sw(tokens.semantic.dark[n], 'dark')]))],
    ['component', k.component, table([k.token, k.css, k.ref, k.light, k.dark], Object.entries(tokens.component).map(([n, v]) => [h('code', {}, n), h('code', {}, css(n)), h('code', {}, v.replace(/[{}]/g, '')), sw(v, 'light'), sw(v, 'dark')]))],
    ['primitive', k.primitive, h('div', { style: 'display:flex;flex-direction:column;gap:var(--r-space-4)' }, Object.entries(tokens.primitive.color).filter(([, v]) => typeof v === 'object').map(([fam, steps]) => h('div', { class: 'k-scale' }, Object.entries(steps).map(([s, hex]) => h('div', {}, h('i', { style: `background:${hex}` }), h('code', {}, `${fam}.${s}`), hex)))))],
    ['dimension', k.dimension, table([k.token, k.css, k.ref, k.value], [...Object.entries(tokens.primitive.space).map(([n, v]) => [`space.${n}`, v, v]), ...Object.entries(tokens.primitive.radius).map(([n, v]) => [`radius.${n}`, v, v]), ...Object.entries(tokens.dimension).map(([n, v]) => [n, v, resolve(v, 'light')])].map(([n, v, r]) => [h('code', {}, n), h('code', {}, css(n)), h('code', {}, String(v).replace(/[{}]/g, '')), `${r}px`]))],
    ['type', k.type, h('div', { class: 'k-type' }, Object.entries(tokens.typography).map(([n, s]) => h('div', {}, h('code', { class: 'k-code r-secondary' }, `${n} · ${resolve(s.size)}/${resolve(s.lineHeight)} · ${resolve(s.weight)}`), h('p', { style: `margin:0;font:var(${css('type.' + n)})` }, k.sample))))],
    ['contrast', k.contrast, table([k.light + ' / ' + k.dark, k.pair, k.min, k.ratio], contrast.map((r) => [k[r.theme], h('code', {}, `${r.fg} / ${r.bg}`), `${r.min}:1`, h('span', { class: r.ok ? 'k-ok' : 'k-bad' }, `${r.ratio.toFixed(2)}:1 ${r.ok ? '✓' : '✗'}`)]))],
  ];
  root.replaceChildren(h('main', { class: 'k' },
    h('header', { class: 'k-head' }, BrandMark({ name: 'Rampart', href: '../' }), h('div', { class: 'k-head__tools' },
      h('a', { class: 'r-link', href: '../' }, k.back),
      LanguageSwitcher({ t, lang, langs: LANGS.map((c) => ({ code: c, name: langName(c) })), onChange: (l) => { lang = l; saveLang(l); t = translator(l); k = K[l]; render(); } }),
      ThemeSwitcher({ t, theme, onChange: (v) => { theme = v; applyTheme(v, true); } }))),
    h('div', { class: 'k-intro' }, h('h1', { class: 'r-heading-l' }, k.title), h('p', { class: 'r-body-m r-secondary' }, k.intro),
      h('nav', { class: 'k-nav', 'aria-label': k.title }, sections.map(([id, title]) => h('a', { class: 'r-link', href: `#${id}` }, title)))),
    sections.map(([id, title, body]) => h('section', { class: 'k-section', id, 'aria-labelledby': `${id}-h` }, h('h2', { id: `${id}-h` }, title), body))));
  // Previews are pictures of states, not working controls: keep them out of the tab order
  root.querySelectorAll('.k-pair').forEach((p) => p.setAttribute('inert', ''));
}

onExternalChange((key) => { if (key === 'theme') { theme = initialTheme(); applyTheme(theme); } else { lang = initialLang(); t = translator(lang); k = K[lang]; } render(); });
applyTheme(theme);
render();
