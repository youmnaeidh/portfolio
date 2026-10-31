import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";

// Test the exact static export uploaded by the GitHub Pages workflow.
// The homepage is generated from app/page.tsx, never edited separately.
const html = readFileSync(new URL("../dist/client/index.html", import.meta.url), "utf8");

test("the published page identifies Yomna and exposes selected work", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<title>Yomna Alhejaili/);
  assert.match(html, /<h1>Yomna Alhejaili<\/h1>/);
  assert.match(html, /id="work"/);
  assert.match(html, /Madinah Operations Intelligence/);
  assert.match(html, /EventBoard v2/);
});

test("a recruiter can reach projects and download the published CV", () => {
  assert.match(html, /href="\/portfolio\/projects\/madinah\/"/);
  assert.match(html, /href="\/portfolio\/projects\/eventboard\/"/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/Madinah-Operations-Intelligence"/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/EventBoard"/);
  assert.match(html, /href="https:\/\/youmnaeidh\.github\.io\/EventBoard\/"/);
  assert.match(html, /href="\/portfolio\/Yomna-Alhejaili-CV\.pdf"/);
  assert.ok(existsSync(new URL("../dist/client/Yomna-Alhejaili-CV.pdf", import.meta.url)));
});

test("EventBoard case study distinguishes team origins, independent rebuild and verified evidence", () => {
  const url = new URL("../dist/client/projects/eventboard/index.html", import.meta.url);
  assert.ok(existsSync(url));
  const page = readFileSync(url, "utf8");
  assert.match(page, /EventBoard v2 — Case Study/);
  assert.match(page, /team graduation project/);
  assert.match(page, /independently/);
  for (const fact of ["89 tests", "3 seats", "synthetic", "10.23", "18.29", "800 synthetic events"]) {
    assert.ok(page.toLowerCase().includes(fact.toLowerCase()), `${fact} must be disclosed`);
  }
  for (const screenshot of ["home-desktop.png", "event-detail.png", "booking-confirmation.png", "home-mobile.png", "organizer-desktop.png"]) {
    assert.ok(page.includes(screenshot), `${screenshot} must be shown`);
  }
  assert.equal((page.match(/<figure><a href="https:\/\/github\.com\/youmnaeidh\/EventBoard\/blob\/main\/docs\/screenshots\//g) ?? []).length, 4);
  assert.match(page, /aria-label="Four EventBoard project screenshots"/);
  assert.match(page, /id="gallery-prev" aria-label="Previous screenshot"/);
  assert.match(page, /id="gallery-next" aria-label="Next screenshot"/);
  assert.match(page, /captured before the test cancelled its booking/i);
  assert.match(page, /data-view="booking" aria-pressed="false"/);
  assert.match(page, /data-view="visitor" aria-pressed="true"/);
  assert.match(page, /data-view="organizer" aria-pressed="false"/);
  assert.match(page, /data-view="mobile" aria-pressed="false"/);
  assert.match(page, /EventBoard\/actions\/runs\/39154465651/);
  assert.match(page, /not real-world forecasting accuracy/i);
});

test("the Madinah case study preserves original evidence and revised trade-offs", () => {
  const caseStudyUrl = new URL("../dist/client/projects/madinah/index.html", import.meta.url);
  assert.ok(existsSync(caseStudyUrl));
  const caseStudy = readFileSync(caseStudyUrl, "utf8");
  assert.match(caseStudy, /Madinah Operations Intelligence/);
  assert.match(caseStudy, /30,000/);
  assert.match(caseStudy, /synthetic data/i);
  assert.match(caseStudy, /Madinah-Operations-Intelligence\/pull\/1/);
  assert.match(caseStudy, /documentation\/validation-comparison\.json/);
  assert.match(caseStudy, /ai-model\/AI-MODEL-CARD\.md/);
  assert.match(caseStudy, /ai-model\/reproduce_remediation\.py/);
  assert.match(caseStudy, /open and unmerged/);
  assert.doesNotMatch(caseStudy, /not yet published in that original repository/);
  for (const screenshot of ["01-overview.png", "02-operations.png", "03-ai-insights.png", "04-project-info.png"]) {
    assert.ok(caseStudy.includes(screenshot), screenshot);
  }
  for (const measurement of ["76.6%", "85.3%", "36.6%", "33.6%", "0.6927", "0.6870", "2,250", "2,861"]) {
    assert.ok(caseStudy.includes(measurement), measurement);
  }
  assert.match(caseStudy, /data-version="baseline"/);
  assert.match(caseStudy, /data-version="revised"/);
  assert.match(caseStudy, /aria-pressed/);
});

test("the homepage footer offers a direct GitHub profile link", () => {
  const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /href="https:\/\/github\.com\/youmnaeidh" target="_blank" rel="noopener noreferrer">GitHub/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh"[^>]*>GitHub/);
});

test("Madinah uses the same editorial case-study system as EventBoard", () => {
  const madinah = readFileSync(new URL("../dist/client/projects/madinah/index.html", import.meta.url), "utf8");
  const eventboard = readFileSync(new URL("../dist/client/projects/eventboard/index.html", import.meta.url), "utf8");
  for (const structure of ['class="hero"', 'class="hero-sticky"', 'class="ticket"', 'class="receipt"', 'class="views wrap"', 'class="gallery"', 'class="closing"']) {
    assert.ok(eventboard.includes(structure), "EventBoard lacks "+structure);
    assert.ok(madinah.includes(structure), "Madinah lacks "+structure);
  }
  assert.equal((madinah.match(/<figure><a href="https:\/\/github\.com\/youmnaeidh\/Madinah-Operations-Intelligence\/blob\/main\/screenshots\//g) ?? []).length, 4);
  assert.match(madinah, /aria-label="Four Madinah Power BI project screenshots"/);
  assert.match(madinah, /id="gallery-prev" aria-label="Previous screenshot"/);
  assert.match(madinah, /id="gallery-next" aria-label="Next screenshot"/);
  assert.match(madinah, /data-view="overview" aria-pressed="true"/);
  assert.match(madinah, /data-view="operations" aria-pressed="false"/);
  assert.match(madinah, /data-version="baseline" aria-pressed="false"/);
  assert.match(madinah, /data-version="revised" aria-pressed="true"/);
  assert.match(madinah, /original Power BI prototype/i);
  assert.match(madinah, /not an official municipal system/i);
});

test("the EventBoard screenshot gallery retains four accessible slides", () => {
  assert.equal((html.match(/class="gallery-slide"/g) ?? []).length, 4);
  assert.equal((html.match(/class="gallery-dot"/g) ?? []).length, 4);
  assert.match(html, /aria-label="Previous screenshot"/);
  assert.match(html, /aria-label="Next screenshot"/);
  assert.match(html, /aria-live="polite"/);
});

test("homepage project images are compressed, local and dimensioned", () => {
  const assets = [
    "eventboard-discover.webp",
    "eventboard-events.webp",
    "eventboard-personalized.webp",
    "eventboard-organizer.webp",
    "madinah-overview.webp",
  ];
  for (const asset of assets) {
    assert.match(html, new RegExp(`/portfolio/assets/projects/${asset.replace('.', '\\.')}`));
    assert.ok(existsSync(new URL(`../dist/client/assets/projects/${asset}`, import.meta.url)), asset);
  }
  assert.doesNotMatch(html, /raw\.githubusercontent\.com\/youmnaeidh\/EventBoard\/main\/docs\/screenshots/);
  assert.doesNotMatch(html, /yomna-alhejaili\.youmnaeidh\.chatgpt\.site\/projects\/madinah\/overview\.png/);
  assert.match(html, /width="1080" height="810"/);
  assert.match(html, /width="1200" height="690"/);
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.featured-case \.case-visual img\{width:100%;height:auto\}/);
});

test("social previews disclose the actual portfolio URL", () => {
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<meta property="og:image"/);
  assert.match(html, /https:\/\/youmnaeidh\.github\.io\/portfolio\/og\.png/);
});

test("JavaScript dependency preloads stay under the /portfolio/ base path", () => {
  const chunksDir = new URL("../dist/client/_next/static/chunks/", import.meta.url);
  const chunks = readdirSync(chunksDir)
    .filter((filename) => filename.endsWith(".js"))
    .map((filename) => readFileSync(new URL(filename, chunksDir), "utf8"));
  assert.ok(chunks.some((chunk) => chunk.includes('"portfolio/_next/static/chunks/')));
  for (const chunk of chunks) {
    assert.doesNotMatch(chunk, /["']_next\/static\/chunks\//);
  }
});

test("recruiter sees relevant work before background sections", () => {
  assert.ok(html.indexOf('id="work"') < html.indexOf('id="experience"'));
  assert.ok(html.indexOf('id="experience"') < html.indexOf('id="profile"'));
  assert.match(html, /<nav[^>]*>\s*<a href="#work">Work<\/a>/);
  assert.match(html, /I build insight for operational decisions\./);
});

test("project claims carry current test evidence and caveats", () => {
  for (const fact of ["85.3%", "33.6%", "6,057", "611 more false alerts", "0.6870", "89 release tests"]) {
    assert.ok(html.includes(fact), fact + " should be visible");
  }
  assert.doesNotMatch(html, /69\.3%/);
  assert.match(html, /not an official municipal system/);
  assert.match(html, /tickets are not real reservations/);
});

test("capabilities and contact prioritise evidence and accessibility", () => {
  assert.match(html, /Skills demonstrated through projects/);
  assert.doesNotMatch(html, /Very good|Foundation<\/span>|class="level l[012]"/);
  assert.match(html, /href="mailto:youmnaeidh@gmail\.com\?subject=Portfolio%20Inquiry"/);
  assert.doesNotMatch(html, /mail\.google\.com\/mail/);
});

test("generated homepage keeps React positioning and does not list preferred job cities", () => {
  const source = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const fact of [
    "DATA ANALYST · BUSINESS INTELLIGENCE · APPLIED AI",
    "With a full-stack engineering foundation and municipal operations experience, I build BI dashboards, evaluate predictive models, and translate analysis into operational decisions.",
    "Selected work connecting data analytics, business intelligence, and applied AI with practical operational questions.",
  ]) {
    assert.ok(source.includes(fact), "React source missing: " + fact);
    assert.ok(html.includes(fact), "Exported homepage missing: " + fact);
  }
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.menu-button::before\{content:"Menu"/);
  assert.doesNotMatch(html, /especially in Riyadh or Madinah|Open to junior roles/i);
  assert.match(html, /href="\/portfolio\/_next\/static\//);
  assert.ok(existsSync(new URL("../dist/client/index.rsc", import.meta.url)));
  assert.ok(existsSync(new URL("../dist/client/projects/madinah/index.html", import.meta.url)));
  assert.ok(existsSync(new URL("../dist/client/projects/eventboard/index.html", import.meta.url)));
});
