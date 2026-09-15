/** Social and contact glyphs for the footer, as drawn on exekova.com. */
const paths: Record<string, React.ReactNode> = {
  x: <path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.5 5.4 22H2.2l8.3-9.5L.8 2h6.5l4.5 6.9L18.9 2Zm-1.1 18h1.7L6.3 4H4.5l13.3 16Z" />,
  linkedin: <><rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" /><path fill="var(--social-icon-inset, #fff)" d="M6 9h3v10H6zm1.5-4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM11 9h2.8v1.4c.5-.9 1.4-1.6 2.8-1.6 2.9 0 3.4 1.9 3.4 4.3V19h-3v-5.2c0-1.2 0-2.6-1.6-2.6s-1.5 1.3-1.5 2.5V19H11Z" /></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" /><path d="m10 9 6 3-6 3Z" fill="var(--social-icon-inset, #fff)" /></>,
  instagram: <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></g>,
  github: <path fill="currentColor" d="M12 .8a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.5v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 1-.3 3.1 1.2a10.8 10.8 0 0 1 5.6 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.6 5.3-5.1 5.6.4.4.8 1 .8 2.1v3.1c0 .3.2.6.8.5A11.3 11.3 0 0 0 12 .8Z" />,
  email: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></g>,
};

export default function SocialIcon({ name }: { name: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name] ?? paths.email}</svg>;
}
