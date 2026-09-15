import Link from 'next/link';
import Icon from '@/components/Icon';
import content from '@/beta/content/beta.json';
import { taskOffer } from '@/beta/data/offer';
import { REQUEST_ACCESS } from '../nav';
import Heading from './Heading';

/** The homepage price, restated compactly for solution and platform pages. */
export default function PricingBand({ id = 'pricing-band' }: { id?: string }) {
  const c = content.pricing;
  return <section className="site-section is-lilac" aria-labelledby={id}><div className="shell site-price">
    <Heading id={id} label={c.eyebrow} title={c.headline[0]} accent={c.headline[1]} body={c.body}>
      <Link href="/pricing" className="site-inline-link">See the full pricing page<Icon name="arrow" size={15}/></Link>
    </Heading>
    <div className="site-price-card">
      <span className="beta-label">{c.label}</span>
      <div className="site-price-amount"><span>$</span>{taskOffer.current}<small>{c.unit}</small></div>
      <p>{c.standard}: ${taskOffer.standard} / task</p>
      <ul>{c.features.map(item => <li key={item}><Icon name="check" size={16}/>{item}</li>)}</ul>
      <a href={REQUEST_ACCESS} className="beta-button">{c.cta}<Icon name="arrow" size={17}/></a>
      <small><Icon name="shield" size={14}/>{c.rejected}</small>
    </div>
  </div></section>;
}
