import { CITY_COORDS } from "@/lib/city-coords";

export function CityMap({
  activeSlug,
  activeName,
}: {
  activeSlug: string;
  activeName: string;
}) {
  const coord = CITY_COORDS[activeSlug];
  if (!coord) return null;

  const [lat, lon] = coord;
  const src = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=12&t=m&output=embed`;

  return (
    <div className="relative border border-[rgba(255,255,255,0.09)] bg-[#0E100E] p-[clamp(16px,2vw,24px)]">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8ECE34]">
          {activeName} &mdash; Service Area
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E7268]">
          24/7 Response
        </div>
      </div>

      <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#0B0C0B]">
        <iframe
          src={src}
          title={`Map of ${activeName}, California — Gallagher Restoration service area`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.88)_hue-rotate(180deg)_brightness(0.95)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,transparent_60%,rgba(11,12,11,0.55)_100%)]" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[rgba(255,255,255,0.07)] pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E7268]">
        <span>Southern California coverage</span>
        <span className="text-[#8ECE34]">Riverside &middot; San Bernardino &middot; Orange &middot; San Diego &middot; LA</span>
      </div>
    </div>
  );
}
