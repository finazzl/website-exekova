import type { LegalDoc } from '../../components/LegalDocument';
import { COOKIE_PREFERENCES_KEY } from '../analytics';
export { COOKIE_PREFERENCES_KEY } from '../analytics';


export const cookies: LegalDoc = {
  slug: '/cookies',
  kicker: 'LEGAL',
  title: 'Cookie Policy',
  accent: 'What this site stores. Almost nothing.',
  lede: 'What exekova.com stores on your device, why, and how to change it. Optional Google Analytics is off until you allow it. Advertising cookies are not used.',
  effectiveDate: '16 September 2026',
  version: '1.1',
  status: 'final',
  summary: [
    'Optional Google Analytics, when configured, loads only after you allow analytics. Cloudflare provides hosting and form spam verification.',
    'Your cookie preference is saved in your browser. If you allow configured Google Analytics, it can also set first-party analytics cookies.',
    'You can change or clear that preference at any time on the Cookie settings page or through your browser.',
    'Optional analytics stays off until you turn it on. You can withdraw permission at any time.',
  ],
  sections: [
    {
      id: 'what-cookies-are',
      heading: 'Cookies and similar storage',
      blocks: [
        { type: 'p', text: 'A cookie is a small text file a website stores in your browser. Browsers also offer local storage, which works in a similar way but is not sent with every request. Both can remember a choice you made, keep you signed in, or, on many sites, track you across pages and other sites. This policy covers both kinds of storage on exekova.com.' },
        { type: 'p', text: 'This policy covers the public website. The signed-in exekova application uses its own session storage to keep you signed in, and is described in the [Privacy Policy](/privacy) and, for customers, the [Data Processing Addendum](/dpa).' },
      ],
    },
    {
      id: 'what-we-store',
      heading: 'What this website stores',
      blocks: [
        { type: 'p', text: 'Fonts are bundled with the site. Google Analytics is optional and, when configured, loads only after you allow analytics. It measures page visits and traffic sources; our analytics integration does not send your form entries. No advertising scripts are loaded.' },
        { type: 'p', text: 'Your preference is written to local storage when you choose in the analytics notice or save on [Cookie settings](/cookie-settings). Without analytics permission, no Google Analytics script is loaded.' },
        { type: 'table', head: ['Name', 'Purpose', 'Type', 'Duration'], rows: [
          [COOKIE_PREFERENCES_KEY, 'Remembers the choices you saved on the Cookie settings page: functional, analytics and marketing storage on or off, and when you saved them.', 'Local storage, strictly necessary, set by exekova.com', 'Until you clear it on the Cookie settings page or in your browser'],
          ['_ga and _ga_*', 'Distinguish visits and sessions for Google Analytics, only when configured and permitted.', 'First-party cookies, optional analytics', 'Up to one year; renewed during permitted visits'],
        ] },
        { type: 'note', text: 'The request-access and contact forms submit your enquiry to our team and do not save your entries in browser storage. When enabled, Cloudflare Turnstile provides spam verification on both forms.' },
      ],
    },
    {
      id: 'categories',
      heading: 'Categories on the settings page',
      blocks: [
        { type: 'p', text: 'The [Cookie settings](/cookie-settings) page lets you control optional analytics and record your other preferences.' },
        { type: 'ul', items: [
          'Strictly necessary: the preference record above. It cannot be switched off because it is what remembers your choice.',
          'Functional: storage that would remember conveniences such as a dismissed panel. Not currently used. Nothing loads if you turn it on.',
          'Analytics: Google Analytics page and session measurement, enabled only when configured and you allow it.',
          'Marketing: storage that would support advertising. Not used, and not planned. Nothing loads if you turn it on.',
        ] },
        { type: 'p', text: 'New optional storage will remain off until you allow it, and this policy will be updated before it is introduced.' },
      ],
    },
    {
      id: 'your-choices',
      heading: 'Your choices',
      blocks: [
        { type: 'p', text: 'You can review and change your preference at any time on the [Cookie settings](/cookie-settings) page. “Reject non-essential” records that every optional category is off. “Accept all” permits configured analytics. Rejecting analytics disables further collection and removes its first-party cookies.' },
        { type: 'p', text: 'Your browser also lets you view, block and delete cookies and local storage for any site, usually under privacy or site-data settings. Clearing site data for exekova.com removes the preference record, and the settings page will show the defaults again.' },
      ],
    },
    {
      id: 'third-parties',
      heading: 'Third parties',
      blocks: [
        { type: 'p', text: 'When you allow configured analytics, Google processes visit information. Cloudflare provides hosting performance measurement and Turnstile spam verification; these services may process technical browser and request information. External websites linked from this site have their own policies.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        { type: 'p', text: 'We will update this page before any change to what the website stores. The effective date and version at the top show the current edition.' },
      ],
    },
  ],
  contact: { email: 'connect@exekova.com', note: 'Questions about storage on this website can be sent to the address below.' },
};
