# Contact form delivery

The contact form retains Exekova's fields and uses the delivery options from
Truvon, adapted from Vite's `VITE_*` settings to Next.js `NEXT_PUBLIC_*` settings.
Copy `.env.example` to `.env.local` and choose a delivery path. The example leaves
keys blank: use an Exekova inbox and Turnstile key with your domains allowed.

## Delivery priority

1. `NEXT_PUBLIC_CONTACT_ENDPOINT`: your JSON receiver. It must return a successful
   HTTP status and `{ "ok": true }` or `{ "success": true }`. Cross-origin
   endpoints must accept CORS requests from the website.
2. `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`: posts to Web3Forms, using the inbox attached
   to that key. This works on static hosting without a Worker backend.
3. Production default: `/api/contact`, backed by Turnstile verification and Resend.
4. Unconfigured `npm run dev`: opens an email draft, with an explicit unsent notice.

All public settings are fixed at build time. `npm run build:cloudflare` loads the
root production dotenv settings, forwarding public values into its isolated
build without copying dotenv files into the upload.

## Web3Forms

Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to the access key for your destination inbox.
Leave `NEXT_PUBLIC_CONTACT_ENDPOINT` blank. Optionally set
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` to show the verification widget. As in Truvon,
this path supports the free tier and does not forward the Turnstile token:
[server-side Turnstile verification requires Web3Forms Pro](https://docs.web3forms.com/getting-started/customizations/spam-protection/recaptcha-and-turnstile).
The widget gates browser submissions only; use the built-in receiver for
server-verified Turnstile. Web3Forms receives the form fields to deliver email.

## Built-in receiver: Cloudflare Worker or Next.js server

Leave the endpoint and Web3Forms key blank for production. Set the public
Turnstile site key before building. Configure server-only values:

| Setting | Purpose |
| --- | --- |
| `TURNSTILE_SECRET` | Secret paired with the public site key |
| `RESEND_API_KEY` | Resend key with permission to send email |
| `LEAD_TO` | Destination; defaults to `connect@exekova.com` |
| `LEAD_FROM` | Resend-verified sender; defaults to `website@exekova.com` |

For Next.js, set these in `.env.local` or the server environment. Set
`NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact` to exercise the receiver in local dev.

For Cloudflare Workers, set server variables in the Worker dashboard or use
`npx wrangler secret put TURNSTILE_SECRET` and
`npx wrangler secret put RESEND_API_KEY`. Configure the sender and destination
there as well. For local Wrangler preview, use an ignored `.dev.vars` file.

```sh
npm run build:cloudflare
npm run check:deploy:cloudflare
npx wrangler dev --port 8788
# When ready to publish:
npm run deploy:cloudflare
```

The Worker serves `/api/contact`; Next.js exposes the same handler for server
deployments and local dev. The static packaging step omits the Next.js POST
route because the Worker provides it. A dashboard upload of just `site/` or the
ZIP does not include the receiver: use Web3Forms/an external endpoint for that
workflow, or deploy using Wrangler. `preview:cloudflare` previews static assets
only; use `wrangler dev` to preview the built-in receiver.

## Behavior and checks

The form validates fields, includes a hidden honeypot, enforces a 2.5-second
minimum fill time with a retry notice, blocks duplicate submissions, and
requires verification whenever a site key is configured. Expired verification
tokens disable Send; widgets reset after delivery attempts. Failed requests
retain the visitor's message. Downloads and direct email remain available.

The built-in receiver validates fields and lengths, rejects missing/invalid
Turnstile tokens, verifies them before sending, and returns an error if delivery
fails or credentials are missing. Secrets are never included in client code.

Run `npm test` and `npm run typecheck`. After configuring your services, submit
a real test through `/contact` and confirm receipt in the intended inbox.
