# EXEKOVA beta review

Reviewed 15 September 2026. This document is local project documentation, not page content.

## Existing experience

- The existing page led with the right task/repository proposition but crowded the hero with a ten-stage workflow, implementation-oriented terms, pricing, and multiple controls.
- Repeated sections explained the same promise in different forms. Leadership, industries, wider roadmap, and separate pricing diagrams distracted from the private engineering beta.
- The access form prepared an email draft and text download. There was no submission API, CRM connection, or payment collection in this standalone project.
- The project already had `src/beta/`. Its metadata and beta shell were still outside the feature folder.

## Capability grounding

The original product repository at `/Users/neeki/Downloads/workinzo` was inspected read-only. No product code or other session's changes were modified.

| Claim | Evidence inspected | Public wording |
| --- | --- | --- |
| Jira intake | Connector provider enum in `contracts/openapi.yaml`; existing beta connector record | Beta |
| EXEKOVA Work Intent form | Existing direct task-brief onboarding | Beta |
| Slack task intake | Slack supports review notifications and review callbacks; task intake is not implemented | Planned as a task source |
| Microsoft Teams task intake | No implemented task intake found | Planned |
| GitHub delivery | Connector operations and delivery merge gate | Beta; pull request on an isolated branch |
| Linear, Excel, CSV, GitLab, Bitbucket | Absent from the implemented connector providers; existing roadmap record | Planned; no committed date |
| Independent review and verification | Acceptance service and review checks | A separate review and required checks precede acceptance |
| Rejected attempts cost zero | Acceptance decision reports zero accepted units on rejection | $0 for rejected attempts |
| No automatic merge | Delivery merge method refuses merging | Your team owns merging and production deployment |
| $19 beta / $29 planned | Existing beta offer | $19 USD per accepted task; $29 planned standard price |

Implementation evidence confirms code paths, not general production availability. No integration is promoted to Available. The public legend defines all three statuses.

## Reference application

