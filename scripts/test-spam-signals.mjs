#!/usr/bin/env node
/**
 * Tests the lead-form spam heuristics in `lib/spam-signals.ts`.
 *
 *   node scripts/test-spam-signals.mjs
 *
 * Why this exists: the content score runs against real restoration customers
 * mid-emergency, and a false positive silently deletes a job worth thousands.
 * The ALLOW cases below are the point of the file — they are the submissions
 * that must never be filtered, no matter how the patterns get tuned later.
 *
 * `lib/spam-signals.ts` is TypeScript using the `@/` path alias, so it is
 * transpiled to a temp directory first (with the one alias import rewritten)
 * and imported from there. Nothing is written inside the repo.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const outDir = mkdtempSync(join(tmpdir(), "gr-spam-signals-"));

function build() {
  // A config file rather than CLI flags: `paths` has no command-line form, and
  // spam-signals.ts imports site.ts through the `@/` alias.
  const tsconfigPath = join(outDir, "tsconfig.build.json");
  writeFileSync(
    tsconfigPath,
    JSON.stringify({
      compilerOptions: {
        outDir,
        module: "esnext",
        moduleResolution: "bundler",
        target: "es2022",
        lib: ["es2022"],
        skipLibCheck: true,
        removeComments: true,
        strict: true,
        baseUrl: repoRoot,
        paths: { "@/*": ["./*"] },
        rootDir: join(repoRoot, "lib"),
      },
      files: [
        join(repoRoot, "lib", "spam-signals.ts"),
        join(repoRoot, "lib", "site.ts"),
      ],
    }),
  );

  // Invoked through node against tsc's own entry point rather than the `tsc`
  // shim: on Windows, spawning the .cmd wrapper without a shell fails EINVAL.
  execFileSync(
    process.execPath,
    [
      createRequire(import.meta.url).resolve("typescript/bin/tsc"),
      "-p",
      tsconfigPath,
    ],
    { cwd: repoRoot, stdio: "inherit" },
  );

  // tsc preserves import specifiers verbatim, so the alias has to be rewritten
  // for Node's own resolver. There is exactly one.
  const emitted = join(outDir, "spam-signals.js");
  writeFileSync(
    emitted,
    readFileSync(emitted, "utf8").replace(/["']@\/lib\/site["']/g, '"./site.js"'),
  );

  // The temp dir has no package.json, so Node would read the ESM output as CJS.
  writeFileSync(join(outDir, "package.json"), JSON.stringify({ type: "module" }));
  return emitted;
}

const { scoreContent, SCORE_BLOCK_THRESHOLD } = await import(
  pathToFileURL(build()).href
);

/** A complete, ordinary submission. Cases override only what they exercise. */
const base = {
  name: "Maria Gonzalez",
  phone: "(951) 555-0147",
  email: "maria.gonzalez@gmail.com",
  address: "31672 Railroad Canyon Rd, Canyon Lake, CA 92587",
  description: "A pipe burst under my kitchen sink and the floor is soaked.",
  damageType: "Water Damage",
  timing: "Happening now",
  insurance: "Filing a claim",
};

const lead = (over) => ({ ...base, ...over });

