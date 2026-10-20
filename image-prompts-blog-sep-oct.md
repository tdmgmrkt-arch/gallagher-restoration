# Blog hero image prompts — Gallagher Restoration, Sep 10 – Oct 16 2026

Ten new posts currently reuse existing service hero photos so nothing 404s.
These prompts are for bespoke heroes to replace them. Generating them is
optional — the posts are complete and shipping-ready as they stand.

## House rules for this site

- **No people in frame.** No technicians, no hands, no homeowners.
- **No branding.** No truck, no logo, no uniform, no badge.
- **16:9 landscape**, 1600px wide (the renderer serves `width={1600}
  height={900}` at `aspect-[16/9]`).
- **Flat, natural light** — overcast daylight or soft interior daylight. No
  dramatic lighting, no glow, no teal-orange grading, no lens flare.
- **Hold the exposure back slightly.** Unlike the SWAT sites, this hero sits
  *in-article with no text overlay* on a near-black page (`#0B0C0B`), inside a
  1px `rgba(255,255,255,0.09)` border. A blown-out bright frame glares against
  that. Mid-tone, slightly muted frames sit correctly in the layout.
- **No negative space reserved** — nothing is overlaid on these, so the subject
  can fill the frame.
- **Real Southern California residential context** — stucco tract homes, tile
  and asphalt-shingle roofs, beige interior walls, slab floors, attached
  garages, drought-tolerant or dormant landscaping. Not Midwest, not Northeast.

**Pipeline:** generate → drop in `public/blog/` → convert.

```
node scripts/convert-blog-heros.mjs <file1> <file2> ...
```

A bare run is safe: it converts only sources no blog post references, so the
eight legacy WordPress `.jpg` heroes are skipped rather than converted and
deleted. Pass filenames explicitly if you want to be certain.

**Filenames must match the post slug**, and after conversion each post's
`"image"` field needs updating from the current service-hero path to
`/blog/<slug>.webp`. The `imageAlt` already describes the scene below and can
stay as written.

---

### 1. `santa-ana-winds-wildfire-season-home-preparation.webp` — Sep 10
Documentary photograph, 16:9. A dry chaparral hillside rising directly behind the back fences of a Southern California tract neighborhood — tile roofs and stucco walls along the bottom third, brown desiccated brush climbing the slope above. Dead fuel visible at the base of the fence line. Hazy, flat, hot daylight with no shadow drama, slightly muted exposure. Shot on Canon R5, 35mm, from the street looking up at the slope. No people, no branding.

### 2. `water-heater-failure-flooding-southern-california.webp` — Sep 14
Documentary photograph, 16:9. An attached residential garage with standing water spread across bare concrete, a white tank water heater in the corner sitting in a shallow drip pan that has overflowed. Cardboard storage boxes have wicked water up their lower edges and gone dark. Water reaches the threshold of the door into the house. Flat daylight from an open garage door, restrained exposure. Shot on Canon R5, 24mm, low wide angle showing the full spread. No people, no branding.

### 3. `first-rain-of-the-season-roof-leaks-socal.webp` — Sep 18
Documentary photograph, 16:9. The edge of a Southern California tile roof during steady rain, a gutter packed solid with dry brown debris and water backing up and spilling over the front lip in a sheet. The fascia board below shows dark water staining. Overcast flat grey light, everything soaked. Shot on Sony A7IV, 50mm, angled up from the ground. No people, no branding.

### 4. `appliance-leaks-washing-machine-dishwasher-refrigerator.webp` — Sep 22
Documentary photograph, 16:9. A residential kitchen floor at the base of a dishwasher, the lower access panel removed and set aside, water seeping out across tile and under the adjacent cabinet toe-kick. The cabinet base is visibly darkened and swollen at the bottom edge. Soft natural daylight from a window out of frame. Shot on Canon R5, 35mm, low angle at floor level. No people, no hands, no branding.

### 5. `coastal-humidity-mold-orange-county-north-county-san-diego.webp` — Sep 26
Documentary photograph, 16:9. The inside corner of a bedroom closet on an exterior wall, clothes pushed to one side, dark mold speckling spreading across the upper corner where wall meets ceiling. Painted drywall, a wire shelf, a few hangers. Dim, soft indirect light from the bedroom beyond the open closet door. Shot on Canon R5, 28mm, tight interior framing. Natural color, realistically dim. No people, no branding.

### 6. `california-fair-plan-wildfire-coverage-restoration.webp` — Sep 30
Documentary photograph, 16:9, looking down at a kitchen table with a homeowners insurance policy packet spread open — a declarations page with columns of coverage limits, a reading-glasses case, a pen, a coffee mug to one side. Soft natural morning light from a window out of frame. Shot on Canon R5, 50mm, slightly angled top-down, shallow depth of field. Text on the documents plausible but not legible. No people, no branding, no real insurer names.

### 7. `chimney-fireplace-safety-before-first-fire.webp` — Oct 4
Documentary photograph, 16:9, looking up into the interior of a masonry fireplace flue from inside the firebox — the damper plate visible above, flue walls coated in dark flaky and glazed creosote, a few bits of leaf debris on the smoke shelf. A small amount of daylight filters down from the top of the flue. Available light only, no flash. Shot on Canon R5, 24mm. No people, no branding.

### 8. `hard-water-copper-pinhole-leaks-inland-empire.webp` — Oct 8
Documentary photograph, 16:9. A section of copper water supply pipe inside an opened residential wall cavity, green-blue corrosion staining around a small perforation, white mineral crust at a nearby soldered joint, and dark water staining on the wood stud and the back of the drywall behind it. Flat work light, no flash drama. Shot on Canon R5, 60mm macro, straight-on, tight on the pipe with the cavity soft behind it. No people, no hands, no branding.

### 9. `saltwater-flooding-storm-surge-not-a-normal-dry-out.webp` — Oct 12
Documentary photograph, 16:9. A coastal Southern California residential street after tidal flooding has receded — a visible dark waterline on stucco garage doors and low walls, wet sand and seaweed debris left across the pavement and driveways, sandbags slumped at a doorway. Flat overcast morning light. Shot on Sony A7IV, 35mm, low wide angle down the street. No people, no branding.

> Note: post 9 currently uses `/newportbeachflood.webp`, the image Kenneth
> supplied for the Newport Beach PPC page. That is a reasonable permanent
> choice — generate a replacement only if the two pages sharing a hero is a
> problem.

### 10. `leaving-your-home-empty-holiday-travel-water-damage.webp` — Oct 16
Documentary photograph, 16:9. A residential main water shut-off valve — brass ball valve with a lever handle on copper pipe, mounted low on an interior garage wall near the floor. The lever is turned to the closed position, perpendicular to the pipe. Bare concrete floor, beige wall, a little dust and age on the fittings. Flat natural daylight from an open garage door. Shot on Canon R5, 50mm, straight-on with the valve slightly off-center. No people, no branding.
