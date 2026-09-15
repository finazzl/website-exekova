import { casesFor } from '@/site/data/cases';
import OutcomeStories from './OutcomeStories';

/** The three fintech problems most teams hand over first, rendered on the server so the case data stays out of the browser bundle. */
const PICKS = ['fintech-psp-deprecation', 'fintech-recon-exceptions', 'fintech-pci-client-side'];

export default function FintechUseCases() {
  const fintech = casesFor('industry', 'fintech');
  const [provider, reconciliation, controls] = PICKS.map(slug => {
    const item = fintech.find(item => item.slug === slug);
    return item ? { slug: item.slug, name: item.name, problem: item.problem } : null;
  });
  if (!provider || !reconciliation || !controls) return null;
  return <OutcomeStories provider={provider} reconciliation={reconciliation} controls={controls}/>;
}
