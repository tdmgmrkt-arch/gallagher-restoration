import { CITY_COORDS, COUNTY_LABEL_COORDS } from "@/lib/city-coords";
import { CITIES_BY_COUNTY } from "@/lib/site";

const BBOX = { latMin: 32.45, latMax: 34.72, lonMin: -118.85, lonMax: -116.75 };
const VB = { w: 800, h: 560 };

function project([lat, lon]: [number, number]): [number, number] {
  const x = ((lon - BBOX.lonMin) / (BBOX.lonMax - BBOX.lonMin)) * VB.w;
  const y = ((BBOX.latMax - lat) / (BBOX.latMax - BBOX.latMin)) * VB.h;
  return [x, y];
}

const COUNTY_LABELS: Record<string, string> = {
  "riverside-county": "RIVERSIDE",
  "san-bernardino-county": "SAN BERNARDINO",
  "orange-county": "ORANGE",
  "san-diego-county": "SAN DIEGO",
  "los-angeles-county": "LOS ANGELES",
};

// Rough Pacific coastline path — used as a soft aesthetic anchor, not literal cartography.
const COAST_POINTS: Array<[number, number]> = [
  [34.72, -119.15],
  [34.42, -118.95],
  [34.05, -118.55],
  [33.90, -118.42],
  [33.75, -118.40],
  [33.62, -117.99],
  [33.46, -117.73],
  [33.20, -117.44],
  [32.98, -117.29],
  [32.72, -117.26],
  [32.45, -117.13],
];

export function CityMap({
  activeSlug,
  activeName,
}: {
  activeSlug: string;
  activeName: string;
}) {
  const allCities = Object.entries(CITIES_BY_COUNTY).flatMap(([countySlug, list]) =>
    list.map((c) => ({ ...c, countySlug }))
  );

  const coastPath =
    "M " +
    COAST_POINTS.map((p) => {
      const [x, y] = project(p);
      return `${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" L ") +
    ` L ${VB.w + 40} ${VB.h + 40} L -40 ${VB.h + 40} Z`;

  const active = CITY_COORDS[activeSlug];
  const [ax, ay] = active ? project(active) : [VB.w / 2, VB.h / 2];

  return (
    <div className="relative border border-[rgba(255,255,255,0.09)] bg-[#0E100E] p-[clamp(20px,2.4vw,32px)]">
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8ECE34]">
          Coverage Map
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E7268]">
          Southern California
        </div>
      </div>

      <div className="mt-5 aspect-[800/560] w-full">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="h-full w-full"
          role="img"
          aria-label={`Southern California coverage map with ${activeName} highlighted`}
        >
          <defs>
            <radialGradient id="cityMapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8ECE34" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8ECE34" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="cityMapGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width={VB.w} height={VB.h} fill="url(#cityMapGrid)" />

          {/* Pacific fill (very subtle) */}
          <path d={coastPath} fill="rgba(30,60,90,0.18)" />
          {/* Coastline stroke */}
          <path
            d={
              "M " +
              COAST_POINTS.map((p) => {
                const [x, y] = project(p);
                return `${x.toFixed(1)} ${y.toFixed(1)}`;
              }).join(" L ")
            }
            fill="none"
            stroke="rgba(142,206,52,0.18)"
            strokeWidth="1"
          />

          {/* Pacific label */}
          <text
            x={project([33.30, -118.60])[0]}
            y={project([33.30, -118.60])[1]}
            fontSize="12"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.22em"
            fill="rgba(255,255,255,0.22)"
          >
            PACIFIC
          </text>

          {/* County labels */}
          {Object.entries(COUNTY_LABEL_COORDS).map(([slug, coord]) => {
            const [x, y] = project(coord);
            return (
              <text
                key={slug}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                letterSpacing="0.22em"
                fill="rgba(255,255,255,0.28)"
              >
                {COUNTY_LABELS[slug]}
              </text>
            );
          })}

          {/* Inactive city dots */}
          {allCities.map((c) => {
            if (c.slug === activeSlug) return null;
            const coord = CITY_COORDS[c.slug];
            if (!coord) return null;
            const [x, y] = project(coord);
            return (
              <circle
                key={c.slug}
                cx={x}
                cy={y}
                r={3}
                fill="rgba(244,245,241,0.42)"
              />
            );
          })}

          {/* Active city marker */}
          {active ? (
            <g>
              <circle cx={ax} cy={ay} r={68} fill="url(#cityMapGlow)" />
              <circle cx={ax} cy={ay} r={14} fill="rgba(142,206,52,0.22)" />
              <circle cx={ax} cy={ay} r={7} fill="#8ECE34" />
              <circle
                cx={ax}
                cy={ay}
                r={7}
                fill="none"
                stroke="#0E100E"
                strokeWidth="1.5"
              />
              <text
                x={ax + 16}
                y={ay + 5}
                fontSize="18"
                fontWeight="700"
                fontFamily="var(--font-archivo, Archivo, sans-serif)"
                fill="#F4F5F1"
              >
                {activeName}
              </text>
            </g>
          ) : null}
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(255,255,255,0.07)] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6E7268]">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="block h-[7px] w-[7px] rounded-full bg-[#8ECE34]"
          />
          {activeName}
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="block h-[6px] w-[6px] rounded-full bg-[rgba(244,245,241,0.42)]"
          />
          Other cities we serve
        </span>
      </div>
    </div>
  );
}
