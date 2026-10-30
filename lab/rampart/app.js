// Rampart sign-in prototype: screens composed only from components.js. Mock backend, no network.
import { h, Button, Link, TextField, PasswordField, CodeInput, Checkbox, InlineAlert, Divider, LanguageSwitcher, ThemeSwitcher, TenantOption, AuthCard, AuthLayout, BrandMark, icon } from './components.js';
import { LANGS, initialLang, saveLang, initialTheme, applyTheme, translator, langName, onExternalChange, applyLang } from './env.js';

const DEMO_PASSWORD = 'rampart-demo';
const DEMO_CODE = '123456';
const MIN_NEW = 15;          // NIST SP 800-63B-4: 15 characters when the password is the only factor
const MAX_ATTEMPTS = 5;
const COMMON = ['password', 'qwerty', '123456', 'rampart', 'admin', 'welcome', 'letmein', 'пароль', 'йцукен'];
const ORG = 'Northwind Logistics';
const TENANTS = [[ORG, 1240], ['Northwind Retail', 315], ['Polar Labs', 48]];
const SCREENS = ['login', 'mfa', 'tenant', 'forgot', 'sent', 'reset', 'link-expired', 'invite', 'signup', 'sso', 'locked', 'expired', 'success'];

const S = {
  lang: initialLang(), theme: initialTheme(),
  screen: SCREENS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'login',
  email: '', org: ORG, attempts: MAX_ATTEMPTS, offline: false, draft: {}, demoOpen: false,
};
let t = translator(S.lang);
let timer = null;
const app = document.getElementById('app');

// ---------- mock API ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(fn) {
  await sleep(500 + Math.random() * 400);
  if (S.offline) return { error: 'network' };
  return fn();
}
const local = (e) => e.split('@')[0].toLowerCase();
const API = {
  login: (email, password) => api(() => {
    if (local(email) === 'locked' || S.attempts <= 0) return { error: 'locked' };
    if (password !== DEMO_PASSWORD) { S.attempts -= 1; return S.attempts <= 0 ? { error: 'locked' } : { error: 'credentials', left: S.attempts }; }
    S.attempts = MAX_ATTEMPTS;
    if (local(email) === 'mfa') return { next: 'mfa' };
    if (local(email) === 'multi') return { next: 'tenant' };
    return { next: 'success' };
  }),
  code: (code) => api(() => (code === DEMO_CODE ? { next: local(S.email) === 'multi' ? 'tenant' : 'success' } : { error: 'code' })),
  send: () => api(() => ({ next: 'sent' })),
  save: () => api(() => ({ next: 'success' })),
};

// ---------- validation ----------
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const vEmail = (v) => (!v.trim() ? t('error.required-email') : EMAIL.test(v.trim()) ? '' : t('error.invalid-email'));
const vPassword = (v) => (v ? '' : t('error.required-password'));
const vNewPassword = (v) => {
  if (!v) return t('error.required-password');
  if ([...v].length < MIN_NEW) return t('error.short-password', { n: MIN_NEW });
  const low = v.toLowerCase().replace(/[\s\d!._-]/g, '');
  if (COMMON.some((c) => low === c || low.replace(/(.+)\1+/, '$1') === c)) return t('error.common-password');
  return '';
};
const vName = (v) => (v.trim() ? '' : t('error.required-name'));

// A form validates on submit; after the first submit a field re-checks itself as it is edited,
// so the error disappears the moment it is fixed but never appears while the user is still typing.
function Form({ fields, submit, onSubmit, extra = [] }) {
  const form = h('form', { class: 'r-card__form', novalidate: true });
  let tried = false;
  for (const [f, check] of fields) {
    f.input.addEventListener('input', () => { if (tried || f.input.getAttribute('aria-invalid')) f.setError(check(f.value)); });
    f.input.addEventListener('blur', () => { if (f.value && !tried) f.setError(check(f.value)); });
  }
  form.append(...fields.map(([f]) => f.el), ...extra, h('div', { class: 'r-card__actions' }, submit));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submit.isLoading()) return;
    tried = true;
    let first = null;
    for (const [f, check] of fields) { const err = check(f.value); f.setError(err); if (err && !first) first = f; }
    if (first) { first.focus(); return; }
    submit.setLoading(true, t('a11y.loading'));
    try { await onSubmit(); } finally { if (submit.isConnected) submit.setLoading(false); }
  });
  return form;
}

