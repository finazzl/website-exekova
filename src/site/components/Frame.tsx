'use client';

import { usePathname } from 'next/navigation';

/** The site chrome (announcement, header, footer) stays off the full-screen sign-in page. */
export default function Frame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '/';
  if (pathname === '/signin') return null;
  return <>{children}</>;
}
