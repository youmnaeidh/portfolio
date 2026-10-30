import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

// GitHub Pages serves this checked-in snapshot. Keep basic recruiter journeys
// working even when the React source or gallery implementation changes.
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("the published page identifies Yomna and exposes selected work", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Yomna Alhejaili/);
  assert.match(html, /<h1>Yomna Alhejaili<\/h1>/);
  assert.match(html, /id="work"/);
  assert.match(html, /Madinah Operations Intelligence/);
  assert.match(html, /EventBoard v2/);
});

test("a recruiter can reach projects and download the published CV", () => {
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/Madinah-Operations-Intelligence"/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/EventBoard"/);
  assert.match(html, /href="https:\/\/youmnaeidh\.github\.io\/EventBoard\/"/);
  assert.match(html, /href="\/portfolio\/Yomna-Alhejaili-CV\.pdf"/);
  assert.ok(existsSync(new URL("../Yomna-Alhejaili-CV.pdf", import.meta.url)));
});

test("the EventBoard screenshot gallery retains four accessible slides", () => {
  assert.equal((html.match(/class="gallery-slide"/g) ?? []).length, 4);
  assert.equal((html.match(/class="gallery-dot"/g) ?? []).length, 4);
  assert.match(html, /aria-label="Previous screenshot"/);
  assert.match(html, /aria-label="Next screenshot"/);
  assert.match(html, /aria-live="polite"/);
});

test("social previews disclose the actual portfolio URL", () => {
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta property="og:image"/);
  assert.match(html, /https:\/\/youmnaeidh\.github\.io\/portfolio\/og\.png/);
});
