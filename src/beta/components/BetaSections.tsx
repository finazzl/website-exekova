import Icon from '@/components/Icon';
import content from '../content/beta.json';
import { taskOffer } from '../data/offer';
import HowStory from './HowStory';
import AcceptedWorkMeter from './AcceptedWorkMeter';

export function HowItWorks() {
  const c = content.how;
  return <section className="beta-section beta-how" id="how-it-works" aria-labelledby="how-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">{c.eyebrow}</span><h2 id="how-title">{c.headline[0]}<br/><em>{c.headline[1]}</em></h2></div>
    <HowStory/>
  </div></section>;
}
export function Pricing() {
  const c = content.pricing;
  return <section className="beta-section beta-pricing pricing-reference-story" id="pricing" aria-labelledby="pricing-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">{c.eyebrow}</span><h2 id="pricing-title">{c.headline[0]}<br/><em>{c.headline[1]}</em></h2><p>{c.body}</p><a href="/#request-access" className="beta-button">{c.cta}<Icon name="arrow" size={18}/></a></div>
    <AcceptedWorkMeter/>
    <div className="task-fit"><div><span><Icon name="coins" size={15}/>{c.exampleTitle}</span><p>{c.exampleBody}</p></div></div>
    <details className="pricing-detail"><summary>What the price includes<Icon name="plus" size={17}/></summary><div><p>${taskOffer.current} {c.unit}. {c.standard}: ${taskOffer.standard} / task.</p><ul>{c.features.map(item => <li key={item}><Icon name="check" size={15}/>{item}</li>)}</ul><p>{c.rejected} {c.fine}</p></div></details>
  </div></section>;
}
