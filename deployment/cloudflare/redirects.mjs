// One source for the Next.js server and Cloudflare's static redirect file.
export const siteRedirects = [
  { source: '/exekova', destination: '/', permanent: true },
  { source: '/integrations/claude-code', destination: '/integrations', permanent: true },
  { source: '/integrations/codex', destination: '/integrations', permanent: true },
  { source: '/usecases', destination: '/use-cases', permanent: true },
  { source: '/privacy-policy', destination: '/privacy', permanent: true },
  { source: '/terms-of-service', destination: '/terms', permanent: true },
  ...Object.entries({ 'ecommerce-retail': 'ecommerce', 'healthcare-life-sciences': 'healthcare', 'saas-software': 'saas', telecommunications: 'telecom', 'travel-hospitality': 'travel', 'logistics-supply-chain': 'logistics', 'energy-utilities': 'energy' }).map(([from, to]) => ({ source: `/industries/${from}`, destination: `/industries/${to}`, permanent: true })),
  { source: '/industries/:industry/:useCase', destination: '/industries/:industry', permanent: false },
  ...['ceo', 'coo', 'cfo', 'cio', 'cto'].map(role => ({ source: `/for/${role}`, destination: `/solutions/for-${role}s`, permanent: true })),
];
