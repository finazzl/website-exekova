import Image from 'next/image';
import Icon from '@/components/Icon';
import { footerColumns, siteCta, type NavLink } from '../nav';
import SocialIcon from './SocialIcon';
import ComplianceLine from './ComplianceLine';

type Social = { label: string; icon: string; href: string | null };

/**
 * The exekova.com footer: brand statement, social row, one row of links per
 * site section, the legal row, then the big word. Column contents come from
 * this site's own navigation data so every link resolves here.
 */
export default function SiteFooter({ site }: { site: any }) {
  const columns = footerColumns();
  const email = (site.footer.contact.href as string).replace('mailto:', '');
  return <footer className="site-footer"><div className="shell">
    <div className="footer-intro">
      <div className="footer-brand-block"><a href="/" aria-label="Exekova home"><Image src={site.brand.logoSmall} alt="Exekova" width={148} height={74}/></a><p>{site.footer.statement}</p><span className="footer-category">{site.brand.category}</span><div style={{ marginTop: 14 }}><ComplianceLine/></div></div>
      <div className="footer-connect"><span>Stay connected</span><nav className="footer-socials" aria-label="Social and contact links">{(site.footer.socialLinks as Social[]).map(social => social.href
        ? <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Exekova on ${social.label} (opens in a new tab)`} title={social.label}><SocialIcon name={social.icon}/><span className="sr-only">{social.label}</span></a>
        : <span key={social.icon} className="footer-social-profile" role="img" aria-label={social.label} title={social.label}><SocialIcon name={social.icon}/></span>)}<a href={site.footer.contact.href} aria-label={site.footer.contact.label} title="Email"><SocialIcon name="email"/></a></nav><a className="footer-email" href={site.footer.contact.href}>{email}</a><a className="navigation-cta footer-access-cta" href={siteCta.href}>{siteCta.label}<Icon name="arrow" size={16}/></a></div>
    </div>
    <nav className="footer-links" aria-label="Footer navigation">{columns.map(column => <div className="footer-column" key={column.title}><h2>{column.title}</h2><ul className="footer-row-links"><li><a className="footer-overview" href={column.href}>{column.overview}</a></li>{column.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul></div>)}</nav>
    <nav className="footer-legal" aria-label="Legal and privacy">{(site.footer.legalLinks as NavLink[]).map(link => <a key={link.href} href={link.href}>{link.label}</a>)}<a href="/cookie-settings">Cookie settings</a></nav>
    <div className="footer-base"><p>{(site.footer.copyright as string).replace('{year}', String(new Date().getFullYear()))}</p><p>{site.footer.marks}</p></div>
    <div className="footer-big-word" aria-hidden="true">Exekova</div>
  </div></footer>;
}
