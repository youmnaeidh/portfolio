import assert from "node:assert/strict";
import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// vinext exports the page at /, but GitHub Pages hosts this repository at
// /portfolio/. Rewrite the generated asset references, leaving React as the
// single source of the homepage. Never edit the exported HTML by hand.
const output = resolve("dist/client");
const htmlFile = join(output, "index.html");
const flightFile = join(output, "index.rsc");
assert.ok(existsSync(htmlFile), "Static export must emit dist/client/index.html");
assert.ok(existsSync(flightFile), "Static export must emit dist/client/index.rsc");

for (const file of [htmlFile, flightFile]) {
  const input = readFileSync(file, "utf8");
  assert.match(input, /Yomna Alhejaili/);
  const text = input
    .replaceAll("/_next/", "/portfolio/_next/")
    .replaceAll('"/favicon.svg"', '"/portfolio/favicon.svg"');
  writeFileSync(file, text);
}

// Vite's generated module dependency map uses paths such as
// "_next/static/chunks/page-*.js". Its preload helper adds a leading slash,
// so the browser requests /_next/... even after the HTML has been rewritten.
// Scope those dependency entries to this repository's GitHub Pages base path.
const chunksDir = join(output, "_next", "static", "chunks");
assert.ok(existsSync(chunksDir), "Missing generated JavaScript chunks");
let rewrittenChunkCount = 0;
for (const entry of readdirSync(chunksDir)) {
  if (!entry.endsWith(".js")) continue;
  const path = join(chunksDir, entry);
  const source = readFileSync(path, "utf8");
  const updated = source.replaceAll('"_next/static/', '"portfolio/_next/static/');
  if (updated !== source) {
    writeFileSync(path, updated);
    rewrittenChunkCount++;
  }
}
assert.ok(rewrittenChunkCount > 0, "Expected Vite module dependency map to be rewritten");

for (const entry of ["projects", "Yomna-Alhejaili-CV.pdf", "og.png", "public/favicon.svg", "public/assets/projects"]) {
  const from = resolve(entry);
  assert.ok(existsSync(from), `Missing public portfolio asset: ${entry}`);
  const target = entry.startsWith("public/") ? entry.slice("public/".length) : entry;
  cpSync(from, join(output, target), { recursive: true });
}
writeFileSync(join(output, ".nojekyll"), "");

const html = readFileSync(htmlFile, "utf8");
assert.match(html, /href="\/portfolio\/projects\/madinah\/"/);
assert.match(html, /href="\/portfolio\/projects\/eventboard\/"/);
assert.match(html, /href="\/portfolio\/Yomna-Alhejaili-CV\.pdf"/);
assert.match(html, /\/portfolio\/_next\/static\//);
assert.match(html, /href="\/portfolio\/favicon\.svg"/);
assert.doesNotMatch(html, /href="\/favicon\.svg"/);
assert.doesNotMatch(html, /especially in Riyadh or Madinah|Open to junior roles/i);
assert.match(html, /Selected work connecting data analytics/);

console.log("GitHub Pages static artifact ready at dist/client");
