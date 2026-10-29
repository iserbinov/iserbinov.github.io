// Rampart components. Plain DOM, no framework. Each component returns an element (and an API where it needs one).
// Components never contain colours or sizes: those live in rampart.css as component tokens.

let uid = 0;
export const id = (p = 'r') => `${p}-${++uid}`;

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const c of kids.flat(Infinity)) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}

const svg = (body, vb = '0 0 24 24') => `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
export const icon = {
  eye: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: svg('<path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
  error: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5"/><path d="M12 16.5h.01"/>'),
  warning: svg('<path d="M10.3 3.9 2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  info: svg('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><path d="M12 7.5h.01"/>'),
  success: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.8"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', '0 0 24 24').replace('stroke-width="1.8"', 'stroke-width="3"'),
  chevronDown: svg('<path d="m6 9 6 6 6-6"/>'),
  chevronRight: svg('<path d="m9 6 6 6-6 6"/>'),
  key: svg('<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 9.2-9.2"/><path d="m17 6 3 3"/><path d="m14.5 8.5 2.5 2.5"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
  lock: svg('<rect x="4" y="10.5" width="16" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>'),
  link: svg('<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  building: svg('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1"/>'),
  user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  sliders: svg('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
};
const iconEl = (name, cls) => h('span', { class: cls, html: icon[name], 'aria-hidden': 'true', style: 'display:inline-flex' });

// ---------- BrandMark ----------
// Three bars: a rampart seen from the side. Colours are brand tokens, so the mark follows the theme.
export function BrandMark({ name = 'Rampart', href } = {}) {
  const mark = `<svg class="r-brand__mark" viewBox="0 0 28 24" aria-hidden="true" focusable="false"><rect class="b1" x="8" y="0" width="20" height="6" rx="1.5"/><rect class="b2" x="4" y="9" width="20" height="6" rx="1.5"/><rect class="b3" x="0" y="18" width="20" height="6" rx="1.5"/></svg>`;
  return h(href ? 'a' : 'span', { class: 'r-brand', href }, h('span', { html: mark, style: 'display:contents' }), h('span', { class: 'r-brand__name' }, name));
}

// ---------- Button ----------
// variant: primary | secondary | ghost; size: l | m. Loading keeps width, sets aria-busy, blocks repeat submits.
export function Button({ label, variant = 'primary', size = 'l', type = 'button', block = false, iconLeft, onClick, disabled, state, attrs = {} }) {
  const cls = ['r-button', `r-button--${variant}`, size === 'm' && 'r-button--m', block && 'r-button--block', state && `is-${state}`].filter(Boolean).join(' ');
  const el = h('button', { class: cls, type, disabled, onClick, ...attrs },
    iconLeft && iconEl(iconLeft),
    h('span', { class: 'r-button__label' }, label),
    h('span', { class: 'r-button__spinner', 'aria-hidden': 'true' }));
  el.setLoading = (on, text) => {
    if (on) { el.setAttribute('aria-busy', 'true'); el.setAttribute('aria-disabled', 'true'); if (text) el.setAttribute('aria-label', text); }
    else { el.removeAttribute('aria-busy'); el.removeAttribute('aria-disabled'); el.removeAttribute('aria-label'); }
  };
  el.isLoading = () => el.getAttribute('aria-busy') === 'true';
  return el;
}

// ---------- Link ----------
export function Link({ label, href = '#', onClick, quiet = false, external = false, externalLabel, state }) {
  const el = h(onClick && href === '#' ? 'button' : 'a', {
    class: ['r-link', quiet && 'r-link--quiet', state && `is-${state}`].filter(Boolean).join(' '),
    href: onClick && href === '#' ? null : href, type: onClick && href === '#' ? 'button' : null,
    target: external ? '_blank' : null, rel: external ? 'noopener' : null,
  }, label, external && externalLabel ? h('span', { class: 'r-sr' }, `, ${externalLabel}`) : null);
  if (onClick) el.addEventListener('click', (e) => { e.preventDefault(); onClick(e); });
  return el;
}

// ---------- Field shell: label, control, hint, error ----------
function FieldShell({ label, labelFor, aside, control, hint, state }) {
  const hintId = id('hint'), errId = id('err'), noteId = id('note');
  const hintEl = h('p', { class: 'r-field__hint', id: hintId, hidden: !hint }, hint || '');
  const errEl = h('p', { class: 'r-field__error', id: errId, hidden: true });
  const noteEl = h('p', { class: 'r-field__note', id: noteId, hidden: true });
  const root = h('div', { class: ['r-field', state && `is-${state}`].filter(Boolean).join(' ') },
    h('div', { class: 'r-field__top' }, h('label', { class: 'r-field__label', for: labelFor }, label), aside),
    control, noteEl, errEl, hintEl);
  return { root, hintEl, errEl, noteEl, ids: { hintId, errId, noteId } };
}

const describe = (input, shell) => {
  const ids = [];
  if (!shell.noteEl.hidden) ids.push(shell.ids.noteId);
  if (!shell.errEl.hidden) ids.push(shell.ids.errId);
  if (!shell.hintEl.hidden) ids.push(shell.ids.hintId);
  if (ids.length) input.setAttribute('aria-describedby', ids.join(' ')); else input.removeAttribute('aria-describedby');
};
const fieldApi = (input, shell) => ({
  el: shell.root, input,
  get value() { return input.value; }, set value(v) { input.value = v; },
  setError(msg) {
    shell.errEl.replaceChildren();
    if (msg) { shell.errEl.append(iconEl('error'), h('span', {}, msg)); shell.errEl.hidden = false; shell.root.classList.add('is-invalid'); input.setAttribute('aria-invalid', 'true'); }
    else { shell.errEl.hidden = true; shell.root.classList.remove('is-invalid'); input.removeAttribute('aria-invalid'); }
    describe(input, shell);
  },
  setHint(content) { shell.hintEl.replaceChildren(...[].concat(content || [])); shell.hintEl.hidden = !content; describe(input, shell); },
  setNote(msg) { shell.noteEl.replaceChildren(); if (msg) shell.noteEl.append(iconEl('warning'), h('span', {}, msg)); shell.noteEl.hidden = !msg; describe(input, shell); },
  focus() { input.focus(); },
});

// ---------- TextField ----------
export function TextField({ label, name, type = 'text', value = '', placeholder, autocomplete, inputmode, hint, required = true, disabled, readonly, state, requiredLabel, autocapitalize, spellcheck }) {
  const inputId = id(name || 'f');
  const input = h('input', { class: 'r-field__input', id: inputId, name, type, value, placeholder, autocomplete, inputmode, disabled, readonly, required: required ? true : null, 'aria-required': required ? 'true' : null, autocapitalize, spellcheck });
  input.value = value;
  const shell = FieldShell({ label, labelFor: inputId, control: h('div', { class: 'r-field__control' }, input), hint, state });
  if (disabled) shell.root.classList.add('is-disabled');
  const api = fieldApi(input, shell);
  describe(input, shell);
  return api;
}

// ---------- PasswordField ----------
// mode "current": show/hide, Caps Lock note, paste allowed, no rules.
// mode "new": length counter against the minimum (NIST 800-63B: length over composition), no character-class rules.
export function PasswordField({ label, name = 'password', mode = 'current', min = 15, t, aside, value = '', state }) {
  const inputId = id(name);
  const input = h('input', { class: 'r-field__input', id: inputId, name, type: 'password', value, autocomplete: mode === 'new' ? 'new-password' : 'current-password', required: true, 'aria-required': 'true', spellcheck: 'false', autocapitalize: 'off', minlength: mode === 'new' ? min : null, maxlength: 128 });
  input.value = value;
  const toggle = h('button', { class: 'r-icon-button', type: 'button', 'aria-label': t('action.show-password'), 'aria-pressed': 'false', 'aria-controls': inputId, html: icon.eye });
  toggle.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.innerHTML = show ? icon.eyeOff : icon.eye;
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', t(show ? 'action.hide-password' : 'action.show-password'));
  });
  const count = mode === 'new' ? h('span', { class: 'r-field__count', 'aria-hidden': 'true' }) : null;
  const shell = FieldShell({ label, labelFor: inputId, aside: aside || count, control: h('div', { class: 'r-field__control' }, input, toggle), hint: mode === 'new' ? t('hint.password-rule', { n: min }) : null, state });
  const api = fieldApi(input, shell);
  const caps = (e) => { if (e.getModifierState) api.setNote(e.getModifierState('CapsLock') ? t('hint.caps-lock') : ''); };
  input.addEventListener('keydown', caps); input.addEventListener('keyup', caps);
  input.addEventListener('blur', () => api.setNote(''));
  if (count) {
    const update = () => {
      const n = [...input.value].length;
      count.textContent = t('hint.password-count', { count: n, n: min });
      count.classList.toggle('is-ok', n >= min);
    };
    input.addEventListener('input', update); update();
    api.toggle = toggle;
  }
  describe(input, shell);
  return api;
}

// ---------- CodeInput ----------
// One real input (autocomplete="one-time-code", paste and SMS autofill work), six cells drawn from its value.
export function CodeInput({ label, length = 6, onComplete, value = '', state }) {
  const inputId = id('code');
  const input = h('input', { class: 'r-code__input', id: inputId, name: 'code', inputmode: 'numeric', autocomplete: 'one-time-code', maxlength: length, pattern: '[0-9]*', required: true, 'aria-required': 'true' });
  input.value = value;
  const cells = Array.from({ length }, () => h('span', { class: 'r-code__cell', 'aria-hidden': 'true' }));
  const wrap = h('div', { class: 'r-code' }, cells, input);
  const draw = () => {
    const v = input.value;
    const focused = document.activeElement === input || state === 'focus';
    cells.forEach((c, i) => { c.textContent = v[i] || ''; c.classList.toggle('is-active', focused && i === Math.min(v.length, length - 1)); });
  };
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '').slice(0, length);
    draw(); api.setError('');
    if (input.value.length === length && onComplete) onComplete(input.value);
  });
  input.addEventListener('focus', draw); input.addEventListener('blur', draw);
  const shell = FieldShell({ label, labelFor: inputId, control: wrap, state });
  const api = fieldApi(input, shell);
  api.clear = () => { input.value = ''; draw(); };
  draw(); describe(input, shell);
  return api;
}

// ---------- Checkbox ----------
export function Checkbox({ label, name, checked = false, disabled }) {
  const input = h('input', { type: 'checkbox', name, checked, disabled });
  input.checked = checked;
  const el = h('label', { class: 'r-checkbox' }, input, h('span', { class: 'r-checkbox__box', html: icon.check }), h('span', { class: 'r-checkbox__text' }, label));
  return { el, input, get checked() { return input.checked; } };
}

// ---------- InlineAlert ----------
// tone: error | warning | info | success. Error and warning are announced (role=alert), others are polite.
export function InlineAlert({ tone = 'error', title, text, action }) {
  const el = h('div', { class: `r-alert r-alert--${tone}`, role: tone === 'error' || tone === 'warning' ? 'alert' : 'status', tabindex: '-1' },
    iconEl(tone, 'r-alert__icon'),
    h('div', { class: 'r-alert__body' }, title && h('p', { class: 'r-alert__title', style: 'margin:0' }, title), text && h('p', { style: 'margin:0' }, text), action && h('div', { class: 'r-alert__action' }, action)));
  return el;
}

// ---------- Divider ----------
export const Divider = (label) => label ? h('div', { class: 'r-divider', role: 'separator', 'aria-label': label }, h('span', { 'aria-hidden': 'true' }, label)) : h('hr', { class: 'r-divider r-divider--plain', style: 'border:0;margin:0' });

// ---------- Select (language and theme switchers share it) ----------
export function Select({ label, options, value, onChange, srLabel = true }) {
  const sid = id('sel');
  const select = h('select', { class: 'r-select', id: sid }, options.map(([v, text, lang]) => h('option', { value: v, lang }, text)));
  select.value = value;
  select.addEventListener('change', () => onChange(select.value));
  return h('div', { class: 'r-select-wrap' }, h('label', { for: sid, class: srLabel ? 'r-sr' : 'r-caption r-secondary', style: srLabel ? null : 'margin-right:8px' }, label), select, h('span', { html: icon.chevronDown, style: 'display:contents' }));
}

export const LanguageSwitcher = ({ t, lang, langs, onChange }) =>
  Select({ label: t('footer.language'), value: lang, onChange, options: langs.map((l) => [l.code, l.name, l.code]) });

export const ThemeSwitcher = ({ t, theme, onChange }) =>
  Select({ label: t('theme.label'), value: theme, onChange, options: ['auto', 'light', 'dark'].map((v) => [v, `${t('theme.label')}: ${t('theme.' + v).toLowerCase()}`]) });

// ---------- TenantOption ----------
export function TenantOption({ name, meta, onClick }) {
  const initials = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return h('li', {}, h('button', { class: 'r-tenant', type: 'button', onClick },
    h('span', { class: 'r-tenant__avatar', 'aria-hidden': 'true' }, initials),
    h('span', { class: 'r-tenant__body' }, h('span', { class: 'r-tenant__name' }, name), h('span', { class: 'r-tenant__meta' }, meta)),
    h('span', { html: icon.chevronRight, style: 'display:contents' })));
}

// ---------- AuthCard ----------
// Fixed slots: brand, status icon, head (title + subtitle), alert, body, actions, footer. Screens fill slots, never restyle them.
export function AuthCard({ brand, statusIcon, title, subtitle, alert, body, footer }) {
  const titleId = id('title');
  const head = h('div', { class: 'r-card__head', tabindex: '-1' },
    h('h1', { class: 'r-heading-l', id: titleId }, title),
    subtitle && h('p', { class: 'r-body-m r-secondary' }, subtitle));
  const alertSlot = h('div', { class: 'r-card__alert', 'aria-live': 'polite' }, alert || null);
  const card = h('section', { class: 'r-card', 'aria-labelledby': titleId },
    brand && h('div', { class: 'r-card__brand' }, brand),
    statusIcon && h('div', { class: `r-card__icon r-card__icon--${statusIcon.tone || 'neutral'}`, html: icon[statusIcon.name] }),
    head, alertSlot, body, footer);
  if (!alert) alertSlot.hidden = true;
  card.setAlert = (a) => { alertSlot.replaceChildren(...(a ? [a] : [])); alertSlot.hidden = !a; if (a) a.focus({ preventScroll: false }); };
  card.focusHead = () => head.focus();
  return card;
}

// ---------- AuthLayout ----------
export function AuthLayout({ panel, main }) {
  return h('div', { class: ['r-layout', panel && 'r-layout--split'].filter(Boolean).join(' ') },
    panel && h('aside', { class: 'r-layout__panel r-panel' }, panel),
    h('main', { class: 'r-layout__main', id: 'main' }, main));
}
