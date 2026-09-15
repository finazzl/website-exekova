import Link from 'next/link';
import Icon from '@/components/Icon';
import type { UseCase } from '../../data/useCases';
import { REQUEST_ACCESS } from '../../nav';
import PageHero from '../PageHero';
import Heading from '../Heading';
import RecordCard from '../RecordCard';
import Cards from '../Cards';
import StepsBand from '../StepsBand';
import FaqAccordion from '../FaqAccordion';
import CtaBand from '../CtaBand';

/** One of the three kinds of first task: bug fixes, small features, test coverage. */
export default function TaskTypeArticle({ useCase }: { useCase: UseCase }) {
  return <>
    <PageHero layout="split" eyebrow={`A FIRST TASK · ${useCase.name.toUpperCase()}`} title={useCase.headline[0]} accent={useCase.headline[1]} lede={useCase.lede}
      actions={<><a href={REQUEST_ACCESS} className="beta-button">Bring a task like this<Icon name="arrow" size={18}/></a><Link href="/#product-demo" className="beta-secondary">Watch it in the demo<Icon name="arrow" size={15}/></Link></>}
      trail={[{ label: 'Use cases', href: '/use-cases' }, { label: useCase.name, href: `/use-cases/${useCase.slug}` }]}
      aside={<RecordCard label="EXAMPLE TASK" title={useCase.example.title} body={useCase.example.brief} checks={useCase.example.criteria} foot={useCase.example.outcome}/>}/>

    <section className="site-section is-tight" aria-labelledby="fit-title"><div className="shell">
      <Heading id="fit-title" centered label="A GOOD FIT" title="What a good task" accent="looks like." body="Eligibility is confirmed before work starts. These are the signals we look for."/>
      <Cards columns={2} items={[
        { icon: 'check', title: 'Ready to hand over', body: 'A task with these qualities can be verified against its own acceptance criteria.', points: useCase.fit },
        { icon: 'layers', title: 'Needs a smaller scope first', body: 'These usually become two or three well-scoped tasks, each with its own outcome.', points: useCase.stretch },
      ]}/>
    </div></section>

    <section className="site-section is-lilac" aria-labelledby="steps-title"><div className="shell">
      <Heading id="steps-title" centered label="GET. SET. DONE." title={`A ${useCase.name.toLowerCase().replace(/s$/, '')},`} accent="step by step." body="The same three steps as every task, in this use case’s words."/>
      <StepsBand details={useCase.steps}/>
    </div></section>

    <section className="site-section is-ink" aria-labelledby="evidence-title"><div className="shell site-price">
      <Heading id="evidence-title" label="WHAT YOU RECEIVE" title="Done comes" accent="with evidence." body="Every accepted outcome carries the same record. Your team reviews it and decides what to merge."/>
      <RecordCard label="VERIFIED OUTCOME" title={useCase.example.outcome} body={useCase.example.files} checks={useCase.evidence} foot="Ready for your team’s decision"/>
    </div></section>

    <section className="site-section is-tight" aria-labelledby="usecase-faq-title"><div className="shell site-faq">
      <Heading id="usecase-faq-title" label="QUESTIONS" title={`About ${useCase.name.toLowerCase()}.`} body="The answers stay inside what the service does today."><Link href="/faq" className="site-inline-link">All questions and answers<Icon name="arrow" size={15}/></Link></Heading>
      <FaqAccordion groups={[{ title: useCase.name, items: useCase.faq }]} name="usecase-faq"/>
    </div></section>

    <CtaBand secondary={{ href: '/use-cases', label: 'All use cases' }}/>
  </>;
}
