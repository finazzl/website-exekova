'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import content from '../content/beta.json';
import RequestAccess from './RequestAccess';

export default function RequestAccessDialog({ email, signInHref }: { email: string; signInHref: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const open = () => {
      if (ref.current?.open) return;
      document.body.style.overflow = 'hidden';
      ref.current?.showModal();
      setVisited(true);
      setActive(true);
    };
    const close = () => { if (!ref.current?.open) { document.body.style.overflow = previousOverflow; setActive(false); } };
    const hash = () => { if (window.location.hash === '#request-access') open(); };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (anchor?.hash === '#request-access' && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
        event.preventDefault();
        open();
      }
    };
    const dialog = ref.current;
    dialog?.addEventListener('close', close);
    document.addEventListener('click', click);
    window.addEventListener('hashchange', hash);
    hash();
    return () => { dialog?.removeEventListener('close', close); document.removeEventListener('click', click); window.removeEventListener('hashchange', hash); if (dialog?.open) document.body.style.overflow = previousOverflow; };
  }, []);
  return <><dialog className="access-dialog" id="request-access" ref={ref} aria-labelledby="request-title" onClick={event => { if (event.target === ref.current) { const rect = ref.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) ref.current.close(); } }}>
    <button type="button" className="access-dialog-close" onClick={() => ref.current?.close()} aria-label="Close access request"><Icon name="close" size={24}/></button>
    <div className="access-dialog-heading"><span className="beta-label">LET’S START WITH ONE TASK</span><h2 id="request-title">Make room for<br/><em>the next thing.</em></h2><p>{content.request.copy}</p></div>
    {visited && <RequestAccess email={email} signInHref={signInHref} copy={content.request} active={active}/>}
  </dialog><noscript><p className="access-noscript">Request access by emailing <a href={`mailto:${email}`}>{email}</a> with your team, task, and acceptance criteria.</p></noscript></>;
}
