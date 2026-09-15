// This site serves its own marketing, company, platform, legal and sign-in pages.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/exekova', destination: '/', permanent: false },
      { source: '/usecases', destination: '/use-cases', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      ...Object.entries({ 'ecommerce-retail': 'ecommerce', 'healthcare-life-sciences': 'healthcare', 'saas-software': 'saas', telecommunications: 'telecom', 'travel-hospitality': 'travel', 'logistics-supply-chain': 'logistics', 'energy-utilities': 'energy' }).map(([from, to]) => ({ source: `/industries/${from}`, destination: `/industries/${to}`, permanent: true })),
      { source: '/industries/:industry/:useCase', destination: '/industries/:industry', permanent: false },
      ...['ceo', 'coo', 'cfo', 'cio', 'cto'].map(role => ({ source: `/for/${role}`, destination: `/solutions/for-${role}s`, permanent: true })),
    ];
  },
};

export default nextConfig;
