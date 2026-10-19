"use client";

import { useEffect, useRef, useState } from "react";

const content = {
  en: {
    name: "Yomna Alhejaili",
    role: "Data & Business Intelligence Analyst",
    nav: ["Profile", "Experience", "Work", "Capabilities"],
    eyebrow: "DATA & BUSINESS INTELLIGENCE ANALYST · AI · OPERATIONS",
    lead: "I turn operational complexity into clear decisions.",
    intro: "I am a Full-Stack Web Development graduate building my career at the intersection of data, AI, business intelligence, and public-sector operations.",
    workCta: "View selected work",
    proof: [
      ["My focus", "Data & Business Intelligence"],
      ["My strength", "Connecting Data to Operations"],
      ["My direction", "Data, BI & Applied AI"],
    ],
    profileKicker: "Profile", profileTitle: "A technical foundation, shaped by an operational point of view.",
    profileBody: ["I am a Full-Stack Web Development diploma graduate from Taibah University, with practical experience inside the Municipal Operations Monitoring Center at Al Madinah Region Municipality.", "My work sits between systems, data, and people: understanding how operations move, translating that movement into useful reporting, and presenting insights in a way decision-makers can act on."],
    focus: "Career focus", focusText: "Data, Business Intelligence, and technology-enabled consulting roles where analysis improves how organizations operate.",
    experienceKicker: "Experience", experienceTitle: "Where technology met the reality of city operations.",
    expRole: "Public Services Monitor Intern", expSub: "Operations Reporting & BI Support",
    expOrg: "Al Madinah Region Municipality", expDate: "Oct 2025 — Apr 2026",
    expPoints: ["I prepared operational reports and structured documentation for monitoring activities.", "I worked with Mumtathil and AutoMax in day-to-day operational follow-up.", "I supported performance monitoring across services and collaborating teams.", "I turned my internship context into an independent, privacy-safe BI case study."],
    workKicker: "Selected work", workTitle: "Case studies, not just screenshots.",
    workIntro: "I present each project through the context I explored, the decisions I made, and the business value I created.",
    caseLabel: "Case study", featured: "Featured",
    madinahTitle: "Madinah Operations Intelligence", madinahDesc: "I designed and built this end-to-end BI and applied AI case study, transforming 30,000 privacy-safe synthetic service reports into operational visibility and responsible predictive insight.",
    madinahAI: "Applied AI: I built and evaluated predictive models using Logistic Regression and AdaBoost, then selected a review threshold designed to support—not replace—human decision-making.",
    madinahStats: [["30K", "synthetic reports"], ["4", "dashboard pages"], ["69.3%", "Test ROC-AUC"]],
    madinahTags: ["Power BI", "Power Query", "DAX", "Python", "scikit-learn"],
    madinahNote: "Inspired by internship experience. This is an independent portfolio project using synthetic data—not an official municipal system.",
    github: "Explore on GitHub", live: "Open live project",
    eventTitle: "EventBoard v2", eventDesc: "I led the original Taibah University graduation project, then independently rebuilt EventBoard v2 as a full-stack Arabic events demo with accounts, bookings, favorites, organizer analytics, and a PostgreSQL database.",
    eventAI: "Applied AI: Hybrid recommendations, Arabic event search, demand-gap analysis, and registration forecasts run in a Python service without a paid LLM. Forecasts use synthetic training data; real-world predictive accuracy is not established.",
    eventStats: [["2023", "graduation project"], ["Lead", "team contribution"], ["Live", "web experience"]],
    eventTags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Python"],
    eventNote: "Independent portfolio upgrade of a team graduation project. All events, accounts, bookings, and analytics are demonstration data; demo tickets are not real reservations.",
    capabilitiesKicker: "Capabilities", capabilitiesTitle: "A clear view of what I can contribute today.",
    levels: ["Very good", "Good", "Foundation"],
    groups: [
      {title:"Business intelligence", items:["Power BI","Power Query","DAX","Data cleaning & analysis"], level:0},
      {title:"Web & workflow", items:["HTML","CSS","JavaScript","Git & GitHub"], level:0},
      {title:"Data foundations", items:["Excel","SQL","Python","Database design"], level:1},
      {title:"Emerging toolkit", items:["Angular","C# / ASP.NET","Azure","AI agents & RAG"], level:2},
    ],
    educationKicker: "Education", educationTitle: "Full-Stack Web Development", educationMeta: "Intermediate Diploma · Taibah University · 2024",
    educationBody: "My diploma gave me a multidisciplinary foundation spanning front-end development, systems thinking, databases, programming, and digital product delivery.",
    contactKicker: "Contact", contactTitle: "Let’s make information useful.", contactBody: "I’m open to opportunities in data, BI, consulting, and high-impact digital transformation.",
    email: "Send an email", linkedin: "LinkedIn", location: "Saudi Arabia", footer: "Designed and built for purposeful work.",
  }
};

function Arrow() { return <span aria-hidden="true">↗</span>; }