// ---------------------------------------------------------------------------
// Must be delivered. Every one of these is a plausible real customer.
// ---------------------------------------------------------------------------
const ALLOW = [
  ["ordinary water damage lead", lead({})],
  [
    "compact form: only the three required fields",
    {
      name: "Dave Whitaker",
      phone: "9515550198",
      email: "dwhitaker@outlook.com",
      address: "",
      description: "",
      damageType: "Water Damage",
      timing: "",
      insurance: "",
    },
  ],
  ["accented, hyphenated name", lead({ name: "José Hernández-Ruiz" })],
  [
    "panicked all-caps message",
    lead({ description: "WATER EVERYWHERE IN MY KITCHEN PLEASE COME NOW!!!" }),
  ],
  ["very short name", lead({ name: "Ng Ly" })],
  [
    "Chinese-language description with a real phone",
    lead({ description: "我家厨房的水管爆了，地板全湿了，需要紧急帮助。" }),
  ],
  [
    "Korean-language description",
    lead({ name: "Kim Minseo", description: "주방 배관이 터져서 바닥이 물에 잠겼습니다." }),
  ],
  [
    "mentions finding the business on Google",
    lead({ description: "I found you on Google. Need someone out today please." }),
  ],
  [
    "the cold-pitch opener, from a real customer",
    lead({ description: "I came across your website and need emergency help now." }),
  ],
  [
    "repeats two contact emails in the message",
    lead({
      description:
        "Please reach me at maria.gonzalez@gmail.com or my husband at tomg@yahoo.com.",
    }),
  ],
  [
    "pastes one photo link of the damage",
    lead({
      description:
        "Here are photos of the damage: https://photos.app.goo.gl/abc123 - please advise.",
    }),
  ],
  ["leading 1 on the phone", lead({ phone: "1-951-555-0147" })],
  [
    "mentions an insurance loan and their claim",
    lead({ description: "My loan is through Chase and I am filing a claim today." }),
  ],
  [
    "stale option value from a cached tab",
    lead({ timing: "Yesterday", insurance: "" }),
  ],
  ["no optional selects at all", lead({ timing: "", insurance: "", address: "" })],
];

// ---------------------------------------------------------------------------
// Must be filtered.
// ---------------------------------------------------------------------------
const BLOCK = [
  [
    "SEO agency pitch",
    lead({
      name: "Rahul Sharma",
      description:
        "We offer SEO services and can rank your website on the first page of google. Interested in our backlinks package?",
    }),
  ],
  [
    "link in the name field",
    lead({ name: "https://cheap-casino.xyz", description: "visit us" }),
  ],
  [
    "pharma payload with a link",
    lead({ description: "buy cheap viagra now at http://pills.ru best prices" }),
  ],
  [
    "two links in the message",
    lead({ description: "check http://one.xyz and also http://two.top for details" }),
  ],
  ["BBCode markup", lead({ description: "[url=http://spam.ru]click me[/url]" })],
  ["keypad-run phone number", lead({ phone: "1234567890" })],
  ["all-same-digit phone", lead({ phone: "(000) 000-0000" })],
  [
    "keyboard-mash name plus malformed email",
    lead({ name: "Jwkqrtvxz Pldfghj", email: "zxcvbn@@qq" }),
  ],
  [
    "injected select values",
    lead({ damageType: "' OR 1=1 --", timing: "<script>alert(1)</script>" }),
  ],
  [
    "throwaway inbox plus a link",
    lead({
      email: "bot7741@mailinator.com",
      description: "great offer at https://promo.top act fast",
    }),
  ],
  [
    "cold pitch from a throwaway inbox",
    lead({
      email: "outreach9@guerrillamail.com",
      description: "I came across your website and wanted to reach out.",
    }),
  ],
  [
    "web design agency pitch",
    lead({ description: "We are a website design company offering a free quote." }),
  ],
  [
    "crypto spam",
    lead({ description: "Start bitcoin trading today and increase your revenue by 300%" }),
  ],
  [
    "same string pasted in name and message, bad email",
    lead({ name: "asdfghjkl", description: "asdfghjkl", email: "asdfghjkl" }),
  ],
];

