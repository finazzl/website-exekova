import Image from 'next/image';
import BrandLogo from '@/components/BrandLogo';
import Icon from '@/components/Icon';
import type { Connector } from '../data/connectors';

export default function ConnectorMark({ connector, size = 22 }: { connector: Connector; size?: number }) {
  if (connector.logo) return <BrandLogo name={connector.logo} size={size}/>;
  if (connector.name === 'Work Intent form') return <Image src="/brand/exekova-mark.png" width={size} height={size} alt=""/>;
  return <Icon name="grid" size={size}/>;
}
