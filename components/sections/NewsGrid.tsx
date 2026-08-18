import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { POSTS } from "@/lib/site";

export function NewsGrid() {
  const featured = POSTS.slice(0, 3);
  return (
    <section
      id="news"
      className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(72px,9vw,132px)]"
    >
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Latest From Gallagher Restoration</Eyebrow>
              <h2 className="mt-5 text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
                News &amp; Resources
              </h2>
            </div>
            <Link
              href="/news"
              className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
            >
              View all posts &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="mt-[clamp(36px,4.4vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 70}>
              <Link
                href={`/news/${p.slug}`}
                className="group flex h-full flex-col border-t border-[rgba(255,255,255,0.14)] py-[26px] text-[#F4F5F1] transition-colors duration-[400ms] hover:border-[#8ECE34]"
              >
                <div className="mb-6 overflow-hidden bg-[#121413]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={800}
                    height={450}
                    sizes="(min-width: 980px) 33vw, 100vw"
                    className="block aspect-[16/9] w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="max-w-[26ch] text-[clamp(19px,1.8vw,23px)] font-bold leading-[1.25] tracking-[-0.025em]">
                  {p.title}
                </h3>
                <p className="mt-[14px] text-[15px] leading-[1.7] text-[#9CA098] text-pretty">
                  {p.excerpt}
                </p>
                <span className="mt-[26px] font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]">
                  Read More &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