const networkAlert = (retry) => InlineAlert({ tone: 'error', text: t('error.network'), action: retry && Button({ label: t('action.retry'), variant: 'secondary', size: 'm', onClick: retry }) });

// ---------- screens ----------
// Each returns the slots of AuthCard. They never style anything themselves.
const screens = {
  login(card, { expired } = {}) {
    const email = TextField({ label: t('field.email'), name: 'email', type: 'email', autocomplete: 'username', inputmode: 'email', placeholder: t('field.email-placeholder'), value: S.draft.email ?? S.email, autocapitalize: 'off', spellcheck: 'false' });
    const password = PasswordField({ label: t('field.password'), t, value: S.draft.password ?? '', aside: Link({ label: t('action.forgot'), onClick: () => { S.email = email.value.trim(); go('forgot'); } }) });
    const remember = Checkbox({ label: t('action.remember'), name: 'remember', checked: !!S.draft.remember });
    const submit = Button({ label: t('action.sign-in'), type: 'submit', block: true });
    const form = Form({
      fields: [[email, vEmail], [password, vPassword]], submit, extra: [remember.el],
      onSubmit: async () => {
        S.email = email.value.trim();
        const r = await API.login(S.email, password.value);
        if (r.error === 'network') return card.setAlert(networkAlert(() => form.requestSubmit()));
        if (r.error === 'locked') return go('locked');
        if (r.error === 'credentials') {
          card.setAlert(InlineAlert({ tone: 'error', text: t('error.credentials'), action: r.left <= 2 ? h('span', { class: 'r-body-s' }, t('error.credentials-left', { n: r.left })) : null }));
          password.value = ''; return;
        }
        S.draft = {}; go(r.next);
      },
    });
    return {
      title: expired ? t('expired.title') : t('login.title'),
      subtitle: expired ? null : t('login.subtitle'),
      alert: expired ? InlineAlert({ tone: 'info', text: t('expired.text') }) : null,
      body: [form, Divider(t('divider.or')),
        Button({ label: t('action.sso'), variant: 'secondary', block: true, iconLeft: 'key', onClick: () => { S.email = email.value.trim(); go('sso'); } }),
        h('p', { class: 'r-body-s', style: 'margin:0;text-align:center' }, Link({ label: t('action.signup'), onClick: () => go('signup') }))],
    };
  },
  expired(card) { if (!S.email) S.email = `alex@${'northwind.example'}`; return screens.login(card, { expired: true }); },

  mfa(card) {
    let submitting = false;
    const code = CodeInput({ label: t('field.code'), onComplete: () => form.requestSubmit() });
    const submit = Button({ label: t('action.continue'), type: 'submit', block: true });
    const form = Form({
      fields: [[code, (v) => (v.length === 6 ? '' : t('error.code-length'))]], submit,
      onSubmit: async () => {
        if (submitting) return; submitting = true;
        const r = await API.code(code.value); submitting = false;
        if (r.error === 'network') return card.setAlert(networkAlert(() => form.requestSubmit()));
        if (r.error) { code.clear(); code.setError(t('error.code')); code.focus(); return; }
        go(r.next);
      },
    });
    return {
      statusIcon: { name: 'lock' }, title: t('mfa.title'), subtitle: t('mfa.subtitle', { email: S.email || 'mfa@northwind.example' }),
      body: [form, h('div', { class: 'r-card__row' }, Link({ label: t('action.use-another-way'), onClick: () => {} }), Link({ label: t('action.back-to-login'), onClick: () => go('login') }))],
      focus: () => code.focus(),
    };
  },

  tenant() {
    return {
      statusIcon: { name: 'building' }, title: t('tenant.title'), subtitle: t('tenant.subtitle', { email: S.email || 'multi@northwind.example' }),
      body: [h('ul', { class: 'r-tenants', 'aria-label': t('tenant.title') }, TENANTS.map(([name, n]) => TenantOption({ name, meta: t('tenant.devices', { n }), onClick: () => { S.org = name; go('success'); } }))),
        h('div', {}, Link({ label: t('action.sign-out'), onClick: () => go('login') }))],
    };
  },

  forgot(card) {
    const email = TextField({ label: t('field.email'), name: 'email', type: 'email', autocomplete: 'username', inputmode: 'email', placeholder: t('field.email-placeholder'), value: S.email, autocapitalize: 'off', spellcheck: 'false' });
    const submit = Button({ label: t('action.send-link'), type: 'submit', block: true });
    const form = Form({
      fields: [[email, vEmail]], submit,
      onSubmit: async () => {
        S.email = email.value.trim();
        const r = await API.send();
        if (r.error) return card.setAlert(networkAlert(() => form.requestSubmit()));
        go('sent');
      },
    });
    return { title: t('forgot.title'), subtitle: t('forgot.subtitle'), body: [form, h('div', {}, Link({ label: t('action.back-to-login'), onClick: () => go('login') }))] };
  },

  sent() {
    const email = S.email || 'alex@northwind.example';
    const status = h('p', { class: 'r-body-s r-secondary', 'aria-live': 'polite', style: 'margin:0' });
    const resend = Link({ label: t('action.resend'), onClick: () => { start(); } });
    const start = () => {
      let n = 30; clearInterval(timer);
      resend.hidden = true; status.hidden = false; status.textContent = t('sent.resend-in', { n });
      timer = setInterval(() => {
        n -= 1;
        if (n <= 0) { clearInterval(timer); status.hidden = true; resend.hidden = false; }
        else status.textContent = t('sent.resend-in', { n });
      }, 1000);
    };
    start();
    return {
      statusIcon: { name: 'mail' }, title: t('sent.title'), subtitle: t('sent.text', { email }),
      body: [h('div', {}, status, resend), Button({ label: t('action.back-to-login'), variant: 'secondary', block: true, onClick: () => go('login') })],
    };
  },

  reset(card) { return newPassword(card, { title: t('reset.title'), subtitle: t('reset.subtitle', { email: S.email || 'alex@northwind.example' }), action: t('action.save-password') }); },

  'link-expired'() {
    return {
      statusIcon: { name: 'link', tone: 'error' }, title: t('error.link-expired-title'), subtitle: t('error.link-expired'),
      body: [Button({ label: t('action.request-new-link'), block: true, onClick: () => go('forgot') }), h('div', {}, Link({ label: t('action.back-to-login'), onClick: () => go('login') }))],
    };
  },

  invite(card) {
    S.email = 'alex@northwind.example';
    return newPassword(card, {
      title: t('invite.title'), subtitle: t('invite.subtitle', { inviter: ({ ru: 'Анна Смирнова', ar: 'آنا سميرنوفا' })[S.lang] || 'Anna Smirnova', org: ORG }), action: t('action.activate'),
      before: [TextField({ label: t('field.email'), name: 'email', type: 'email', autocomplete: 'username', value: S.email, readonly: true, required: false })], withName: true,
    });
  },

  signup(card) {
    const name = TextField({ label: t('field.name'), name: 'name', autocomplete: 'name', value: S.draft.name ?? '' });
    const email = TextField({ label: t('field.email'), name: 'email', type: 'email', autocomplete: 'username', inputmode: 'email', placeholder: t('field.email-placeholder'), value: S.draft.email ?? '', autocapitalize: 'off', spellcheck: 'false' });
    const company = TextField({ label: t('field.company'), name: 'company', autocomplete: 'organization', value: S.draft.company ?? '', required: false });
    const password = PasswordField({ label: t('field.password'), mode: 'new', min: MIN_NEW, t, value: S.draft.password ?? '' });
    const submit = Button({ label: t('action.create-account'), type: 'submit', block: true });
    const form = Form({
      fields: [[name, vName], [email, vEmail], [company, () => ''], [password, vNewPassword]], submit,
      extra: [h('p', { class: 'r-caption r-secondary', style: 'margin:0' }, t('hint.terms'))],
      onSubmit: async () => {
        S.email = email.value.trim(); S.org = company.value.trim() || ORG;
        const r = await API.save();
        if (r.error) return card.setAlert(networkAlert(() => form.requestSubmit()));
        S.draft = {}; go('success');
      },
    });
    return { title: t('signup.title'), subtitle: t('signup.subtitle'), body: [form, h('p', { class: 'r-body-s', style: 'margin:0;text-align:center' }, Link({ label: t('action.have-account'), onClick: () => go('login') }))] };
  },

  sso() {
    const domain = (S.email.split('@')[1] || 'northwind.example');
    const cont = Button({ label: t('action.continue'), block: true, onClick: () => go('success') });
    cont.setLoading(true, t('a11y.loading'));
    clearTimeout(timer); timer = setTimeout(() => cont.setLoading(false), 1500);
    return {
      statusIcon: { name: 'key' }, title: t('sso.title'), subtitle: t('sso.text', { domain }),
      body: [cont, h('div', {}, Link({ label: t('action.back-to-login'), onClick: () => go('login') }))],
    };
  },

  locked() {
    S.attempts = MAX_ATTEMPTS;
    return {
      statusIcon: { name: 'clock', tone: 'error' }, title: t('error.locked-title'), subtitle: t('error.locked', { n: 15 }),
      body: [Button({ label: t('action.forgot'), variant: 'secondary', block: true, onClick: () => go('forgot') }), h('div', {}, Link({ label: t('action.back-to-login'), onClick: () => go('login') }))],
    };
  },

  success() {
    return {
      statusIcon: { name: 'success', tone: 'success' }, title: t('success.title'), subtitle: t('success.text', { email: S.email || 'alex@northwind.example', org: S.org }),
      body: [Button({ label: t('action.sign-out'), variant: 'secondary', block: true, onClick: () => { S.org = ORG; go('login'); } })],
    };
  },
};