const eventSlides = [
  {
    "title": "Discover Madinah",
    "alt": "EventBoard home and event search",
    "src": "https://raw.githubusercontent.com/youmnaeidh/EventBoard/main/docs/screenshots/home-desktop.png",
    "position": "0%"
  },
  {
    "title": "Events tonight",
    "alt": "EventBoard event listings with dates and categories",
    "src": "https://raw.githubusercontent.com/youmnaeidh/EventBoard/main/docs/screenshots/home-desktop.png",
    "position": "15%"
  },
  {
    "title": "Personalized discovery",
    "alt": "EventBoard recommended events",
    "src": "https://raw.githubusercontent.com/youmnaeidh/EventBoard/main/docs/screenshots/home-desktop.png",
    "position": "45%"
  },
  {
    "title": "Organizer dashboard",
    "alt": "EventBoard organizer dashboard with synthetic analytics",
    "src": "https://raw.githubusercontent.com/youmnaeidh/EventBoard/main/docs/screenshots/organizer-desktop.png",
    "position": "0%"
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
      <div className="project-gallery-track" id="eventboard-gallery" ref={track} tabIndex={0} aria-label="Screenshots; swipe or use arrow keys"
        onScroll={() => { const el = track.current; if (el?.clientWidth) { activeSlide.current = Math.round(el.scrollLeft / el.clientWidth); setActive(activeSlide.current); } }}
        onKeyDown={e => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); }
          if (e.key === "Home") { e.preventDefault(); go(0); }
          if (e.key === "End") { e.preventDefault(); go(eventSlides.length - 1); }
        }}>
        {eventSlides.map((slide, index) => <figure className="gallery-slide" key={slide.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${eventSlides.length}: ${slide.title}`}>
          <div className="gallery-frame"><img src={slide.src} alt={slide.alt} style={{ objectPosition: `50% ${slide.position}` }} loading="lazy" decoding="async" draggable={false} /></div>
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
  const ids = ["profile", "experience", "work", "capabilities"];

  return (
    <main className="english">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={t.name}>YA</a>
        <nav className={menu ? "open" : ""} aria-label="Primary navigation">
          {t.nav.map((item, i) => <a key={item} onClick={() => setMenu(false)} href={'#' + ids[i]}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open menu"><i /><i /></button>
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

      <section className="section profile" id="profile">
        <p className="section-kicker">{t.profileKicker}</p>
        <div className="section-grid">
          <h2>{t.profileTitle}</h2>
          <div className="body-copy">{t.profileBody.map(p => <p key={p}>{p}</p>)}<div className="focus-card"><span>{t.focus}</span><p>{t.focusText}</p></div></div>
        </div>
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

      <section className="section work" id="work">
        <p className="section-kicker">{t.workKicker}</p>
        <div className="work-heading"><h2>{t.workTitle}</h2><p>{t.workIntro}</p></div>
        <article className="case featured-case">
          <div className="case-visual"><img src="https://yomna-alhejaili.youmnaeidh.chatgpt.site/projects/madinah/overview.png" alt="Madinah Operations Intelligence Power BI overview" /><span className="feature-pill">{t.featured}</span></div>
          <div className="case-content"><p className="case-number">01 / {t.caseLabel}</p><h3>{t.madinahTitle}</h3><p className="case-desc">{t.madinahDesc}</p><div className="ai-callout"><span>AI / PREDICTIVE ANALYTICS</span><p>{t.madinahAI}</p></div>
            <div className="case-stats">{t.madinahStats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
            <div className="tags">{t.madinahTags.map(x=><span key={x}>{x}</span>)}</div><p className="case-note">{t.madinahNote}</p>
            <a className="text-link" href="https://github.com/youmnaeidh/Madinah-Operations-Intelligence" target="_blank" rel="noreferrer">{t.github}<Arrow /></a>
          </div>
        </article>
        <article className="case reverse">
          <EventGallery />
          <div className="case-content"><p className="case-number">02 / {t.caseLabel}</p><h3>{t.eventTitle}</h3><p className="case-desc">{t.eventDesc}</p><div className="ai-callout"><span>AI / RECOMMENDATION LOGIC</span><p>{t.eventAI}</p></div>
            <div className="case-stats">{t.eventStats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div>
            <div className="tags">{t.eventTags.map(x=><span key={x}>{x}</span>)}</div><p className="case-note">{t.eventNote}</p>
            <div className="link-row"><a className="text-link" href="https://youmnaeidh.github.io/EventBoard/" target="_blank" rel="noreferrer">{t.live}<Arrow /></a><a className="text-link subtle" href="https://github.com/youmnaeidh/EventBoard" target="_blank" rel="noreferrer">GitHub<Arrow /></a></div>
          </div>
        </article>
      </section>

      <section className="section capabilities" id="capabilities">
        <p className="section-kicker">{t.capabilitiesKicker}</p><div className="cap-head"><h2>{t.capabilitiesTitle}</h2><div className="legend">{t.levels.map((l,i)=><span key={l}><i className={'dot d'+i}/>{l}</span>)}</div></div>
        <div className="cap-grid">{t.groups.map(g=><article key={g.title}><p>{g.title}</p><ul>{g.items.map(item=><li key={item}>{item}<i className={'level l'+g.level}/></li>)}</ul></article>)}</div>
      </section>

      <section className="section education"><p className="section-kicker">{t.educationKicker}</p><div className="education-row"><div><h2>{t.educationTitle}</h2><p className="edu-meta">{t.educationMeta}</p></div><p>{t.educationBody}</p></div></section>

      <footer className="contact" id="contact">
        <p className="section-kicker">{t.contactKicker}</p><div className="contact-main"><div><h2>{t.contactTitle}</h2><p>{t.contactBody}</p></div>
          <div className="contact-links"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=youmnaeidh@gmail.com&su=Portfolio%20Inquiry" target="_blank" rel="noreferrer">{t.email}<Arrow /></a><a href="https://www.linkedin.com/in/yomna-alhejaili-0b3991216" target="_blank" rel="noreferrer">{t.linkedin}<Arrow /></a><a href="/portfolio/Yomna-Alhejaili-CV.pdf" download>Download CV <span>↓</span></a><span>{t.location}</span></div>
        </div><div className="footer-line"><span>© {new Date().getFullYear()} {t.name}</span><span>{t.footer}</span><a href="#top">↑</a></div>
      </footer>
    </main>
  );
}

