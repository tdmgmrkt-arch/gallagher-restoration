"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { LiveReview } from "@/lib/google-reviews";

function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 980 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

type Props = {
  reviews: LiveReview[];
  isLive: boolean;
};

export function TestimonialsCarousel({ reviews, isLive }: Props) {
  const perView = usePerView();
  const total = reviews.length;
  const maxIndex = useMemo(() => Math.max(0, total - perView), [total, perView]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  const canPaginate = total > perView;

  return (
    <section className="bg-[#0B0C0B] py-[clamp(72px,9vw,132px)]">
      <div className="mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{isLive ? "Live From Google" : "Real Words From Real Neighbors"}</Eyebrow>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-[22px] max-w-[22ch] text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
                Trusted Across <span className="text-[#8ECE34]">Southern California</span>
              </h2>
            </Reveal>
          </div>

          {canPaginate && (
            <Reveal delay={160}>
              <div className="flex items-center gap-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
                  <span className="text-[#F4F5F1]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-[#3D423B]">/</span>
                  <span>{String(maxIndex + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowButton direction="prev" onClick={() => go(-1)} label="Previous review" />
                  <ArrowButton direction="next" onClick={() => go(1)} label="Next review" />
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={200}>
          <div className="mt-[clamp(36px,4.4vw,64px)] overflow-hidden">
            <div
              className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]"
              style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            >
              {reviews.map((r, i) => (
                <div
                  key={`${r.authorName}-${i}`}
                  className="shrink-0 px-[clamp(9px,1.1vw,14px)] first:pl-0 last:pr-0"
                  style={{ width: `${100 / perView}%` }}
                >
                  <TestimonialCard review={r} isLive={isLive} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {canPaginate && (
          <Reveal delay={260}>
            <div className="mt-[clamp(28px,3vw,40px)] flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review page ${i + 1}`}
                    aria-current={active}
                    className={[
                      "h-[6px] rounded-full transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)]",
                      active
                        ? "w-8 bg-[#8ECE34]"
                        : "w-2 bg-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.32)]",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function TestimonialCard({ review, isLive }: { review: LiveReview; isLive: boolean }) {
  const displayText = trimQuote(review.text);
  const bodyClass = displayText.length > 380
    ? "mt-[22px] text-[14px] leading-[1.75] text-[#D4D8CE] text-pretty"
    : "mt-[22px] text-[15px] leading-[1.8] text-[#D4D8CE] text-pretty";

  return (
    <figure className="group relative flex h-full flex-col overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(28px,2.8vw,40px)] transition-[border-color,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-1 hover:border-[rgba(142,206,52,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 select-none text-[160px] font-extrabold leading-none text-[rgba(142,206,52,0.06)] transition-colors duration-[400ms] group-hover:text-[rgba(142,206,52,0.10)]"
      >
        &rdquo;
      </span>

      <span className="absolute left-0 top-0 h-[2px] w-12 bg-[#8ECE34] transition-all duration-[400ms] group-hover:w-24" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-[10px]">
          <Stars rating={review.rating} />
          {isLive && review.relativeTime && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E837A]">
              &middot; {review.relativeTime}
            </span>
          )}
        </div>
        <blockquote className={bodyClass}>&ldquo;{displayText}&rdquo;</blockquote>
        <figcaption className="mt-auto pt-8">
          <div className="h-px w-8 bg-[rgba(142,206,52,0.5)]" />
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-[10px] min-w-0">
              {isLive && review.authorPhotoUri ? (
                <Image
                  src={review.authorPhotoUri}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="h-[28px] w-[28px] flex-none rounded-full border border-[rgba(255,255,255,0.12)] object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-[28px] w-[28px] flex-none place-items-center rounded-full bg-[rgba(142,206,52,0.14)] font-mono text-[11px] font-bold text-[#8ECE34]"
                >
                  {review.authorName.charAt(0)}
                </span>
              )}
              <span className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-[#8ECE34]">
                {review.authorName}
              </span>
            </div>
            <span className="flex-none font-mono text-[10px] uppercase tracking-[0.18em] text-[#7E837A]">
              {isLive ? "via Google" : "Verified Client"}
            </span>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

function trimQuote(text: string): string {
  const clean = text.trim();
  if (clean.length <= 520) return clean;
  const cut = clean.slice(0, 500);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : 500).trim()}…`;
}

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-[3px] text-[#FBBC04]"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-[14px] w-[14px]"
        >
          <path
            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z"
            fill={rounded >= i ? "#FBBC04" : "rgba(255,255,255,0.18)"}
          />
        </svg>
      ))}
    </span>
  );
}

function ArrowButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative flex h-11 w-11 items-center justify-center border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.03)] text-[#F4F5F1] transition-all duration-[300ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:border-[#8ECE34] hover:bg-[rgba(142,206,52,0.08)] hover:text-[#8ECE34]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={direction === "prev" ? "rotate-180" : ""}
      >
        <path
          d="M2 8h11m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
}
