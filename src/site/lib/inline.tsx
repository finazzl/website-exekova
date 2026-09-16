import Link from 'next/link';

/** Renders [label](href) links written inside content strings. */
export function inline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    return href.startsWith('/') ? <Link prefetch={false} href={href} key={index}>{label}</Link> : <a href={href} key={index}>{label}</a>;
  });
}

/** The same string with links reduced to their labels, for structured data. */
export function plain(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}
