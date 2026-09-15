import type { Metadata, Viewport } from 'next';
import { Figtree, EB_Garamond } from 'next/font/google';
import SiteHeader from '@/site/components/SiteHeader';
import { megaNav, siteCta } from '@/site/nav';
import AnnouncementBar from '@/site/components/AnnouncementBar';
import SiteFooter from '@/site/components/SiteFooter';
import Frame from '@/site/components/Frame';
import WhatsAppButton from '@/site/components/WhatsAppButton';
import './globals.css';
import '@/beta/styles/beta.css';
import '@/beta/styles/experience.css';
import '@/beta/styles/chapters.css';
import '@/beta/styles/reference-layout.css';
import '@/beta/styles/flow-story.css';
import '@/beta/styles/business-stories.css';
import '@/site/styles/site.css';
import '@/site/styles/frame.css';
import '@/site/styles/header.css';
import { getSite } from '@/lib/content';
import { organizationSchema, websiteSchema } from '@/lib/seo';

/** Shared font and metadata infrastructure; the beta owns its page shell. */
const sans = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });
const serif = EB_Garamond({ subsets: ['latin'], weight: ['400'], style: ['italic', 'normal'], variable: '--font-display', display: 'swap' });

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.brand.url),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.defaultDescription,
  applicationName: site.brand.name,
};

export const viewport: Viewport = { themeColor: '#FCFBFE', width: 'device-width', initialScale: 1, colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased typography-system">
        <a href="#main" className="sr-only skip">Skip to content</a>
        <Frame>
          <AnnouncementBar announcement={site.announcement} />
          <SiteHeader nav={megaNav()} wordmark={site.brand.wordmark} signIn={site.nav.signIn} cta={site.nav.cta ?? siteCta} />
        </Frame>
        <main id="main">{children}</main>
        <Frame><SiteFooter site={site} /></Frame>
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema(), websiteSchema()]).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
