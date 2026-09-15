/** A labelled row of pills: what arrives, the tools in play, the systems touched. */
export default function Chips({ items, label }: { items: string[]; label?: string }) {
  if (!items.length) return null;
  return <div className="site-chips-block">{label && <span className="site-chips-label">{label}</span>}<ul className="site-chips" aria-label={label}>{items.map(item => <li key={item}>{item}</li>)}</ul></div>;
}
