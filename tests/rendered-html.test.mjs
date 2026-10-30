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
  assert.match(html, /href="\/portfolio\/projects\/madinah\/"/);
  assert.match(html, /href="\/portfolio\/projects\/eventboard\/"/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/Madinah-Operations-Intelligence"/);
  assert.match(html, /href="https:\/\/github\.com\/youmnaeidh\/EventBoard"/);
  assert.match(html, /href="https:\/\/youmnaeidh\.github\.io\/EventBoard\/"/);
  assert.match(html, /href="\/portfolio\/Yomna-Alhejaili-CV\.pdf"/);
  assert.ok(existsSync(new URL("../Yomna-Alhejaili-CV.pdf", import.meta.url)));
});

test("EventBoard case study distinguishes team origins, independent rebuild and verified evidence", () => {
  const url = new URL("../projects/eventboard/index.html", import.meta.url);
  assert.ok(existsSync(url));
  const page = readFileSync(url, "utf8");
  assert.match(page, /EventBoard v2 — Case Study/);
  assert.match(page, /team graduation project/);
  assert.match(page, /independently/);
  for (const fact of ["89 tests", "3 seats", "synthetic", "10.23", "18.29", "800 synthetic events"]) {
    assert.ok(page.toLowerCase().includes(fact.toLowerCase()), `${fact} must be disclosed`);
  }
  for (const screenshot of ["home-desktop.png", "home-mobile.png", "organizer-desktop.png"]) {
    assert.ok(page.includes(screenshot), `${screenshot} must be shown`);
  }
  assert.match(page, /data-view="visitor" aria-pressed="true"/);
  assert.match(page, /data-view="organizer" aria-pressed="false"/);
  assert.match(page, /data-view="mobile" aria-pressed="false"/);
  assert.match(page, /EventBoard\/actions\/runs\/39154465651/);
  assert.match(page, /not real-world forecasting accuracy/i);
});

test("the Madinah case study preserves original evidence and revised trade-offs", () => {
  const caseStudyUrl = new URL("../projects/madinah/index.html", import.meta.url);
  assert.ok(existsSync(caseStudyUrl));
  const caseStudy = readFileSync(caseStudyUrl, "utf8");
  assert.match(caseStudy, /Madinah Operations Intelligence/);
  assert.match(caseStudy, /30,000/);
  assert.match(caseStudy, /synthetic data/i);
  assert.match(caseStudy, /not yet published in that original repository/);
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
