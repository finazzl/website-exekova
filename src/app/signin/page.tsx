import type { Metadata } from 'next';
import { getSite } from '@/lib/content';
import { metadataFor } from '@/site/lib/meta';
import SignIn from '@/site/components/SignIn';
import type { SignInRunData } from '@/site/components/SignInRun';
import '@/site/styles/signin.css';

export const metadata: Metadata = metadataFor('/signin');

const logo = (file: string) => `/brand/integrations/${file}`;

/** The example run beside the sign-in card: five connected tools, one execution, Get, Set and Done clearing in turn. */
const run: SignInRunData = {
  workId: 'EX-1042',
  sources: [
    { name: 'Jira', logo: logo('jira.svg'), note: 'Issue and criteria' },
    { name: 'GitHub', logo: logo('github.svg'), note: 'Repository' },
    { name: 'Slack', logo: logo('slack.webp'), note: 'Requests' },
    { name: 'Microsoft Teams', logo: logo('teams.svg'), note: 'Requests' },
    { name: 'Notion', logo: logo('notion.svg'), note: 'Specs and context' },
  ],
  steps: [
    { short: 'Define', status: 'Contract set', tone: 'run', tools: [] },
    { short: 'Plan', status: 'Work persisted', tone: 'run', tools: [] },
    { short: 'Execute', status: 'Executing', tone: 'run', tools: [{ name: 'Implementation', icon: 'code', note: 'Selected for implementation' }] },
    { short: 'Verify', status: 'Gate held', tone: 'held', tools: [{ name: 'Independent review', icon: 'shield', note: 'Independent review' }, { name: 'Test runner', icon: 'flask', note: 'Required CI evidence' }] },
    { short: 'Recover', status: 'Recovering', tone: 'run', tools: [{ name: 'Implementation', icon: 'code', note: 'Repair on the new revision' }, { name: 'Test runner', icon: 'flask', note: 'Retest within the ceiling' }] },
    { short: 'Accept', status: 'Accepted', tone: 'done', tools: [] },
  ],
};

export default function SignInPage() {
  const site = getSite();
  return <div className="beta-page signin-main"><SignIn wordmark={site.brand.wordmark as string} mark="/brand/exekova-mark.webp" run={run}/></div>;
}
