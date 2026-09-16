import type { Metadata } from 'next';
import { getPageBySlug, getSite, type Page } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

/**
 * Metadata for the pages outside the homepage.
 *
 * Static pages keep their meta in content/pages/<name>.json, the same shape
 * the homepage uses, so titles and descriptions live with the content layer.
 * Data-driven pages (an industry, a role, a use case) build the same Page
 * record in code and point `sourceFile` at the data file, which is what the
 * WebPage schema reads for its dateModified.
 */
export function contentPage(slug: string): Page {
  const page = getPageBySlug(slug);
  if (!page) throw new Error(`No content/pages entry declares slug "${slug}"`);
  return page;
}

export function metadataFor(slug: string): Metadata {
  return buildMetadata(contentPage(slug));
}

export function virtualPage(input: { slug: string; title: string; description: string; keywords?: string[]; schema?: string[]; sourceFile: string }): Page {
  return { slug: input.slug, meta: { title: input.title, description: input.description, keywords: input.keywords, schema: input.schema }, sections: [], sourceFile: input.sourceFile };
}

export function siteBase() {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? getSite().brand.url).origin;
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  const base = siteBase();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, name: crumb.label, item: `${base}${crumb.href}` })),
  };
}

/** The site's contact address, read once from the content layer. */
export function contactEmail() {
  return (getSite().footer.contact.href as string).replace('mailto:', '');
}
