import Link from "next/link";

/**
 * Page 1 lives at the clean /news URL; every later page is /news/page/N.
 * Keeping page 1 off the /news/page/1 form avoids a duplicate of the index
 * (next.config.ts also permanently redirects /news/page/1 -> /news).
 */
export function postsPageHref(page: number): string {
  return page <= 1 ? "/news" : `/news/page/${page}`;
}

/**
 * Condensed page list: first, last, and a window around the current page,
 * with ellipses standing in for whatever is skipped.
 */
function pageItems(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: Array<number | "gap"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("gap");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("gap");
  items.push(total);

  return items;
}

const BOX =
  "inline-flex h-[46px] min-w-[46px] items-center justify-center rounded-[2px] border px-[14px] font-mono text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-[300ms]";
const IDLE =
  "border-[rgba(255,255,255,0.14)] bg-[#121413] text-[#C6CABF] hover:border-[#8ECE34] hover:text-[#8ECE34]";
const CURRENT =
  "border-[#8ECE34] bg-[rgba(142,206,52,0.12)] text-[#8ECE34] cursor-default";
const DISABLED =
  "border-[rgba(255,255,255,0.07)] bg-transparent text-[#4A4E47] cursor-not-allowed";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="Article pagination"
      className="mt-[clamp(40px,5vw,72px)] border-t border-[rgba(255,255,255,0.09)] pt-[clamp(24px,3vw,40px)]"
    >
      <div className="flex flex-wrap items-center justify-center gap-[10px]">
        {hasPrev ? (
          <Link
            href={postsPageHref(page - 1)}
            rel="prev"
            className={`${BOX} ${IDLE}`}
          >
            &larr;<span className="ml-[10px] hidden sm:inline">Prev</span>
          </Link>
        ) : (
          <span className={`${BOX} ${DISABLED}`} aria-hidden="true">
            &larr;<span className="ml-[10px] hidden sm:inline">Prev</span>
          </span>
        )}

        {pageItems(page, totalPages).map((item, i) =>
          item === "gap" ? (
            <span
              key={`gap-${i}`}
              aria-hidden="true"
              className="px-1 font-mono text-[13px] text-[#5E635B]"
            >
              &hellip;
            </span>
          ) : item === page ? (
            <span key={item} aria-current="page" className={`${BOX} ${CURRENT}`}>
              {String(item).padStart(2, "0")}
            </span>
          ) : (
            <Link
              key={item}
              href={postsPageHref(item)}
              aria-label={`Page ${item}`}
              className={`${BOX} ${IDLE}`}
            >
              {String(item).padStart(2, "0")}
            </Link>
          ),
        )}

        {hasNext ? (
          <Link
            href={postsPageHref(page + 1)}
            rel="next"
            className={`${BOX} ${IDLE}`}
          >
            <span className="mr-[10px] hidden sm:inline">Next</span>&rarr;
          </Link>
        ) : (
          <span className={`${BOX} ${DISABLED}`} aria-hidden="true">
            <span className="mr-[10px] hidden sm:inline">Next</span>&rarr;
          </span>
        )}
      </div>

      <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#7E837A]">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}
