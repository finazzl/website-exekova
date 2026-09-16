/**
 * Local brand artwork, keyed by the display name the page uses. Third-party
 * marks identify integrations and belong to their owners; no endorsement is
 * implied. Only the marks the beta page can show are shipped in public/.
 */
const BRAND_LOGOS: Record<string, string> = {
  GitHub: 'github.svg',
  Jira: 'jira.svg',
  Linear: 'linear.svg',
  GitLab: 'gitlab.webp',
  Bitbucket: 'bitbucket.svg',
  Slack: 'slack.webp',
  Teams: 'teams.svg',
};

export function getBrandLogo(name: string): string | undefined {
  const file = BRAND_LOGOS[name];
  return file ? `/brand/integrations/${file}` : undefined;
}
