import Icon from '@/components/Icon';

/** The security-practice line shown across the site. Practices followed, not certifications claimed. */
export const COMPLIANCE_LINE = 'Follows SOC 2, ISO 27001, PCI DSS and HIPAA practices.';

export default function ComplianceLine({ tone = 'mint' }: { tone?: 'mint' | 'dark' }) {
  return <p className={`site-compliance is-${tone}`}><Icon name="shield" size={15}/>{COMPLIANCE_LINE}</p>;
}
