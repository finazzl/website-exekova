import type { Metadata } from 'next';
import { getSite, lastModifiedOf, type Page } from './content';

/**
 * The parts of the monorepo's seo.ts the beta page needs. The SoftwareApplication
 * offer block is deliberately absent: it describes the hourly enterprise plans,
 * which this page does not sell.
 */
const site = getSite();
const BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? site.brand.url) as string;

/** The page's canonical home is on the main site, even when served from here. */
function urlFor(slug: string) {
  return `${BASE}${slug}`;
}

export function buildMetadata(page: Page): Metadata {
  const url = page.meta.canonicalPath ? `${BASE}${page.meta.canonicalPath}` : urlFor(page.slug);
  const image = `${BASE}${page.meta.ogImage ?? site.seo.ogImage}`;
  return {
    title: { absolute: page.meta.title },
    description: page.meta.description,
    keywords: page.meta.keywords,
    alternates: { canonical: url },
    robots: page.meta.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: site.brand.name,
      title: page.meta.title,
      description: page.meta.description,
      images: [{ url: image, width: 1200, height: 630, alt: site.brand.tagline }],
    },
    twitter: { card: 'summary_large_image', site: site.seo.twitter, title: page.meta.title, description: page.meta.description, images: [image] },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: site.brand.name,
    url: BASE,
    logo: `${BASE}${site.brand.wordmark}`,
    description: site.seo.defaultDescription,
    slogan: site.brand.tagline,
    alternateName: site.brand.category,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: (site.footer.contact.href as string).replace('mailto:', ''),
      availableLanguage: 'English',
    },
  };
}

export function websiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${BASE}/#website`, name: site.brand.name, url: BASE, publisher: { '@id': `${BASE}/#organization` } };
}

export function webPageSchema(page: Page) {
  const url = page.meta.canonicalPath ? `${BASE}${page.meta.canonicalPath}` : urlFor(page.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.meta.title,
    description: page.meta.description,
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': `${BASE}/#organization` },
    publisher: { '@id': `${BASE}/#organization` },
    inLanguage: 'en',
    dateModified: lastModifiedOf(page.sourceFile).toISOString(),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };
}

/** WebPage always; FAQPage only when the page renders the questions it marks up. */
export function schemaForPage(page: Page, faqItems?: { q: string; a: string }[]) {
  const blocks: object[] = [webPageSchema(page)];
  if ((page.meta.schema ?? []).includes('FAQPage') && faqItems?.length) blocks.push(faqSchema(faqItems));
  return blocks;
}
