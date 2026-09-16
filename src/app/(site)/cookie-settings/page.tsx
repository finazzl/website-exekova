import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { contentPage, metadataFor } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import CookieSettings from '@/site/components/CookieSettings';

export const metadata: Metadata = metadataFor('/cookie-settings');

export default function CookieSettingsPage() {
  return <>
    <PageHero layout="document" eyebrow="PRIVACY" title="Cookie settings" accent="Your choices, stored on your device." lede="Choose whether to allow optional analytics. Your preferences are stored in this browser, and you can change them at any time." trail={[{ label: 'Legal', href: '/privacy' }, { label: 'Cookie settings', href: '/cookie-settings' }]}/>
    <section className="site-section is-tight" aria-label="Cookie settings"><div className="shell">
      <CookieSettings/>
      <nav className="legal-toc-links cookie-settings" aria-label="Related documents"><Link prefetch={false} href="/cookies">Cookie Policy<Icon name="arrow" size={12}/></Link><Link prefetch={false} href="/privacy">Privacy Policy<Icon name="arrow" size={12}/></Link></nav>
    </div></section>
    <JsonLd data={schemaForPage(contentPage('/cookie-settings'))}/>
  </>;
}
