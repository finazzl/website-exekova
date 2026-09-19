import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { schemaForPage } from '@/lib/seo';
import { blogIndex, postsByDate } from '@/site/data/blog';
import { insuranceSuites } from '@/site/data/insuranceBackOffice';
import { plain } from '@/site/lib/inline';
import { contentPage, metadataFor, siteBase } from '@/site/lib/meta';
import JsonLd from '@/site/components/JsonLd';
import PageHero from '@/site/components/PageHero';
import Heading from '@/site/components/Heading';
import Cards from '@/site/components/Cards';
import CtaBand from '@/site/components/CtaBand';
import QuestionsSection from '@/site/components/QuestionsSection';
import RecordCard from '@/site/components/RecordCard';

const blogFaq = [
  { q: 'What does the exekova blog cover?', a: 'Remittance reconciliation, insurance back-office operations and the engineering behind finance workflows: settlement matching, commission reconciliation, statements, onboarding and payouts, plus how AI agents fit into each.' },
  { q: 'Are these posts customer case studies?', a: 'These posts explain operational patterns and illustrative workflows. The UK remittance article keeps the company anonymous and does not claim measured customer results. Each post links to the relevant [use case](/use-cases) so readers can inspect the workflow.' },
  { q: 'How often is it published?', a: `There are ${postsByDate.length} posts today. New posts are added when the team has something worth writing down, not on a content calendar.` },
  { q: 'Who writes it?', a: 'The team that runs the work. exekova is an autonomous work execution platform, and the posts come out of the runs it executes rather than from a marketing brief.' },
];

export const metadata: Metadata = metadataFor('/blogs');

export default function BlogPage() {
  const [latest, ...rest] = postsByDate;
  const base = siteBase();
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${base}/blogs#blog`,
    name: 'exekova blog',
    url: `${base}/blogs`,
    description: blogIndex.lede,
    publisher: { '@id': `${base}/#organization` },
    blogPost: postsByDate.map(post => ({ '@type': 'BlogPosting', headline: post.title, url: `${base}/blogs/${post.slug}`, datePublished: post.published, description: post.description })),
  };
  return <>
    <PageHero layout="split" eyebrow={blogIndex.eyebrow} title={blogIndex.headline[0]} accent={blogIndex.headline[1]} lede={blogIndex.lede}
      trail={[{ label: 'Blogs', href: '/blogs' }]}
      actions={<><Link prefetch={false} href={`/blogs/${latest.slug}`} className="beta-button">Read the latest post<Icon name="arrow" size={18}/></Link><Link prefetch={false} href="/use-cases" className="beta-secondary">Explore the use cases<Icon name="arrow" size={15}/></Link></>}
      aside={<RecordCard label="LATEST POST" title={latest.title} body={latest.dek} checks={latest.tags} foot={latest.displayDate} footIcon="clock" badge={latest.category}/>}/>

    <section className="site-section is-tight" aria-labelledby="posts-title"><div className="shell">
      <Heading id="posts-title" centered label="EVERY POST" title="Operator writing," accent="not vendor writing." body={blogIndex.note}/>
      <Cards columns={2} items={postsByDate.map(post => ({
        icon: 'file',
        kicker: `${post.category} · ${post.displayDate}`,
        title: post.title,
        body: post.dek,
        points: [`${post.readMinutes} minute read`, ...post.tags.slice(0, 2)],
        href: `/blogs/${post.slug}`,
        linkLabel: 'Read the post',
      }))}/>
    </div></section>

    {rest.length > 0 && <section className="site-section is-lilac" aria-labelledby="suites-title"><div className="shell">
      <Heading id="suites-title" centered label="EXPLORE INSURANCE OPERATIONS" title="Three suites." accent="One back office." body="Explore the insurance workflows covered on the blog, each with engineering scoped into independently reviewed changes."/>
      <Cards columns={3} items={insuranceSuites.map(suite => ({ icon: suite.icon, kicker: suite.tagline, title: suite.name, body: suite.body, href: '/insurance-back-office', linkLabel: 'See the suite' }))}/>
      <p className="site-note"><Icon name="shield" size={15}/>Follows SOC 2, ISO 27001, PCI DSS and HIPAA practices. Your team keeps every approval, filing and merge.</p>
    </div></section>}

    <QuestionsSection title="About" accent="this blog." body="What these posts are, and what they are not." group="Blog" items={blogFaq}/>

    <CtaBand title="Reading is cheap." accent="Closing the month is not." body="Bring one statement format, one exception class or one check. That is a first task." secondary={{ href: '/insurance-back-office', label: 'The insurance back office' }}/>
    <JsonLd data={[...schemaForPage(contentPage('/blogs'), blogFaq.map(item => ({ q: item.q, a: plain(item.a) }))), blogSchema]}/>
  </>;
}
