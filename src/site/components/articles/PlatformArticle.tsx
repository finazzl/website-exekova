import Link from 'next/link';
import Icon from '@/components/Icon';
import { ecosystemGroups, faqGroupsByKey, type PlatformPage, type Section } from '../../data/platform';
import { functions } from '../../data/functions';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import Chips from '../Chips';
import FaqAccordion from '../FaqAccordion';
import CtaBand from '../CtaBand';
import QuestionsSection from '../QuestionsSection';
import { Fragment } from 'react';

type Part = { text: string; accent?: boolean } | string;
const parts = (headline: Part[] | undefined): [string, string] => {
  const texts = (headline ?? []).map(part => typeof part === 'string' ? part : part.text);
  return [texts[0] ?? '', texts.slice(1).join(' ')];
};
const actions = <><a href={REQUEST_ACCESS} className="beta-button">Start with one task<Icon name="arrow" size={18}/></a><Link href="/platform" className="beta-secondary">How the platform works<Icon name="arrow" size={15}/></Link></>;

/** The Live Floor's five lanes, described from the page's own feature list. */
const LANES = [
  { label: 'Planning', text: 'The objective is interpreted and the work is decomposed, with acceptance criteria attached.' },
  { label: 'Executing', text: 'What is running right now, at which stage, against which objective.' },
  { label: 'In review', text: 'Outputs in validation, and the gate each one is sitting at.' },
  { label: 'Verified', text: 'Work that passed your standard, with its evidence reachable from the card.' },
  { label: 'Blocked', text: 'Held on a dependency, an approval or missing access, with the reason named.' },
];

