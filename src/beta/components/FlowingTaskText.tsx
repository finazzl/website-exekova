'use client';
import { useEffect, useId, useRef } from 'react';

const phrase = 'Fix checkout validation. Recheck the postcode when the country changes. Block invalid submissions. Add a regression test. ';

/** Continuous text on a curve, with a measured repeat and explicit pause. */
export default function FlowingTaskText({ running, straight = false }: { running: boolean; straight?: boolean }) {
  const id=useId();
  const text=useRef<SVGTextPathElement>(null);
  const elapsed=useRef(0);
  useEffect(()=>{
    if(!running) return;
    let frame=0,previous=performance.now(),width=1800,cancelled=false;
    const measure=()=>{const node=text.current;if(node && node.getNumberOfChars()>=phrase.length) width=node.getSubStringLength(0,phrase.length)||1800;};
    measure();void document.fonts.ready.then(()=>{if(!cancelled) measure();});
    const tick=(now:number)=>{elapsed.current+=Math.min(now-previous,64);previous=now;text.current?.setAttribute('startOffset',String(-width+(elapsed.current*0.055)%width));frame=requestAnimationFrame(tick);};
    frame=requestAnimationFrame(tick);
    return ()=>{cancelled=true;cancelAnimationFrame(frame);};
  },[running]);
  return <svg className="flowing-task-text" viewBox="0 0 1160 150" fill="none" aria-hidden="true"><defs><path id={id} d={straight ? 'M-120 100 H1400' : 'M-120 115 C190 130 308 4 550 38 C770 62 847 155 1300 94'}/></defs><text><textPath ref={text} href={`#${id}`} startOffset="-500">{phrase.repeat(4)}</textPath></text></svg>;
}
