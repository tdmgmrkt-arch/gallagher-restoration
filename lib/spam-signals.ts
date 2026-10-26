import { INSURANCE_VALUES, SERVICE_OPTIONS, TIMING_OPTIONS } from "@/lib/site";

/**
 * Content heuristics for lead-form submissions — the pure half of the spam
 * guard, with no request, network or clock dependency.
 *
 * Split out from `lib/spam-guard` so it can be exercised directly by
 * `scripts/test-spam-signals.mjs`, which is the only way to keep the real risk
 * here honest: these rules run against genuine restoration customers in a
 * panic, and a false positive silently deletes a job worth thousands.
 *
 * Design rule: nothing that could plausibly appear in a real submission is
 * conclusive on its own. Soft signals accumulate and only act together, at
 * SCORE_BLOCK_THRESHOLD.
 */

/** Content score at or above which a submission is treated as spam. */
export const SCORE_BLOCK_THRESHOLD = 3;

/** Score used by signals that are conclusive on their own. */
const SCORE_CERTAIN = 99;

/** The lead fields the content heuristics read. */
export type GuardSubject = {
  name: string;
  phone: string;
  email: string;
  address?: string;
  description?: string;
  damageType?: string;
  timing?: string;
  insurance?: string;
};

export type ContentScore = { score: number; signals: string[] };

// ---------------------------------------------------------------------------
// Patterns
// ---------------------------------------------------------------------------

/** Explicit URLs, plus bare domains on the TLDs that dominate form spam. */
const URL_PATTERN =
  /(?:https?:\/\/|www\.)\S+|\b[a-z0-9][a-z0-9-]*\.(?:com|net|org|ru|cn|de|uk|xyz|top|info|biz|online|shop|site|club|icu|buzz|live|store|tk|ml|ga|cf|pw|link|click)\b/gi;

/** Forum markup. Appears in scraped-template spam and never in real prose. */
const BBCODE_PATTERN = /\[(?:url|link|img|b|i)\s*[=\]]/i;

/**
 * Cyrillic, Arabic, Devanagari, Han, Kana and Hangul.
 *
 * Deliberately worth only one point. Orange and San Diego counties have large
 * Chinese- and Korean-speaking populations, so a genuine customer may well
 * write in a non-Latin script — it needs a corroborating signal before this
 * blocks anything. Spanish and Vietnamese are Latin and never match here.
 */
const NON_LATIN_PATTERN = /[Ѐ-ӿ؀-ۿऀ-ॿ一-鿿぀-ヿ가-힯]/;

/**
 * The pitch spam that floods contractor forms: agencies selling SEO, leads or
 * web work, plus the usual pharma/casino/crypto payloads.
 *
 * Matched as whole phrases rather than loose keywords, so a customer writing
 * "my loan" or "I found you on Google" is untouched. Every phrase here is one
 * no flood victim would ever type, which is what earns these a conclusive
 * score — see SOFT_PITCH_PATTERNS for the ones a real customer might.
 */
const PITCH_PATTERNS = [
  /\bbacklinks?\b|\bdo-?follow\b/i,
  /\bguest post(?:ing|s)?\b/i,
  /\brank(?:ing)? (?:your|you) (?:website|site|business|page)\b/i,
  /\b(?:first|top|1st) page of google\b/i,
  /\bseo (?:services|audit|expert|agency|company|package|report)\b/i,
  /\bdigital marketing (?:services|agency|company)\b/i,
  /\bincrease (?:your )?(?:traffic|sales|leads|revenue) (?:by|to|with)\b/i,
  /\b(?:web|website|app) (?:design|development) (?:services|company|agency)\b/i,
  /\bbuy (?:now|cheap)\b|\bviagra\b|\bcialis\b|\bcasino\b|\bporn\b/i,
  /\b(?:crypto|bitcoin|forex) (?:invest|trading|profit|signal)/i,
  /\bunsubscribe\b|\bclick here to\b/i,
];

/**
 * The cold-pitch opener — "I came across your website…".
 *
 * Scored rather than conclusive, because a genuine customer absolutely does
 * write "I found your website and need help now." Blocking that would delete a
 * real emergency job, so this needs a second signal (a URL, a throwaway inbox)
 * before it acts. A bare pitch with none of those gets delivered, which is the
 * right side to err on: the client can ignore one email.
 */
const SOFT_PITCH_PATTERNS = [
  /\b(?:i|we) (?:came across|found|was browsing|stumbled upon) your (?:website|site)\b/i,
];

