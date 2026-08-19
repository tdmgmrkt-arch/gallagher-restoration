import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { COMPANY } from "@/lib/site";
import {
  BLOG_SLUGS,
  getBlogPost,
  listBlogPostsByDate,
  type BlogBlock,
} from "@/lib/blog-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gallagher Restoration Co.`,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://gallagherrestoration.com/news/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function renderBlock(block: BlogBlock, i: number) {
  switch (block.type) {
    case "p":
      return (
        <p
          key={i}
          className="mt-6 text-[clamp(16px,1.15vw,18px)] leading-[1.8] text-[#C2C6BC] text-pretty"
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={i}
          className="mt-14 text-[clamp(24px,2.6vw,34px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#F4F5F1] text-balance"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="mt-10 text-[clamp(19px,1.6vw,23px)] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F1]"
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul
          key={i}
          className="mt-6 flex flex-col gap-[10px] pl-6 text-[clamp(16px,1.15vw,18px)] leading-[1.75] text-[#C2C6BC] marker:text-[#8ECE34]"
          style={{ listStyleType: "disc" }}
        >
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={i}
          className="mt-6 flex flex-col gap-[10px] pl-6 text-[clamp(16px,1.15vw,18px)] leading-[1.75] text-[#C2C6BC] marker:font-mono marker:text-[13px] marker:text-[#8ECE34]"
          style={{ listStyleType: "decimal" }}
        >
          {block.items.map((item, j) => (
            <li key={j} className="pl-2">
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 border-l-2 border-[#8ECE34] bg-[#121413] p-6 text-[clamp(17px,1.35vw,20px)] italic leading-[1.65] text-[#D4D8CE]"
        >
          {block.text}
        </blockquote>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const all = listBlogPostsByDate();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://gallagherrestoration.com/news/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gallagherrestoration.com/news/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "en-US",
    articleSection: post.category,
    image: post.image
      ? [`https://gallagherrestoration.com${post.image}`]
      : undefined,
    about:
      post.slug === "the-passion-behind-gallagher-restoration"
        ? { "@id": "https://gallagherrestoration.com/#aaron-gallagher" }
        : undefined,
    author: { "@id": "https://gallagherrestoration.com/#aaron-gallagher" },
    publisher: {
      "@type": "Organization",
      "@id": "https://gallagherrestoration.com/#organization",
      name: COMPANY.name,
      logo: {
        "@type": "ImageObject",
        url: "https://gallagherrestoration.com/gallagher_badge_logo.webp",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: post.title },
        ]}
      />

      <article className="bg-[#0B0C0B] pt-[clamp(24px,3vw,48px)] pb-[clamp(72px,9vw,132px)]">
        <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[rgba(255,255,255,0.09)] pb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
              <span className="text-[#8ECE34]">{post.category}</span>
              <span className="text-[#3F4340]">/</span>
              <span>By {post.author}</span>
              <span className="text-[#3F4340]">/</span>
              <time dateTime={post.datePublished} className="text-[#C6CABF]">
                {formatDate(post.datePublished)}
              </time>
            </div>
          </Reveal>

          {post.image ? (
            <Reveal>
              <div className="mb-10 overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1340px) 1300px, 100vw"
                  priority
                  className="block aspect-[16/9] w-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={80}>
            <p className="text-[clamp(18px,1.35vw,21px)] leading-[1.65] text-[#D4D8CE] text-pretty">
              {post.excerpt}
            </p>
          </Reveal>

          <div>{post.body.map((block, i) => renderBlock(block, i))}</div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-[rgba(255,255,255,0.07)] bg-[#0E100E] py-[clamp(56px,7vw,104px)]">
          <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[rgba(255,255,255,0.09)] pb-7">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8ECE34]">
                    More From The Crew
                  </div>
                  <h3 className="mt-4 text-[clamp(22px,2.6vw,32px)] font-bold tracking-[-0.025em]">
                    Keep reading
                  </h3>
                </div>
                <Link
                  href="/news"
                  className="font-mono text-[13px] font-bold uppercase tracking-[0.05em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
                >
                  All articles &rarr;
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(18px,2.2vw,28px)]">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <Link
                    href={`/news/${p.slug}`}
                    className="group flex h-full flex-col border-t border-[rgba(255,255,255,0.14)] pt-6 text-[#F4F5F1] transition-colors duration-[400ms] hover:border-[#8ECE34]"
                  >
                    <div className="mb-5 overflow-hidden bg-[#121413]">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        width={800}
                        height={450}
                        sizes="(min-width: 940px) 33vw, 100vw"
                        className="block aspect-[16/9] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]">
                      {p.category}
                      <span className="ml-2 text-[#5E635B]">
                        &middot;{" "}
                        <time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time>
                      </span>
                    </div>
                    <h3 className="mt-3 max-w-[26ch] text-[clamp(18px,1.7vw,22px)] font-bold leading-[1.25] tracking-[-0.02em]">
                      {p.title}
                    </h3>
                    <span className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34]">
                      Read More &rarr;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
