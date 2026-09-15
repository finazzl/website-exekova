import type { Metadata } from 'next';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { platformPageBySlug, platformPages } from '@/site/data/platform';
import { plain } from '@/site/lib/inline';
import { virtualPage } from '@/site/lib/meta';
import { fitTitle } from '@/site/lib/seoCopy';
import JsonLd from '@/site/components/JsonLd';
import PlatformArticle, { platformFaqItems } from '@/site/components/articles/PlatformArticle';

const SOURCE = path.join(process.cwd(), 'src/site/data/platform.ts');

/** The platform pages imported from exekova.com: the category definition, Workforce, Live Floor, Quality, Recovery, Performance and Security. */
function pageFor(slug: string) {
  const item = platformPageBySlug(slug);
  if (!item) return null;
  const faq = platformFaqItems(item);
  return { item, faq, page: virtualPage({ slug: `/${slug}`, title: fitTitle(`${item.title} | exekova`, item.title), description: item.description, keywords: item.keywords, schema: faq.length ? ['WebPage', 'FAQPage'] : ['WebPage'], sourceFile: SOURCE }) };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return platformPages.map(item => ({ page: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const found = pageFor((await params).page);
  return found ? buildMetadata(found.page) : {};
}

export default async function PlatformPage({ params }: { params: Promise<{ page: string }> }) {
  const found = pageFor((await params).page);
  if (!found) notFound();
  return <>
    <PlatformArticle page={found.item}/>
    <JsonLd data={schemaForPage(found.page, found.faq.map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
