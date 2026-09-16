# exekova site

The standalone Next.js site for exekova: the homepage plus platform, solutions, use-case, industry, company and legal pages. **Get. Set. Done.**

## Run and verify

```sh
npm install
npm run dev             # http://localhost:3200
npm run typecheck
npm test
npm run build
npm start               # production preview on port 3200
npm run test:browser     # against the running preview
npm run test:design      # measured reference geometry and screenshots
```

The browser suite uses Playwright Core with local Chrome on macOS. Elsewhere, set `CHROME_PATH` to a Chromium executable, or install a browser with `npx playwright-core install chromium`. Override the preview URL with `BETA_QA_URL` and the screenshot/results directory with `BETA_QA_OUTPUT`.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/beta/components/` | Homepage chapters, the global header, demos, integrations, request form |
| `src/site/components/SiteFooter.tsx`, `AnnouncementBar.tsx`, `src/site/styles/frame.css` | The exekova.com footer and announcement bar, ported as-is; configured in `content/site.json` |
| `src/beta/content/` | Homepage copy, chapters (roles, industries, governance) and homepage metadata |
| `src/beta/data/` | Connector statuses, examples, stages, offer, FAQs, request serialization |
| `src/beta/styles/` | Beta controls, chapters, responsive layout and reference geometry |
| `src/beta/tests/` | Component/unit tests and browser QA |
| `src/beta/metadata.ts` | Homepage metadata and structured-data composition |
| `src/site/components/` | Page building blocks shared by every route outside the homepage: hero, cards, feature rows, record card, steps, FAQ accordion, legal document, CTA band, pricing band, contact form, cookie settings |
| `src/site/data/` | Industries, use cases, solutions by function, leader pages and the two long-form scenarios (all imported from the exekova.com content layer), plus the three first-task kinds, FAQ groups, the contact request builder and the legal documents under `legal/` |
| `scripts/import-site-content.py` | Regenerates the imported data modules from `apps/site/content` in the workinzo monorepo (set `EXEKOVA_SITE_CONTENT` to point elsewhere). Content only: the page designs stay this site's own |
| `src/site/styles/site.css` | Page patterns the homepage never needed (documents, hubs, alternating rows, forms), on the same tokens |
| `src/site/nav.ts`, `src/site/lib/` | Site navigation, metadata helpers and inline-link rendering |
| `src/app/(site)/` | One folder per route; the route group layout applies the shared `.beta-page` tokens |
| `content/pages/*.json` | Title, description, keywords and schema for each static route |
| `src/components/` | Reused brand-logo and icon components, shared UI |
| `src/app/globals.css` | Shared exekova brand tokens, resets and base utilities |
| `src/lib/`, `content/site.json`, `public/brand/` | Shared infrastructure, brand configuration and existing assets |

The app router remains a thin entry point. The beta was originally extracted from the Workinzo monorepo; this workspace now contains the redesigned standalone version. Sync changes deliberately after review.

## Product and lead collection

- Jira, the exekova Work Intent form and GitHub: **Available**.
- Slack, Teams, Linear, Excel, CSV, GitLab and Bitbucket: **Planned**.
- Existing offer: **$19 USD per accepted task**, with $29 planned standard pricing.
- All demonstrations use example data. They do not connect to customer systems or run tasks.
- The access request form prepares an email draft or download. The contact form sends through a custom endpoint, Web3Forms, or the built-in Turnstile + Resend receiver. Configure it using [CONTACT_FORM_SETUP.md](./CONTACT_FORM_SETUP.md) and `.env.example`.
- Required contact, team, task and acceptance criteria qualify the request. Planned integration choices register interest.

## Site pages

| Route | Source |
| --- | --- |
| `/platform`, `/about`, `/contact`, `/faq` | `src/app/(site)/<route>/page.tsx` with copy in the page or `src/site/data/` |
| `/solutions`, `/solutions/<function>` (7), `/solutions/for-<role>s` (5) | `src/site/data/functions.ts` and `leaders.ts` |
| `/use-cases`, `/use-cases/<case>` (56 cases), `/use-cases/remittance`, `/use-cases/stablecoin-pci-audit`, plus `bug-fixes`, `small-features`, `test-coverage` | `src/site/data/cases.ts`, `scenarios.ts`, `useCases.ts` |
| `/industries`, `/industries/<industry>` (13) | `src/site/data/industries.ts`: workloads, live problems, controls and measures per industry |
| `/integrations`, `/integrations/<slug>` (Claude Code, Codex, GitHub, Jira) | `src/site/data/integrations.ts`: the catalogue by category with statuses, and four detail pages. Descriptive only: no connect actions |
| `/compare/grokbot`, `/compare/rpa`, `/compare/ai-agent-platforms`, `/compare/chatgpt-and-assistants` | `src/site/data/compare.ts`: comparisons written in Exekova's favour; the other product or category is described from public material with the read date shown |
| `/autonomous-work-execution`, `/workforce`, `/live-floor`, `/quality`, `/recovery`, `/performance`, `/security` | `src/site/data/platform.ts` (imported) rendered section by section by `PlatformArticle` |
| `/privacy`, `/terms`, `/cookies`, `/dpa`, `/subprocessors`, `/acceptable-use` | `src/site/data/legal/*.ts` rendered by `LegalDocument` |
| `/cookie-settings` | `src/site/components/CookieSettings.tsx`; preferences stay in the visitor's localStorage |

Every legal document is published as in force from its `effectiveDate` (15 September 2026, version 1.0). Payment, notice and deletion periods use 30-day defaults, confidentiality survives five years, and governing law follows the jurisdiction where exekova is established; the subprocessor table still marks infrastructure rows to be confirmed. Set `status: 'draft'` on a document to show a review notice again. `src/app/sitemap.ts` lists every public route.

## SEO and routes

Homepage title, description, keywords, canonical path and indexing status live in `src/beta/content/page.json`; every other static route reads its metadata from `content/pages/<name>.json`. Visible FAQs and FAQ structured data share `src/beta/data/offer.ts` and `src/site/data/faq.ts`.

The production canonical base is `https://exekova.com`. Override it at build time using `NEXT_PUBLIC_SITE_URL`. Public pages are indexable; sign-in and cookie settings retain `noindex`.

The `/exekova` alias redirects to `/`. Pricing, sign-in and the platform pages are served by this application. Legacy aliases are shared between the Next.js configuration and the Cloudflare upload in `deployment/cloudflare/redirects.mjs`.

## Cloudflare static upload

```sh
npm run build:cloudflare    # produces dist/cloudflare/site and the upload ZIP
npm run preview:cloudflare  # static preview at http://127.0.0.1:3211
# In another terminal, while the preview is running:
npm run test:cloudflare
```

Upload `dist/cloudflare/exekova-cloudflare.zip` or the `dist/cloudflare/site/` folder. Cloudflare serves the files over HTTPS without an application port or start command. The export builds in an isolated copy so the working development server stays usable. See [deployment settings and upload instructions](deployment/cloudflare/README.md).

To deploy that export directly from your terminal to Cloudflare Workers:

```sh
npx wrangler login
npx wrangler whoami
npm run build:cloudflare
npm run check:deploy:cloudflare  # validates without publishing
npm run deploy:cloudflare       # publishes the built assets
```

The account, Worker name (`exekova`) and asset directory are set in [wrangler.jsonc](wrangler.jsonc). Confirm the Worker name matches the intended Cloudflare project before publishing. Rebuild before deploying later website changes.

## Review

See [the beta audit](src/beta/REVIEW.md) for capability evidence, the Wispr Flow / xAI Bot reference application, preservation details and validation coverage. The current design closely matches the requested reference's layout while using the approved Figtree / EB Garamond typography and exekova’s colours, content and brand assets. Geometry checks are not a claim of pixel identity across different content and artwork.
