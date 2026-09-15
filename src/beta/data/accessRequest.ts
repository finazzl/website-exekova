import { CONNECTORS, STATUS_LABEL } from './connectors';
import { taskOffer } from './offer';

export type AccessRequest = { email: string; company: string; source: string; provider: string; task: string; criteria: string; repo: string };
export function includesPlannedIntegration(request: AccessRequest) {
  return CONNECTORS.some(item => (item.name === request.source || item.name === request.provider) && item.status === 'planned');
}
export function validRequest(request: AccessRequest) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email.trim()) && [request.company, request.task, request.criteria].every(value => value.trim().length > 0)
    && CONNECTORS.some(item => item.kind === 'source' && item.name === request.source)
    && CONNECTORS.some(item => item.kind === 'repo' && item.name === request.provider);
}
export function buildAccessRequest(request: AccessRequest) {
  const status = (name: string) => STATUS_LABEL[CONNECTORS.find(item => item.name === name)!.status];
  return [
    'exekova access request', '',
    `Work email: ${request.email.trim()}`, `Company or team: ${request.company.trim()}`,
    `Task source: ${request.source} (${status(request.source)})`, `Code repository: ${request.provider} (${status(request.provider)})`,
    `Repository name: ${request.repo.trim() || 'To be confirmed'}`, '',
    'Task', request.task.trim(), '', 'Acceptance criteria', request.criteria.trim(), '',
    includesPlannedIntegration(request) ? 'Planned integration interest: please notify me when this combination is supported.' : 'Please confirm eligibility and repository access before any execution starts.',
    `Offer: $${taskOffer.current} USD per accepted task. $${taskOffer.standard} planned standard price.`,
    'Source: exekova landing page', '',
  ].join('\n');
}
