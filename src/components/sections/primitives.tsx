/**
 * The accent palette the beta page and ExecutiveLens read per card. Values are
 * the monorepo's, so a card coloured "azure" here matches the same card on
 * exekova.com. The headline accent itself is the --wz-purple token in
 * globals.css, never a literal.
 */
export const ACCENT_HEX: Record<string, string> = {
  violet: '#513cec',
  azure: '#1370fb',
  leaf: '#05cc83',
  teal: '#08e2db',
};

export const ACCENT_TEXT_HEX: Record<string, string> = {
  violet: '#513cec',
  azure: '#0352c9',
  leaf: '#077e52',
  teal: '#085e5b',
};
