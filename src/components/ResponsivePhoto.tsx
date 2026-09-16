/** Pre-sized images work on the static host without an image optimization server. */
export default function ResponsivePhoto({ name, sizes, className, alt = '' }: {
  name: 'workspace-flow' | 'team-room' | 'operations-room';
  sizes: string;
  className?: string;
  alt?: string;
}) {
  return <img src={`/images/${name}-640.webp`}
    srcSet={[320, 640, 960, 1280].map(width => `/images/${name}-${width}.webp ${width}w`).join(', ')}
    sizes={sizes} alt={alt} className={className} loading="lazy" decoding="async"
    width={1280} height={name === 'workspace-flow' ? 853 : 1280}
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
}
