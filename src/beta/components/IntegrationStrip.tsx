'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { CONNECTORS } from '../data/connectors';
import ConnectorMark from './ConnectorMark';
import { useMotionPreference } from './useMotionPreference';
// The strip shows the tools you bring; exekova's own Work Intent form (and its mark) stays out of it.
const integrations = CONNECTORS.filter(item=>(item.featured || item.kind === 'repo') && item.name !== 'Work Intent form');
export default function IntegrationStrip() {
  const [paused,setPaused] = useState(false);
  const reduced = useMotionPreference();
  return <div className="integration-strip"><span className="beta-label">GET A TASK. SET A REPO. GET A VERIFIED OUTCOME.</span>
    <div className="integration-marquee" data-paused={paused || reduced !== false}>
      {/* Two full-width copies make a seamless loop; only the first is read aloud. */}
      <div className="integration-track">{[0,1].map(copy=><ul key={copy} aria-hidden={copy > 0 ? true : undefined}>
        {integrations.map(item=><li key={item.name}>
          <span className="integration-mark"><ConnectorMark connector={item} size={27}/></span>
          <span>{item.name}</span>
        </li>)}
      </ul>)}</div>
    </div>
    <div className="integration-strip-actions"><a href="#sources">See integration availability<Icon name="arrow" size={14}/></a>{!reduced && <button type="button" aria-label={paused ? 'Play integration animation' : 'Pause integration animation'} onClick={()=>setPaused(value=>!value)}><Icon name={paused ? 'play' : 'pause'} size={13}/></button>}</div>
  </div>;
}
