import type { Metadata } from 'next';
import { schemaForPage } from '@/lib/seo';
import { cookies } from '@/site/data/legal/cookies';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import LegalDocument from '@/site/components/LegalDocument';
import { legalFaq } from '@/site/lib/pageFaq';

export const metadata: Metadata = metadataFor('/cookies');

export default function CookiesPage() {
  return <>
    <LegalDocument doc={cookies}/>
    <JsonLd data={schemaForPage(contentPage('/cookies'), legalFaq(cookies))}/>
  </>;
}
