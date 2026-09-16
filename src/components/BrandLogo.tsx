'use client';

import { useState } from 'react';
import { getBrandLogo } from '../lib/brand-logos';

/**
 * Decorative by default: in most placements the adjacent brand name supplies the
 * accessible label. Pass `labelled` where the mark stands alone, so the tool name
 * reaches assistive technology and crawlers instead of an empty `alt`.
 */
export default function BrandLogo({ name, size = 24, labelled }: { name: string; size?: number; labelled?: boolean }) {
  const src = getBrandLogo(name);
  const [failedSrc, setFailedSrc] = useState<string>();
  if (!src || failedSrc === src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={labelled ? name : ''}
      aria-hidden={labelled ? undefined : 'true'}
      width={size}
      height={size}
      // React preloads every server-rendered <img> that is not lazy. These marks
      // appear in marquees and chips, never as the LCP element, so without this a
      // logo strip emits ~130 high-priority preloads that compete with the
      // critical path. Measured: LCP is text and no image resolves before it.
      loading="lazy"
      decoding="async"
      className="shrink-0 object-contain"
      style={{ width: size, height: size, objectFit: 'contain' }}
      onError={() => setFailedSrc(src)}
    />
  );
}

export function BrandLabel({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <BrandLogo name={name} size={size} />
      <span>{name}</span>
    </span>
  );
}
