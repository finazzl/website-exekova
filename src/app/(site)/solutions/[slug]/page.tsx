import type { Metadata } from 'next';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { functionBySlug, functions } from '@/site/data/functions';
import { leaderBySlug, leaders } from '@/site/data/leaders';
import { plain } from '@/site/lib/inline';
import { virtualPage } from '@/site/lib/meta';
import { functionFaq } from '@/site/lib/pageFaq';
import { fitTitle } from '@/site/lib/seoCopy';
import JsonLd from '@/site/components/JsonLd';
import FunctionArticle from '@/site/components/articles/FunctionArticle';
import LeaderArticle from '@/site/components/articles/LeaderArticle';

const DATA = (file: string) => path.join(process.cwd(), 'src/site/data', file);

/** /solutions/<slug> is a function (engineering, qa, …) or a leader (for-ceos, …). */
function resolve(slug: string) {
  const fn = functionBySlug(slug);
  if (fn) return { kind: 'function' as const, fn, page: virtualPage({ slug: `/solutions/${slug}`, title: fitTitle(`${fn.title} | autonomous work execution platform`, `${fn.title} | exekova`), description: fn.description, schema: ['WebPage', 'FAQPage'], sourceFile: DATA('functions.ts') }), faq: functionFaq(fn) };
  const leader = leaderBySlug(slug);
  if (leader) return { kind: 'leader' as const, leader, page: virtualPage({ slug: `/solutions/${slug}`, title: fitTitle(`${leader.title} | autonomous work execution platform`, `${leader.title} | exekova`), description: leader.description, schema: ['WebPage', 'FAQPage'], sourceFile: DATA('leaders.ts') }), faq: leader.faq };
  return null;
}

export function generateStaticParams() {
  return [...functions.map(item => ({ slug: item.slug })), ...leaders.map(item => ({ slug: item.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = resolve((await params).slug);
  return found ? buildMetadata(found.page) : {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = resolve((await params).slug);
  if (!found) notFound();
  return <>
    {found.kind === 'function' ? <FunctionArticle item={found.fn}/> : <LeaderArticle item={found.leader}/>}
    <JsonLd data={schemaForPage(found.page, found.faq.map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
