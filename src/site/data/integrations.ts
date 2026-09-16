/**
 * The integrations catalogue and the four detail pages, generated from the
 * exekova.com content layer by scripts/import-site-content.py. Content only:
 * nothing here connects to anything; there are no connect actions.
 */
export type IntegrationRow = { name: string; slug: string; description: string; status: string; logo: string };
export type IntegrationCategory = { id: string; index: string; title: string; subhead: string; accent: string; integrations: IntegrationRow[] };
export type IntegrationsIndex = {
  title: string; description: string; eyebrow: string; headline: [string, string]; lede: string;
  statusLegend: Record<string, string>; logoPolicy: string; categories: IntegrationCategory[];
  definitions: { q: string; a: string }[]; faqGroup: string; faq: { q: string; a: string }[];
  cta: { headline: [string, string]; body: string };
};
export type IntegrationDetail = {
  slug: string; name: string; status: string; category: string; accent: string; summary: string;
  receives: string[]; sends: string[]; workflows: string[]; flow: string[]; setup: string[]; security: string[]; description: string;
};

export const integrationsIndex: IntegrationsIndex = {
  "title": "Integrations - connect exekova to your systems",
  "description": "Explore exekova integrations and the engineering, business, cloud, data and mobile ecosystem.",
  "eyebrow": "THE EXEKOVA ECOSYSTEM",
  "headline": [
    "Your tools.",
    "Working together."
  ],
  "lede": "Connect the systems you use to the outcomes you need. exekova brings context, execution, and verification into one continuous flow of work.",
  "statusLegend": {
    "Available": "Live in production today.",
    "Beta": "Available to selected customers, with known limitations.",
    "Planned": "On the roadmap. No committed date.",
    "Coming Soon": "In active development.",
    "Deprecated": "Supported for existing customers only.",
    "Ecosystem": "Tools and technologies to scope with your team. Connector availability is confirmed during setup."
  },
  "logoPolicy": "Third-party marks belong to their respective owners and identify integrations without implying endorsement. API, webhook, and MCP entries use neutral connection symbols.",
  "categories": [
    {
      "id": "engineering-ai",
      "index": "01",
      "title": "Engineering & AI",
      "subhead": "From a requirement to a reviewed change.",
      "accent": "violet",
      "integrations": [
        {
          "name": "GitHub",
          "slug": "github",
          "description": "Git repository workflows",
          "status": "Available",
          "logo": "/brand/integrations/github.svg"
        },
        {
          "name": "Jira",
          "slug": "jira",
          "description": "Jira Cloud",
          "status": "Available",
          "logo": "/brand/integrations/jira.svg"
        },
        {
          "name": "Bitbucket",
          "slug": "bitbucket",
          "description": "Repository connection",
          "status": "Available",
          "logo": "/brand/integrations/bitbucket.svg"
        },
        {
          "name": "GitLab",
          "slug": "gitlab",
          "description": "Repository connection",
          "status": "Available",
          "logo": "/brand/integrations/gitlab.webp"
        },
        {
          "name": "Linear",
          "slug": "linear",
          "description": "Issue management",
          "status": "Available",
          "logo": "/brand/integrations/linear.svg"
        },
        {
          "name": "Sentry",
          "slug": "sentry",
          "description": "Errors and diagnostics",
          "status": "Available",
          "logo": "/brand/integrations/sentry.ico"
        },
        {
          "name": "Cursor",
          "slug": "cursor",
          "description": "AI development tools",
          "status": "Available",
          "logo": "/brand/integrations/cursor.svg"
        },
        {
          "name": "GitHub Copilot",
          "slug": "github-copilot",
          "description": "AI development tools",
          "status": "Available",
          "logo": "/brand/integrations/github-copilot.svg"
        },
        {
          "name": "Gemini CLI",
          "slug": "gemini-cli",
          "description": "Additional execution engine",
          "status": "Available",
          "logo": "/brand/integrations/gemini.svg"
        },
        {
          "name": "Azure DevOps",
          "slug": "azure-devops",
          "description": "Repositories, boards and delivery pipelines",
          "status": "Ecosystem",
          "logo": "/brand/integrations/azure-devops.svg"
        },
        {
          "name": "Windsurf",
          "slug": "windsurf",
          "description": "AI development environment",
          "status": "Ecosystem",
          "logo": "/brand/integrations/windsurf.svg"
        },
        {
          "name": "JetBrains Junie",
          "slug": "jetbrains-junie",
          "description": "Coding agent for JetBrains development tools",
          "status": "Ecosystem",
          "logo": "/brand/integrations/jetbrains-junie.svg"
        },
        {
          "name": "Tabnine",
          "slug": "tabnine",
          "description": "AI assistance for software development",
          "status": "Ecosystem",
          "logo": "/brand/integrations/tabnine.webp"
        }
      ]
    },
    {
      "id": "communication-knowledge",
      "index": "02",
      "title": "Communication & knowledge",
      "subhead": "Keep decisions close to the people and the context.",
      "accent": "azure",
      "integrations": [
        {
          "name": "Microsoft Teams",
          "slug": "microsoft-teams",
          "description": "Team communication",
          "status": "Available",
          "logo": "/brand/integrations/teams.svg"
        },
        {
          "name": "Slack",
          "slug": "slack",
          "description": "Channels and handoffs",
          "status": "Available",
          "logo": "/brand/integrations/slack.webp"
        },
        {
          "name": "Gmail",
          "slug": "gmail",
          "description": "Email workflows",
          "status": "Available",
          "logo": "/brand/integrations/gmail.svg"
        },
        {
          "name": "WhatsApp",
          "slug": "whatsapp",
          "description": "Business messaging",
          "status": "Available",
          "logo": "/brand/integrations/whatsapp.webp"
        },
        {
          "name": "Notion",
          "slug": "notion",
          "description": "Knowledge and documents",
          "status": "Available",
          "logo": "/brand/integrations/notion.svg"
        },
        {
          "name": "Asana",
          "slug": "asana",
          "description": "Project management",
          "status": "Available",
          "logo": "/brand/integrations/asana.svg"
        },
        {
          "name": "Google Drive",
          "slug": "google-drive",
          "description": "Files and context",
          "status": "Available",
          "logo": "/brand/integrations/google-drive.svg"
        },
        {
          "name": "Confluence",
          "slug": "confluence",
          "description": "Team knowledge",
          "status": "Available",
          "logo": "/brand/integrations/confluence.svg"
        },
        {
          "name": "Microsoft Outlook",
          "slug": "outlook",
          "description": "Email and calendars",
          "status": "Available",
          "logo": "/brand/integrations/outlook.svg"
        },
        {
          "name": "monday.com",
          "slug": "monday",
          "description": "Work management",
          "status": "Available",
          "logo": "/brand/integrations/monday.webp"
        },
        {
          "name": "ClickUp",
          "slug": "clickup",
          "description": "Tasks and projects",
          "status": "Available",
          "logo": "/brand/integrations/clickup.svg"
        },
        {
          "name": "Smartsheet",
          "slug": "smartsheet",
          "description": "Work tracking and structured project data",
          "status": "Ecosystem",
          "logo": "/brand/integrations/smartsheet.webp"
        },
        {
          "name": "Google Chat",
          "slug": "google-chat",
          "description": "Team messaging and shared spaces",
          "status": "Ecosystem",
          "logo": "/brand/integrations/google-chat.svg"
        },
        {
          "name": "Zoom",
          "slug": "zoom",
          "description": "Meetings and team communication",
          "status": "Ecosystem",
          "logo": "/brand/integrations/zoom.svg"
        },
        {
          "name": "Coda",
          "slug": "coda",
          "description": "Collaborative documents and structured team data",
          "status": "Ecosystem",
          "logo": "/brand/integrations/coda.svg"
        },
        {
          "name": "Microsoft OneDrive",
          "slug": "microsoft-onedrive",
          "description": "Files and shared documents",
          "status": "Ecosystem",
          "logo": "/brand/integrations/microsoft-onedrive.svg"
        },
        {
          "name": "Microsoft SharePoint",
          "slug": "microsoft-sharepoint",
          "description": "Team sites and enterprise knowledge",
          "status": "Ecosystem",
          "logo": "/brand/integrations/microsoft-sharepoint.svg"
        },
        {
          "name": "Dropbox",
          "slug": "dropbox",
          "description": "Shared files and document collaboration",
          "status": "Ecosystem",
          "logo": "/brand/integrations/dropbox.svg"
        },
        {
          "name": "Box",
          "slug": "box",
          "description": "Enterprise content and document workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/box.svg"
        },
        {
          "name": "Proton Mail",
          "slug": "proton-mail",
          "description": "Encrypted email and team correspondence",
          "status": "Ecosystem",
          "logo": "/brand/integrations/proton-mail.svg"
        },
        {
          "name": "Zoho Mail",
          "slug": "zoho-mail",
          "description": "Business email workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/zoho-mail.svg"
        },
        {
          "name": "Signal",
          "slug": "signal",
          "description": "Private messaging",
          "status": "Ecosystem",
          "logo": "/brand/integrations/signal.svg"
        },
        {
          "name": "Telegram",
          "slug": "telegram",
          "description": "Messaging, channels and bots",
          "status": "Ecosystem",
          "logo": "/brand/integrations/telegram.svg"
        },
        {
          "name": "Viber",
          "slug": "viber",
          "description": "Messaging and customer communication",
          "status": "Ecosystem",
          "logo": "/brand/integrations/viber.svg"
        }
      ]
    },
    {
      "id": "business-operations",
      "index": "03",
      "title": "Business & operations",
      "subhead": "A connected workspace for every function.",
      "accent": "leaf",
      "integrations": [
        {
          "name": "Salesforce",
          "slug": "salesforce",
          "description": "Customer relationships",
          "status": "Planned",
          "logo": "/brand/integrations/salesforce.svg"
        },
        {
          "name": "HubSpot",
          "slug": "hubspot",
          "description": "Sales and marketing",
          "status": "Planned",
          "logo": "/brand/integrations/hubspot.webp"
        },
        {
          "name": "ServiceNow",
          "slug": "servicenow",
          "description": "Service operations",
          "status": "Planned",
          "logo": "/brand/integrations/servicenow.webp"
        },
        {
          "name": "Stripe",
          "slug": "stripe",
          "description": "Billing workflows",
          "status": "Available",
          "logo": "/brand/integrations/stripe.svg"
        },
        {
          "name": "Zendesk",
          "slug": "zendesk",
          "description": "Customer support",
          "status": "Planned",
          "logo": "/brand/integrations/zendesk.webp"
        },
        {
          "name": "Intercom",
          "slug": "intercom",
          "description": "Customer conversations",
          "status": "Planned",
          "logo": "/brand/integrations/intercom.webp"
        },
        {
          "name": "Airtable",
          "slug": "airtable",
          "description": "Operational data",
          "status": "Planned",
          "logo": "/brand/integrations/airtable.webp"
        },
        {
          "name": "Shopify",
          "slug": "shopify",
          "description": "Commerce operations",
          "status": "Planned",
          "logo": "/brand/integrations/shopify.svg"
        },
        {
          "name": "Microsoft Dynamics 365",
          "slug": "microsoft-dynamics-365",
          "description": "CRM and business application workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/microsoft-dynamics-365.svg"
        },
        {
          "name": "Zoho CRM",
          "slug": "zoho-crm",
          "description": "Sales records and customer workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/zoho-crm.svg"
        },
        {
          "name": "Jira Service Management",
          "slug": "jira-service-management",
          "description": "Service requests and operational tickets",
          "status": "Ecosystem",
          "logo": "/brand/integrations/jira.svg"
        },
        {
          "name": "Freshservice",
          "slug": "freshservice",
          "description": "IT service and asset workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/freshservice.svg"
        },
        {
          "name": "BMC Helix",
          "slug": "bmc-helix",
          "description": "Enterprise service and operations management",
          "status": "Ecosystem",
          "logo": "/brand/integrations/bmc-helix.svg"
        },
        {
          "name": "Freshdesk",
          "slug": "freshdesk",
          "description": "Customer service tickets and support context",
          "status": "Ecosystem",
          "logo": "/brand/integrations/freshdesk.svg"
        },
        {
          "name": "Adyen",
          "slug": "adyen",
          "description": "Payment processing and transaction workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/adyen.svg"
        },
        {
          "name": "PayPal",
          "slug": "paypal",
          "description": "Payments and merchant transactions",
          "status": "Ecosystem",
          "logo": "/brand/integrations/paypal.svg"
        },
        {
          "name": "Square",
          "slug": "square",
          "description": "Payments, point of sale and commerce data",
          "status": "Ecosystem",
          "logo": "/brand/integrations/square.svg"
        },
        {
          "name": "BigCommerce",
          "slug": "bigcommerce",
          "description": "Commerce operations and storefront work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/bigcommerce.svg"
        },
        {
          "name": "WooCommerce",
          "slug": "woocommerce",
          "description": "WordPress commerce and storefront work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/woocommerce.svg"
        },
        {
          "name": "Adobe Commerce",
          "slug": "adobe-commerce",
          "description": "Enterprise commerce and storefront work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/adobe-commerce.svg"
        }
      ]
    },
    {
      "id": "cloud-delivery",
      "index": "04",
      "title": "Cloud & delivery",
      "subhead": "Connect the work to the systems it runs on.",
      "accent": "teal",
      "integrations": [
        {
          "name": "AWS",
          "slug": "aws",
          "description": "Cloud infrastructure",
          "status": "Available",
          "logo": "/brand/integrations/aws.webp"
        },
        {
          "name": "Google Cloud",
          "slug": "google-cloud",
          "description": "Cloud infrastructure",
          "status": "Available",
          "logo": "/brand/integrations/gcp.svg"
        },
        {
          "name": "Microsoft Azure",
          "slug": "azure",
          "description": "Cloud infrastructure",
          "status": "Available",
          "logo": "/brand/integrations/azure.svg"
        },
        {
          "name": "Docker",
          "slug": "docker",
          "description": "Containers",
          "status": "Available",
          "logo": "/brand/integrations/docker.svg"
        },
        {
          "name": "Kubernetes",
          "slug": "kubernetes",
          "description": "Deployment operations",
          "status": "Available",
          "logo": "/brand/integrations/kubernetes.svg"
        },
        {
          "name": "Vercel",
          "slug": "vercel",
          "description": "Web deployments",
          "status": "Available",
          "logo": "/brand/integrations/vercel.ico"
        },
        {
          "name": "Datadog",
          "slug": "datadog",
          "description": "Observability",
          "status": "Available",
          "logo": "/brand/integrations/datadog.webp"
        },
        {
          "name": "PagerDuty",
          "slug": "pagerduty",
          "description": "Incident response",
          "status": "Available",
          "logo": "/brand/integrations/pagerduty.webp"
        },
        {
          "name": "Cloudflare",
          "slug": "cloudflare",
          "description": "Edge delivery, DNS and application security",
          "status": "Ecosystem",
          "logo": "/brand/integrations/cloudflare.svg"
        },
        {
          "name": "Oracle Cloud",
          "slug": "oracle-cloud",
          "description": "Cloud infrastructure and deployment work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/oracle.webp"
        },
        {
          "name": "Fastly",
          "slug": "fastly",
          "description": "Edge delivery and application services",
          "status": "Ecosystem",
          "logo": "/brand/integrations/fastly.svg"
        },
        {
          "name": "Akamai",
          "slug": "akamai",
          "description": "Content delivery and edge security",
          "status": "Ecosystem",
          "logo": "/brand/integrations/akamai.svg"
        },
        {
          "name": "Amazon CloudFront",
          "slug": "amazon-cloudfront",
          "description": "AWS content delivery workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/aws.webp"
        },
        {
          "name": "Podman",
          "slug": "podman",
          "description": "Container builds and local runtimes",
          "status": "Ecosystem",
          "logo": "/brand/integrations/podman.svg"
        },
        {
          "name": "containerd",
          "slug": "containerd",
          "description": "Container runtime operations",
          "status": "Ecosystem",
          "logo": "/brand/integrations/containerd.svg"
        },
        {
          "name": "CRI-O",
          "slug": "cri-o",
          "description": "Kubernetes container runtime work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/cri-o.webp"
        },
        {
          "name": "HashiCorp Nomad",
          "slug": "hashicorp-nomad",
          "description": "Workload scheduling and orchestration",
          "status": "Ecosystem",
          "logo": "/brand/integrations/hashicorp-nomad.svg"
        },
        {
          "name": "Amazon ECS",
          "slug": "amazon-ecs",
          "description": "Managed container service workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/aws.webp"
        },
        {
          "name": "Docker Swarm",
          "slug": "docker-swarm",
          "description": "Docker cluster orchestration",
          "status": "Ecosystem",
          "logo": "/brand/integrations/docker.svg"
        },
        {
          "name": "Netlify",
          "slug": "netlify",
          "description": "Web application builds and delivery",
          "status": "Ecosystem",
          "logo": "/brand/integrations/netlify.svg"
        },
        {
          "name": "Render",
          "slug": "render",
          "description": "Application and service deployments",
          "status": "Ecosystem",
          "logo": "/brand/integrations/render.svg"
        },
        {
          "name": "Cloudflare Pages",
          "slug": "cloudflare-pages",
          "description": "Web builds and edge deployments",
          "status": "Ecosystem",
          "logo": "/brand/integrations/cloudflare.svg"
        }
      ]
    },
    {
      "id": "harnesses-automation",
      "index": "05",
      "title": "Harnesses & automation",
      "subhead": "An extensible direction for tools, workflows and execution.",
      "accent": "violet",
      "integrations": [
        {
          "name": "MCP Servers",
          "slug": "mcp",
          "description": "Additional tool connections",
          "status": "Planned",
          "logo": "/brand/integrations/wz-neutral-mcp.svg"
        },
        {
          "name": "REST APIs",
          "slug": "rest-api",
          "description": "Custom integrations",
          "status": "Planned",
          "logo": "/brand/integrations/wz-neutral-api.svg"
        },
        {
          "name": "Webhooks",
          "slug": "webhooks",
          "description": "Event-driven work",
          "status": "Planned",
          "logo": "/brand/integrations/wz-neutral-webhook.svg"
        },
        {
          "name": "n8n",
          "slug": "n8n",
          "description": "Workflow automation",
          "status": "Planned",
          "logo": "/brand/integrations/n8n.svg"
        },
        {
          "name": "Zapier",
          "slug": "zapier",
          "description": "Workflow automation",
          "status": "Planned",
          "logo": "/brand/integrations/zapier.webp"
        },
        {
          "name": "Make",
          "slug": "make",
          "description": "Workflow automation",
          "status": "Planned",
          "logo": "/brand/integrations/make.webp"
        },
        {
          "name": "LangGraph",
          "slug": "langgraph",
          "description": "Workflow harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/langgraph.svg"
        },
        {
          "name": "OpenHands",
          "slug": "openhands",
          "description": "Engineering harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/openhands.webp"
        },
        {
          "name": "OpenCode",
          "slug": "opencode",
          "description": "Engineering harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/opencode.svg"
        },
        {
          "name": "Cline",
          "slug": "cline",
          "description": "Engineering harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/cline.webp"
        },
        {
          "name": "Aider",
          "slug": "aider",
          "description": "Engineering harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/aider.webp"
        },
        {
          "name": "CrewAI",
          "slug": "crewai",
          "description": "Workflow harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/crewai.webp"
        },
        {
          "name": "AutoGen",
          "slug": "autogen",
          "description": "Workflow harnesses",
          "status": "Planned",
          "logo": "/brand/integrations/autogen.svg"
        },
        {
          "name": "Workato",
          "slug": "workato",
          "description": "Enterprise workflow automation",
          "status": "Ecosystem",
          "logo": "/brand/integrations/workato.webp"
        },
        {
          "name": "Activepieces",
          "slug": "activepieces",
          "description": "Workflow automation and connected actions",
          "status": "Ecosystem",
          "logo": "/brand/integrations/activepieces.webp"
        },
        {
          "name": "Semantic Kernel",
          "slug": "semantic-kernel",
          "description": "AI orchestration and application capabilities",
          "status": "Ecosystem",
          "logo": "/brand/integrations/semantic-kernel.svg"
        }
      ]
    },
    {
      "id": "observability",
      "index": "06",
      "title": "Observability",
      "subhead": "Keep the signals close to the work.",
      "accent": "violet",
      "integrations": [
        {
          "name": "Elasticsearch",
          "slug": "elasticsearch",
          "description": "Search indexes and analytics queries",
          "status": "Ecosystem",
          "logo": "/brand/integrations/elasticsearch.svg"
        },
        {
          "name": "Kibana",
          "slug": "kibana",
          "description": "Dashboards, logs and operational investigation",
          "status": "Ecosystem",
          "logo": "/brand/integrations/kibana.svg"
        },
        {
          "name": "Logstash",
          "slug": "logstash",
          "description": "Data ingestion and transformation pipelines",
          "status": "Ecosystem",
          "logo": "/brand/integrations/logstash.svg"
        },
        {
          "name": "Beats",
          "slug": "beats",
          "description": "Lightweight log and metric collection",
          "status": "Ecosystem",
          "logo": "/brand/integrations/beats.svg"
        },
        {
          "name": "Elastic Agent",
          "slug": "elastic-agent",
          "description": "Unified collection for the Elastic Stack",
          "status": "Ecosystem",
          "logo": "/brand/integrations/elastic-agent.svg"
        },
        {
          "name": "Elastic APM",
          "slug": "elastic-apm",
          "description": "Application traces and performance analysis",
          "status": "Ecosystem",
          "logo": "/brand/integrations/elastic-apm.svg"
        },
        {
          "name": "Dynatrace",
          "slug": "dynatrace",
          "description": "Application and infrastructure observability",
          "status": "Ecosystem",
          "logo": "/brand/integrations/dynatrace.svg"
        },
        {
          "name": "New Relic",
          "slug": "new-relic",
          "description": "Application telemetry and performance insight",
          "status": "Ecosystem",
          "logo": "/brand/integrations/new-relic.svg"
        },
        {
          "name": "Splunk",
          "slug": "splunk",
          "description": "Operational search and observability",
          "status": "Ecosystem",
          "logo": "/brand/integrations/splunk.svg"
        },
        {
          "name": "Grafana",
          "slug": "grafana",
          "description": "Metrics, dashboards and operational visibility",
          "status": "Ecosystem",
          "logo": "/brand/integrations/grafana.svg"
        },
        {
          "name": "Bugsnag",
          "slug": "bugsnag",
          "description": "Application errors and stability insight",
          "status": "Ecosystem",
          "logo": "/brand/integrations/bugsnag.webp"
        },
        {
          "name": "Rollbar",
          "slug": "rollbar",
          "description": "Error monitoring and diagnostics",
          "status": "Ecosystem",
          "logo": "/brand/integrations/rollbar.webp"
        },
        {
          "name": "incident.io",
          "slug": "incident-io",
          "description": "Incident response and coordination",
          "status": "Ecosystem",
          "logo": "/brand/integrations/incident-io.webp"
        },
        {
          "name": "FireHydrant",
          "slug": "firehydrant",
          "description": "Incident management and service context",
          "status": "Ecosystem",
          "logo": "/brand/integrations/firehydrant.webp"
        },
        {
          "name": "Rootly",
          "slug": "rootly",
          "description": "Incident coordination and response workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/rootly.svg"
        },
        {
          "name": "Fluentd",
          "slug": "fluentd",
          "description": "Log collection and routing",
          "status": "Ecosystem",
          "logo": "/brand/integrations/fluentd.svg"
        },
        {
          "name": "Fluent Bit",
          "slug": "fluent-bit",
          "description": "Lightweight telemetry collection",
          "status": "Ecosystem",
          "logo": "/brand/integrations/fluent-bit.svg"
        },
        {
          "name": "OpenTelemetry Collector",
          "slug": "opentelemetry-collector",
          "description": "Collection and routing of vendor-neutral telemetry",
          "status": "Ecosystem",
          "logo": "/brand/integrations/opentelemetry-collector.svg"
        },
        {
          "name": "Vector",
          "slug": "vector",
          "description": "Telemetry processing pipelines",
          "status": "Ecosystem",
          "logo": "/brand/integrations/vector.webp"
        },
        {
          "name": "Cribl",
          "slug": "cribl",
          "description": "Telemetry collection, processing and routing",
          "status": "Ecosystem",
          "logo": "/brand/integrations/cribl.webp"
        }
      ]
    },
    {
      "id": "data-platforms",
      "index": "07",
      "title": "Databases & streaming",
      "subhead": "From application data to event-driven systems.",
      "accent": "violet",
      "integrations": [
        {
          "name": "Apache Kafka",
          "slug": "apache-kafka",
          "description": "Event streams and consumer workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/apache-kafka.svg"
        },
        {
          "name": "MongoDB",
          "slug": "mongodb",
          "description": "Document data and application queries",
          "status": "Ecosystem",
          "logo": "/brand/integrations/mongodb.svg"
        },
        {
          "name": "Oracle",
          "slug": "oracle",
          "description": "Enterprise relational database work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/oracle.webp"
        },
        {
          "name": "PostgreSQL",
          "slug": "postgresql",
          "description": "Relational data, queries and schema changes",
          "status": "Ecosystem",
          "logo": "/brand/integrations/postgresql.svg"
        },
        {
          "name": "MySQL",
          "slug": "mysql",
          "description": "Relational application data and schema changes",
          "status": "Ecosystem",
          "logo": "/brand/integrations/mysql.svg"
        },
        {
          "name": "Microsoft SQL Server",
          "slug": "microsoft-sql-server",
          "description": "Relational database and enterprise data work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/microsoft-sql-server.svg"
        },
        {
          "name": "MariaDB",
          "slug": "mariadb",
          "description": "Relational database and schema work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/mariadb.svg"
        },
        {
          "name": "Couchbase",
          "slug": "couchbase",
          "description": "Document data and distributed application storage",
          "status": "Ecosystem",
          "logo": "/brand/integrations/couchbase.svg"
        },
        {
          "name": "Amazon DynamoDB",
          "slug": "amazon-dynamodb",
          "description": "Managed key-value and document data",
          "status": "Ecosystem",
          "logo": "/brand/integrations/amazon-dynamodb.svg"
        },
        {
          "name": "Cloud Firestore",
          "slug": "cloud-firestore",
          "description": "Document data for web and mobile applications",
          "status": "Ecosystem",
          "logo": "/brand/integrations/cloud-firestore.svg"
        },
        {
          "name": "Redpanda",
          "slug": "redpanda",
          "description": "Kafka-compatible event streaming",
          "status": "Ecosystem",
          "logo": "/brand/integrations/redpanda.webp"
        },
        {
          "name": "Apache Pulsar",
          "slug": "apache-pulsar",
          "description": "Distributed messaging and streaming",
          "status": "Ecosystem",
          "logo": "/brand/integrations/apache-pulsar.svg"
        },
        {
          "name": "RabbitMQ",
          "slug": "rabbitmq",
          "description": "Message queues and asynchronous workloads",
          "status": "Ecosystem",
          "logo": "/brand/integrations/rabbitmq.svg"
        },
        {
          "name": "OpenSearch",
          "slug": "opensearch",
          "description": "Search and analytics workloads",
          "status": "Ecosystem",
          "logo": "/brand/integrations/opensearch.svg"
        },
        {
          "name": "Algolia",
          "slug": "algolia",
          "description": "Hosted application search",
          "status": "Ecosystem",
          "logo": "/brand/integrations/algolia.svg"
        },
        {
          "name": "Apache Solr",
          "slug": "apache-solr",
          "description": "Search indexes and query workflows",
          "status": "Ecosystem",
          "logo": "/brand/integrations/apache-solr.svg"
        }
      ]
    },
    {
      "id": "mobile-platforms",
      "index": "08",
      "title": "Mobile platforms",
      "subhead": "The platforms your customers carry.",
      "accent": "violet",
      "integrations": [
        {
          "name": "Android",
          "slug": "android",
          "description": "Native Android application work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/android.svg"
        },
        {
          "name": "iOS",
          "slug": "ios",
          "description": "Native iPhone and iPad application work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/ios.svg"
        },
        {
          "name": "HarmonyOS",
          "slug": "harmonyos",
          "description": "HarmonyOS application work",
          "status": "Ecosystem",
          "logo": "/brand/integrations/harmonyos.svg"
        },
        {
          "name": "KaiOS",
          "slug": "kaios",
          "description": "Web-based applications for smart feature phones",
          "status": "Ecosystem",
          "logo": "/brand/integrations/kaios.svg"
        }
      ]
    }
  ],
  "definitions": [
    {
      "q": "Why do only some integrations have their own page?",
      "a": "A detail page exists where there is something specific to say about how exekova works with that tool: what it reads, what it writes back, the shape of a run through it, and the security considerations that follow. GitHub, Jira, Slack and Microsoft Teams meet that bar today. Every other connector is listed in the directory above with its current status, which is the accurate surface for it until there is more to describe than the catalogue row already says."
    }
  ],
  "faqGroup": "Integrations",
  "faq": [
    {
      "q": "Does exekova support Jira?",
      "a": "Yes. Jira Cloud is available today for receiving work and writing updates back. exekova picks up issues, executes against them, and writes progress and outcomes back, so the board reflects the state of the work without anyone updating it by hand. Writes use credentials held by the platform and scoped to the permissions you granted, and can be placed behind an approval gate."
    },
    {
      "q": "Does exekova support GitHub?",
      "a": "Yes. GitHub is available today for repository workflows, including branches and pull requests. exekova reads repository and issue context, executes on working branches, and delivers verified work as a pull request with its test evidence attached. Merge and production approval stay with your team: the integration delivers reviewed work to the point of decision rather than past it."
    },
    {
      "q": "Which integrations are available?",
      "a": "All integrations in Engineering & AI, Communication & knowledge, and Cloud & delivery are available, along with Stripe for billing workflows. Browse the integrations directory for the full list. Each tool in the directory carries its current status, so what is available today and what is on the roadmap are distinguishable at a glance rather than implied by the presence of a logo."
    },
    {
      "q": "Which integrations are planned?",
      "a": "The remaining business and operations integrations, apart from Stripe, and harnesses and automation integrations are on the roadmap. Each tool is labelled with its current status on the integrations page. Planned means exactly that: it is not connected today, and the label is not softened. Where a system has no dedicated integration yet, REST and webhook connectivity are also on the roadmap rather than available."
    },
    {
      "q": "Can exekova connect through APIs?",
      "a": "REST API and webhook connectivity are on the roadmap for systems without a dedicated integration. They are listed as Planned rather than Available, which means they cannot be relied on for work you are scoping today. Where a system already has a dedicated integration, that path is the supported one, and its status is shown alongside every other tool in the integrations directory."
    },
    {
      "q": "Will exekova support MCP?",
      "a": "MCP server support is planned. It is listed as Planned rather than Available, so it is not something to build a current deployment around. The status shown in the integrations directory is the authoritative one for every tool, and it is not softened for capabilities that are expected rather than shipped. When it moves, it will move in that directory first."
    }
  ],
  "cta": {
    "headline": [
      "Which system does",
      "your work start in?"
    ],
    "body": "That is usually the first integration worth configuring."
  }
};

