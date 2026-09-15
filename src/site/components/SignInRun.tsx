'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Icon from '@/components/Icon';

type Tool = { name: string; logo?: string; icon?: string; note: string };
export type SignInRunData = { workId: string; sources: Tool[]; steps: { short: string; status: string; tone: 'run' | 'held' | 'done'; tools: Tool[] }[] };

const TOOL_ROWS = [32, 78, 124, 170, 216, 262];
const PHASES = ['Get', 'Set', 'Done'];
// One shared bus keeps the strokes from overlapping where the tools converge.
const TOOL_BUS = 'M56 32H88Q98 32 98 42V252Q98 262 88 262H56';
const CORE_INPUT = 'M98 147H131';
const CORE_OUTPUT = 'M191 147H266';
const TOOL_FLOW = TOOL_ROWS.map((y, index) => index === 0 ? 'M56 32H88Q98 32 98 42V147H131' : index === TOOL_ROWS.length - 1 ? 'M56 262H88Q98 262 98 252V147H131' : `M56 ${y}H98V147H131`);

/** The example run on the sign-in page: connected tools feeding one execution, with Get, Set and Done clearing in turn. Ported from exekova.com. */
export default function SignInRun({ mark, run }: { mark: string; run: SignInRunData }) {
  const ref = useRef<HTMLDivElement>(null);
  const arrowId = useId();
  const [active, setActive] = useState(() => Math.max(0, run.steps.findIndex(step => step.short === 'Execute')));
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const step = run.steps[active];
  const accepted = active === run.steps.length - 1;
  const held = step.tone === 'held';
  const animating = playing && inView && visible;
  const phase = step.short === 'Define' ? 0 : step.short === 'Plan' ? 1 : 2;
  const cleared = accepted ? PHASES.length : phase;
  const waiting = accepted ? 0 : PHASES.length - 1 - phase;
  const engine = step.tools[0] ?? run.steps.find(item => item.short === 'Execute')?.tools[0];

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setPlaying(!preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 });
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); preference.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => setActive(index => (index + 1) % run.steps.length), 3000);
    return () => clearTimeout(timer);
  }, [animating, active, run.steps.length]);

  return <div ref={ref} className="signin-run" data-stage={step.short} data-phase={PHASES[phase]} data-tone={step.tone} data-playing={animating}>
    <div className="signin-art" aria-hidden="true">
      <div className="signin-run-head"><strong>Run {run.workId}</strong><span><i/>{step.status}</span></div>
      <div className="signin-run-summary"><span>{cleared} cleared</span>{!accepted && <span>{held ? '1 stuck at gate' : '1 moving'}</span>}{waiting > 0 && <span>{waiting} waiting</span>}</div>
      <svg className="signin-run-diagram" viewBox="0 0 400 294" role="presentation">
        <defs><marker id={arrowId} viewBox="0 0 8 8" refX="8" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></marker></defs>
        <circle cx="161" cy="147" r="60" fill="#ffffff03" stroke="#ffffff0a"/>
        <circle cx="161" cy="147" r="46" fill="#ffffff05"/>
        <g className="signin-wires-base" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={TOOL_BUS}/>
          {TOOL_ROWS.slice(1, -1).map(y => <path key={y} d={`M56 ${y}H98`}/>)}
          <path d={CORE_INPUT} markerEnd={`url(#${arrowId})`}/>
          <path d={CORE_OUTPUT} markerEnd={`url(#${arrowId})`}/>
        </g>
        <g fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {TOOL_FLOW.map((d, index) => <path key={d} d={d} pathLength="1" className="signin-wire-pulse" style={{ animationDelay: `${index * -.3}s` }} data-on={!held && !accepted && (index < run.sources.length || step.tools.length > 0)}/>)}
          <path d={CORE_OUTPUT} pathLength="1" className="signin-wire-pulse" data-on={!held}/>
        </g>
        {run.sources.map((tool, index) => {
          const y = TOOL_ROWS[index];
          if (index >= TOOL_ROWS.length - 1) return null;
          return <g key={tool.name} className="signin-source-port" data-tool={tool.name}>
            <rect x="16" y={y - 20} width="40" height="40" rx="11" fill="white"/>
            {tool.logo && <image href={tool.logo} x="22" y={y - 14} width="28" height="28" preserveAspectRatio="xMidYMid meet"/>}
          </g>;
        })}
        {engine && <g className="signin-engine-port" data-active={step.tools.length > 0} data-tool={engine.name}>
          <rect x="13" y="239" width="46" height="46" rx="14" fill="none" stroke="currentColor" className="signin-engine-ring"/>
          <rect x="16" y="242" width="40" height="40" rx="11" fill="white"/>
          {engine.logo && <image href={engine.logo} x="22" y="248" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>}
        </g>}
        <g className="signin-core-port">
          <circle className="signin-core-ring" cx="161" cy="147" r="36" fill="none" stroke="currentColor"/>
          <circle cx="161" cy="147" r="30" fill="white"/>
          <image href={mark} x="139" y="125" width="44" height="44" preserveAspectRatio="xMidYMid meet"/>
        </g>
        <g className="signin-steps-panel">
          <rect x="266" y="77" width="122" height="140" rx="12" fill="white"/>
          <text x="277" y="99" className="signin-steps-title" fontSize="11" fontWeight="500" fill="#14112d">Execution</text>
          <text x="377" y="99" className="signin-steps-id" textAnchor="end" fontSize="7" fill="#776885">{run.workId}</text>
          <path d="M266 110h122" stroke="#f1eef8" strokeWidth="1"/>
          {PHASES.map((label, index) => {
            const y = 131 + index * 30;
            const state = index < phase || accepted ? 'done' : index === phase ? held ? 'held' : 'active' : 'waiting';
            return <g key={label} className="signin-run-row" data-state={state}>
              <rect x="274" y={y - 11} width="106" height="24" rx="5"/>
              <circle cx="284" cy={y + 1} r="4"/>
              {state === 'done' && <path d={`M282 ${y + 1}l1.4 1.4 2.2-2.6`} fill="none" stroke="white" strokeWidth="1"/>}
              <text x="295" y={y + 4} className="signin-phase-label" fontSize="14">{label}</text>
              <text x="374" y={y + 4} className="signin-phase-status" textAnchor="end" fontSize="8">{state === 'done' ? index === 2 ? 'Verified' : 'Cleared' : state === 'held' ? 'Held' : state === 'active' ? 'Moving' : 'Waiting'}</text>
            </g>;
          })}
        </g>
      </svg>
    </div>
    <span className="sr-only">Example run {run.workId}: {step.status}. {cleared} cleared, {accepted ? '0 moving' : held ? '1 stuck at gate' : '1 moving'}, {waiting} waiting. Connected tools: {run.sources.map(tool => tool.name).join(', ')}. {step.tools.map(tool => `${tool.name}: ${tool.note}`).join('. ')}</span>
    <div className="signin-run-controls"><button type="button" aria-label={playing ? 'Pause the example run' : 'Play the example run'} onClick={() => setPlaying(value => !value)}><Icon name={playing ? 'pause' : 'play'} size={13}/>{playing ? 'Pause' : 'Play'}</button></div>
  </div>;
}
