'use client';

import { GA_CONFIG, GA_DENIED_CONSENT, GA_MEASUREMENT_ID } from '../data/analytics';

/** Visible in the server-rendered head; measurement is disabled before the library can execute. */
export default function GoogleTag() {
  if (!GA_MEASUREMENT_ID) return null;
  const bootstrap = `window[${JSON.stringify(`ga-disable-${GA_MEASUREMENT_ID}`)}]=true;
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('consent','default',${JSON.stringify(GA_DENIED_CONSENT)});
window.gtag('js',new Date());
window.gtag('config',${JSON.stringify(GA_MEASUREMENT_ID)},${JSON.stringify(GA_CONFIG)});`;
  return <>
    <script id="exekova-google-consent" dangerouslySetInnerHTML={{ __html: bootstrap }} />
    {/* onLoad prevents React from hoisting this resource ahead of the consent defaults. */}
    <script id="exekova-google-analytics" async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} onLoad={() => {}} />
  </>;
}
