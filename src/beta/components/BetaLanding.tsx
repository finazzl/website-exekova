import Icon from '@/components/Icon';
import { getSite } from '@/lib/content';
import content from '../content/beta.json';
import { taskOffer } from '../data/offer';
import TaskRibbon from './TaskRibbon';
import IntegrationStrip from './IntegrationStrip';
import RequestAccessDialog from './RequestAccessDialog';
import SourceRepoMap from './SourceRepoMap';
import { HowItWorks, Pricing } from './BetaSections';
import ProductComparison from './ProductComparison';
import FeatureStory from './FeatureStory';
import TrustBand from './TrustBand';
import FintechUseCases from './FintechUseCases';
import BetaFAQ from './BetaFAQ';
import ClosingCTA from './ClosingCTA';
import TeamValue from './TeamValue';
import IndustryUseCases from './IndustryUseCases';
import ProductVision from './ProductVision';
import MobileAccessBar from './MobileAccessBar';
import '../styles/homepage-system.css';

export default function BetaLanding() {
  const site = getSite();
  const email = (site.footer.contact.href as string).replace('mailto:', '');
  const c = content.hero;
  return <div className="beta-page">
    <section className="beta-hero" aria-labelledby="beta-title"><div className="shell">
      <div className="hero-copy"><span className="beta-label"><span className="beta-dot"/>{c.eyebrow}</span>
        <h1 id="beta-title"><span>{c.headline[0]}</span>{' '}<em>{c.headline[1]}</em></h1>
        <p className="hero-lede">{c.support}</p>
        <p className="hero-detail">{c.detail}</p>
        <div className="hero-actions"><a className="beta-button" href="#request-access">{c.ctaPrimary}<Icon name="arrow" size={18}/></a></div>
        <p className="hero-price"><span className="hero-price-main"><strong>${taskOffer.current}</strong><span>/ accepted task</span></span><span className="hero-price-rejection">Rejected attempts: <strong>$0</strong></span></p>
      </div>
      <p className="hero-footnote">{c.footnote}</p>
    </div><TaskRibbon/></section>
    <div className="beta-product-chapter"><IntegrationStrip/><ProductComparison/></div>
    <HowItWorks/>
    <Pricing/>
    <FeatureStory/>
    <SourceRepoMap/>
    <TeamValue/>
    <IndustryUseCases/>
    <TrustBand/>
    <FintechUseCases/>
    <ProductVision/>
    <BetaFAQ/>
    <ClosingCTA/>
    <MobileAccessBar/>
    <RequestAccessDialog email={email} signInHref={site.nav.signIn.href}/>
  </div>;
}
