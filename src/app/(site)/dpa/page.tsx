import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { dpa } from '@/site/data/legal/dpa';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/dpa');

export default function DpaPage() {
  return <>
    <LegalDocument doc={dpa}/>
    <JsonLd data={schemaForPage(contentPage('/dpa'), legalFaq(dpa))}/>
  </>;
}
