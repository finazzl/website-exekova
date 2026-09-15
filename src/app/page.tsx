import type { Metadata } from 'next';
import BetaLanding from '@/beta/components/BetaLanding';
import { betaMetadata, betaSchema } from '@/beta/metadata';

export const metadata: Metadata = betaMetadata;

export default function ExekovaBetaPage() {
  return <>
    <BetaLanding />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(betaSchema()).replace(/</g, '\\u003c') }} />
  </>;
}
