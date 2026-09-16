'use client';

import { useEffect, useRef } from 'react';

export type FeedbackTone = 'info' | 'success' | 'error';

export default function FormFeedback({ message, tone }: { message: string; tone: FeedbackTone }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (message) ref.current?.scrollIntoView?.({ block: 'start', behavior: 'auto' });
  }, [message]);

  return <p ref={ref} className="request-status" role="status" aria-live="polite" aria-atomic="true" data-tone={tone}>{message}</p>;
}
