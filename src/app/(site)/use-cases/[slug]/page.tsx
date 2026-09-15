import type { Metadata } from 'next';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { caseBySlug, cases } from '@/site/data/cases';
import { scenarioBySlug, scenarios } from '@/site/data/scenarios';
import { useCaseBySlug, useCases } from '@/site/data/useCases';
import { plain } from '@/site/lib/inline';
import { virtualPage } from '@/site/lib/meta';
import { caseFaq } from '@/site/lib/pageFaq';
import { fitDescription, fitTitle } from '@/site/lib/seoCopy';
import JsonLd from '@/site/components/JsonLd';
import CaseArticle from '@/site/components/articles/CaseArticle';
import ScenarioArticle from '@/site/components/articles/ScenarioArticle';
import TaskTypeArticle from '@/site/components/articles/TaskTypeArticle';

const DATA = (file: string) => path.join(process.cwd(), 'src/site/data', file);

/** /use-cases/<slug> is a case, a long-form scenario, or one of the three first-task kinds. */
function resolve(slug: string) {
  const scenario = scenarioBySlug(slug);
  if (scenario) return { kind: 'scenario' as const, scenario, page: virtualPage({ slug: `/use-cases/${slug}`, title: `${scenario.title} | exekova`, description: scenario.description, schema: ['WebPage', 'FAQPage'], sourceFile: DATA('scenarios.ts') }), faq: scenario.faq };
  const item = caseBySlug(slug);
  if (item) return { kind: 'case' as const, item, page: virtualPage({ slug: `/use-cases/${slug}`, title: fitTitle(`${item.title} | exekova`, `${item.name} | ${item.origin.name} use case`, `${item.name} | exekova`), description: fitDescription(item.description, ...item.why.split(/(?<=[.!?])\s+/)), schema: ['WebPage', 'FAQPage'], sourceFile: DATA('cases.ts') }), faq: caseFaq(item) };
  const useCase = useCaseBySlug(slug);
  if (useCase) return { kind: 'task' as const, useCase, page: virtualPage({ slug: `/use-cases/${slug}`, title: `${useCase.name} | Use cases | exekova`, description: useCase.summary, schema: ['WebPage', 'FAQPage'], sourceFile: DATA('useCases.ts') }), faq: useCase.faq };
  return null;
}

export function generateStaticParams() {
  return [...scenarios.map(item => ({ slug: item.slug })), ...cases.map(item => ({ slug: item.slug })), ...useCases.map(item => ({ slug: item.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = resolve((await params).slug);
  return found ? buildMetadata(found.page) : {};
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const found = resolve((await params).slug);
  if (!found) notFound();
  return <>
    {found.kind === 'scenario' && <ScenarioArticle item={found.scenario}/>}
    {found.kind === 'case' && <CaseArticle item={found.item}/>}
    {found.kind === 'task' && <TaskTypeArticle useCase={found.useCase}/>}
    <JsonLd data={schemaForPage(found.page, found.faq.map(entry => ({ q: entry.q, a: plain(entry.a) })))}/>
  </>;
}
