// Typograph: no hanging short words. Used by the build (i18n strings, Pixso Copy) and by the kit page.
// Russian: prepositions, conjunctions and other words of 1–3 letters are tied to the next word,
// particles бы/ли/же to the previous one, a number to the word after it, and an em dash to the word before it.
// English and German: only numbers and placeholders are tied to the next word ("30 days", "{n} minutes").
// Chinese and Arabic: unchanged (no spaces to break in Chinese; Arabic has its own rules).
const NB = String.fromCharCode(160); // non-breaking space
// Only ordinary spaces are replaced: \s would also match the non-breaking spaces placed on a previous pass
const SP = '[ \\t\\n]+';
const RU_SHORT = new RegExp(`(^|[ \\t\\n\\u00A0«„"(—–-])([А-Яа-яЁё]{1,3})${SP}(?=\\S)`, 'g');
const RU_PARTICLE = new RegExp(`${SP}(бы|ли|же|б|ль|ж)(?=[\\s.,!?;:»)]|$)`, 'g');
const NUMBER = new RegExp(`(\\d|\\})${SP}(?=[^\\s—–-])`, 'g'); // "30 дней", "{n} минут"; not before a dash
const DASH = new RegExp(`${SP}([—–])(?=\\s)`, 'g');

export function typo(text, lang) {
  if (typeof text !== 'string' || !text) return text;
  if (lang === 'zh' || lang === 'ar') return text;
  let s = text.replace(NUMBER, `$1${NB}`);
  if (lang === 'ru') {
    let prev;
    do { prev = s; s = s.replace(RU_SHORT, `$1$2${NB}`); } while (s !== prev); // "и в сети": both words
    s = s.replace(RU_PARTICLE, `${NB}$1`).replace(DASH, `${NB}$1`);
  }
  return s;
}
