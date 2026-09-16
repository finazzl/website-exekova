import Link from 'next/link';
import Icon from '@/components/Icon';
import { industries } from '@/site/data/industries';
import { industryGroups } from '../content/chapters';
import IndustryIllustration, { IndustryDelivery } from './IndustryIllustration';

export default function IndustryUseCases() {
  return <section className="beta-section beta-industries industry-reference-story" id="industries" aria-labelledby="industries-title"><div className="shell">
    <div className="beta-heading is-centered"><span className="beta-label">INDUSTRIES & USE CASES</span><h2 id="industries-title">Your industry.<br/><em>Your next engineering task.</em></h2><p>Start with the software work behind your business.</p>
    <p className="industry-scope"><span className="beta-badge" data-status="available">Engineering</span>Example tasks, subject to scope and repository eligibility.</p></div>
    <div className="industry-groups">{industryGroups.map((group,index) => <section className="industry-group" data-group={index} key={group.name} aria-labelledby={`industry-group-${index}`}><h3 id={`industry-group-${index}`}><span>0{index+1}</span>{group.name}</h3><div className="industry-grid">{group.industries.map(item => { const slug = industries.find(entry => entry.name === item.name)?.slug; const inner = <><span className="industry-icon"><Icon name={item.icon} size={24}/></span><div><h4>{item.name}</h4><p className="industry-task">{item.task}</p></div></>; return slug ? <Link prefetch={false} href={`/industries/${slug}`} className="industry-card" key={item.name} aria-label={`${item.name} engineering tasks`}>{inner}</Link> : <article className="industry-card" key={item.name}>{inner}</article>; })}</div><IndustryIllustration index={index}/></section>)}</div>
    <IndustryDelivery/>
    <p className="industry-vision-note">These examples describe engineering work, not regulatory certification or autonomous operational decisions. Every industry has its own page with one example task per use case: <Link prefetch={false} href="/industries">see all industries</Link>. Broader industry workflows are part of the <a href="#vision">exekova vision</a>.</p>
  </div></section>;
}
