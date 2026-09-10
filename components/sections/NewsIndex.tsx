import Image from "next/image";
import Link from "next/link";

import { Pagination } from "@/components/ui/Pagination";
import { Reveal } from "@/components/ui/Reveal";
import { getPostsForPage, POST_PAGE_COUNT } from "@/lib/site";

function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The /news index body, shared by page 1 (/news) and every later page
 * (/news/page/N). The featured card only runs on page 1 — on later pages the
 * whole slice renders as an even grid.
 */
export function NewsIndex({ page }: { page: number }) {
  const posts = getPostsForPage(page);
  const isFirstPage = page === 1;
  const featured = isFirstPage ? posts[0] : undefined;
  const rest = isFirstPage ? posts.slice(1) : posts;

  return (
    <section className="bg-[#0B0C0B] py-[clamp(56px,7vw,110px)]">
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        {featured ? (
          <Reveal>
            <Link
              href={`/news/${featured.slug}`}
              className="group grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] border border-[rgba(255,255,255,0.09)] bg-[#121413] transition-[border-color] duration-[400ms] hover:border-[rgba(142,206,52,0.35)]"
            >
              <div className="relative overflow-hidden bg-[#0E100E]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 980px) 50vw, 100vw"
                  className="block aspect-[16/10] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-[clamp(28px,3.4vw,52px)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                  Featured &middot; {featured.category}
                  <span className="ml-2 text-[#5E635B]">
                    &middot;{" "}
                    <time dateTime={featured.datePublished}>
                      {formatPostDate(featured.datePublished)}
                    </time>
                  </span>
                </div>
                <h2 className="mt-6 max-w-[24ch] text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-balance">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.75] text-[#9CA098] text-pretty">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-[10px] font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors group-hover:text-[#A6E053]">
                  Read the article
                  <span className="transition-transform duration-300 group-hover:translate-x-[6px]">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(18px,2.2vw,28px)] ${
            featured ? "mt-[clamp(28px,3.4vw,48px)]" : ""
          }`}
        >
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <Link
                href={`/news/${p.slug}`}
                className="group flex h-full flex-col border-t border-[rgba(255,255,255,0.14)] py-[26px] text-[#F4F5F1] transition-colors duration-[400ms] hover:border-[#8ECE34]"
              >
                <div className="mb-6 overflow-hidden bg-[#121413]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={800}
                    height={450}
                    sizes="(min-width: 980px) 33vw, 100vw"
                    className="block aspect-[16/9] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                  {p.category}
                  <span className="ml-2 text-[#5E635B]">
                    &middot;{" "}
                    <time dateTime={p.datePublished}>
                      {formatPostDate(p.datePublished)}
                    </time>
                  </span>
                </div>
                <h3 className="mt-4 max-w-[26ch] text-[clamp(21px,2.4vw,29px)] font-bold leading-[1.25] tracking-[-0.025em]">
                  {p.title}
                </h3>
                <p className="mt-[14px] text-[15px] leading-[1.7] text-[#9CA098] text-pretty">
                  {p.excerpt}
                </p>
                <span className="mt-auto pt-[26px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#8ECE34]">
                  Read More &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Pagination page={page} totalPages={POST_PAGE_COUNT} />
      </div>
    </section>
  );
}