export const integrationDetails: IntegrationDetail[] = [
  {
    "slug": "github",
    "name": "GitHub",
    "status": "Available",
    "category": "Engineering & AI",
    "accent": "leaf",
    "summary": "GitHub is where engineering work both starts and lands. exekova reads repository and issue context, executes on working branches, and delivers verified work as a pull request with its evidence attached.",
    "receives": [
      "Issues and their linked context",
      "Repository contents within the granted scope",
      "Branch, commit and pull request state",
      "Check and workflow results"
    ],
    "sends": [
      "Branches and commits",
      "Pull requests with a description of what changed and why",
      "Comments carrying review and test evidence",
      "Status updates as work moves through the acceptance path"
    ],
    "workflows": [
      "Issue to pull request",
      "Branch-scoped implementation",
      "Pull request revision after review feedback",
      "Build and check failure diagnosis"
    ],
    "flow": [
      "An issue is picked up with its acceptance criteria",
      "exekova plans the change and opens a working branch",
      "An execution capability implements against the scope granted",
      "Independent review assesses the change",
      "Checks and tests run, with results captured",
      "Failures route into the recovery loop",
      "A pull request is opened with evidence attached",
      "Human approval is requested where policy requires it"
    ],
    "setup": [
      "Install the exekova GitHub app or configure access for the organisation",
      "Select the repositories in scope",
      "Grant the minimum permissions the work requires",
      "Decide whether pull requests require human approval before merge",
      "Map issue labels to work categories if you use them"
    ],
    "security": [
      "Access granted per repository, not per organisation by default",
      "Merge can be held behind an approval gate",
      "Credentials held in platform secret storage",
      "Every branch, commit and comment action recorded in the run"
    ],
    "description": "exekova reads repository and issue context, executes on working branches, and delivers verified work as a pull request with its test evidence attached."
  },
  {
    "slug": "jira",
    "name": "Jira",
    "status": "Available",
    "category": "Engineering & AI",
    "accent": "teal",
    "summary": "Jira Cloud is a primary source of incoming work and a system of record for its status. exekova picks up issues, executes against them, and writes progress and outcomes back so the board stays accurate without anyone updating it.",
    "receives": [
      "Issues, descriptions and acceptance criteria",
      "Project, epic and sprint context",
      "Labels, priorities and assignments",
      "Linked issues and dependencies"
    ],
    "sends": [
      "Status transitions as work moves through the acceptance path",
      "Comments carrying evidence and links to delivered artefacts",
      "Field updates where the workspace permits",
      "Blocked status with the blocking reason named"
    ],
    "workflows": [
      "Issue intake into an execution run",
      "Automatic status updates through the acceptance path",
      "Backlog enrichment where a ticket is too thin to execute",
      "Blocked reporting with a stated cause"
    ],
    "flow": [
      "An issue enters a queue exekova is configured to watch",
      "Context is gathered from the issue and its links",
      "exekova plans the work and attaches acceptance criteria",
      "Execution runs across the connected systems",
      "The issue is transitioned as the work advances",
      "Review and test evidence is posted as comments",
      "Blocked work is marked with the reason",
      "The issue is closed only when work has been accepted"
    ],
    "setup": [
      "Connect the Jira Cloud site",
      "Select the projects in scope",
      "Map Jira statuses to exekova acceptance states",
      "Choose which queues or filters exekova watches",
      "Decide which transitions require human approval",
      "Set the definition-of-done template for each project"
    ],
    "security": [
      "Access scoped to selected projects",
      "Write permissions granted separately from read",
      "Credentials held in platform secret storage",
      "Transitions and comments recorded in the run for audit"
    ],
    "description": "exekova picks up Jira issues, executes against them, and writes progress and outcomes back, so the board stays accurate without anyone updating it by hand."
  }
];

export function integrationBySlug(slug: string) {
  return integrationDetails.find(item => item.slug === slug);
}
