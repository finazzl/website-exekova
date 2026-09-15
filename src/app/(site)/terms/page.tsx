import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { terms } from '@/site/data/legal/terms';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/terms');

export default function TermsPage() {
  return <>
    <LegalDocument doc={terms}/>
    <JsonLd data={schemaForPage(contentPage('/terms'), legalFaq(terms))}/>
  </>;
}
