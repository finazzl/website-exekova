/** Every page outside the homepage shares the homepage tokens through .beta-page. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="beta-page site-page">{children}</div>;
}
