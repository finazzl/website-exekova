// This site serves its own marketing, company, platform, legal and sign-in pages.
import { siteRedirects } from './deployment/cloudflare/redirects.mjs';

const staticExport = process.env.EXEKOVA_STATIC_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'], ...(staticExport ? { unoptimized: true } : {}) },
  ...(staticExport ? { output: 'export' } : { async redirects() { return siteRedirects; } }),
};

export default nextConfig;
