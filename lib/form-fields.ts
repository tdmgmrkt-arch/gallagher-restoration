/**
 * Field names shared by the lead form (client) and the spam guard (server).
 *
 * They live in their own module, with no server-only imports, so the client
 * bundle can read the names without pulling `lib/spam-guard` — and so renaming
 * a trap field can never desync the form from the check that reads it.
 */

/**
 * Honeypot. Rendered off-screen and hidden from assistive tech, so a human
 * never sees it and cannot tab into it. Named `website` rather than something
 * like `honeypot` because form-filling bots target plausible field names and
 * autofill a URL into anything called website/url — that eagerness is the trap.
 */
export const HONEYPOT_FIELD = "website";

/**
 * Epoch milliseconds captured when the form mounts in the browser, used to
 * measure time-to-fill. Client-supplied and therefore forgeable, so it is one
 * signal among several — not a gate on its own. It still catches the large
 * majority of real-world form spam, which submits instantly.
 */
export const RENDERED_AT_FIELD = "renderedAt";

/** Cloudflare Turnstile token field. Matches Cloudflare's own naming. */
export const TURNSTILE_FIELD = "turnstileToken";
