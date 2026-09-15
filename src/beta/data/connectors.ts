/**
 * Every task source and code repository the beta page names, with the status
 * the code supports - not the status the marketing gallery claims.
 *
 * Grounding, as of 2026-09-15: services/connector-service implements exactly
 * `github`, `jira` and `slack` (contracts/openapi.yaml provider enum), and
 * apps/app's onboarding accepts a task from Jira or as a written brief (the
 * EXEKOVA Work Intent form). Slack implements review notifications/callbacks,
 * not task intake, so its task-source status is Planned. Teams, Linear,
 * GitLab, Bitbucket, Excel and CSV task intake are not implemented.
 *
 * As of 2026-09-15 the product is live: Jira, the Work Intent form and GitHub
 * are marked available (the site's legend reads that as "live in production
 * today"); everything else stays planned.
 *
 * Statuses use the site's own vocabulary: available = live in production
 * today; planned = on the roadmap, no committed date.
 */
export type ConnectorStatus = 'available' | 'planned';
export type Connector = {
  name: string;
  kind: 'source' | 'repo';
  status: ConnectorStatus;
  /** A key in src/lib/brand-logos.ts, when the tool has a mark on the site. */
  logo?: string;
  /** Sources featured in the homepage's Get step. */
  featured?: boolean;
  /** Provider-correct name for what a repository receives. */
  delivers?: 'Pull request' | 'Merge request';
};

export const CONNECTORS: Connector[] = [
  { name: 'Jira', kind: 'source', status: 'available', logo: 'Jira', featured: true },
  { name: 'Slack', kind: 'source', status: 'planned', logo: 'Slack', featured: true },
  { name: 'Teams', kind: 'source', status: 'planned', logo: 'Teams', featured: true },
  { name: 'Excel', kind: 'source', status: 'planned', featured: true },
  { name: 'Work Intent form', kind: 'source', status: 'available', featured: true },
  { name: 'Linear', kind: 'source', status: 'planned', logo: 'Linear' },
  { name: 'CSV', kind: 'source', status: 'planned' },
  { name: 'GitHub', kind: 'repo', status: 'available', logo: 'GitHub', delivers: 'Pull request' },
  { name: 'GitLab', kind: 'repo', status: 'planned', logo: 'GitLab', delivers: 'Merge request' },
  { name: 'Bitbucket', kind: 'repo', status: 'planned', logo: 'Bitbucket', delivers: 'Pull request' },
];

export const FEATURED_TASK_SOURCES = CONNECTORS.filter(item => item.kind === 'source' && item.featured);

export const STATUS_LABEL: Record<ConnectorStatus, string> = { available: 'Available', planned: 'Planned' };
