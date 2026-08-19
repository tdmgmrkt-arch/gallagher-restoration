import { GBP, REVIEWS } from "@/lib/site";

type Variant = "hero" | "footer";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex items-center gap-[2px] text-[#FBBC04]"
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rounded >= i;
        const half = !filled && rounded >= i - 0.5;
        return (
          <svg
            key={i}
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-[13px] w-[13px]"
          >
            <defs>
              <linearGradient id={`grb-half-${i}`}>
                <stop offset="50%" stopColor="#FBBC04" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
              </linearGradient>
            </defs>
            <path
              d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z"
              fill={
                filled
                  ? "#FBBC04"
                  : half
                    ? `url(#grb-half-${i})`
                    : "rgba(255,255,255,0.18)"
              }
            />
          </svg>
        );
      })}
    </span>
  );
}

function GoogleG() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-[14px] w-[14px] flex-none"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7C13.42 14.62 18.27 10.75 24 10.75z"
      />
    </svg>
  );
}

export function GoogleReviewBadge({ variant = "hero" }: { variant?: Variant }) {
  const label = `${REVIEWS.ratingValue.toFixed(1)}`;

  if (variant === "footer") {
    return (
      <div className="flex flex-col gap-2 border border-[rgba(255,255,255,0.09)] bg-[#0E100E] p-4">
        <a
          href={GBP.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 transition-colors"
        >
          <div className="flex items-center gap-2">
            <GoogleG />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A] transition-colors group-hover:text-[#C6CABF]">
              Google Rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-bold leading-none tracking-[-0.02em] text-[#F4F5F1]">
              {label}
            </span>
            <Stars rating={REVIEWS.ratingValue} />
            <span className="text-[13px] text-[#C6CABF]">
              &middot; {REVIEWS.reviewCount} reviews
            </span>
          </div>
        </a>
        <a
          href={GBP.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8ECE34] transition-colors hover:text-[#A6E053]"
        >
          Leave a review &rarr;
        </a>
      </div>
    );
  }

  return (
    <a
      href={GBP.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} stars from ${REVIEWS.reviewCount} Google reviews. Opens Google Business Profile.`}
      className="group inline-flex items-center gap-[10px] border border-[rgba(255,255,255,0.13)] bg-[rgba(8,9,8,0.55)] px-[14px] py-[8px] backdrop-blur-[6px] transition-colors hover:border-[rgba(142,206,52,0.4)]"
    >
      <GoogleG />
      <span className="text-[14px] font-bold leading-none tracking-[-0.01em] text-[#F4F5F1]">
        {label}
      </span>
      <Stars rating={REVIEWS.ratingValue} />
      <span className="text-[12px] leading-none text-[#C6CABF]">
        {REVIEWS.reviewCount} Google reviews
      </span>
    </a>
  );
}
