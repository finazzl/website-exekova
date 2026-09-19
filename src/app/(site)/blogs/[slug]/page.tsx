import type { Metadata } from 'next';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { buildMetadata, schemaForPage } from '@/lib/seo';
import { BLOG_AUTHOR, postBySlug, posts, wordCount } from '@/site/data/blog';
import { plain } from '@/site/lib/inline';
import { siteBase, virtualPage } from '@/site/lib/meta';
import { fitTitle } from '@/site/lib/seoCopy';
import JsonLd from '@/site/components/JsonLd';
import BlogArticle from '@/site/components/articles/BlogArticle';

const SOURCE = path.join(process.cwd(), 'src/site/data/blog.ts');

function postFor(slug: string) {
  const post = postBySlug(slug);
  if (!post) return null;
  return {
    post,
    page: virtualPage({
      slug: `/blogs/${post.slug}`,
      title: fitTitle(`${post.seoTitle} | exekova`, post.seoTitle, `${post.title} | exekova`),
      description: post.description,
      keywords: post.keywords,
      schema: ['WebPage', 'FAQPage'],
      sourceFile: post.slug === 'ai-agents-remittance-reconciliation' ? path.join(process.cwd(), 'src/site/data/remittanceReconciliation.ts') : SOURCE,
    }),
  };
}

/** BlogPosting alongside the WebPage and FAQPage blocks every page carries. */
function postingSchema(slug: string) {
  const post = postBySlug(slug)!;
  const base = siteBase();
  const url = `${base}/blogs/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
    url,
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    wordCount: wordCount(post),
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: 'en',
    isPartOf: { '@type': 'Blog', '@id': `${base}/blogs#blog`, name: 'exekova blog', url: `${base}/blogs` },
    author: { '@type': 'Organization', name: BLOG_AUTHOR, url: base },
    publisher: { '@id': `${base}/#organization` },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = postFor((await params).slug);
  return found ? buildMetadata(found.page) : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = postFor((await params).slug);
  if (!found) notFound();
  return <>
    <BlogArticle post={found.post}/>
    <JsonLd data={[...schemaForPage(found.page, found.post.faq.map(entry => ({ q: entry.q, a: plain(entry.a) }))), postingSchema(found.post.slug)]}/>
  </>;
}
