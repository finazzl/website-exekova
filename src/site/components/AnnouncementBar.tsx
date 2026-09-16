import Link from 'next/link';
import Icon from '@/components/Icon';

type Announcement = { enabled: boolean; label: string; linkLabel: string; href: string };

/** The strip above the header, as on exekova.com. Configured in content/site.json. */
export default function AnnouncementBar({ announcement }: { announcement?: Announcement }) {
  if (!announcement?.enabled) return null;
  return <div className="site-announcement"><span><i aria-hidden="true"/>{announcement.label}</span><Link prefetch={false} href={announcement.href}>{announcement.linkLabel}<Icon name="arrow" size={12}/></Link></div>;
}