/** Strict enough to reject junk, loose enough not to reject real mail. */
const EMAIL_PATTERN =
  /^[^\s@,;:<>()[\]\\"]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;

/** Throwaway providers. Not exhaustive — just the ones that actually show up. */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "temp-mail.org",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "mailnesia.com",
  "spam4.me",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Anything shaped like an email address. */
const EMAIL_IN_TEXT_PATTERN = /[^\s@]+@[^\s@]+\.[a-z]{2,}/gi;

/**
 * Count links, ignoring email addresses.
 *
 * Masking emails first matters: the bare-domain half of URL_PATTERN would
 * otherwise read "call me or email bob@gmail.com and jane@yahoo.com" as two
 * links and conclusively block it. Repeating a contact address in the message
 * is normal customer behaviour; posting two actual links is not.
 */
function countUrls(value: string): number {
  // URL_PATTERN is global, so match() returns every hit and resets lastIndex —
  // nothing here depends on the regex being stateless between calls.
  return value.replace(EMAIL_IN_TEXT_PATTERN, " ").match(URL_PATTERN)?.length ?? 0;
}

/**
 * True for the placeholder numbers bots type: all one digit, or a straight run
 * up or down the keypad. Checked on digits only, so formatting does not matter.
 */
function isJunkPhone(digits: string): boolean {
  if (/^(\d)\1+$/.test(digits)) return true;
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  return ascending.includes(digits) || descending.includes(digits);
}

/**
 * True for keyboard-mash names like "asdfghjkl" — a long alphabetic run with no
 * vowel in it. The vowel test is what keeps this off real names, and short
 * names are skipped entirely so initials and names like "Ng" never match.
 */
function isGibberishName(name: string): boolean {
  const letters = name.replace(/[^a-z]/gi, "");
  if (letters.length < 7) return false;
  return !/[aeiouy]/i.test(letters);
}

/**
 * True for a name field holding no name at all — all digits or symbols, or
 * carrying a long run of digits.
 *
 * Added 2026-10-26 after a spam lead landed in GHL displayed as `9546979605`:
 * the name field had no letters in it, and nothing in the guard objected.
 *
 * The non-ASCII test is load-bearing. Checking only for a-z would flag a name
 * written purely in Chinese, Korean or Japanese characters — real customers in
 * Orange and San Diego counties — as having "no letters." Anything outside
 * ASCII is treated as letters, so only genuine digit/symbol junk matches.
 */
function hasNonNameCharacters(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed) return false;

  const hasLatinLetter = /[a-z]/i.test(trimmed);
  const hasNonAscii = /[^\x00-\x7F]/.test(trimmed);
  if (!hasLatinLetter && !hasNonAscii) return true;

  // No human name carries a four-digit run. Short digits are left alone so a
  // suffix like "John Smith 3" is never touched.
  return /\d{4,}/.test(trimmed);
}

/**
 * Letter pairs that essentially never occur in real human names.
 *
 * Curated against the languages this service area actually sees — Spanish,
 * Vietnamese, Korean and Chinese romanisations, Armenian, Polish, German,
 * South Asian — and every pair here is checked against the name corpus in
 * `scripts/test-spam-signals.mjs`. Several obvious-looking pairs are
 * deliberately ABSENT because real names use them:
 *   zh (Zhang)      ng/uy (Nguyen)   kh (Khan)      nh (Nhung)
 *   xu (Xu, Xuan)   bh (Bhattacharya) pf (Pfeiffer)  sr (Srinivasan)
 *   rz/zy (Krzyzewski)  dt/hm (Schmidt)  hw (Schwartz)  dz (Polish)
 * Add nothing here without running the corpus test.
 */
const RARE_BIGRAMS = new Set([
  "bd","bf","bg","bk","bm","bn","bp","bq","bt","bv","bw","bx","bz",
  "cd","cf","cg","cj","cm","cn","cp","cq","cv","cw","cx",
  "dc","df","dg","dj","dk","dm","dn","dp","dq","dv","dw","dx",
  "fb","fc","fd","fg","fh","fj","fk","fm","fn","fp","fq","fv","fw","fx","fz",
  "gb","gc","gd","gf","gj","gk","gm","gp","gq","gt","gv","gw","gx","gz",
  "hb","hc","hd","hf","hg","hj","hk","hn","hp","hq","hv","hx","hz",
  "jb","jc","jd","jf","jg","jh","jk","jl","jm","jn","jp","jq","jr","js","jt","jv","jw","jx","jz",
  "kb","kc","kd","kf","kg","kj","kp","kq","kv","kx","kz",
  "lq","lr","lw","lx",
  "md","mf","mg","mj","mk","mq","mr","mt","mv","mw","mx","mz",
  "nb","nf","nl","nm","nq","nr","nv","nw","nx",
  "pb","pc","pd","pg","pj","pk","pm","pq","pv","pw","px","pz",
  "qw","qy","qz",
  "rq","rw","rx",
  "sb","sd","sf","sg","sx",
  "tb","tc","td","tf","tg","tj","tk","tm","tp","tq","tv","tx",
  "vb","vc","vd","vf","vg","vh","vj","vk","vm","vn","vp","vq","vr","vs","vt","vw","vx","vz",
  "wb","wc","wd","wf","wg","wj","wk","wl","wm","wp","wq","wt","wv","wx","wz",
  "xb","xd","xf","xg","xj","xk","xl","xm","xn","xq","xr","xs","xv","xw","xz",
  "yc","yd","yf","yg","yj","yk","yp","yq","yv","yw","yx","yz",
  "zb","zc","zd","zf","zg","zj","zk","zm","zn","zp","zq","zr","zs","zt","zv","zw","zx",
]);

