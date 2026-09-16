'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotionPreference } from './useMotionPreference';
import Icon from '@/components/Icon';

const input = 'Fix checkout validation. Recheck the postcode when the country changes. Add a regression test. ';
const output = 'Independently reviewed. Required checks passed. Verified outcome. Ready for your team. ';

/** Original, continuous task-to-outcome illustration. No live task is executed. */
export default function TaskRibbon() {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inputText = useRef<SVGTextPathElement>(null);
  const mobileText = useRef<SVGTextPathElement>(null);
  const outputText = useRef<SVGTextPathElement>(null);
  const elapsed = useRef(0);
  const inView = useInView(ref, { amount: 0.05 });
  const reduced = useMotionPreference();
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const [extraWidth, setExtraWidth] = useState(0);
  const running = playing && inView && visible && reduced === false;
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setExtraWidth(Math.max(0, (element.clientWidth - 1440) / 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous: number | null = null;
    let cancelled = false;
    const paths = [inputText.current, mobileText.current, outputText.current];
    const phrases = [input, input, output];
    // The alternate mobile path is display:none on desktop (and vice versa).
    // Hidden SVG text has zero measurable characters in Chromium.
    const measure = () => paths.map((path,index) => path && path.getNumberOfChars() >= phrases[index].length ? path.getSubStringLength(0,phrases[index].length) || 900 : 900);
    let widths = measure();
    const remeasure = () => { widths = measure(); };
    window.addEventListener('resize', remeasure);
    void document.fonts.ready.then(() => {
      if (!cancelled) widths = measure();
    });
    function tick(time: number) {
      // Start from the animation clock: a queued frame can predate this effect.
      // A negative first delta would otherwise select a nonexistent step.
      elapsed.current += previous === null ? 0 : Math.max(0, Math.min(time - previous, 64));
      previous = time;
      // Both paths run left to right: the task enters EXEKOVA and the outcome
      // leaves it. A full repeated phrase before the path keeps the loop filled.
      paths.forEach((path,index) => path?.setAttribute('startOffset', String(-widths[index] + ((elapsed.current * 0.042) % widths[index]))));
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => { cancelled = true; cancelAnimationFrame(frame); window.removeEventListener('resize', remeasure); };
  }, [running]);
  return <div className="task-ribbon" ref={ref} data-playing={running} aria-label="Example task-to-outcome animation">
    <svg className="task-ribbon-svg" style={{ minWidth: '100%' }} viewBox={`${-extraWidth} 0 ${1440 + extraWidth * 2} 640`} fill="none" aria-hidden="true">
      <defs>
        <path id={`${id}-input`} d={`M${-160-extraWidth} 270 H-160 C28 315 230 344 332 248 C414 170 335 23 249 45 C139 70 112 173 183 271 C291 416 498 510 720 510`}/>
        <path id={`${id}-mobile`} d="M310 436 C420 459 562 454 539 380 C523 292 477 301 462 350 C436 427 561 510 720 510"/>
        <path id={`${id}-output`} d={`M720 510 C976 506 1070 458 1270 425 S1450 407 1540 411 H${1540+extraWidth}`}/>
      </defs>
      <text className="ribbon-input-copy"><textPath ref={inputText} href={`#${id}-input`} startOffset="0">{input.repeat(5)}</textPath></text>
      <text className="ribbon-input-copy ribbon-input-mobile"><textPath ref={mobileText} href={`#${id}-mobile`} startOffset="0">{input.repeat(5)}</textPath></text>
      <use href={`#${id}-output`} className="ribbon-output-band"/>
      <text className="ribbon-output-copy" dy="6"><textPath ref={outputText} href={`#${id}-output`} startOffset="0">{output.repeat(5)}</textPath></text>
    </svg>
    {reduced
      ? <div className="ribbon-exekova" aria-label="EXEKOVA task workflow"><Image src="/brand/exekova-mark.webp" width={40} height={40} alt=""/><Icon name="arrow" size={15}/></div>
      : <button type="button" className="ribbon-exekova" aria-label={playing ? 'Pause hero animation' : 'Play hero animation'} onClick={() => setPlaying(value => !value)}><Image src="/brand/exekova-mark.webp" width={40} height={40} alt=""/><Icon name={playing ? 'pause' : 'play'} size={15}/></button>}
    <a href="#product-demo" className="ribbon-demo-link">Explore the workflow<Icon name="arrow" size={13}/></a>
  </div>;
}
