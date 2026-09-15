'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Icon from '@/components/Icon';
import { CONNECTORS, STATUS_LABEL } from '../data/connectors';
import ConnectorMark from './ConnectorMark';
import { useMotionPreference } from './useMotionPreference';
import styles from '../styles/tools-workflow.module.css';

// Repeated decorative marks follow one continuous curve. The three cards below
// provide the accessible, canonical inventory and the same availability labels.
const ribbonTools = [...CONNECTORS, ...CONNECTORS, ...CONNECTORS, ...CONNECTORS];

export default function ToolsRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const greenSide = useRef<SVGPathElement>(null);
  const distance = useRef(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const reduced = useMotionPreference();
  const inView = useInView(ref, { amount: 0.05 });
  const running = playing && visible && inView && reduced === false;

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    update();
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    const stage = ref.current;
    const curve = path.current;
    if (!stage || !curve) return;
    const tiles = [...stage.querySelectorAll<HTMLElement>('[data-ribbon-tool]')];
    let length = 1;
    let frame = 0;
    let previous = performance.now();
    const position = () => {
      tiles.forEach((tile, index) => {
        const progress = (index / tiles.length * length + distance.current) % length;
        const point = curve.getPointAtLength(progress);
        const ahead = curve.getPointAtLength(Math.min(length, progress + 1));
        const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI;
        tile.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
      });
    };
    const measure = () => {
      const w = stage.clientWidth;
      // Extra path length at both ends hides the wrap. Desktop keeps the wave
      // beside the copy; mobile places the complete wave below the CTA.
      curve.setAttribute('d', w <= 1100
        ? `M-900 115 H-120 C${w * .35} 285 ${w * .58} 35 ${w + 80} 70 H${w + 1200}`
        : `M-900 450 H-180 C${w * .22} 810 ${w * .49} 455 ${w * .64} 290 S${w * .88} 85 ${w + 180} 230 H${w + 1200}`);
      greenSide.current?.setAttribute('d', `${curve.getAttribute('d')} V10000 H-900 Z`);
      length = curve.getTotalLength();
      position();
      stage.dataset.ready = 'true';
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    const tick = (time: number) => {
      distance.current += Math.min(time - previous, 64) * .028;
      previous = time;
      position();
      frame = requestAnimationFrame(tick);
    };
    if (running) frame = requestAnimationFrame(tick);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [running]);

  return <>
    <div className={styles.ribbon} ref={ref} data-tools-ribbon data-playing={running} aria-hidden="true">
      <svg className={styles.path} width="100%" height="100%"><path ref={greenSide} className={styles.greenSide} data-tools-green-side/><path ref={path} data-tools-curve fill="none"/></svg>
      {ribbonTools.map((tool, index) => <div className={styles.tile} key={`${tool.name}-${index}`} data-ribbon-tool={tool.name} data-status={tool.status}>
        <ConnectorMark connector={tool} size={42}/>
        {!tool.logo && tool.name !== 'Work Intent form' && <span className={styles.fileLabel}>{tool.name}</span>}
        <span className={styles.tileStatus}>{STATUS_LABEL[tool.status]}</span>
      </div>)}
    </div>
    {reduced === false && <button className={styles.motionControl} type="button" onClick={()=>setPlaying(value=>!value)} aria-label={playing ? 'Pause tools animation' : 'Play tools animation'}><Icon name={playing ? 'pause' : 'play'} size={16}/></button>}
  </>;
}