function Block({ section, index, page }: { section: Section; index: number; page: PlatformPage }) {
  const tone = index % 2 ? ' is-lilac' : '';
  const id = `${section.type}-${index}`;
  const trail = [{ label: 'Platform', href: '/platform' }, { label: page.title.split(' - ')[0], href: `/${page.slug}` }];
  switch (section.type) {
    case 'pageHero': {
      const [title, accent] = parts(section.headline);
      return <PageHero eyebrow={String(section.eyebrow ?? '').toUpperCase()} title={title} accent={accent} lede={section.lede} trail={trail} actions={actions}/>;
    }
    case 'workforceHero': {
      const scenario = section.scenarios[0];
      return <>
        <PageHero layout="split" eyebrow={section.label} title={section.headline[0]} accent={section.headline[1]} lede={section.body} trail={trail} actions={actions}
          aside={<RecordCard label={scenario.label.toUpperCase()} title={scenario.request} body={scenario.scope} checks={scenario.roles.map((role: any) => `${role.name}: ${role.task}`)} foot={scenario.evidence} badge="Example"/>}/>
        <section className="site-section is-tight" aria-labelledby={id}><div className="shell">
          <Heading id={id} centered label="THREE SHAPES OF TEAM" title="The team is formed" accent="by the work, then dissolved." body="Three kinds of request, three different execution teams, none of them picked by hand."/>
          <Cards items={section.scenarios.map((entry: any) => ({ icon: 'users', kicker: entry.label, title: entry.request, body: entry.scope, points: [...entry.roles.map((role: any) => ({ title: `${role.name} · ${role.engine}`, body: role.task })), `Evidence: ${entry.evidence}`] }))}/>
        </div></section>
      </>;
    }
    case 'postureHero': {
      const [title, accent] = parts(section.headline);
      return <PageHero layout="split" eyebrow={String(section.label).toUpperCase()} title={title} accent={accent} lede={section.lede} trail={trail} actions={actions}
        aside={<RecordCard label={String(section.boundary.label).toUpperCase()} title="Every run, inside the boundary" checks={section.boundary.rows.map((row: any) => `${row.k}: ${row.v}`)} foot={section.boundary.foot} footIcon="lock" badge="Per run"/>}/>;
    }
    case 'definition':
      return <section className={`site-section is-tight`} aria-labelledby={id}><div className="shell site-faq">
        <Heading id={id} label="DEFINITIONS" title="In plain" accent="terms."><Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
        <FaqAccordion groups={[{ title: 'Definitions', items: section.items }]} name={id}/>
      </div></section>;
    case 'steps': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} centered wide label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        <Cards columns={5} items={section.steps.map((step: any) => ({ kicker: step.key, title: step.title, body: step.body, points: step.items }))}/>
      </div></section>;
    }
    case 'compareColumns': {
      const [title, accent] = parts(section.headline);
      const side = (column: any) => ({ icon: column.tone === 'brand' ? 'check' : 'users', title: column.title, body: '', points: column.items, badge: column.tone === 'brand' ? 'Exekova' : undefined });
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} centered wide label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        <Cards columns={2} items={[side(section.left), side(section.right)]}/>
      </div></section>;
    }
    case 'faq': {
      const [title, accent] = parts(section.headline);
      const group = section.group ? faqGroupsByKey[section.group] : null;
      const items = section.items ?? group?.items ?? [];
      return <section className="site-section is-tight" aria-labelledby={id}><div className="shell site-faq">
        <Heading id={id} label={String(section.label ?? 'Questions').toUpperCase()} title={title} accent={accent}><Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
        <FaqAccordion groups={[{ title: group?.title ?? 'Questions', items }]} name={id}/>
      </div></section>;
    }
    case 'featureGrid': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}>{section.cta && <Link href={section.cta.href} className="site-inline-link">{section.cta.label}<Icon name="arrow" size={15}/></Link>}</Heading>
        <Cards items={section.items.map((item: any) => ({ icon: item.href ? 'layers' : 'check', title: item.title, body: item.body, href: item.href, linkLabel: item.linkLabel }))}/>
      </div></section>;
    }
    case 'pipeline': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} centered label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        <ol className="site-chips site-pipeline" aria-label="Acceptance path">{section.stages.map((stage: any, position: number) => <li key={stage.label} data-tone={stage.tone}><span>{String(position + 1).padStart(2, '0')}</span>{stage.label}</li>)}</ol>
        {section.cta && <p className="site-note"><Icon name="arrow" size={14}/><Link href={section.cta.href}>{section.cta.label}</Link></p>}
      </div></section>;
    }
    case 'metrics': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        <Cards columns={4} items={section.metrics.map((metric: any) => ({ icon: 'chart', title: metric.label, body: metric.hint }))}/>
        {section.note && <p className="site-note"><Icon name="shield" size={15}/>{section.note}</p>}
      </div></section>;
    }
    case 'bigStatement': {
      const [title, accent] = parts(section.headline);
      return <section className="site-section is-mint" aria-labelledby={id}><div className="shell">
        <p className="site-quote" id={id}>{title} <em>{accent}</em></p>
        <p>{section.body}</p>
        {section.kicker && <div className="site-chips-block" style={{ display: 'flex', justifyContent: 'center' }}><ul className="site-chips"><li>{section.kicker}</li></ul></div>}
      </div></section>;
    }
    case 'executionDemo':
      return <section className="site-section is-lilac" aria-labelledby={id}><div className="shell">
        <Heading id={id} centered label="THE BOARD" title="Five lanes." accent="One record." body="Every piece of work sits in exactly one lane, and every card opens the record behind it."/>
        <ol className="site-steps is-five" aria-label="Live Floor lanes">{LANES.map((lane, position) => <li className="site-step" key={lane.label}><span>{String(position + 1).padStart(2, '0')}</span><h3>{lane.label}</h3><p>{lane.text}</p></li>)}</ol>
        <p className="site-note"><Icon name="play" size={14}/><Link href="/#product-demo">Watch a run move across the board in the interactive demo.</Link></p>
      </div></section>;
    case 'recoveryLoop': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} centered wide label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        <Cards columns={2} items={[{ icon: 'users', title: section.before.title, body: 'The loop a person ends up running.', points: section.before.steps }, { icon: 'reset', title: section.after.title, body: 'The loop the platform runs, with the evidence kept.', points: section.after.steps, badge: 'Exekova' }]}/>
        <div style={{ marginTop: 18 }}><Cards columns={2} items={[{ icon: 'shield', title: section.escalation.title, body: 'A person is brought in with the diagnosis and the evidence, not a notification that something failed.', points: section.escalation.items }, { icon: 'bolt', title: section.kicker, body: 'Recovery is absorbed inside the run. The person who asked for the work does not become its debugging loop.', href: section.cta?.href, linkLabel: section.cta?.label }]}/></div>
      </div></section>;
    }
    case 'workforceModel':
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={section.label} title={section.headline[0]} accent={section.headline[1]} body={section.body}><Chips label="Capability, for the work" items={section.capabilities}/></Heading>
        <Cards columns={4} items={section.features.map((feature: any) => ({ icon: 'layers', title: feature.title, body: feature.body }))}/>
        {section.principle && <p className="site-note"><Icon name="check" size={15}/>{section.principle}</p>}
      </div></section>;
    case 'logoMarquee': {
      const groups = ecosystemGroups.filter(group => (section.categories ?? []).includes(group.id));
      return <section className="site-section is-tight" aria-labelledby={id}><div className="shell">
        <Heading id={id} label={section.label} title="With your tools" accent="and standards."><Link href="/integrations" className="site-inline-link">See every integration and its status<Icon name="arrow" size={15}/></Link></Heading>
        {groups.map(group => <Chips key={group.id} label={group.label} items={group.items}/>)}
      </div></section>;
    }
    case 'solutionRelated':
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} centered label="SOLUTIONS" title="Capacity for every function." accent="Each with its own definition of done."/>
        <Cards columns={4} items={functions.map(fn => ({ icon: fn.icon, kicker: fn.group, title: fn.name, body: fn.summary, href: `/solutions/${fn.slug}`, linkLabel: `exekova for ${fn.name}` }))}/>
      </div></section>;
    case 'postureControls': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}/>
        {section.groups.map((group: any, position: number) => <section className="site-group" key={group.title} aria-labelledby={`${id}-${position}`}>
          <h3 id={`${id}-${position}`}><span>{String(position + 1).padStart(2, '0')}</span>{group.title}</h3>
          <p className="site-prose" style={{ marginBottom: 18, fontSize: 16 }}>{group.body}</p>
          <Cards items={group.items.map((item: any) => ({ icon: group.icon ?? 'shield', title: item.title, body: item.body }))}/>
        </section>)}
      </div></section>;
    }
    case 'postureClaims': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}>{section.cta && <Link href={section.cta.href} className="site-inline-link">{section.cta.label}<Icon name="arrow" size={15}/></Link>}</Heading>
        <dl className="site-rules">{section.items.map((item: any) => <div key={item.k}><dt>{item.k}</dt><dd>{item.v}</dd></div>)}</dl>
      </div></section>;
    }
    case 'deployment': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} id={section.id} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent} body={section.body}>{section.cta && <Link href={section.cta.href} className="site-inline-link">{section.cta.label}<Icon name="arrow" size={15}/></Link>}</Heading>
        <Cards columns={2} items={section.options.map((option: any) => ({ icon: 'cloud', title: option.title, body: option.body, badge: option.badge, href: option.cta?.href, linkLabel: option.cta?.label }))}/>
      </div></section>;
    }
    case 'posturePractical': {
      const [title, accent] = parts(section.headline);
      return <section className={`site-section${tone}`} aria-labelledby={id}><div className="shell">
        <Heading id={id} label={String(section.label).toUpperCase()} title={title} accent={accent}/>
        <Cards items={section.items.map((item: any) => ({ icon: item.icon ?? 'shield', title: item.title, body: item.body, href: item.cta?.href, linkLabel: item.cta?.label }))}/>
      </div></section>;
    }
    case 'finalCta': {
      const [title, accent] = parts(section.headline);
      return <CtaBand title={title} accent={accent} body={section.body} note={section.note} secondary={{ href: '/contact', label: 'Talk to the team' }}/>;
    }
    default:
      return null;
  }
}

