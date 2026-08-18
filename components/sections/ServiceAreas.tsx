import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { COUNTIES, CITIES_BY_COUNTY } from "@/lib/site";

const STATS = [
  { value: String(COUNTIES.length), label: "Counties Covered" },
  {
    value: String(Object.values(CITIES_BY_COUNTY).reduce((n, arr) => n + arr.length, 0)),
    label: "Cities Served",
  },
  { value: "60", suffix: "min", label: "On-Site Response" },
  { value: "HQ", label: "Canyon Lake, CA" },
];

export function ServiceAreas() {
  return (
    <section
      id="areas"
      className="relative overflow-hidden bg-[#0B0C0B] pb-[clamp(80px,9vw,132px)] pt-[clamp(64px,7vw,104px)]"
    >
      {/* Soft accent glow anchoring the section */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_92%_8%,rgba(142,206,52,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-[1300px] px-[clamp(20px,5vw,56px)]">
        {/* Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10 border-b border-[rgba(255,255,255,0.09)] pb-10">
            <div className="max-w-[560px]">
              <Eyebrow>Southern California Based</Eyebrow>
              <h2 className="mt-5 text-[clamp(32px,4.4vw,58px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
                Counties We <span className="text-[#8ECE34]">Service</span>
              </h2>
            </div>
            <p className="max-w-[44ch] text-[15px] leading-[1.75] text-[#8F948A] text-pretty">
              Gallagher Restoration provides professional restoration and emergency response services throughout Southern California — a 60-minute dispatch radius from our Canyon Lake HQ.
            </p>
          </div>
        </Reveal>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 border-b border-[rgba(255,255,255,0.09)] pb-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 60}
              className={[
                "px-[clamp(16px,2vw,28px)] py-2 first:pl-0",
                i < STATS.length - 1 ? "md:border-r md:border-[rgba(255,255,255,0.09)]" : "",
                i === 1 ? "border-l border-[rgba(255,255,255,0.09)] md:border-l-0" : "",
              ].join(" ")}
            >
              <div className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-none tracking-[-0.035em] text-[#F4F5F1]">
                {s.value}
                {"suffix" in s && s.suffix ? (
                  <span className="text-[#8ECE34]">{s.suffix}</span>
                ) : null}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7E837A]">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* County cards */}
        <div className="mt-[clamp(28px,3.4vw,44px)] grid grid-cols-1 gap-[clamp(14px,1.6vw,22px)] sm:grid-cols-2 lg:grid-cols-3">
          {COUNTIES.map((c, i) => {
            const cities = CITIES_BY_COUNTY[c.slug as keyof typeof CITIES_BY_COUNTY] ?? [];
            const featured = cities.slice(0, 3);
            return (
              <Reveal key={c.slug} delay={i * 70}>
                <Link
                  href={`/${c.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden border border-[rgba(255,255,255,0.09)] bg-[#121413] p-[clamp(24px,2.4vw,34px)] text-[#F4F5F1] transition-[border-color,transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] hover:-translate-y-1 hover:border-[rgba(142,206,52,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                  {/* Accent bar */}
                  <span className="absolute left-0 top-0 h-[2px] w-12 bg-[#8ECE34] transition-all duration-[400ms] group-hover:w-full" />

                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-[#8ECE34]">
                      {c.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[#5E635B] transition-all duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.3,1)] group-hover:translate-x-1 group-hover:text-[#8ECE34]"
                    >
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M2 8h11m0 0-4-4m4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="square"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="mt-[clamp(22px,2.4vw,32px)] text-[clamp(22px,2.1vw,28px)] font-bold leading-[1.1] tracking-[-0.025em]">
                    {c.name} {c.second}
                  </div>

                  {/* Featured cities */}
                  <div className="mt-[22px] flex flex-wrap gap-2">
                    {featured.map((city) => {
                      const isHq = "isHq" in city && city.isHq;
                      return (
                        <span
                          key={city.slug}
                          className={[
                            "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[12px]",
                            isHq
                              ? "border-[rgba(142,206,52,0.35)] bg-[rgba(142,206,52,0.08)] text-[#D9EEB0]"
                              : "border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)] text-[#C2C6BC]",
                          ].join(" ")}
                        >
                          {isHq ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8ECE34]" />
                          ) : null}
                          {city.name}
                          {isHq ? (
                            <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8ECE34]">
                              HQ
                            </span>
                          ) : null}
                        </span>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-[26px]">
                    <div className="h-px w-8 bg-[rgba(142,206,52,0.5)]" />
                    <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7E837A]">
                      <span>
                        <span className="text-[#F4F5F1]">{cities.length}</span> cities served
                      </span>
                      <span>24/7 coverage</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
