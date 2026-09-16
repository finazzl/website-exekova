import Link from 'next/link';
import Icon from '@/components/Icon';
import { REQUEST_ACCESS } from '@/site/nav';

export default function NotFound() {
  return <div className="beta-page site-page"><section className="shell site-not-found" aria-labelledby="page-title"><div>
    <span className="beta-label">404</span>
    <h1 id="page-title">That page is not here.<em>The work still is.</em></h1>
    <p>The address may have changed, or the link was incomplete. Everything on the site is one click away.</p>
    <div className="site-actions"><Link prefetch={false} href="/" className="beta-button">Back to the homepage<Icon name="arrow" size={18}/></Link><a href={REQUEST_ACCESS} className="beta-secondary">Request access<Icon name="arrow" size={15}/></a></div>
  </div></section></div>;
}
