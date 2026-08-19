// One-shot script: populate crossLinks + refine relatedServices across service JSONs.
// Run: node scripts/update-cross-links.js
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "content", "services");

const CROSS = {
  "water-damage-restoration": [
    { label: "Emergency water removal", href: "/emergency-water-removal", note: "24/7 dispatch" },
    { label: "Mold remediation", href: "/mold-remediation", note: "If water sat too long" },
    { label: "Fire damage restoration", href: "/fire-damage-restoration", note: "Other loss type" },
  ],
  "water-damage-clean-up": [
    { label: "Water damage repair", href: "/water-damage-repair", note: "Post-cleanup rebuild" },
    { label: "Water extraction", href: "/water-extraction", note: "Standing water first" },
    { label: "Water dry-out", href: "/water-dry-out", note: "After extraction" },
  ],
  "water-damage-repair": [
    { label: "Water dry-out", href: "/water-dry-out", note: "Prep before repair" },
    { label: "Ceiling water damage", href: "/ceiling-water-damage", note: "Overhead leaks" },
    { label: "Reconstruction", href: "/reconstruction", note: "Larger rebuilds" },
  ],
  "water-extraction": [
    { label: "Emergency water removal", href: "/emergency-water-removal", note: "24/7 dispatch" },
    { label: "Water dry-out", href: "/water-dry-out", note: "Next step" },
    { label: "Pipe burst flooding", href: "/pipe-burst-flooding-and-remediation", note: "Common cause" },
  ],
  "water-dry-out": [
    { label: "Water extraction", href: "/water-extraction", note: "Standing water first" },
    { label: "Mold remediation", href: "/mold-remediation", note: "If drying was late" },
    { label: "Emergency water removal", href: "/emergency-water-removal", note: "24/7 dispatch" },
  ],
  "emergency-water-removal": [
    { label: "Water extraction", href: "/water-extraction", note: "Bulk removal" },
    { label: "Pipe burst flooding", href: "/pipe-burst-flooding-and-remediation", note: "Common cause" },
    { label: "Sewage clean-up", href: "/sewage-clean-up-services", note: "Contaminated water" },
  ],
  "ceiling-water-damage": [
    { label: "Roof water damage", href: "/roof-water-damage", note: "Trace the source" },
    { label: "Mold remediation", href: "/mold-remediation", note: "Cavity contamination" },
    { label: "Water damage repair", href: "/water-damage-repair", note: "Drywall rebuild" },
  ],
  "roof-water-damage": [
    { label: "Ceiling water damage", href: "/ceiling-water-damage", note: "Interior impact" },
    { label: "Water damage repair", href: "/water-damage-repair", note: "Interior rebuild" },
    { label: "Reconstruction", href: "/reconstruction", note: "Structural rebuild" },
  ],
  "pipe-burst-flooding-and-remediation": [
    { label: "Emergency water removal", href: "/emergency-water-removal", note: "24/7 dispatch" },
    { label: "Water extraction", href: "/water-extraction", note: "Bulk water first" },
    { label: "Sewage clean-up", href: "/sewage-clean-up-services", note: "If drain-line involved" },
  ],
  "sewage-clean-up-services": [
    { label: "Pipe burst flooding", href: "/pipe-burst-flooding-and-remediation", note: "Common cause" },
    { label: "Mold remediation", href: "/mold-remediation", note: "Downstream risk" },
    { label: "Reconstruction", href: "/reconstruction", note: "Rebuild after" },
  ],
  "fire-damage-restoration": [
    { label: "Smoke clean-up", href: "/smoke-clean-up", note: "Odor & soot" },
    { label: "Wildfire damage", href: "/wildfire", note: "Wildfire-specific" },
    { label: "Reconstruction", href: "/reconstruction", note: "Rebuild phase" },
  ],
  "smoke-clean-up": [
    { label: "Fire damage restoration", href: "/fire-damage-restoration", note: "Full restoration" },
    { label: "Wildfire damage", href: "/wildfire", note: "Wildfire smoke" },
    { label: "Reconstruction", href: "/reconstruction", note: "Rebuild phase" },
  ],
  wildfire: [
    { label: "Wildfire \u2014 Altadena", href: "/wildfire-altadena", note: "Local recovery" },
    { label: "Wildfire \u2014 Palisades", href: "/wildfire-palisades", note: "Local recovery" },
    { label: "Smoke clean-up", href: "/smoke-clean-up", note: "Interior smoke" },
  ],
  "wildfire-altadena": [
    { label: "All wildfire recovery", href: "/wildfire", note: "Full service overview" },
    { label: "Wildfire \u2014 Palisades", href: "/wildfire-palisades", note: "Neighboring recovery" },
    { label: "Smoke clean-up", href: "/smoke-clean-up", note: "Interior smoke" },
  ],
  "wildfire-palisades": [
    { label: "All wildfire recovery", href: "/wildfire", note: "Full service overview" },
    { label: "Wildfire \u2014 Altadena", href: "/wildfire-altadena", note: "Neighboring recovery" },
    { label: "Smoke clean-up", href: "/smoke-clean-up", note: "Interior smoke" },
  ],
  "mold-remediation": [
    { label: "Mold inspection", href: "/mold-inspection-services", note: "Not sure yet? Start here" },
    { label: "Mold testing", href: "/mold-testing-services", note: "Air & surface sampling" },
    { label: "Water damage", href: "/water-damage-restoration", note: "Address the source" },
  ],
  "mold-inspection-services": [
    { label: "Mold testing", href: "/mold-testing-services", note: "Lab confirmation" },
    { label: "Mold remediation", href: "/mold-remediation", note: "If found" },
    { label: "Ceiling water damage", href: "/ceiling-water-damage", note: "Common trigger" },
  ],
  "mold-testing-services": [
    { label: "Mold inspection", href: "/mold-inspection-services", note: "On-site walk" },
    { label: "Mold remediation", href: "/mold-remediation", note: "If levels elevated" },
    { label: "Ceiling water damage", href: "/ceiling-water-damage", note: "Common trigger" },
  ],
  reconstruction: [
    { label: "Water damage repair", href: "/water-damage-repair", note: "Post-water rebuild" },
    { label: "Fire damage restoration", href: "/fire-damage-restoration", note: "Post-fire rebuild" },
    { label: "Property damage mgmt", href: "/property-damage-management", note: "Full loss oversight" },
  ],
  "property-damage-management": [
    { label: "Reconstruction", href: "/reconstruction", note: "Rebuild phase" },
    { label: "Water damage", href: "/water-damage-restoration", note: "Common loss type" },
    { label: "Fire damage restoration", href: "/fire-damage-restoration", note: "Common loss type" },
  ],
};

const RELATED_OVERRIDES = {
  "water-damage-restoration": [
    "emergency-water-removal",
    "ceiling-water-damage",
    "water-damage-repair",
    "mold-remediation",
  ],
  "fire-damage-restoration": [
    "smoke-clean-up",
    "wildfire",
    "reconstruction",
    "water-damage-restoration",
  ],
  wildfire: [
    "wildfire-altadena",
    "wildfire-palisades",
    "smoke-clean-up",
    "fire-damage-restoration",
  ],
};

let touched = 0;
for (const [slug, cross] of Object.entries(CROSS)) {
  const file = path.join(dir, slug + ".json");
  if (!fs.existsSync(file)) {
    console.log("MISS:", slug);
    continue;
  }
  const j = JSON.parse(fs.readFileSync(file, "utf8"));
  j.crossLinks = cross;
  if (RELATED_OVERRIDES[slug]) j.relatedServices = RELATED_OVERRIDES[slug];
  fs.writeFileSync(file, JSON.stringify(j, null, 2) + "\n");
  touched++;
}
console.log("Updated", touched, "files");
