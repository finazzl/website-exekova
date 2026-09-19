import Link from 'next/link';
import Icon from '@/components/Icon';
import { BLOG_AUTHOR, nextPost, type Post, type PostBlock } from '../../data/blog';
import { insuranceCaseBySlug } from '../../data/insuranceBackOffice';
import { caseBySlug } from '../../data/cases';
import { remittanceReconciliationCase } from '../../data/remittanceReconciliation';
import { inline } from '../../lib/inline';
import { DEFINITION } from '../../lib/seoCopy';
import Cards from '../Cards';
import Chips from '../Chips';
import CtaBand from '../CtaBand';
import FaqAccordion from '../FaqAccordion';
import PageHero from '../PageHero';

/**
 * One blog post. The document layout, sticky contents and prose rules are the
 * same primitives the legal pages use, so a long read looks the same wherever
 * it appears on the site.
 */
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'p': return <p>{inline(block.text)}</p>;
    case 'h3': return <h3>{block.text}</h3>;
    case 'ul': return <ul>{block.items.map(item => <li key={item}>{inline(item)}</li>)}</ul>;
    case 'ol': return <ol>{block.items.map(item => <li key={item}>{inline(item)}</li>)}</ol>;
    case 'note': return <aside className="post-callout"><span>{block.label}</span><p>{inline(block.text)}</p></aside>;
  }
}

export default function BlogArticle({ post }: { post: Post }) {
  const related = post.related.map(slug => slug === remittanceReconciliationCase.slug ? remittanceReconciliationCase : insuranceCaseBySlug(slug) ?? caseBySlug(slug)).filter(Boolean);
  const contextLink = post.contextLink ?? { label: 'Insurance back office', href: '/insurance-back-office' };
  const upcoming = nextPost(post.slug);
  return <>
    <PageHero layout="document" eyebrow={post.category.toUpperCase()} title={post.title} lede={post.dek}
      trail={[{ label: 'Blogs', href: '/blogs' }, { label: post.title, href: `/blogs/${post.slug}` }]}/>

    <div className="shell legal-layout">
      <aside className="legal-toc">
        <span>Contents</span>
        <ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
        <nav className="legal-toc-links" aria-label="More from the blog">
          <Link prefetch={false} href="/blogs">All posts</Link>
          <Link prefetch={false} href={contextLink.href}>{contextLink.label}</Link>
        </nav>
      </aside>

      <article className="legal-body">
        <dl className="legal-meta">
          <div><dt>Written by</dt><dd>{BLOG_AUTHOR}</dd></div>
          <div><dt>Published</dt><dd><time dateTime={post.published}>{post.displayDate}</time></dd></div>
          <div><dt>Read time</dt><dd>{post.readMinutes} minutes</dd></div>
        </dl>

        {post.sections.map(section => <section className="legal-section" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`}>{section.heading}</h2>
          {section.blocks.map((block, index) => <Block block={block} key={index}/>)}
        </section>)}

        <div className="post-tags"><Chips items={post.tags} label="Filed under"/></div>

        <section className="legal-contact" aria-labelledby="post-questions-title">
          <h2 id="post-questions-title">Common questions</h2>
          <p className="legal-definition">{DEFINITION} {post.provenance ?? 'This post describes patterns across insurance operations, not a named engagement.'}</p>
          <div className="site-faq is-plain"><FaqAccordion groups={[{ title: post.title, items: post.faq }]} name="post-faq"/></div>
        </section>

        {upcoming && <p className="post-next"><span>Next post</span><Link prefetch={false} href={`/blogs/${upcoming.slug}`}>{upcoming.title}<Icon name="arrow" size={15}/></Link></p>}
      </article>
    </div>

    {related.length > 0 && <section className="site-section is-lilac" aria-labelledby="post-related-title"><div className="shell">
      <div className="beta-heading is-centered"><span className="beta-label">THE WORK BEHIND IT</span><h2 id="post-related-title">Read the post.<br/><em>Then see the run.</em></h2><p>Explore the workflows, evidence and engineering behind these operations.</p></div>
      <Cards items={related.map(item => ({ icon: item!.origin.icon, kicker: item!.origin.name, title: item!.name, body: item!.problem, href: `/use-cases/${item!.slug}`, linkLabel: 'Open the use case' }))}/>
    </div></section>}

    <CtaBand title="You have a close" accent="to get through." body="Start with one statement format, one exception class or one check. It makes the measurement honest." secondary={{ href: '/blogs', label: 'All posts' }}/>
  </>;
}
