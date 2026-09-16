# WhatsApp-specific preview investigation

The user confirmed that EXEKOVA previews work on LinkedIn and GitHub previews work in the same WhatsApp app on iPhone. This makes the global WhatsApp preview toggle an unlikely explanation. Do not ask the user to change that setting again without new evidence. The comparison-page results are still pending.

## Verified on 2026-09-16

- The homepage and 1200 × 630 PNG image return HTTP 200 without a challenge from this test connection.
- WhatsApp's documented Android (`A`), iOS (`I`) and Web (`N`) user-agent formats receive the same HTML with `Accept-Language: en`.
- The complete HTML head ends at byte 4,325, well inside WhatsApp's documented first-300-KB requirement.
- The preview PNG is 95,026 bytes, well inside WhatsApp's documented 600-KB image limit. Width and aspect ratio also comply.
- HTTP/1.1, HTTP/2, gzip, TLS 1.2 and IPv6 requests work. Gzip expands to the same HTML. Range requests receive the complete valid response with HTTP 200.
- Public Google DNS resolves the domain's A and AAAA records successfully.
- The earlier invalid favicon was fixed and deployed; the title and preview image are present in the initial HTML.
- The current Wrangler login can deploy the site, but Cloudflare's zone settings, bot-management and security-rules endpoints returned HTTP 403. No security setting has been changed.

These checks do **not** prove that a request originating from the user's WhatsApp app reaches the site, or that WhatsApp renders the card. The cause of that failure remains unconfirmed.

## Controlled comparison

Two small, JavaScript-free test pages are excluded from search indexing and are not linked from the website:

1. `https://exekova.com/preview-check-20260916-domain`
2. `https://exekova.sanjay-singh-597.workers.dev/preview-check-20260916-edge`

Each page uses its own hostname for the canonical URL, preview image and icon. This avoids the alternate-host test depending on EXEKOVA's custom domain for its image or canonical identity.

Paste each link separately into a new WhatsApp message without sending, and allow 10 seconds as described in WhatsApp's documentation:

- **Both work:** investigate the homepage response or its cached preview.
- **Only the alternate hostname works:** focus on custom-domain access, its cache/reputation, or Cloudflare zone rules. This result alone does not prove a specific firewall rule is responsible.
- **Neither works:** compare the actual app, network and request behavior; do not claim that changing HTML tags or disabling Cloudflare security will solve it.

For a matching Cloudflare security event, record the request time, host, path, user agent, action and rule/service. Only change a rule after it is identified; a user-agent string is not sufficient authentication for a broad security bypass.

The two `public/preview-check-20260916-*.html` files are temporary, Git-ignored diagnostics retained locally while the investigation is open. They are absent from a fresh checkout; local builds still include them because Next.js copies `public/` files regardless of `.gitignore`. Remove them and rebuild/deploy after the investigation is finished.

## Reference

[WhatsApp's link-preview requirements](https://developers.facebook.com/docs/whatsapp/link-previews/) describe the metadata, image limits, user agents and composer test. `npm run test:sharing -- --url=https://exekova.com` verifies the public responses for all three WhatsApp user-agent families and the other supported social crawlers.
