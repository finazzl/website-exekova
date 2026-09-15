import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { subprocessors } from '@/site/data/legal/subprocessors';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/subprocessors');

export default function SubprocessorsPage() {
  return <>
    <LegalDocument doc={subprocessors}/>
    <JsonLd data={schemaForPage(contentPage('/subprocessors'), legalFaq(subprocessors))}/>
  </>;
}
