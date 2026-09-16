# SEO verification - 16 September 2026

## Crawl and canonical URLs

- The preferred origin is `https://exekova.com`. The Worker permanently redirects HTTP, `www`, the public Workers hostname, trailing slashes and `.html` page variants, preserving queries.
- HSTS (`max-age=31536000`) is added to static, API and redirect responses.
- `robots.txt` advertises the sitemap without the unsupported `Host` directive. The existing `/cookie-settings` exclusion is retained; sign-in and cookie settings are intentionally not indexed.
- The sitemap contains 117 unique, canonical public pages. All have at least two incoming links from other pages. Related task links connect the bug-fix, test-coverage and small-feature pages.
- The two implementation-specific integration pages redirect to `/integrations`. They are removed from the sitemap, directory and machine-readable content. Public examples describe implementation and review responsibilities without naming the underlying providers.
- Diagnostic preview HTML is excluded from production builds.

Before these changes, normal and Googlebot requests both returned HTTP 200 for the sitemap and robots file. The XML bodies were identical and parsed successfully. The Search Console fetch error was not reproduced. A Googlebot user-agent test does not establish access from Google's actual IP addresses. Resubmit the sitemap in Search Console after deployment; if it still cannot fetch, inspect Cloudflare security events for the actual Google request.

## Loading and presentation

- Three large PNG scenes have responsive WebP alternatives at 320, 640, 960 and 1280 pixels. Original source artwork and the PNG social preview remain available.
- Page logos use compact WebP images; containment prevents distorted tool logos.
- Marketing links do not trigger viewport prefetch requests. Footer links use ordinary anchors.
- Original UI icon paths are stored once in a cached SVG sprite. Closed request forms and the optional interactive demo mount when opened.
- The header's short menu transition uses CSS instead of an animation-library dependency.
- The original stylesheet order is preserved. The pricing palette is checked against the live baseline. The hero ribbon spans both viewport edges, and its changing Get / Set / Done chip is removed.

Essential stylesheets remain render-blocking to preserve the approved design. The homepage still exceeds generic DOM/request/HTML-ratio thresholds. Those warnings have been reduced, not all eliminated; the site content has not been padded or removed to alter a ratio.

## External links

All 11 unique external destinations were tested. No HTTP 404 was found. LinkedIn, Instagram, WhatsApp and the cited reference pages returned HTTP 200. X and x.ai returned automated-access HTTP 403 responses; x.ai's page also loaded through a separate web fetch. These cannot be identified as broken destinations solely from the crawler response. The exact audit URL list is needed to reconcile the report's 95 affected pages.

## Google Analytics

The public GA4 measurement ID defaults to `G-R33H6YFCH2`. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the ignored local/build configuration to override it, then rebuild. An explicitly empty or invalid ID disables Analytics and its consent notice.

With an ID configured, Analytics loads asynchronously only after the visitor allows it. Cookie settings can withdraw permission and remove first-party Analytics cookies. The implementation sends page views with query strings and fragments removed and does not send form values. In the GA4 web stream, disable enhanced automatic page-change measurement when using this manual route tracking, to prevent duplicate page views. Do not enable extra form tracking without reviewing its data collection.

## Checks

```sh
npm test
npm run build:cloudflare
npm run test:seo
npm run test:home-style -- --url=http://127.0.0.1:3211
npm run test:analytics
npm run test:sharing
npm run check:deploy:cloudflare
# After deployment:
npm run test:seo:live
npm run test:home-style -- --url=https://exekova.com
npm run test:analytics -- --url=https://exekova.com
```

The home-style check covers 320, 390, 1440, 1920 and 2560 pixel widths. Browser checks also exercise navigation, the deferred demo, animations and both forms. Form delivery responses are mocked during those checks; no test enquiry is emailed. Reports and screenshots stay in ignored `qa-output/`.

The Analytics browser check runs Google's actual library with measurement requests intercepted, covering consent, rejection, a single page view per navigation, URL cleanup and withdrawal on desktop and mobile. Use `node scripts/check-analytics.cjs --url=https://exekova.com --delivery` separately to verify one real production page view reaches Google's collection endpoint. This does not verify report processing inside the Google Analytics account.

## Production verification

Application commit `db04785` was deployed to Cloudflare version `0c656dcb-aac8-4469-9b43-eec08e4b0de6`. Checks against `https://exekova.com` passed for all 117 sitemap URLs, nine permanent redirects, sitemap/robots responses for normal and Googlebot user agents, HSTS, 404 handling and contact API routing.

The live ribbon and pricing checks passed at all five widths, including loaded pricing images. Sharing metadata passed for six crawler user agents, and both forms passed the mocked feedback checks on desktop and mobile. All 61 unit tests and the production build passed before deployment.

In the measured desktop homepage load, initial requests fell from 46 to 30 and browser DOM nodes from 2373 to 2002. No application JavaScript exceptions were observed. The contact page's third-party Turnstile still emits challenge diagnostics and a PAT HTTP 401 in headless Chromium; these remain visible in the browser audit report.
