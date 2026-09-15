import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { privacy } from '@/site/data/legal/privacy';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/privacy');

export default function PrivacyPage() {
  return <>
    <LegalDocument doc={privacy}/>
    <JsonLd data={schemaForPage(contentPage('/privacy'), legalFaq(privacy))}/>
  </>;
}
