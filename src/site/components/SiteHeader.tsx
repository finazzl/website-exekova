'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import type { NavItem, NavLink } from '../nav';

const MOBILE_BREAKPOINT = 1100;

function Chevron() {
  return <svg className="navigation-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>;
}

/** Homepage anchors stay plain links so the access dialog can intercept them on the homepage. */
function NavAnchor({ href, className, children, onClick, current }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void; current?: boolean }) {
  const props = { className, onClick, 'aria-current': current ? ('page' as const) : undefined };
  return href.startsWith('/#') ? <a href={href} {...props}>{children}</a> : <Link prefetch={false} href={href} {...props}>{children}</Link>;
}

type Props = { nav: NavItem[]; wordmark: string; signIn: NavLink; cta: NavLink };

/**
 * The exekova.com header: brand, mega menus on desktop, a drawer under
 * 1100px. Menus close on navigation, on Escape, on outside pointer and on
 * blur; the drawer traps focus and makes the rest of the page inert.
 */
export default function SiteHeader({ nav, wordmark, signIn, cta }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const focusMenu = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname() ?? '/';
  const selected = nav.find(item => item.label === open);
  const clearTimers = () => { clearTimeout(hoverTimer.current); clearTimeout(closeTimer.current); };
  const closeAll = () => { focusMenu.current = false; clearTimers(); setOpen(null); setMobileOpen(false); setMobileSection(null); };
  const current = (href: string) => !href.startsWith('/#') && (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)));
  const currentItem = (item: NavItem) => current(item.href) || Boolean(item.mega?.columns.some(column => column.links.some(link => current(link.href))));

  useLayoutEffect(() => {
    if (open && focusMenu.current) {
      header.current?.querySelector<HTMLAnchorElement>('.navigation-panel a')?.focus();
      focusMenu.current = false;
    }
  }, [open]);
  // Close menus on navigation, including browser history.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { closeAll(); }, [pathname]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 12);
    const resize = () => { header.current?.style.setProperty('--navigation-bottom', `${header.current.getBoundingClientRect().bottom}px`); clearTimers(); if (window.innerWidth > MOBILE_BREAKPOINT) { setMobileOpen(false); setMobileSection(null); } else setOpen(null); };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) { clearTimers(); setOpen(null); } };
    scroll(); window.addEventListener('scroll', scroll, { passive: true }); window.addEventListener('resize', resize); document.addEventListener('pointerdown', outside);
    return () => { clearTimers(); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize); document.removeEventListener('pointerdown', outside); };
  }, []);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeAll();
      if (mobileOpen) mobileToggle.current?.focus();
      else if (open) header.current?.querySelector<HTMLButtonElement>(`[data-nav="${open}"]`)?.focus();
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mobileOpen]);
  useEffect(() => {
    if (!mobileOpen) return;
    header.current?.style.setProperty('--navigation-bottom', `${header.current.getBoundingClientRect().bottom}px`);
    const previous = document.body.style.overflow;
    const regions = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    const previousInert = regions.map(region => region.inert);
    document.body.style.overflow = 'hidden';
    regions.forEach(region => { region.inert = true; });
    return () => { document.body.style.overflow = previous; regions.forEach((region, index) => { region.inert = previousInert[index]; }); };
  }, [mobileOpen]);

  return <header ref={header} className={`site-header ${scrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'has-mobile-menu' : ''}`}
    onPointerEnter={() => clearTimeout(closeTimer.current)}
    onPointerLeave={event => { if (event.pointerType === 'mouse') { clearTimeout(hoverTimer.current); closeTimer.current = setTimeout(() => { if (!header.current?.querySelector('.navigation-panel')?.contains(document.activeElement)) setOpen(null); }, 160); } }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { clearTimers(); setOpen(null); } }}
    onKeyDown={event => {
      if (event.key === 'Tab' && mobileOpen) {
        const elements = Array.from(header.current?.querySelectorAll<HTMLElement>('[data-mobile-toggle], .navigation-mobile a, .navigation-mobile button') ?? []).filter(el => el.getClientRects().length > 0);
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
    <div className="navigation-bar">
      <Link prefetch={false} href="/" className="navigation-brand" aria-label="Exekova home" onClick={closeAll}><Image src={wordmark} alt="Exekova" width={667} height={167} priority/></Link>
      <nav className="navigation-desktop" aria-label="Main navigation">{nav.map((item, index) => <div className="navigation-item" key={item.label} onPointerEnter={event => { if (event.pointerType !== 'mouse') return; clearTimers(); hoverTimer.current = setTimeout(() => setOpen(item.mega ? item.label : null), 100); }}>
        {item.mega
          ? <button className={`navigation-link ${currentItem(item) ? 'is-current' : ''}`} data-nav={item.label} aria-expanded={open === item.label} aria-controls={open === item.label ? 'desktop-mega-menu' : undefined} onClick={() => { clearTimers(); setOpen(open === item.label ? null : item.label); }} onKeyDown={event => {
              if (event.key === 'ArrowDown') { event.preventDefault(); clearTimers(); if (open === item.label) header.current?.querySelector<HTMLAnchorElement>('.navigation-panel a')?.focus(); else { focusMenu.current = true; setOpen(item.label); } }
              if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const offset = event.key === 'ArrowRight' ? 1 : -1; header.current?.querySelectorAll<HTMLElement>('.navigation-desktop .navigation-link')[(index + offset + nav.length) % nav.length]?.focus(); }
            }}>{item.label}<Chevron/></button>
          : <NavAnchor className="navigation-link" href={item.href} current={current(item.href)} onClick={closeAll}>{item.label}</NavAnchor>}
      </div>)}</nav>
      <div className="navigation-actions"><Link prefetch={false} className="navigation-signin" href={signIn.href}>{signIn.label}</Link><NavAnchor className="navigation-cta" href={cta.href}>{cta.label}<Icon name="arrow" size={15}/></NavAnchor></div>
      <button ref={mobileToggle} data-mobile-toggle className="navigation-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls={mobileOpen ? 'mobile-navigation' : undefined} onClick={() => { clearTimers(); setMobileOpen(!mobileOpen); setMobileSection(null); setOpen(null); }}>{mobileOpen ? <Icon name="close" size={22}/> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>}</button>
      {selected?.mega && <div key={selected.label} id="desktop-mega-menu" className="navigation-panel">
        <Link prefetch={false} href={selected.mega.intro.href} className="navigation-feature" onClick={closeAll}><div><span className="navigation-eyebrow">EXPLORE {selected.label.toUpperCase()}</span><h2>{selected.mega.intro.title}</h2><p>{selected.mega.intro.body}</p></div><span className="navigation-feature-arrow"><Icon name="arrow" size={22}/></span></Link>
        <div className="navigation-columns" data-columns={selected.mega.columns.length}>{selected.mega.columns.map((column, index) => <div key={index} className="navigation-column"><h3>{column.title}</h3><ul>{column.links.map(link => <li key={link.href}><NavAnchor href={link.href} current={pathname === link.href} onClick={closeAll}><div><strong>{link.label}</strong>{link.desc && <span>{link.desc}</span>}</div><Icon name="arrow" size={15}/></NavAnchor></li>)}</ul></div>)}</div>
        <div className="navigation-panel-footer"><span>From business intent to verified outcomes.</span><Link prefetch={false} href={selected.mega.intro.href} onClick={closeAll}>{selected.mega.intro.linkLabel}<Icon name="arrow" size={14}/></Link></div>
      </div>}
    </div>
    {mobileOpen && <nav id="mobile-navigation" className="navigation-mobile" aria-label="Mobile navigation">
      <div className="navigation-mobile-links">{nav.map((item, index) => <div className="navigation-mobile-item" key={item.label}>{item.mega
        ? <><button className={currentItem(item) ? 'is-current' : undefined} aria-expanded={mobileSection === item.label} aria-controls={mobileSection === item.label ? `mobile-group-${index}` : undefined} onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}>{item.label}<Chevron/></button>
          {mobileSection === item.label && <div id={`mobile-group-${index}`} className="navigation-mobile-group"><Link prefetch={false} className="navigation-mobile-overview" href={item.href} onClick={closeAll}>{item.mega.intro.linkLabel}<Icon name="arrow" size={17}/></Link>{item.mega.columns.map((column, colIndex) => <div key={colIndex}><h3>{column.title}</h3><ul>{column.links.map(link => <li key={link.href}><NavAnchor href={link.href} current={pathname === link.href} onClick={closeAll}><strong>{link.label}</strong>{link.desc && <span>{link.desc}</span>}</NavAnchor></li>)}</ul></div>)}</div>}</>
        : <NavAnchor href={item.href} current={current(item.href)} onClick={closeAll}>{item.label}<Icon name="arrow" size={18}/></NavAnchor>}</div>)}</div>
      <div className="navigation-mobile-actions"><Link prefetch={false} className="navigation-signin" href={signIn.href} onClick={closeAll}>{signIn.label}</Link><NavAnchor className="navigation-cta" href={cta.href} onClick={closeAll}>{cta.label}<Icon name="arrow" size={16}/></NavAnchor></div>
    </nav>}
  </header>;
}
