import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Inline link syntax for blog body copy: [label](/internal-path) or
 * [label](https://external.example). Internal hrefs (starting with "/" or "#")
 * render through next/link; external hrefs open in a new tab with rel guards.
 *
 * Nothing else is parsed — this is deliberately not a markdown renderer, so
 * body text stays plain strings everywhere else.
 */
const LINK_PATTERN = /\[([^\]]+)\]\(([^()\s]+)\)/g;

const LINK_CLASS =
  "text-[#8ECE34] underline decoration-[rgba(142,206,52,0.42)] underline-offset-[3px] transition-colors duration-200 hover:text-[#A6E053] hover:decoration-[#A6E053]";

/** Strips inline link syntax down to its label — for JSON-LD and other
 *  places the text is serialized rather than rendered. */
export function plainText(text: string): string {
  return text.replace(LINK_PATTERN, "$1");
}

export function RichText({ text }: { text: string }): ReactNode {
  if (!text.includes("](")) return text;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const [raw, label, href] = match;
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    if (href.startsWith("/") || href.startsWith("#")) {
      nodes.push(
        <Link key={`l${key++}`} href={href} className={LINK_CLASS}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`a${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {label}
        </a>,
      );
    }

    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return nodes.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