/** Renders one of the imported platform pages section by section with this site's components. */
export default function PlatformArticle({ page }: { page: PlatformPage }) {
  const fallback = fallbackFaq(page);
  return <>{page.sections.map((section, index) => <Fragment key={`${section.type}-${index}`}>
    {section.type === 'finalCta' && fallback && <QuestionsSection title="Common" accent="questions." body="How execution is run, watched and recorded." group={fallback.title} items={fallback.items}/>}
    <Block section={section} index={index} page={page}/>
  </Fragment>)}</>;
}

/** Pages imported without a questions block borrow the execution group so every platform page answers questions in place. */
function fallbackFaq(page: PlatformPage) {
  if (page.sections.some(section => section.type === 'faq' || section.type === 'definition')) return null;
  return faqGroupsByKey.execution ?? null;
}

/** Every question the page renders, for its FAQPage schema. */
export function platformFaqItems(page: PlatformPage) {
  const fallback = fallbackFaq(page);
  if (fallback) return fallback.items as { q: string; a: string }[];
  return page.sections.flatMap(section => {
    if (section.type === 'definition') return section.items as { q: string; a: string }[];
    if (section.type === 'faq') return (section.items ?? (section.group ? faqGroupsByKey[section.group]?.items : []) ?? []) as { q: string; a: string }[];
    return [];
  });
}
