import Link from 'next/link';
import Icon from '@/components/Icon';
import { breadcrumbSchema } from '../lib/meta';
import JsonLd from './JsonLd';

export type Crumb = { label: string; href: string };

/** The trail above a page title. The last crumb is the current page. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs = [{ label: 'Home', href: '/' }, ...trail];
  return <>
    <nav className="site-breadcrumbs" aria-label="Breadcrumb"><ol>{crumbs.map((crumb, index) => {
      const last = index === crumbs.length - 1;
      return <li key={`${index}-${crumb.href}`}>{last ? <span aria-current="page">{crumb.label}</span> : <Link prefetch={false} href={crumb.href}>{crumb.label}</Link>}{!last && <Icon name="arrow" size={11}/>}</li>;
    })}</ol></nav>
    <JsonLd data={breadcrumbSchema(crumbs)}/>
  </>;
}
