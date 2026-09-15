import Icon from '@/components/Icon';
import { inline } from '../lib/inline';

export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const groupId = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, '-');

/** Native disclosure list; works without JavaScript and reads well in print. */
export default function FaqAccordion({ groups, name = 'site-faq' }: { groups: FaqGroup[]; name?: string }) {
  return <div className="site-faq-list">{groups.map(group => <section className="site-faq-group" key={group.title} id={groupId(group.title)} aria-label={group.title}>
    {groups.length > 1 && <h3>{group.title}</h3>}
    {group.items.map(item => <details key={item.q} name={name}><summary>{item.q}<Icon name="arrow" size={16}/></summary><p>{inline(item.a)}</p></details>)}
  </section>)}</div>;
}
