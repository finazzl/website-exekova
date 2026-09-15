'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useMotionValueEvent, useScroll } from 'framer-motion';
import { useMotionPreference } from './useMotionPreference';
import WorkTransformation, { WorkBackdrop } from './WorkTransformation';
import { WORKFLOW_STEPS } from '../data/workflow';

export default function HowStory() {
  const [step,setStep] = useState(0);
  const activeStep = useRef(0);
  const selecting = useRef(false);
  const scrollAnimation = useRef<{stop:()=>void} | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 120px', 'end end'] });
  function showStep(index: number) {
    activeStep.current = index;
    setStep(index);
  }
  function stopScroll() {
    scrollAnimation.current?.stop();
    scrollAnimation.current = null;
    selecting.current = false;
  }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) stopScroll();
    };
    window.addEventListener('wheel', stopScroll, {passive:true});
    window.addEventListener('touchstart', stopScroll, {passive:true});
    window.addEventListener('resize', stopScroll);
    window.addEventListener('keydown', onKey);
    return () => {
      stopScroll();
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchstart', stopScroll);
      window.removeEventListener('resize', stopScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, [reduced]);
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (reduced !== false || window.innerWidth <= 900 || selecting.current) return;
    const next = Math.max(0, Math.min(WORKFLOW_STEPS.length - 1, Math.floor(value * WORKFLOW_STEPS.length)));
    const current = activeStep.current;
    // A small threshold buffer prevents trackpad movement from toggling a step
    // repeatedly when the page rests on the boundary between two scenes.
    if (next > current && value < (current + 1) / WORKFLOW_STEPS.length + .02) return;
    if (next < current && value > current / WORKFLOW_STEPS.length - .02) return;
    if (next !== current) showStep(next);
  });
  function select(index: number) {
    stopScroll();
    showStep(index);
    if (reduced === false && window.innerWidth > 900 && ref.current) {
      const top = window.scrollY + ref.current.getBoundingClientRect().top;
      const travel = Math.max(0, ref.current.offsetHeight - window.innerHeight + 120);
      if (!travel) return;
      const target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, top - 120 + travel * ((index + .5) / WORKFLOW_STEPS.length)));
      // Keep the chosen scene selected while moving past the other steps.
      selecting.current = true;
      scrollAnimation.current = animate(window.scrollY, target, {
        duration: .65, ease: [.22, 1, .36, 1],
        onUpdate: value => window.scrollTo({top:value, behavior:'instant'}),
        onComplete: () => { selecting.current = false; scrollAnimation.current = null; },
      });
    }
  }
  return <div className="how-story-scroll" ref={ref}><div className="how-story">
    <div className="how-story-tabs" aria-label="How exekova works">{WORKFLOW_STEPS.map((item,index)=><button type="button" key={item.id} aria-pressed={step === index} onClick={()=>select(index)}>{item.label}</button>)}</div>
    <StepVisual step={step} animated/>
    <div className="how-story-descriptions" aria-live="polite">{WORKFLOW_STEPS.map((item,index)=><div className="how-story-description" key={item.id} aria-hidden={step !== index} data-active={step === index}><span className="beta-label">0{index+1} / 0{WORKFLOW_STEPS.length}</span><h3>{item.label}</h3><p>{item.body}</p></div>)}</div>
  </div><div className="how-mobile-scenes">{WORKFLOW_STEPS.map((item,index)=><article className="how-mobile-scene" key={item.id}><StepVisual step={index}/><div className="how-story-description"><h3>{item.label}</h3><p>{item.body}</p></div></article>)}</div></div>;
}

function StepVisual({ step, animated=false }: { step: number; animated?: boolean }) {
  return <div className="how-story-stage" data-step={step}>{animated ? <div className="how-story-canvas"><WorkBackdrop/>{WORKFLOW_STEPS.map((item,index)=><div className="how-step-layer" key={item.id} data-active={step === index} aria-hidden={step !== index}><WorkTransformation step={index} showBackdrop={false}/></div>)}</div> : <WorkTransformation step={step}/>}</div>;
}
