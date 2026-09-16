export function contactDelivery() {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (endpoint) return { kind: 'endpoint' as const, url: endpoint };
  if (accessKey) return { kind: 'web3forms' as const, url: 'https://api.web3forms.com/submit', accessKey };
  if (process.env.NODE_ENV !== 'development') return { kind: 'endpoint' as const, url: '/api/contact' };
  return { kind: 'mailto' as const };
}
