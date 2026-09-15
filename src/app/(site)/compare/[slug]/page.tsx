import type { Metadata } from 'next';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { comparisonBySlug, comparisons } from '@/site/data/compare';
import { plain } from '@/site/lib/inline';
import { virtualPage } from '@/site/lib/meta';
import { fitTitle } from '@/site/lib/seoCopy';
import JsonLd from '@/site/components/JsonLd';
import ComparisonArticle from '@/site/components/articles/ComparisonArticle';

const SOURCE = path.join(process.cwd(), 'src/site/data/compare.ts');

function pageFor(slug: string) {
  const item = comparisonBySlug(slug);
  if (!item) return null;
  return { item, page: virtualPage({ slug: `/compare/${slug}`, title: fitTitle(`${item.title} | autonomous work execution platform compared`, `${item.title} | verified outcomes, compared`, `${item.title} | exekova`), description: item.description, keywords: [`exekova vs ${item.name.toLowerCase()}`, `${item.name.toLowerCase()} alternative`], schema: ['WebPage', 'FAQPage'], sourceFile: SOURCE }) };
}

export function generateStaticParams() {
  return comparisons.map(item => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = pageFor((await params).slug);
  return found ? buildMetadata(found.page) : {};
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const found = pageFor((await params).slug);
  if (!found) notFound();
  const { item, page } = found;
  return <>
    <ComparisonArticle item={item}/>
    <JsonLd data={schemaForPage(page, [...item.definitions, ...item.faq].map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
