import Link from 'next/link';
import Icon from '@/components/Icon';

export type CardItem = {
  icon?: string;
  /** A logo path, used instead of the icon tile. */
  image?: string;
  kicker?: string;
  title: string;
  body: string;
  points?: (string | { title: string; body: string })[];
  href?: string;
  linkLabel?: string;
  badge?: string;
};

/** A grid of white cards; a card with `href` is one link. */
export default function Cards({ items, columns = 3 }: { items: CardItem[]; columns?: 2 | 3 | 4 | 5 }) {
  const className = `site-cards${columns === 2 ? ' is-two' : columns === 4 ? ' is-four' : columns === 5 ? ' is-five' : ''}`;
  return <div className={className}>{items.map(item => {
    const inner = <>
      {item.image ? <span className="site-card-icon is-image"><img src={item.image} alt="" aria-hidden="true" width={24} height={24} loading="lazy" decoding="async"/></span> : item.icon && <span className="site-card-icon"><Icon name={item.icon} size={22}/></span>}
      {item.badge && <span className="beta-badge" data-status="available">{item.badge}</span>}
      {item.kicker && <span className="site-card-kicker">{item.kicker}</span>}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.points && <ul>{item.points.map(point => typeof point === 'string' ? <li key={point}><Icon name="check" size={15}/>{point}</li> : <li key={point.title}><Icon name="check" size={15}/><span><strong>{point.title}</strong>{point.body}</span></li>)}</ul>}
      {item.href && <span className="site-card-link">{item.linkLabel ?? 'Learn more'}<Icon name="arrow" size={14}/></span>}
    </>;
    return item.href
      ? <Link href={item.href} className="site-card" key={item.title}>{inner}</Link>
      : <article className="site-card" key={item.title}>{inner}</article>;
  })}</div>;
}
