import type { CSSProperties } from 'react';

// Original path artwork lives once in the cached SVG sprite.
const names = new Set(["arrow","menu","check","play","pause","reset","branch","shield","file","layers","clock","grid","code","lock","plus","close","search","users","gear","eye","eyeoff","mail","bug","flask","cloud","chart","send","coins","landmark","umbrella","cart","heart","signal","truck","plane","bolt","factory","database","building","graduation"]);

export default function Icon({ name, size = 20, className, style }: { name: string; size?: number; className?: string; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} style={style}><use href={`/brand/ui-icons.svg#${names.has(name) ? name : 'layers'}`}/></svg>;
}
