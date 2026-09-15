# Cloudflare production upload

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

## Rebuild for another public domain

```sh
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build:cloudflare
```

This is a build-time setting: changing a Cloudflare environment variable after uploading will not rewrite existing HTML. Use the final production domain for a public release.

## Cloudflare references

- [Pages direct upload](https://developers.cloudflare.com/pages/get-started/direct-upload/): folders or ZIPs; dashboard limit of 1,000 files and 25 MiB per file.
- [Next.js static exports on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
- [Static asset redirects](https://developers.cloudflare.com/workers/static-assets/redirects/).
- [Static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

The build report records the actual file count and largest asset so upload limits can be checked before deployment. No upload or DNS change is performed by the packaging command.

The server's broad `/industries/:industry/:useCase` legacy redirect is expanded into the known industry/use-case links in the static upload. This preserves legacy links without intercepting the navigation data files that Next.js exports below the same paths. Unknown paths use the 404 page.
