'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/Icon';
import content from '../content/beta.json';
import { EXAMPLES, STAGES, FINAL, next, checkState } from '../data/heroDemoStages';
import { useMotionPreference } from './useMotionPreference';
import { FEATURED_TASK_SOURCES, STATUS_LABEL } from '../data/connectors';
import ConnectorMark from './ConnectorMark';

export default function HeroDemo() {
  const c = content.demo;
  const [example, setExample] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useMotionPreference();
  const task = EXAMPLES[example];
  const current = STAGES[stage];
  const source = FEATURED_TASK_SOURCES[sourceIndex];
  const plannedSource = source.status === 'planned';

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (reduced) {
      setPlaying(false);
      if (!started.current) { setStage(FINAL); started.current = true; }
    } else if (reduced === false && inView && !started.current) {
      started.current = true;
      setPlaying(true);
    }
  }, [reduced, inView]);
  useEffect(() => {
    if (!playing || !inView || !visible || reduced || plannedSource) return;
    if (stage === FINAL) { setPlaying(false); return; }
    const timer = window.setTimeout(() => {
      const following = next(stage);
      setStage(following);
      if (following === FINAL) setPlaying(false);
    }, current.hold);
    return () => window.clearTimeout(timer);
  }, [playing, inView, visible, reduced, stage, current.hold, plannedSource]);

  function select(value: number) {
    started.current = true;
    setPlaying(false);
    setStage(plannedSource ? 0 : value);
  }
  function chooseSource(index: number) {
    started.current = true;
    setSourceIndex(index);
    setStage(0);
    setPlaying(FEATURED_TASK_SOURCES[index].status !== 'planned' && !reduced);
  }
  function toggle() {
    started.current = true;
    if (reduced) { select(stage === FINAL ? 0 : next(stage)); return; }
    if (stage === FINAL) { setStage(0); setPlaying(true); }
    else setPlaying(value => !value);
  }

  return (
    <div className="beta-demo" id="interactive-task-demo" ref={ref} data-stage={current.id} data-playing={playing && visible && inView}>
      <div className="demo-toolbar">
        <span className="beta-label">{c.eyebrow}</span>
        <div className="demo-examples" aria-label="Example tasks">
          {EXAMPLES.map((item, index) => <button key={item.id} type="button" aria-pressed={example === index} onClick={() => { setExample(index); select(FINAL); }}>{item.label}</button>)}
        </div>
      </div>
      <div className="demo-source-picker"><span className="beta-label">{STAGES[0].label}</span><div className="demo-source-options" aria-label="Task sources">{FEATURED_TASK_SOURCES.map((item,index) => <button type="button" key={item.name} aria-label={`Use ${item.name} task source (${STATUS_LABEL[item.status]})`} aria-pressed={sourceIndex === index} data-source={item.name} onClick={() => chooseSource(index)}><ConnectorMark connector={item} size={18}/><span>{item.name}<small>{STATUS_LABEL[item.status]}</small></span></button>)}</div><p className="demo-source-note" role="status">{plannedSource ? `${source.name} task intake is planned. Choose Jira or the Work Intent form for the demo.` : 'Choose Jira or describe the task in exekova’s Work Intent form.'}</p></div>
      <div className="demo-scene">
        <article className="demo-task">
          <div className="demo-card-top"><span><ConnectorMark connector={source} size={17}/>{source.name === 'Jira' ? `Jira · ${c.key}` : source.name}</span><span className="beta-badge" data-status={source.status}>{STATUS_LABEL[source.status]}</span></div>
          <h3>{task.title}</h3>
          <p className="demo-brief">{task.brief}</p>
          <span className="beta-label">{c.criteria}</span>
          <ul className="demo-criteria">{task.criteria.map(item => <li key={item}><span className="empty-check" />{item}</li>)}</ul>
          <div className="demo-repo"><BrandLogo name="GitHub" size={15} /><span>{c.repo}</span><Icon name="lock" size={13} /></div>
        </article>
        <div className="demo-exekova">
          <span className="demo-wire wire-left" aria-hidden="true" />
          <div className="demo-orbit" aria-hidden="true"><div className="demo-brand-tile"><Image src="/brand/exekova-mark.png" alt="" width={66} height={66} priority /></div></div>
          <strong className="demo-brand-name">exekova</strong>
          <div className="demo-stage-copy" key={current.id}><span>{current.title}</span><p>{current.detail}</p></div>
          <span className="demo-wire wire-right" aria-hidden="true" />
        </div>
        <article className="demo-outcome" data-complete={stage === FINAL}>
          <div className="demo-card-top"><span><Icon name="branch" size={17} />{c.output}</span><span className="demo-outcome-label">{stage === FINAL ? 'Verified' : 'Preview'}</span></div>
          <h3>{task.outcome}</h3>
          <p className="demo-brief">{task.files}</p>
          <ul className="demo-checks">{c.checks.map(check => {
            const passed = checkState(stage) === 'passed';
            return <li key={check} data-passed={passed}><span><Icon name={passed ? 'check' : 'clock'} size={15} />{check}</span><span>{passed ? 'Passed' : 'Pending'}</span></li>;
          })}</ul>
          <div className="demo-ready"><Icon name={stage === FINAL ? 'check' : 'branch'} size={16} />{stage === FINAL ? c.ready : c.pending}</div>
        </article>
      </div>
      <ol className="demo-timeline" aria-label={c.controls}>{STAGES.map((item, index) =>
        <li key={item.id}><button type="button" onClick={() => select(index)} disabled={plannedSource && index > 0} aria-current={stage === index ? 'step' : undefined} data-past={index < stage}><span>{index < stage ? <Icon name="check" size={12} /> : String(index + 1).padStart(2, '0')}</span>{item.label}</button></li>
      )}</ol>
      <div className="demo-bottom"><p>{plannedSource ? `Example task · ${source.name} intake planned · No live connection` : c.caption}</p><button type="button" onClick={toggle} disabled={plannedSource}><Icon name={playing ? 'pause' : stage === FINAL ? 'reset' : 'play'} size={14} />{plannedSource ? 'Source planned' : reduced ? (stage === FINAL ? c.replay : c.next) : playing ? c.pause : stage === FINAL ? c.replay : c.play}</button></div>
      <p className="sr-only" aria-live={playing ? 'off' : 'polite'}>{current.title}. {current.detail}</p>
    </div>
  );
}