// ---------------------------------------------------------------------------
// Name corpus.
//
// The machine-generated-name rule blocks on its own, so it gets its own
// corpus. REAL_NAMES is weighted to the service area: Spanish, Vietnamese,
// Korean and Chinese romanisations, plus the Armenian, Polish, German and
// South Asian surnames that trip naive "weird letters" heuristics. Every one
// of these must be delivered. Do not add a bigram to RARE_BIGRAMS without
// re-running this.
// ---------------------------------------------------------------------------
const REAL_NAMES = [
  // Observed real leads from GHL, 2026-10-21
  "madeleine braddock", "daniel wright", "frances newton", "amanda taylor",
  "jean tanner", "aaron gallagher",
  // Anglo
  "john smith", "elizabeth carpenter", "christopher wright", "kathleen mcgrath",
  "sean o'shaughnessy", "bartholomew whitfield",
  // Spanish
  "jose hernandez", "maria gonzalez", "guadalupe rodriguez", "francisco martinez",
  "esperanza gutierrez", "rosario espinoza", "ignacio bustamante",
  "concepcion villanueva", "juan carlos quintero",
  // Vietnamese
  "nguyen van thanh", "tran phuong", "huynh nhung", "pham quynh",
  "hoang xuan", "duong khanh", "nghiem trang", "thach nguyen",
  // Korean
  "minseo kim", "seoyeon park", "hyunwoo choi", "jeongho kwon",
  "seungmin hwang", "jiwoo baek",
  // Chinese romanisations
  "zhang wei", "zhuang xiong", "qiu zhuo", "kuang zheng", "xiaolong huang",
  "zhaoming liang",
  // Armenian
  "armen mkrtchyan", "hasmik hovhannisyan", "vartan khachatryan",
  "nareg harutyunyan",
  // Polish / Slavic
  "mike krzyzewski", "stanislaw wisniewski", "agnieszka szymanski",
  "pavel tkachenko", "antonin dvorak",
  // German / Jewish
  "hans schmidt", "rachel schwartz", "johann pfeiffer", "klaus zimmermann",
  // South Asian
  "ravi srinivasan", "anil bhattacharya", "priya venkatesh", "sunil chaudhary",
  // Other
  "olusegun adebayo", "kwame nkrumah", "sigrid bjornsdottir", "mehmet yilmaz",
];

const GENERATED_NAMES = [
  // The actual spam, from GHL enrollment history 2026-10-21
  "yzwxuafu gpomwlyf",
  "zgvtu nisgti",
  // Same generator, other draws
  "qxvbtlm zdwkrfp", "wzgtkv mxbqjl", "jvqxzmd pwkgtb",
  "asdfghjkl qwertyu",
];

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

let failures = 0;
const report = [];

function check(label, subject, expectBlocked) {
  const { score, signals } = scoreContent(subject);
  const blocked = score >= SCORE_BLOCK_THRESHOLD;
  const pass = blocked === expectBlocked;
  if (!pass) failures += 1;
  report.push(
    [
      pass ? "  ok  " : "  FAIL",
      (expectBlocked ? "block" : "allow").padEnd(5),
      String(score).padStart(3),
      label.padEnd(46),
      signals.join("+") || "-",
    ].join(" "),
  );
}

console.log(`\nthreshold = ${SCORE_BLOCK_THRESHOLD}\n`);
console.log("--- must be delivered ---");
for (const [label, subject] of ALLOW) check(label, subject, false);
console.log(report.splice(0).join("\n"));

console.log("\n--- must be filtered ---");
for (const [label, subject] of BLOCK) check(label, subject, true);
console.log(report.splice(0).join("\n"));

// The name corpus. Each name is scored on an otherwise-spotless submission, so
// the only thing that can block it is the name rule itself.
console.log("\n--- real names: must ALL be delivered ---");
const nameFailures = [];
for (const name of REAL_NAMES) {
  const { score, signals } = scoreContent(lead({ name }));
  if (score >= SCORE_BLOCK_THRESHOLD) {
    nameFailures.push(`${name} (${score}: ${signals.join("+")})`);
  }
}
if (nameFailures.length === 0) {
  console.log(`  ok   all ${REAL_NAMES.length} real names delivered`);
} else {
  failures += nameFailures.length;
  console.log(`  FAIL ${nameFailures.length} real name(s) blocked:`);
  for (const f of nameFailures) console.log(`       ${f}`);
}

console.log("\n--- machine-generated names: must ALL be filtered ---");
for (const name of GENERATED_NAMES) {
  check(`generated: ${name}`, lead({ name }), true);
}
console.log(report.splice(0).join("\n"));

rmSync(outDir, { recursive: true, force: true });

const total = ALLOW.length + BLOCK.length + REAL_NAMES.length + GENERATED_NAMES.length;
console.log(
  failures === 0
    ? `\nall ${total} cases passed\n`
    : `\n${failures} of ${total} cases FAILED\n`,
);
process.exit(failures === 0 ? 0 : 1);