function newPassword(card, { title, subtitle, action, before = [], withName = false }) {
  const name = withName ? TextField({ label: t('field.name'), name: 'name', autocomplete: 'name', value: S.draft.name ?? '' }) : null;
  const password = PasswordField({ label: t('field.password-new'), name: 'new-password', mode: 'new', min: MIN_NEW, t, value: S.draft['new-password'] ?? '' });
  const submit = Button({ label: action, type: 'submit', block: true });
  const fields = [...(name ? [[name, vName]] : []), [password, vNewPassword]];
  const form = Form({
    fields, submit,
    onSubmit: async () => {
      const r = await API.save();
      if (r.error) return card.setAlert(networkAlert(() => form.requestSubmit()));
      S.draft = {}; go('success');
    },
  });
  form.prepend(...before.map((f) => f.el));
  return { title, subtitle, body: [form] };
}

// ---------- shell ----------
function footer() {
  return h('footer', { class: 'r-card__foot' },
    h('nav', { class: 'r-card__foot-links', 'aria-label': t('footer.help') },
      Link({ label: t('footer.help'), href: '#help', onClick: () => {} }), Link({ label: t('footer.privacy'), href: '#privacy', onClick: () => {} })),
    h('div', { class: 'r-card__foot-links' },
      LanguageSwitcher({ t, lang: S.lang, langs: LANGS.map((code) => ({ code, name: langName(code) })), onChange: setLang }),
      ThemeSwitcher({ t, theme: S.theme, onChange: setTheme })));
}