- [Wispr Flow](https://wisprflow.ai/): inspected live desktop and mobile screenshots. The revised composition follows its announcement strip, floating navigation dimensions, centered serif headline, curved text transformation, large rounded colour chapters, generous section spacing, and selectable product walkthrough.
- [xAI Bot](https://x.ai/bot): inspected current messaging. Short task-to-result language informs EXEKOVA's copy. Other products' capabilities, metrics, customer endorsements, photographs, and proprietary assets are not used as EXEKOVA claims.
- The user approved matching Wispr typography: Figtree and EB Garamond (normal and italic). EXEKOVA’s violet/lilac/mint/ink tokens, original logo, and integration marks remain. Different content, artwork and brand colours preclude literal pixel identity.

## Reference recheck and corrected experience

The first revision did **not** include every reference section. Its hero was a static SVG, its FAQ was a simple accordion, and its footer was abbreviated. A second live audit captured the complete desktop (1440px) and mobile (390px) reference, including scrolling through its animated sections. Reference captures and element measurements are in `/tmp/exekova-reference-audit/`.

| Wispr homepage pattern | EXEKOVA implementation |
| --- | --- |
| Announcement + floating navigation | 65px announcement and 912 × 68px desktop navigation; 37px announcement and 54px mobile navigation |
| Two-line centered hero | “Task, Repo” / violet “Done.”; 96px desktop and 48px mobile brand serif; no private-beta hero eyebrow |
| Moving input text, central control, transformed output | Original SVG paths with continuously moving task/outcome text, three customer steps, working pause/play, offscreen/hidden-page suspension, and reduced-motion controls |
| Customer logo strip | Continuous, status-labelled integration strip with pause/play and a scrollable reduced-motion fallback; no invented customer endorsements |
| Expanding comparison demonstration | Scroll-responsive manual-coordination / EXEKOVA panels, with the interactive Get — Task → Set — Repo → Done — Verified Outcome demo |
| Three-step product walkthrough | Desktop sticky, scroll-driven task/repository/outcome story; three separate visual scenes on mobile |
| Four-feature story with sticky visual | Task intake, approved repository, independent review, verification evidence; changing desktop visual and individual mobile visuals |
| Privacy/trust panel | Approved scope, isolated branch, human-owned merge; no unearned certification badges |
| Dark, layered case-study cards | Clearly labelled illustrative bug-fix, feature, and test tasks with original product interface drawings |
| FAQ question list + answer bubbles | Split desktop FAQ; native mobile accordion; the same eight answers feed FAQ JSON-LD |
| Large rounded visual closing CTA | Original task/outcome artwork, 120px desktop headline, qualified beta-access dialog |
| Product cards + four footer columns + giant wordmark + legal row | Two beta/offer cards, actual workflow/resource links, existing EXEKOVA wordmark asset, contact and legal links |

The integration map and beta-pricing sections remain as additional EXEKOVA content, so visitors can review actual availability and commercial terms directly. The page does not inherit Wispr's products, claims, reviews, photographs, or social accounts. Brand colours, original visuals, and different copy mean this is **not a literal pixel-identical copy**. The work matches the reference's section inventory and layout patterns while retaining EXEKOVA's identity.

All new components, motion preferences, dialog functionality, QA, and experience styles are inside `src/beta/`. Shared brand files and design tokens remain outside it.

## Three-step content correction

The customer journey has exactly three steps, defined once in `data/workflow.ts`: **Get — Task → Set — Repo → Done — Verified Outcome**. The hero ribbon, “Give it work / Get it done” demo, walkthrough, integration map, closing copy, and FAQ use this wording. Review and verification appear as evidence included in Done, not extra customer steps. The original hero headline and violet accents are preserved.

The demo and feature story show five primary task sources: **Jira, Slack, Teams, Excel, and EXEKOVA’s Work Intent form**. Jira and the Work Intent form are Beta. Slack, Teams, and Excel task intake are Planned; Slack’s review-notification capability is not used to claim task intake. Earlier Linear and CSV roadmap entries remain in the complete availability map. The access form uses the same connector records. Planned demo selections cannot progress to a verified beta outcome.

Source snapshot before this correction: `/tmp/exekova-before-three-steps-20260915.tar.gz`. Existing Slack and Teams brand assets were reused from the original repository into the shared `public/brand/integrations/` directory; no source files there were modified.

## Landing-page findings resolved

The supplied findings accurately identified the remaining content gaps. The updated homepage now includes:

| Target | Resolution |
| --- | --- |
| Hero + How EXEKOVA works | Three customer steps retained throughout: Get — Task, Set — Repo, Done — Verified Outcome |
| Pay for accepted work | Dedicated pricing chapter with side-by-side Accepted task / $19 and Rejected attempt / $0 cards |
| Independent verification | Review and verification evidence remain part of the outcome; no additional customer steps |
| Task sources + repositories | Five featured intake sources; all existing beta/planned labels shared with the form and FAQ |
| Built for your team | Interactive CEO / CTO / CIO / COO section with specific pain, value, and illustrative outcome summaries |
| Industries & use cases | Thirteen user-supplied industry examples, grouped into Financial & regulated, Digital & service businesses, and Industrial operations |
| Trust, safety & governance | Existing trust panel expanded with an evidence record and explicit scope, delivery, acceptance, correction, and human-release boundaries |
| Accepted-work meter | Interactive 1 accepted task / $19 versus 0 accepted tasks / $0 display; illustrative, with no charge or backend mutation |
| Bigger vision | Separate Beta today / Longer-term vision panels for engineering today and broader enterprise work tomorrow |
| FAQ + final CTA | Preserved, with updated three-step and task-source copy |

Industry examples are subject to beta task and repository eligibility, not claims of automated financial, insurance, or other business operations. Broader enterprise workflows are clearly outside the beta and carry no committed date. Snapshot before adding these chapters: `/tmp/exekova-before-chapter-completion-20260915.tar.gz`.

## Lead collection and discoverability

Request-access links open a native dialog with the existing qualified form. The form preserves the email handoff: it validates required fields, prepares a draft the visitor sends, and offers a text download. It never reports a request as submitted. Planned combinations explicitly register interest. A real submission endpoint remains an external dependency if direct lead capture is wanted later. The dialog supports Escape, a close button, focus containment and restoration, and direct `#request-access` navigation; a no-JavaScript email fallback is provided.

Metadata is under `src/beta/content/page.json`; visible FAQs and FAQ JSON-LD use the same data. Canonical URL: `https://exekova.com/exekova`. The inherited `noindex: true` is retained for the standalone preview. Change that setting only for the intended public launch URL. These changes provide accurate crawlable content, not a guarantee of search or answer-engine placement.

## Preservation and verification

The standalone workspace had no `.git` directory. Before editing, its source was archived at `/tmp/exekova-before-visual-revamp-20260915.tar.gz` (excluding generated dependencies, build output, and the untouched reference download). The original monorepo's working-tree status was unchanged after the read-only audit.

Before the reference correction, a second snapshot was created at `/tmp/exekova-before-reference-correction-20260915.tar.gz`.

Validation: TypeScript, seven unit/component tests, optimized production build, and browser checks at 1440, 1024, 768, 390, and 320px. The browser suite covers layout overflow, anchor targets, demo examples and review states, status accuracy, keyboard FAQ use, mobile navigation, request validation/download/email handoff, matching FAQ schema, reduced motion, and demo pause/replay. Screenshots and results are written to the configured temporary QA output directory.

## Measured typography and layout pass

The final user preference was **match Wispr typography; keep EXEKOVA colours and logo**. A source snapshot preceded this pass: `/tmp/exekova-before-design-match-20260915.tar.gz`. Live reference screenshots and DOM measurements are in `/tmp/exekova-design-match/`.

`npm run test:design` checks the measured 1440px / 390px reference geometry: navigation width/height/position, hero heading width/position/height, EB Garamond and Figtree loading, display sizes, line heights, tracking, trust panel spacing, FAQ width and footer type size. It writes a measurement report and section screenshots. These checks cover specified geometry; they do not certify that every page pixel is identical. Product artwork, brand colours, copy length and additional EXEKOVA chapters still differ.

The visual corrections include the floating product switch, an expanding pinned comparison, three full mobile workflow scenes, continuous status-labelled integration marks, the existing higher-resolution logo mark with a sharp text wordmark, and a dismissible mobile access CTA. The hero text uses measured phrase lengths for a continuous loop, safely ignores hidden SVG paths, remeasures after fonts load or viewport resize, and supports pause/replay and reduced motion.

All thirteen industry names and descriptions are preserved from the user’s supplied list. They describe software use cases subject to beta task/repository eligibility and existing human approvals, not regulatory certification or autonomous operational decisions.

Final validation: 52 measured layout/type checks passed; responsive browser checks passed at 320, 390, 768, 1024 and 1440px; animation checks passed at 390 and 1440px, including the pinned comparison, hero and integration pause/play, and the mobile workflow. No browser runtime errors were recorded. Seven component/unit tests, TypeScript and the optimized build passed. The usual preview at `http://localhost:3200/` returned HTTP 200. The original monorepo working tree remained unchanged. A side-by-side/overlay review is at `/tmp/exekova-design-match/comparison.html`; reports and screenshots are under that directory’s `layout/` and `qa/` folders.

## Task-flow reconstruction

The user identified a remaining visual mismatch: the comparison still looked like a dashboard, and the hero text travelled backwards. The reconstruction changes the actual demonstration and movement:

- Both hero text paths now advance left to right. Their shared endpoint passes under the EXEKOVA control, and the input path forms a continuous loop before reaching it. Measured repeated phrases prevent a jump at the end of the loop.
- “Give it work. Get it done.” now presents an original photographic product scene with moving task text, the selected repository, pending review/checks, and the verified outcome. There are still only three user steps. No borrowed speed claim or words-per-minute metric is shown.
- The panel expands, then contracts to a 400 × 466 portrait scene on desktop. The same visual component is used for Get, Set and Done in the walkthrough. Mobile presents the three scenes vertically.
- The original detailed demo is in an accessible disclosure below the visual preview. Its source-status gating, examples, checks and controls are retained. The visible preview owns `#product-demo`; the detailed demo owns `#interactive-task-demo`.
- The backdrop and its final built-in imagegen prompt are recorded in `assets/README.md`. Shared logo assets, typography, colours and the user’s thirteen industry entries are retained.

Source snapshot: `/tmp/exekova-before-flow-rebuild-20260915.tar.gz`. Live reference captures: `/tmp/exekova-flow-review/`. `tests/flow-qa.cjs` checks the direction of both ribbons, the actual animated task/repository/outcome sequence, pending versus passed evidence, pause, responsive scenes and reduced motion. Its screenshots expose intermediate states, rather than relying on a count of matched typography properties.

Reconstruction validation: the optimized production build and TypeScript passed, along with seven unit/component tests. The new flow suite passed at 320, 390, 768, 1024 and 1440px. The complete browser regression suite passed at those same widths, with motion checks at 390 and 1440px and no runtime errors. Additional portrait checks assert the actual 400 × 466 dimensions and that the completed outcome’s footer stays clear of its status badge. Current flow screenshots and reports are in `/tmp/exekova-flow-review/current/`; full regression results are in `/tmp/exekova-visual-beta-qa/`. The rebuilt preview runs at `http://localhost:3200/`.

## Business and Leaders section reconstruction

References inspected live on 15 September 2026: [Wispr Business](https://wisprflow.ai/business) and [Wispr Leaders](https://wisprflow.ai/leaders). Captures and DOM measurements are in `/tmp/exekova-business-leaders/`.

- **Built for your team:** the Notetaker section’s centered 75px heading, spacious introduction, 620px square photographic visual, 96px column gap and 48px story headings. The outcome stays pinned while the CEO, CTO, CIO and COO responsibilities scroll. Role buttons remain keyboard accessible. Mobile presents a separate visual for each role.
- **Pay for accepted work:** the Clay section’s dark rounded chapter, 64px heading, 75px figures, 296px central visual, and centered quotation pattern. The central visual is EXEKOVA’s interactive acceptance record; the figures are the actual $19 / $0 offer. The supplied first-task and oversized-task examples replace the testimonial. On mobile, the figures precede the visual, as in the reference. No case-study results or customer endorsement are implied.
- **Industries:** the Leaders section’s 120px display heading, a 667px main image beside its copy, two 610px companion features, then the 708px evidence scene. All thirteen supplied industries and their descriptions remain. Original HTML task and evidence examples replace the reference’s dictation application imagery.
- **Hero:** the SVG viewport and path endpoints expand beyond 1440px to meet both page edges. The loop, logo position and text retain their scale. The existing smaller-screen paths remain in use.

`styles/business-stories.css` owns these scoped styles. Original backdrops and their final built-in imagegen prompts are recorded in [assets/BUSINESS.md](assets/BUSINESS.md). The visual examples disclose their illustrative status and do not present an EXEKOVA mobile application or additional execution capabilities.

The workspace still has no Git metadata. Snapshots: `/tmp/exekova-before-business-leaders-20260915.tar.gz` and `/tmp/exekova-concurrent-content-20260915.tar.gz`. Concurrent edits changed public launch wording, workflow labels, the shared price key, and connector availability; this design pass retained those shared-data edits. The regression assertion was updated to the current connector records.

`npm run test:chapters` checks layout and controls at five standard widths, plus full-width ribbon geometry at 1920 and 2560px. At 1440px it checks the reference scene dimensions and corner radii. It also checks mobile pricing order, all thirteen industry entries, pricing disclosure, accepted/rejected counts, and automatic role selection while scrolling. These checks establish the specified geometry and behavior; they do not certify identical pixels across different branding, artwork and content.

Final validation: optimized build and TypeScript passed; seven unit/component tests passed. The full browser regression passed at 320, 390, 768, 1024 and 1440px, including lead handoff, demos, FAQ and animation controls. After the final illustration spacing correction, production chapter checks passed at those widths plus 1920 and 2560px, including explicit checks that the evidence list is not covered by the foreground acceptance record. Both browser reports recorded zero runtime errors. Reports and screenshots: `/tmp/exekova-business-leaders/current/` and `/tmp/exekova-visual-beta-qa/`. The final preview at `http://localhost:3200/` returned HTTP 200.

## Students integrations and live-site polish

Reference inspected live on 15 September 2026: [Wispr Students](https://wisprflow.ai/students). The integrations chapter now uses a full-width rounded dark surface, left-aligned EB Garamond heading (64px desktop / 40px mobile), outlined workflow chips, a compact CTA and a continuous curved stream of integration marks. The three cards preserve Get — Task, Set — Repo and Done — Verified Outcome. Jira, Work Intent and GitHub use the current shared Available status; all planned integrations retain explicit labels. The CTA opens the existing request-access dialog.

`components/ToolsRibbon.tsx` owns the original responsive curve, viewport-aware motion, pause and reduced-motion behavior. `styles/tools-workflow.module.css` scopes the chapter. The curve moves below the copy on tablets and phones to keep the longer EXEKOVA headline unobstructed. Live reference measurements and screenshots: `/tmp/exekova-students-tools/`.

The follow-up polish removes “Illustrative” from rendered application copy, using Example or Product demo where a sample still needs context. The app-icon ribbon’s downstream background uses the existing `--wz-green` brand token (#05CC83). Homepage panels and nested records share `--wz-panel-border-width: 4px`, with shared light/inverse line colours defined in `app/globals.css`; `styles/panel-borders.css` applies the panel standard. Control borders and thin internal separators retain their separate roles.

`npm run test:tools` checks seven widths (320–1920px), all integration statuses, exactly three workflow cards, CTA/dialog behavior, keyboard pause/resume, reduced motion, runtime errors, brand-green fill, shared panel outlines, removal of the old wording, and geometric clearance along the entire icon path. The business and flow checks also exercise compact evidence records after the border changes. Screenshots and reports are under `/tmp/exekova-students-tools/current/`, `/tmp/exekova-business-leaders/current/`, and `/tmp/exekova-flow-review/current/`.

Preservation snapshots: `/tmp/exekova-before-students-tools-20260915.tar.gz` and `/tmp/exekova-before-live-polish-20260915.tar.gz`. The workspace has no Git metadata. Concurrent shared-site routes, navigation, footer and CFO content were retained. An isolated source snapshot allowed verification while those shared imports were temporarily incomplete; the final shared workspace subsequently built successfully, including all 83 generated pages.

Final validation after live-site polish: the optimized shared build and TypeScript passed; all eleven component/unit tests passed. Production tools checks passed at 320, 390, 768, 1024, 1280, 1440 and 1920px, including the brand-green fill, consistent panel widths, copy audit, access CTA and animation controls. Production workflow checks passed at 320, 390, 768, 1024 and 1440px, including the compact outcome/status clearance. Business scene checks passed across the five standard widths with the current five-role team list. No browser runtime errors were recorded by those suites. The preview at `http://localhost:3200/` returned HTTP 200. A visual comparison is available at `/tmp/exekova-students-tools/comparison.html`.

## Border correction, typography and spacing

The 4px panel standard from the preceding pass was reverted at the user’s request. Its stylesheet, import and shared border tokens were removed, restoring the original product-scene borders and internal spacing. The tools section’s outside outline and its three card borders were also removed. The previously requested brand-green ribbon background and live-copy wording remain.

The live Wispr homepage, Business and Leaders pages were measured again at 1440px and 390px. The existing major heading sizes already matched their reference roles: hero 96/48, chapter 75/40, section 64/40, secondary 48/32 and display 120/56. `styles/homepage-system.css` now centralises those roles, including the footer’s 16/14px navigation type. Captured reference measurements: `/tmp/exekova-type-spacing/audit.json`.

Every homepage content section uses 112px vertical insets on desktop and 72px on mobile. Heading-to-content spacing uses 64/48px, copy spacing 24px, and card-grid gutters 24px. Product animation canvases retain the space they need to show the workflow. Multiline primary headings consistently use ink/violet on light backgrounds and paper/brand green on dark backgrounds; secondary phrases in the trust and industry subheadings follow the same treatment.

The source snapshot before this correction is `/tmp/exekova-before-border-revert-type-spacing-20260915.tar.gz`. The shared footer/navigation migration from another session was preserved. `tests/presentation-qa.cjs` checks reference type sizes and line heights, both heading colours, equal section insets, heading-to-content gaps, footer type, border removal and responsive overflow; screenshots and results are in `/tmp/exekova-type-spacing/current/`.

Validation: the optimized build and TypeScript passed, with all eleven unit/component tests passing. Presentation checks passed at 320, 390, 768, 1024, 1440 and 1920px; tools checks passed at those widths plus 1280px. The team, pricing and industry chapter checks passed at the five standard widths. Concurrent rebuilds changed shared production assets during animation testing, so the final production build was copied to `/tmp/exekova-presentation-validation-20260915` for stable verification at `http://localhost:3207/`. The complete presentation checks passed again against that isolated copy. `npm run test:presentation` provides a repeatable check against the normal QA server; the script also accepts `--url=`.

The final workflow animation suite passed at 320, 390, 768, 1024 and 1440px against the isolated production copy, including task/repo/outcome sequencing, pending-to-passed evidence, pause/replay, compact outcome clearance and changing to reduced motion. No horizontal overflow or browser runtime errors remained in that run. Results: `/tmp/exekova-flow-review/current/results.json`.


## Hero, tab transitions, CTA consistency and tool labels

The hero now has a concise benefit and supporting line, a 56px primary action, grouped $19 / $0 pricing and the GET · SET · DONE footer. Both ribbon paths meet the centre control at every tested width from 320 to 2560px; the outgoing band uses brand green #05CC83. The control retains the logo and playback action with no wordmark. Resuming motion previously allowed a negative initial frame delta to select a nonexistent step and crash the page. The animation now starts from its first frame timestamp; a component regression covers that timing case.

How-it-works tab selection now locks the selected step during controlled scrolling, supports user interruption and crossfades persistent scenes over one backdrop. The description reserves a stable height. Desktop tests check selection stability, scroll direction, interruption and mounted scene nodes; mobile retains three stacked scenes and reduced motion avoids animated scrolling.

Homepage request actions now share the navigation CTA tokens: #513CEC normally and #2411B0 on hover, with white text. The shared footer includes the same request-access action. The Built Around Your Work source row shows five logos with accessible names and no visible labels. The request-access popup lists tool names without Available/Planned suffixes; selection values and the separate planned-integration explanation remain accurate.

Validation: isolated optimized production build and TypeScript passed; all 12 unit/component tests passed. How-it-works checks passed at 1440, 1024, 768, 390 and 320px. Hero geometry passed at ten widths from 320 to 2560px, with pause/resume and no runtime errors. CTA colours, logo presentation and popup selections passed at 1440 and 390px. The workflow sequence passed at 1440 and 390px; its desktop test now scrolls to the existing 700px end offset. Reports are in /tmp/exekova-how-story, /tmp/exekova-hero-ribbon-preview.json, /tmp/exekova-home-cta-preview.json and /tmp/exekova-flow-review/current. The isolated preview runs at http://localhost:3208/. Shared navigation and content work from the other session was preserved.


## Consolidated homepage fintech use cases

The existing three visual outcome cards now carry Provider API deprecations, Reconciliation exceptions and PCI DSS 4.0 payment page controls under one fintech heading. Their names, problems and destinations come from the shared case records on the server; only those display fields reach the client component. The separate plain-card fintech block and the old example caption were removed. All Use Cases links to /use-cases. The original card presentation and responsive stacking remain, with extra clearance for category labels and the migration evidence badge.

Validation: the optimized production build and TypeScript passed. Browser checks passed at 1440, 768, 390 and 320px, covering the single heading, exactly three cases, removed copy, correct case destinations, the All Use Cases navigation, unobstructed card text and evidence, and no horizontal overflow or runtime errors. Screenshots: /tmp/exekova-fintech-outcomes-{width}.png; report: /tmp/exekova-outcomes-preview.json. Source snapshot: /tmp/exekova-before-outcome-consolidation-20260915. Final isolated preview: http://localhost:3208/.


## Sign-in spacing after homepage navigation

The homepage section-spacing selector also matched the full-screen sign-in section after client navigation because the homepage stylesheet remained loaded. This added 112px of paper-coloured padding on desktop (72px on mobile). The homepage now has an explicit beta-home class and the section-spacing rule targets that class. Sign-in retains zero outer padding without overriding its own layout. Browser checks on http://localhost:3210 passed at 1440, 1024, 768, 390 and 320px, navigating from the homepage to sign-in and back. The sign-in card starts at y=0 at full viewport width, the shared header remains hidden, and homepage section spacing stays 112/72px. No runtime errors were reported. Evidence: /tmp/exekova-signin-padding.json; preservation snapshot: /tmp/exekova-before-signin-spacing-20260915.
