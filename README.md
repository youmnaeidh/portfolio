# Yomna Alhejaili — Data & Business Intelligence Portfolio

[View the live portfolio](https://youmnaeidh.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/yomna-alhejaili-0b3991216) · [Email](mailto:youmnaeidh@gmail.com)

A responsive portfolio of operations-led data analytics, business intelligence, responsible applied AI, and full-stack engineering. Selected work leads the page, supported by evaluation trade-offs and release evidence.

![Portfolio social preview](./og.png)

## Professional focus

I am a Full-Stack Web Development diploma graduate from Taibah University with practical experience in municipal operations monitoring. I use my technical foundation to organize data, build meaningful reporting, track performance, and communicate operational insights clearly.

I am targeting entry-level opportunities in:

- Data and Business Intelligence Analysis
- Reporting, KPI, and Performance Analysis
- Operations Analytics and Data Quality
- Junior Business Analysis and PMO
- Technology-enabled consulting and digital transformation

## Selected work

### Madinah Operations Intelligence

An end-to-end Power BI and predictive analytics case study using **30,000 privacy-safe synthetic service reports**.

**Tools:** Power BI, Power Query, DAX, Python, pandas, NumPy, and scikit-learn.

**Revised holdout evaluation (6,057 resolved reports):** 85.3% recall, 33.6% precision, and 0.6870 ROC-AUC. A time-based review excluded four unverified capacity features and corrected 645 labels that were not available at the original cutoffs. The revised threshold found 148 additional true positives at the cost of 611 additional false alerts. These are synthetic-data evaluation results, not demonstrated real-world effectiveness.

[Read the portfolio case study](https://youmnaeidh.github.io/portfolio/projects/madinah/) · [Source repository](https://github.com/youmnaeidh/Madinah-Operations-Intelligence)

### EventBoard v2

A full-stack Arabic events demo for Madinah with accounts, database-backed demo bookings, favorites, organizer analytics, hybrid recommendations, Arabic search, and synthetic-data registration forecasts.

**Tools:** React, TypeScript, Node/Express, PostgreSQL, Python/FastAPI, and scikit-learn. The frontend uses GitHub Pages; API and AI run on Render Free, with Neon Free PostgreSQL.

[Open the live project](https://youmnaeidh.github.io/EventBoard/) · [View the repository](https://github.com/youmnaeidh/EventBoard)

## Portfolio technology

- React and TypeScript
- vinext / Vite
- HTML5 and responsive CSS
- Git and GitHub Pages
- Open Graph metadata

## Project structure

```text
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── index.html
├── og.png
├── package.json
├── vite.config.ts
├── next.config.ts
├── tsconfig.json
└── README.md
```

`index.html` is the static GitHub Pages build. The React and TypeScript source is available under `app/`.

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm ci
npm run dev
```

## Build and test

```bash
npm run check  # lint, test the published HTML, and build the React source
```

The public GitHub Pages site currently serves the checked-in `index.html`.
`npm run build` verifies the React/vinext source but does **not** replace that
published HTML snapshot automatically. When editing page content, keep both
versions in sync until the deployment pipeline is unified.

## Project transparency

- Portfolio case studies clearly distinguish synthetic data from real operational experience.
- Madinah Operations Intelligence is an independent prototype, not an official municipal product.
- Predictive outputs are presented as decision support and require human review.
- EventBoard v2 combines transparent recommendation methods and a forecasting model trained on synthetic data. All bookings are demonstrations; model metrics do not establish real-world accuracy.

## Contact

**Yomna Alhejaili** — Junior Data & Business Intelligence Analyst, Saudi Arabia

- [Portfolio](https://youmnaeidh.github.io/portfolio/)
- [LinkedIn](https://www.linkedin.com/in/yomna-alhejaili-0b3991216)
- [Email](mailto:youmnaeidh@gmail.com)
