# Integration logos

Local brand artwork used alongside readable brand names. Files are served locally
so visitors do not make requests to external logo services.

## Sources

| File | Vendor source |
| --- | --- |
| github.svg | https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg |
| jira.svg | https://wac-cdn.atlassian.com/misc-assets/adg4-nav/prod-icon-Jira.svg |
| confluence.svg | https://wac-cdn.atlassian.com/misc-assets/adg4-nav/prod-icon-Confluence.svg |
| slack.png | https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png |
| linear.svg | https://linear.app/static/favicon.svg?v=2 |
| gitlab.png | https://about.gitlab.com/images/ico/favicon-192x192.png |
| datadog.png | https://corp.dd-static.net/img/dd_logo_n_70x75.png |
| aws.png | https://a0.awsstatic.com/libra-css/images/site/touch-icon-ipad-144-smile.png |
| claude-code.png | https://assets.claude.com/95a868946ac8a31e5ff832e2899f294aa368b836.png |
| codex.png | https://github.com/openai.png?size=128 |
| sentry.ico | https://sentry.io/favicon.ico |
| servicenow.png | https://github.com/ServiceNow.png?size=128 |

Codex uses OpenAI's company mark; Claude Code uses Claude's company mark.
ServiceNow uses the Now mark from its official GitHub organization. Artwork is
stored as supplied, without redrawing or recolouring.

## Additional catalog assets

Brand artwork is sourced from the SVGL library, vendor websites, and official
GitHub organization profiles. SVGL assets are preserved without redrawing or
recolouring. Organization marks identify their corresponding products when a
separate product mark is not supplied (LangGraph uses the LangChain mark).

| File | Source |
| --- | --- |
| teams.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/microsoft-teams.svg |
| gmail.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/gmail.svg |
| notion.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/notion.svg |
| asana.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/asana-logo.svg |
| google-drive.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/drive.svg |
| outlook.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/microsoft-outlook.svg |
| clickup.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/clickup.svg |
| salesforce.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/salesforce.svg |
| stripe.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/stripe.svg |
| shopify.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/shopify.svg |
| gcp.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/google-cloud.svg |
| azure.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/azure.svg |
| docker.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/docker.svg |
| kubernetes.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/kubernetes.svg |
| cursor.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/cursor_light.svg |
| github-copilot.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/copilot.svg |
| gemini.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/gemini.svg |
| n8n.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/n8n.svg |
| langgraph.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/langchain-logo.svg |
| opencode.svg | https://raw.githubusercontent.com/pheralb/svgl/main/static/library/opencode.svg |
| whatsapp.png | https://github.com/WhatsApp.png?size=128 |
| hubspot.png | https://github.com/HubSpot.png?size=128 |
| zendesk.png | https://github.com/zendesk.png?size=128 |
| intercom.png | https://github.com/intercom.png?size=128 |
| airtable.png | https://github.com/Airtable.png?size=128 |
| pagerduty.png | https://github.com/PagerDuty.png?size=128 |
| zapier.png | https://github.com/zapier.png?size=128 |
| openhands.png | https://github.com/OpenHands.png?size=128 |
| cline.png | https://github.com/cline.png?size=128 |
| aider.png | https://github.com/Aider-AI.png?size=128 |
| crewai.png | https://github.com/crewAIInc.png?size=128 |
| monday.png | https://github.com/mondaycom.png?size=128 |
| make.png | https://github.com/integromat.png?size=128 |
| bitbucket.svg | https://wac-cdn.atlassian.com/misc-assets/adg4-nav/prod-icon-Bitbucket.svg |
| vercel.ico | https://vercel.com/favicon.ico |
| autogen.svg | https://microsoft.github.io/autogen/stable/_static/logo.svg |

`wz-neutral-api.svg`, `wz-neutral-webhook.svg`, and `wz-neutral-mcp.svg` are
original Workinzo connection symbols, not vendor logos.

The complete shared name mapping is in `src/lib/brand-logos.ts`; catalog paths
live in `content/integrations.json`. Keep these in sync when adding assets.
Every current catalog entry has a local asset. Initials are used only if an
image fails to load.

Third-party marks belong to their respective owners and identify integrations;
they do not indicate endorsement or change integration availability.

## Expanded ecosystem — September 2026

The shared scroller contains 134 distinct tools and technologies, including
Cloudflare; Elasticsearch, Kibana, Logstash, Beats, Elastic Agent and Elastic APM;
Android and iOS; Apache Kafka; MongoDB, Oracle, PostgreSQL and MySQL; Salesforce
and category alternatives. The three neutral connection symbols remain in the
directory, making 137 catalog entries.

[expanded-sources.json](expanded-sources.json) records the source of every added
asset. Sources include vendor product sites, official organization profiles,
SVGL, Devicon, and the monochrome artwork supplied by Simple Icons. Downloaded
files are checked as images before being used, including a browser check for
blank or entirely white artwork.

Parent marks identify the following products: Microsoft for Dynamics 365 and
Semantic Kernel; JetBrains for Junie; Adobe for Adobe Commerce; BMC for Helix;
Zoho for CRM and Mail; Oracle for Oracle Cloud; AWS for CloudFront and ECS;
Docker for Swarm; Cloudflare for Pages; Jira for Jira Service Management;
Firebase for Cloud Firestore; Elastic for Elastic Agent. Elastic APM uses
Elastic's Observability mark. Product names remain visible alongside each mark.

Categories live in `content/ecosystem.json`. `content/brand-alternatives.json`
records the three selected competitors or category alternatives per original
brand and requested technology. The list is deduplicated; it is not an
endorsement or a numerical market-share ranking. Standards such as REST, MCP
and webhooks are not companies and have no company-competitor list.

New directory entries use **Ecosystem** while existing availability values are
preserved. Adding artwork does not establish a live native connector.
