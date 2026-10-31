"use client";

import { useEffect, useRef, useState } from "react";

const content = {
  en: {
    name: "Yomna Alhejaili",
    role: "Data & Business Intelligence Analyst",
    nav: ["Work", "Experience", "Profile", "Capabilities"],
    eyebrow: "DATA ANALYST · BUSINESS INTELLIGENCE · APPLIED AI",
    lead: "I build BI and data tools around operational questions.",
    intro: "I studied full-stack web development and trained in municipal operations monitoring. I now use Power BI, Python and web engineering to examine SLA risk, explain model trade-offs and build dependable user flows.",
    workCta: "View selected work",
    proof: [
      ["Municipal analytics", "30K synthetic service reports"],
      ["Model evaluation", "6,057 resolved test reports"],
      ["Full-stack delivery", "89 release tests on EventBoard"],
    ],
    profileKicker: "Profile", profileTitle: "A builder’s approach to data.",
    profileBody: ["My diploma at Taibah University taught me how frontends, APIs and databases fit together. Training in Al Madinah Region Municipality’s operations monitoring center taught me to understand the service workflow before deciding what to measure.", "In independent projects, I pay attention to metric definitions, when each ML input becomes available and what it would cost a team to act on a prediction. Those details matter as much as the dashboard or model itself."],
    focus: "Career focus", focusText: "Data analytics, business intelligence and applied AI roles that connect technical implementation with business and operational questions.",
    experienceKicker: "Experience", experienceTitle: "Inside municipal operations.",
    expRole: "General Services Monitor (Trainee)", expSub: "Operations Reporting & BI Support",
    expOrg: "Al Madinah Region Municipality", expDate: "Oct 2025 — Apr 2026",
    expPoints: ["Prepared operational reports and maintained structured records for service monitoring and follow-up.", "Used Mumtathil and AutoMax to review service-report status and track progress through the municipal workflow.", "Followed open, in-progress, closed and overdue reports against service timelines and inspector assignments.", "Used that workflow experience to design a separate BI case study with entirely synthetic service reports."],
    workKicker: "Selected work", workTitle: "Work and evidence.",
    workIntro: "One project examines SLA risk and municipal workloads; the other builds an event-booking platform. Both document the decisions, tests and limitations behind the result.",
    caseLabel: "Case study", featured: "Featured",
    madinahTitle: "Madinah Operations Intelligence", madinahDesc: "A BI and ML case study using 30,000 synthetic municipal reports to examine service status, SLA deadlines, team capacity and which predicted breaches merit review.",
    madinahAI: "I revised the evaluation after finding four capacity features that could not be verified at report creation and 645 labels unavailable at their original cutoffs. On the same 6,057 resolved test reports, recall rose from 76.6% to 85.3% while precision fell from 36.6% to 33.6%—148 more true positives, but 611 additional false alerts.",
    madinahStats: [["30K", "synthetic reports"], ["85.3%", "revised test recall"], ["33.6%", "revised test precision"]],
    madinahTags: ["Power BI", "Power Query", "DAX", "Python", "scikit-learn"],
    madinahNote: "Revised ROC-AUC: 0.6870. This is a retrospective experiment on synthetic data, not an official municipal system. The extra review workload still needs operational validation.",
    github: "Explore on GitHub", live: "Open live project", caseStudyLink: "Read the case study",
    eventTitle: "EventBoard v2", eventDesc: "I led the original graduation-project team, then independently rebuilt EventBoard as an Arabic-first event platform. The working demo includes role-based accounts, transactional bookings, favorites and organizer reporting backed by PostgreSQL.",
    eventAI: "The Python service supports Arabic event search, hybrid recommendations with explanations, demand-gap exploration and experimental registration forecasts. Forecasts were evaluated on synthetic events; real-user ranking quality and forecasting accuracy remain unverified.",
    eventStats: [["89", "tests in release CI"], ["3", "seats protected under 6 booking requests"], ["Live", "full-stack demo"]],
    eventTags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Python"],
    eventNote: "Events and bookings are demonstration data; tickets are not real reservations. Release checks cover the API, browser and AI flows, but do not establish production-scale reliability.",
    capabilitiesKicker: "Capabilities", capabilitiesTitle: "Skills demonstrated through projects.",
    groups: [
      {title:"Business intelligence", items:["Power BI and DAX","Power Query and data validation","KPI and SLA reporting","Dashboard storytelling"]},
      {title:"Applied data and ML", items:["Python and scikit-learn","Time-based model evaluation","Precision–recall trade-offs","Data quality checks"]},
      {title:"Full-stack engineering", items:["React and TypeScript","Node.js and Express","PostgreSQL and SQL","API integration and testing"]},
      {title:"Operations and delivery", items:["Service monitoring workflows","Stakeholder-ready reporting","Technical documentation","GitHub Actions and CI"]},
    ],
    educationKicker: "Education", educationTitle: "Full-Stack Web Development", educationMeta: "Intermediate Diploma · Taibah University · 2024",
    educationBody: "The program covered frontend and backend development, programming, databases and the process of building and delivering working web applications.",
    contactKicker: "Contact", contactTitle: "Let’s talk about the work.", contactBody: "I’m interested in data analytics, business intelligence and applied AI opportunities that combine technical work with operational questions. Email or LinkedIn is the best way to reach me.",
    email: "Send an email", linkedin: "LinkedIn", location: "Saudi Arabia", footer: "Independent case studies · Public source code"
  }
};

