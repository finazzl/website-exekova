# Cloudflare production deployment

## Deploy from your local terminal with Wrangler

The root `wrangler.jsonc` deploys the generated static website to **Cloudflare Workers**. It targets account `5972ca5f219d1c60c42dd24fa4232927` from the supplied dashboard URL, Worker name `exekova`, and asset directory `dist/cloudflare/site`. If the dashboard already has this site under a different Worker name, change `name` in that file before deploying so updates reach the intended site.

Wrangler is installed as a development dependency. From the project root:

```sh
cd /Users/neeki/Documents/exekova
npx wrangler login
npx wrangler whoami
```

Complete the browser login and confirm the account above appears in `whoami`. Then build the latest production assets and validate the deployment configuration:

```sh
npm run build:cloudflare
npm run check:deploy:cloudflare
```

The check runs `wrangler deploy --dry-run` without uploading or publishing. To publish the built assets:

```sh
npm run deploy:cloudflare
```

This runs `wrangler deploy` and creates or updates the named Worker. Wrangler prints the live `https://exekova.<your-subdomain>.workers.dev` URL. The deploy command uses the last generated export; rebuild after website changes before deploying again.

To attach the production domain, open **Workers & Pages → exekova → Settings → Domains & Routes → Add → Custom Domain**, then add `exekova.com`. Canonical URLs in the current export already use `https://exekova.com`. No application port or Node.js start command is required on Cloudflare. The local static preview remains on port `3211`.

This configuration serves assets only, with clean HTML URLs and the exported 404 page. The package's `_headers` and `_redirects` remain active. `wrangler deploy` targets Workers; an existing **Pages** project uses the separate `wrangler pages deploy` workflow.

## Settings recorded before generating the upload

| Setting | Value |
| --- | --- |
| Deployment | Cloudflare Workers & Pages → upload static assets |
| Suggested project name | `exekova` |
| Production URL / canonical base | `https://exekova.com` |
| Local development | Port `3200` by default; the current working preview uses `3210` |
| Local static production preview | `http://127.0.0.1:3211` |
| Cloudflare application port | None — Cloudflare serves the static files over HTTPS |
| Cloudflare build/start commands | None for direct upload; the files are built locally |
| Local packaging command | `npm run build:cloudflare` |
| Folder to upload | `dist/cloudflare/site/` |
| ZIP to upload | `dist/cloudflare/exekova-cloudflare.zip` |
| Upload root | `index.html`, `404.html`, `_next/`, `brand/`, page files, `_headers`, `_redirects` |
| HTML routing | Clean URLs; automatic HTML handling; use `404.html` for unknown paths |
| SPA fallback | Off — this export contains an HTML page for each route |
| Runtime environment variables / secrets | None |
| Build-time public URL | `NEXT_PUBLIC_SITE_URL`, default `https://exekova.com` |
| Local build requirements | Node.js `>=20.9.0`, installed npm dependencies, `zip`; this build uses Node.js `v25.5.0` and Next.js `16.3.5` |

The build runs in an isolated source copy, preserving the running development server and all current working-tree changes. Images are served from bundled files, without a Next.js image server. Fonts are bundled by Next.js. Redirects from `next.config.mjs` are translated to Cloudflare's `_redirects` format. HTML stays revalidatable; fingerprinted assets receive long-lived caching.

## Upload

1. Run `npm run build:cloudflare` and review `dist/cloudflare/build-report.json`.
2. Optionally run `npm run preview:cloudflare` and open `http://127.0.0.1:3211`.
3. Open the Cloudflare **Upload and deploy** screen and drag in `dist/cloudflare/site/`, or use the ZIP if that uploader accepts ZIP files. `index.html` must be at the upload root.
4. Use the project name `exekova` (or another available name). Keep static HTML routing enabled and SPA fallback disabled if those settings are shown. No Node.js start command or port is needed.
5. Deploy, then connect `exekova.com` through the project's custom-domain settings. The generated Cloudflare preview hostname also works; canonical tags point to `https://exekova.com`.

Only upload the `site` folder or its ZIP. The source repository, `node_modules`, `.next`, build reports and these instructions are not website assets.

With the preview running, use `npm run test:cloudflare` in another terminal to check exported files, internal links, redirects, production metadata, responsive navigation and the access-request download. Verification reports and screenshots are written beside the upload, outside `site/`.

The current access/contact forms prepare email drafts or downloads, and sign-in links to the team's WhatsApp access flow. The static export preserves those behaviours; no server-based authentication, CRM submission or payment endpoint is introduced.

## Social sharing previews

Sharing metadata is rendered into each page's initial HTML head. Open Graph and X cards use the public `1200 × 630` PNG at `/brand/og-default.png`, with an HTTPS URL, image type, dimensions and alternative text. Page-specific titles and descriptions are preserved; the root layout supplies defaults.

With the static preview running, run `npm run test:sharing`. After deploying, run `npm run test:sharing -- --url=https://exekova.com`. This checks the raw HTML and image responses using WhatsApp, Meta, X and LinkedIn crawler user agents. It does not simulate the apps' caches or originate requests from their infrastructure.

If the website checks pass but WhatsApp shows no card, check **WhatsApp → Settings → Privacy → Advanced → Disable link previews** is off. Paste the URL into a new message and allow the preview to load before sending. A previously sent message is not a reliable retest. [WhatsApp's preview setting](https://faq.whatsapp.com/445453537819972).

## Rebuild for another public domain

```sh
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build:cloudflare
```

This is a build-time setting: changing a Cloudflare environment variable after uploading will not rewrite existing HTML. Use the final production domain for a public release.

## Cloudflare references

- [Wrangler deploy command](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy).
- [Wrangler login and account commands](https://developers.cloudflare.com/workers/wrangler/commands/general/).
- [Workers static assets configuration](https://developers.cloudflare.com/workers/static-assets/binding/).
- [Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/): folders or ZIPs; dashboard limit of 1,000 files and 25 MiB per file.
- [Next.js static exports on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
- [Static asset redirects](https://developers.cloudflare.com/workers/static-assets/redirects/).
- [Static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

The build report records the actual file count and largest asset so upload limits can be checked before deployment. No upload or DNS change is performed by the packaging command.

The server's broad `/industries/:industry/:useCase` legacy redirect is expanded into the known industry/use-case links in the static upload. This preserves legacy links without intercepting the navigation data files that Next.js exports below the same paths. Unknown paths use the 404 page.