function panel() {
  return [
    BrandMark({ name: 'Rampart' }),
    h('div', { style: 'display:flex;flex-direction:column;gap:var(--r-space-8)' },
      h('p', { class: 'r-panel__title' }, t('product.tagline')),
      h('ul', { class: 'r-panel__list' }, ['product.point-1', 'product.point-2', 'product.point-3'].map((k) => h('li', {}, t(k))))),
    h('div', { class: 'r-panel__layers', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
  ];
}

function demoPanel() {
  const wrap = h('div', { class: 'r-demo' });
  const toggle = Button({ label: t('demo.title'), variant: 'secondary', size: 'm', iconLeft: 'sliders', attrs: { 'aria-expanded': String(S.demoOpen), 'aria-controls': 'r-demo-panel', class: 'r-button r-button--secondary r-button--m r-demo__toggle' } });
  const offline = Checkbox({ label: t('demo.offline'), name: 'offline', checked: S.offline });
  offline.input.addEventListener('change', () => { S.offline = offline.input.checked; });
  const box = h('div', { class: 'r-demo__panel', id: 'r-demo-panel', role: 'region', 'aria-label': t('demo.title'), hidden: !S.demoOpen },
    h('div', { class: 'r-demo__head' }, h('p', { class: 'r-heading-m' }, t('demo.title')),
      h('button', { class: 'r-icon-button', type: 'button', 'aria-label': t('demo.close'), html: icon.close, onClick: () => close(true) })),
    h('p', { class: 'r-body-s r-secondary' }, t('demo.hint')),
    h('p', { class: 'r-caption r-secondary', style: 'margin:0' }, t('demo.scenarios')),
    h('ul', { class: 'r-demo__list' }, SCREENS.filter((s) => s !== 'success').map((s) => h('li', {},
      h('a', { class: 'r-link r-link--quiet', href: `#${s}`, 'aria-current': s === S.screen ? 'page' : null, onClick: (e) => { e.preventDefault(); S.draft = {}; go(s); } }, t('scenario.' + s))))),
    offline.el,
    h('p', { style: 'margin:0' }, h('a', { class: 'r-link', href: './kit/' }, t('demo.kit'))));
  const close = (focusBack) => { S.demoOpen = false; box.hidden = true; toggle.setAttribute('aria-expanded', 'false'); if (focusBack) toggle.focus(); };
  toggle.addEventListener('click', () => { S.demoOpen = !S.demoOpen; box.hidden = !S.demoOpen; toggle.setAttribute('aria-expanded', String(S.demoOpen)); });
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  wrap.append(box, toggle);
  return wrap;
}

function saveDraft() {
  app.querySelectorAll('form input[name]').forEach((i) => { S.draft[i.name] = i.type === 'checkbox' ? i.checked : i.value; });
}

function render({ focus = true } = {}) {
  clearInterval(timer); clearTimeout(timer);
  applyLang(S.lang);
  let card;
  const slots = {};
  // AuthCard is built first with empty slots so screens can show alerts inside it
  const proxy = { setAlert: (a) => card.setAlert(a) };
  Object.assign(slots, screens[S.screen](proxy));
  card = AuthCard({ brand: BrandMark({ name: 'Rampart' }), statusIcon: slots.statusIcon, title: slots.title, subtitle: slots.subtitle, alert: slots.alert, body: slots.body, footer: footer() });
  card.classList.add('r-card--app');
  app.replaceChildren(AuthLayout({ panel: panel(), main: card }), demoPanel());
  document.title = `${slots.title} · Rampart`;
  if (focus) (slots.focus || card.focusHead)();
}

function go(screen) {
  S.draft = {};
  S.screen = screen;
  history.replaceState(null, '', `#${screen}`);
  render();
}
function setLang(l) { saveDraft(); S.lang = l; saveLang(l); t = translator(l); render({ focus: false }); app.querySelector('.r-card__foot select')?.focus(); }
function setTheme(v) { S.theme = v; applyTheme(v, true); }

window.addEventListener('hashchange', () => { const s = location.hash.slice(1); if (SCREENS.includes(s) && s !== S.screen) { S.screen = s; S.draft = {}; render(); } });
onExternalChange((key) => {
  if (key === 'theme') { S.theme = initialTheme(); applyTheme(S.theme); render({ focus: false }); }
  else { saveDraft(); S.lang = initialLang(); t = translator(S.lang); render({ focus: false }); }
});

applyTheme(S.theme);
render({ focus: false });