function rareBigramCount(token: string): number {
  let count = 0;
  for (let i = 0; i < token.length - 1; i += 1) {
    if (RARE_BIGRAMS.has(token.slice(i, i + 2))) count += 1;
  }
  return count;
}

/** Tokens shorter than this are never judged — too little signal, too risky. */
const MIN_TOKEN_LETTERS = 5;

/**
 * True for machine-generated names like "yzwxuafu gpomwlyf" or "zgvtu nisgti"
 * — the actual spam hitting this form, confirmed from GHL on 2026-10-21.
 *
 * `isGibberishName` above misses these: they are random letters that happen to
 * contain vowels, so the no-vowel test never fires. What gives them away is
 * letter PAIRS no real name uses ("yz", "zw", "wx", "gp", "mw", "zg", "gv").
 *
 * Two safety rules keep this off real customers:
 *   - A token must be 5+ letters to be judged at all.
 *   - With two or more name parts, EVERY judged part must look generated. One
 *     odd surname next to an ordinary first name is a real person — this is
 *     what protects Mkrtchyan, Krzyzewski, Wojcik and Dvorak, which each trip
 *     a single rare pair on their own.
 * A lone name needs 3+ rare pairs, which no name in the corpus reaches.
 */
function isMachineGeneratedName(name: string): boolean {
  const tokens = name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((token) => token.length >= MIN_TOKEN_LETTERS);

  if (tokens.length === 0) return false;

  const counts = tokens.map(rareBigramCount);

  // One part can be damning on its own at 3+. No name in the corpus reaches 2;
  // the worst real cases (Mkrtchyan, Dvorak, Wojcik, Hovhannisyan) sit at 1.
  if (counts.some((count) => count >= 3)) return true;

  // Otherwise every judged part has to look generated, which is what keeps an
  // unusual surname beside an ordinary first name safe.
  return tokens.length > 1 && counts.every((count) => count >= 2);
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export function scoreContent(subject: GuardSubject): ContentScore {
  const signals: string[] = [];
  let score = 0;

  const add = (points: number, signal: string) => {
    score += points;
    signals.push(signal);
  };

  const name = subject.name.trim();
  const email = subject.email.trim();
  const address = (subject.address ?? "").trim();
  const description = (subject.description ?? "").trim();
  const freeText = [name, address, description].join("\n");

  // --- Conclusive signals ---------------------------------------------------

  // A person's name does not contain a link. The single most reliable tell in
  // contractor form spam.
  if (countUrls(name) > 0) add(SCORE_CERTAIN, "url-in-name");

  if (BBCODE_PATTERN.test(freeText)) add(SCORE_CERTAIN, "bbcode");

  const urlCount = countUrls(freeText);
  if (urlCount > 1) add(SCORE_CERTAIN, `multiple-urls:${urlCount}`);

  const phoneDigits = subject.phone.replace(/\D/g, "");
  if (phoneDigits.length >= 7 && isJunkPhone(phoneDigits)) {
    add(SCORE_CERTAIN, "junk-phone");
  }

  if (PITCH_PATTERNS.some((pattern) => pattern.test(freeText))) {
    add(SCORE_CERTAIN, "sales-pitch");
  }

  if (hasNonNameCharacters(name)) add(SCORE_CERTAIN, "non-name-characters");

  // --- Accumulating signals -------------------------------------------------

  if (SOFT_PITCH_PATTERNS.some((pattern) => pattern.test(freeText))) {
    add(2, "soft-pitch");
  }

  // One link in the address or the damage description. Weighted so it needs
  // corroboration: a customer could conceivably paste a maps or photo link.
  if (urlCount === 1) add(2, "single-url");

  if (NON_LATIN_PATTERN.test(freeText)) add(1, "non-latin-script");

  if (isGibberishName(name)) add(2, "gibberish-name");

  // Worth a block on its own. This is the signature of the spam actually
  // arriving in GHL, and the two safety rules in isMachineGeneratedName make a
  // real customer tripping it very unlikely — see the name corpus in the test.
  if (isMachineGeneratedName(name)) add(3, "machine-generated-name");

  if (!EMAIL_PATTERN.test(email)) add(2, "malformed-email");

  const emailDomain = email.split("@")[1]?.toLowerCase();
  if (emailDomain && DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
    add(2, "disposable-email");
  }

  // Our own selects can only ever submit a value from these lists, so anything
  // else means the payload was not built by our UI. Scored rather than
  // conclusive on purpose: if an option label is ever edited, a visitor still
  // holding the previous build in an open tab must not have their lead dropped.
  const offList = (value: string | undefined, list: readonly string[]) =>
    Boolean(value) && !list.includes(value as string);

  if (offList(subject.damageType, SERVICE_OPTIONS)) add(2, "damageType-off-list");
  if (offList(subject.timing, TIMING_OPTIONS)) add(2, "timing-off-list");
  if (offList(subject.insurance, INSURANCE_VALUES)) add(2, "insurance-off-list");

  // The same string pasted into every box.
  if (name.length > 2 && name === description) add(2, "name-equals-description");

  return { score, signals };
}
