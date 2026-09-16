'use client';
import { useEffect, useRef, useState } from 'react';
import { easeInOut, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useMotionPreference } from './useMotionPreference';
import Icon from '@/components/Icon';
import dynamic from 'next/dynamic';
import WorkTransformation from './WorkTransformation';
import FlowingTaskText from './FlowingTaskText';
import { WORKFLOW_STEPS, WORKFLOW_SUMMARY } from '../data/workflow';

const DURATION=11000;
const HeroDemo = dynamic(() => import('./HeroDemo'));
export default function ProductComparison() {
  const [demoOpen, setDemoOpen] = useState(false);
  const ref=useRef<HTMLDivElement>(null);
  const screen=useRef<HTMLDivElement>(null);
  const inView=useInView(screen,{amount:.35});
  const reduced=useMotionPreference();
  const started=useRef(false),elapsed=useRef(0);
  const [progress,setProgress]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [visible,setVisible]=useState(true);
  const [containerWidth,setContainerWidth]=useState(1160);
  // The sequence ends exactly where the sticky stage unsticks (120px offset + the stage and its controls), so there is no dead zone at the end of the scroll.
  const {scrollYProgress}=useScroll({target:ref,offset:['start 120px','end 700px']});
  const eased={ease:easeInOut};
  const columns=useTransform(scrollYProgress,[0,.45,.72,1],['38% 62%','8% 92%','0% 100%','0% 100%'],eased);
  const portraitWidth=`${Math.min(100,400/containerWidth*100)}%`;
  const width=useTransform(scrollYProgress,[0,.5,.92,1],['100%','100%',portraitWidth,portraitWidth],eased);
  const height=useTransform(scrollYProgress,[0,.5,.92,1],[600,600,466,466],eased);
  const beforeOpacity=useTransform(scrollYProgress,[.35,.62],[1,0],eased);
  const titleOpacity=useTransform(scrollYProgress,[.5,.72],[1,0],eased);
  const cornerRadius=useTransform(scrollYProgress,[.5,.92],[40,16],eased);
  const stage=progress<.27 ? 0 : progress<.52 ? 1 : 2;
  const complete=progress>=.82;
  const running=playing && inView && visible && reduced===false;
  useEffect(()=>{const element=ref.current;if(!element)return;const measure=()=>setContainerWidth(element.clientWidth || 1160);measure();const observer=new ResizeObserver(measure);observer.observe(element);return()=>observer.disconnect();},[]);
  useEffect(()=>{const update=()=>setVisible(!document.hidden);update();document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
  useEffect(()=>{
    if(reduced){setPlaying(false);if(!started.current){setProgress(1);elapsed.current=DURATION;started.current=true;}}
    else if(reduced===false && inView && !started.current){started.current=true;setPlaying(true);}
  },[reduced,inView]);
  useEffect(()=>{
    if(!running)return;
    let frame=0,previous=performance.now(),lastPaint=0;
    const tick=(now:number)=>{elapsed.current+=Math.min(now-previous,64);previous=now;if(now-lastPaint>65){setProgress(Math.min(1,elapsed.current/DURATION));lastPaint=now;}if(elapsed.current>=DURATION){setProgress(1);setPlaying(false);return;}frame=requestAnimationFrame(tick);};
    frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
  },[running]);
  function select(index:number){started.current=true;setPlaying(false);const next=[0,.3,1][index];elapsed.current=next*DURATION;setProgress(next);}
  function toggle(){started.current=true;if(progress>=1){elapsed.current=0;setProgress(0);setPlaying(!reduced);}else if(reduced)select(Math.min(stage+1,2));else setPlaying(value=>!value);}
  return <section className="beta-product-section flow-product-section" aria-labelledby="product-title"><div className="shell">
    <div className="beta-heading is-centered"><h2 id="product-title">Give it work.<br/><em>Get it done.</em></h2><p>From chasing every step to reviewing the outcome.</p><span className="flow-journey">{WORKFLOW_SUMMARY}</span></div>
    <div className="product-comparison-scroll" ref={ref}><div className="flow-sticky">
      <motion.div className="product-comparison flow-comparison" style={{gridTemplateColumns:reduced?'22% 78%':columns,width:reduced?'100%':width,height:reduced?600:height}}>
        <motion.div className="coordination-panel" style={{opacity:reduced?1:beforeOpacity}}><span className="comparison-name">On your own</span><h3>Every handoff.</h3><FlowingTaskText running={running} straight/><p>Assign. Follow up.<br/>Gather the evidence.</p></motion.div>
        <motion.div className="product-work-panel flow-screen" ref={screen} style={{borderRadius:reduced?40:cornerRadius}} id="product-demo" data-stage={WORKFLOW_STEPS[stage].id} data-complete={complete} data-playing={running}>
          <WorkTransformation step={stage} complete={complete} showcase/>
          <motion.div className="flow-screen-title" style={{opacity:reduced?1:titleOpacity}}><span className="comparison-name">exekova</span><h3 className="comparison-result">A verified outcome.</h3></motion.div>
          <div className="flow-task-stream" data-visible={stage===0}><FlowingTaskText running={running}/></div>
          <button type="button" className="flow-playback" onClick={toggle} aria-label={reduced?'Next workflow preview step':playing?'Pause workflow preview':progress>=1?'Replay workflow preview':'Play workflow preview'}><Icon name={playing?'pause':progress>=1?'reset':'play'} size={18}/></button>
        </motion.div>
      </motion.div>
      <div className="flow-preview-controls"><ol aria-label="Preview the three steps">{WORKFLOW_STEPS.map((step,index)=><li key={step.id}><button type="button" aria-pressed={stage===index} onClick={()=>select(index)}>{step.label}</button></li>)}</ol><p>Task workflow. Your team owns the merge.</p></div>
    </div></div>
    <details className="demo-lab" onToggle={event => setDemoOpen(event.currentTarget.open)}><summary>Try a task. See the evidence.<Icon name="plus" size={20}/></summary>{demoOpen && <div className="demo-lab-content"><HeroDemo/></div>}</details>
  </div></section>;
}
