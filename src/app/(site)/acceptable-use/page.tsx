import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { acceptableUse } from '@/site/data/legal/acceptableUse';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/acceptable-use');

export default function AcceptableUsePage() {
  return <>
    <LegalDocument doc={acceptableUse}/>
    <JsonLd data={schemaForPage(contentPage('/acceptable-use'), legalFaq(acceptableUse))}/>
  </>;
}