function Arrow() { return <span aria-hidden="true">↗</span>; }


const eventSlides = [
  {
    "title": "Discover Madinah",
    "alt": "EventBoard home and event search",
    "src": "/portfolio/assets/projects/eventboard-discover.webp"
  },
  {
    "title": "Events tonight",
    "alt": "EventBoard event listings with dates and categories",
    "src": "/portfolio/assets/projects/eventboard-events.webp"
  },
  {
    "title": "Personalized discovery",
    "alt": "EventBoard recommended events",
    "src": "/portfolio/assets/projects/eventboard-personalized.webp"
  },
  {
    "title": "Organizer dashboard",
    "alt": "EventBoard organizer dashboard with synthetic analytics",
    "src": "/portfolio/assets/projects/eventboard-organizer.webp"
  }
];

function EventGallery() {
  const track = useRef<HTMLDivElement>(null);
  const activeSlide = useRef(0);
  const [active, setActive] = useState(0);
  const go = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(eventSlides.length - 1, index));
    el.scrollTo({ left: next * el.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(() => el.scrollTo({ left: activeSlide.current * el.clientWidth, behavior: "instant" }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section className="case-visual event-visual project-gallery" aria-label="EventBoard screenshots" aria-roledescription="carousel">
      {/* Intentionally focusable scroll region: Arrow keys, Home and End operate the gallery. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <div className="project-gallery-track" id="eventboard-gallery" ref={track} tabIndex={0} aria-label="Screenshots; swipe or use arrow keys"
        onScroll={() => { const el = track.current; if (el?.clientWidth) { activeSlide.current = Math.round(el.scrollLeft / el.clientWidth); setActive(activeSlide.current); } }}
        onKeyDown={e => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
          if (e.key === "Home") { e.preventDefault(); go(0); }
          if (e.key === "End") { e.preventDefault(); go(eventSlides.length - 1); }
        }}>
        {eventSlides.map((slide, index) => <figure className="gallery-slide" key={slide.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${eventSlides.length}: ${slide.title}`}>
          <div className="gallery-frame"><img src={slide.src} alt={slide.alt} width={1080} height={810} loading="lazy" decoding="async" draggable={false} /></div>
          <figcaption>{slide.title}</figcaption>
        </figure>)}
      </div>
      <div className="gallery-controls">
        <button type="button" aria-label="Previous screenshot" aria-controls="eventboard-gallery" disabled={active === 0} onClick={() => go(active - 1)}>←</button>
        <div className="gallery-dots">{eventSlides.map((slide, index) => <button type="button" className="gallery-dot" key={slide.title} aria-label={`Show screenshot ${index + 1}: ${slide.title}`} aria-controls="eventboard-gallery" aria-current={active === index ? "true" : undefined} onClick={() => go(index)} />)}</div>
        <button type="button" aria-label="Next screenshot" aria-controls="eventboard-gallery" disabled={active === eventSlides.length - 1} onClick={() => go(active + 1)}>→</button>
      </div>
      <div className="gallery-meta"><span>Swipe or use arrows</span><span className="gallery-count" aria-live="polite" aria-atomic="true">{active + 1} / {eventSlides.length}</span></div>
    </section>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const t = content.en;
  const ids = ["work", "experience", "profile", "capabilities"];

  return (
    <main className="english">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={t.name}>YA</a>
        <nav id="primary-navigation" className={menu ? "open" : ""} aria-label="Primary navigation">
          {t.nav.map((item, i) => <a key={item} onClick={() => setMenu(false)} href={'#' + ids[i]}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="primary-navigation" aria-label={menu ? "Close menu" : "Open menu"}><i /><i /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="contour contour-one" /><div className="contour contour-two" /><div className="contour contour-three" />
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.name}</h1>
        <div className="hero-copy">
          <p className="lead">{t.lead}</p><p className="intro">{t.intro}</p>
          <div className="actions"><a className="button primary" href="#work">{t.workCta}<span>↘</span></a><a className="button cv-button" href="/portfolio/Yomna-Alhejaili-CV.pdf" download>Download CV <span>↓</span></a></div>
        </div>
      </section>

      <section className="proof-strip">{t.proof.map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}</section>

      <section className="section work" id="work">
        <p className="section-kicker">{t.workKicker}</p>
        <div className="work-heading"><h2>{t.workTitle}</h2><p>{t.workIntro}</p></div>
        <article className="case featured-case">
          <div className="case-visual"><img src="/portfolio/assets/projects/madinah-overview.webp" alt="Madinah Operations Intelligence Power BI overview" width={1200} height={690} loading="lazy" decoding="async" /><span className="feature-pill">{t.featured}</span></div>
          <div className="case-content"><p className="case-number">01 / {t.caseLabel}</p><h3>{t.madinahTitle}</h3><p className="case-desc">{t.madinahDesc}</p><div className="ai-callout"><span>AI / PREDICTIVE ANALYTICS</span><p>{t.madinahAI}</p></div>
            <div className="case-stats">{t.madinahStats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
            <div className="tags">{t.madinahTags.map(x=><span key={x}>{x}</span>)}</div><p className="case-note">{t.madinahNote}</p>
            <div className="link-row"><a className="text-link" href="/portfolio/projects/madinah/">{t.caseStudyLink}<Arrow /></a><a className="text-link subtle" href="https://github.com/youmnaeidh/Madinah-Operations-Intelligence" target="_blank" rel="noreferrer">GitHub<Arrow /></a></div>
          </div>
        </article>
        <article className="case reverse">
          <EventGallery />
          <div className="case-content"><p className="case-number">02 / {t.caseLabel}</p><h3>{t.eventTitle}</h3><p className="case-desc">{t.eventDesc}</p><div className="ai-callout"><span>AI / RECOMMENDATION LOGIC</span><p>{t.eventAI}</p></div>
            <div className="case-stats">{t.eventStats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
            <div className="tags">{t.eventTags.map(x=><span key={x}>{x}</span>)}</div><p className="case-note">{t.eventNote}</p>
            <div className="link-row"><a className="text-link" href="/portfolio/projects/eventboard/">{t.caseStudyLink}<Arrow /></a><a className="text-link subtle" href="https://youmnaeidh.github.io/EventBoard/" target="_blank" rel="noreferrer">Live demo<Arrow /></a><a className="text-link subtle" href="https://github.com/youmnaeidh/EventBoard" target="_blank" rel="noreferrer">GitHub<Arrow /></a></div>
          </div>
        </article>
      </section>

      <section className="section dark experience" id="experience">
        <p className="section-kicker">{t.experienceKicker}</p>
        <div className="section-grid"><h2>{t.experienceTitle}</h2>
          <div className="experience-card">
            <div className="experience-head"><div><h3>{t.expRole}</h3><p>{t.expSub}</p></div><p>{t.expDate}</p></div>
            <p className="org">{t.expOrg}</p>
            <ol>{t.expPoints.map((p,i)=><li key={p}><span>0{i+1}</span>{p}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section profile" id="profile">
        <p className="section-kicker">{t.profileKicker}</p>
        <div className="section-grid">
          <h2>{t.profileTitle}</h2>
          <div className="body-copy">{t.profileBody.map(p => <p key={p}>{p}</p>)}<div className="focus-card"><span>{t.focus}</span><p>{t.focusText}</p></div></div>
        </div>
      </section>

      <section className="section capabilities" id="capabilities">
        <p className="section-kicker">{t.capabilitiesKicker}</p><div className="cap-head"><h2>{t.capabilitiesTitle}</h2></div>
        <div className="cap-grid">{t.groups.map(g=><article key={g.title}><p>{g.title}</p><ul>{g.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="section education"><p className="section-kicker">{t.educationKicker}</p><div className="education-row"><div><h2>{t.educationTitle}</h2><p className="edu-meta">{t.educationMeta}</p></div><p>{t.educationBody}</p></div></section>

      <footer className="contact" id="contact">
        <p className="section-kicker">{t.contactKicker}</p><div className="contact-main"><div><h2>{t.contactTitle}</h2><p>{t.contactBody}</p></div>
          <div className="contact-links"><a href="mailto:youmnaeidh@gmail.com?subject=Portfolio%20Inquiry">{t.email}<Arrow /></a><a href="https://www.linkedin.com/in/yomna-alhejaili-0b3991216" target="_blank" rel="noreferrer">{t.linkedin}<Arrow /></a><a href="https://github.com/youmnaeidh" target="_blank" rel="noopener noreferrer">GitHub<Arrow /></a><a href="/portfolio/Yomna-Alhejaili-CV.pdf" download>Download CV <span>↓</span></a><span>{t.location}</span></div>
        </div><div className="footer-line"><span>© {new Date().getFullYear()} {t.name}</span><span>{t.footer}</span><a href="#top">↑</a></div>
      </footer>
    </main>
  );
}

