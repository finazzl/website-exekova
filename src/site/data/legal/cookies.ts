import type { LegalDoc } from '../../components/LegalDocument';

/** The localStorage key the Cookie settings page writes. Kept here so the policy and the page agree. */
export const COOKIE_PREFERENCES_KEY = 'exekova-cookie-preferences';

/**
 * Cookie Policy. This website sets no cookies of its own and loads no
 * third-party scripts, embeds or fonts from other hosts; fonts are bundled
 * with the site. The only item it can store is the visitor's own cookie
 * preference, and only after they save it on the Cookie settings page.
 */
export const cookies: LegalDoc = {
  slug: '/cookies',
  kicker: 'LEGAL',
  title: 'Cookie Policy',
  accent: 'What this site stores. Almost nothing.',
  lede: 'What exekova.com stores on your device, why, and how to change it. There are no analytics, advertising or third-party tracking cookies on this site.',
  effectiveDate: '15 September 2026',
  version: '1.0',
  status: 'final',
  summary: [
    'This website sets no cookies. It loads no analytics, advertising or social-media scripts, and no content from third-party hosts.',
    'The only thing it can store is your own cookie preference, in your browser, after you save it on the Cookie settings page.',
    'You can change or clear that preference at any time on the Cookie settings page or through your browser.',
    'If we ever add optional storage, it will be off until you turn it on, and this page will list it first.',
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
        { type: 'p', text: 'exekova.com sets no cookies. It does not load analytics, advertising or social-media scripts, and it does not embed content from other websites. Fonts are bundled with the site rather than fetched from a font service, so no third party sees your visit on our behalf.' },
        { type: 'p', text: 'The only item this website can store is your cookie preference. It is written to your browser’s local storage when you save your choices on the [Cookie settings](/cookie-settings) page, and nowhere else. Until you save, nothing is stored.' },
        { type: 'table', head: ['Name', 'Purpose', 'Type', 'Duration'], rows: [
          [COOKIE_PREFERENCES_KEY, 'Remembers the choices you saved on the Cookie settings page: functional, analytics and marketing storage on or off, and when you saved them.', 'Local storage, strictly necessary, set by exekova.com', 'Until you clear it on the Cookie settings page or in your browser'],
        ] },
        { type: 'note', text: 'The request-access form on the homepage and the contact form build an email in your own email application. They store nothing in your browser.' },
      ],
    },
    {
      id: 'categories',
      heading: 'Categories on the settings page',
      blocks: [
        { type: 'p', text: 'The [Cookie settings](/cookie-settings) page shows four categories so that your choices are recorded before any optional storage is ever added. Today, only the first one does anything.' },
        { type: 'ul', items: [
          'Strictly necessary: the preference record above. It cannot be switched off because it is what remembers your choice.',
          'Functional: storage that would remember conveniences such as a dismissed panel. Not currently used. Nothing loads if you turn it on.',
          'Analytics: storage that would measure how the site is used. Not currently used. Nothing loads if you turn it on.',
          'Marketing: storage that would support advertising. Not used, and not planned. Nothing loads if you turn it on.',
        ] },
        { type: 'p', text: 'If we add storage in any optional category, it will stay off until you turn it on, this table will be updated first, and the effective date at the top of this page will change.' },
      ],
    },
    {
      id: 'your-choices',
      heading: 'Your choices',
      blocks: [
        { type: 'p', text: 'You can review and change your preference at any time on the [Cookie settings](/cookie-settings) page. “Reject non-essential” records that every optional category is off. “Accept all” records that they are on, which changes nothing today because no optional storage exists.' },
        { type: 'p', text: 'Your browser also lets you view, block and delete cookies and local storage for any site, usually under privacy or site-data settings. Clearing site data for exekova.com removes the preference record, and the settings page will show the defaults again.' },
      ],
    },
    {
      id: 'third-parties',
      heading: 'Third parties',
      blocks: [
        { type: 'p', text: 'No third party sets cookies or reads storage on exekova.com. Links on this site to GitHub, Atlassian, exekova’s signed-in application or other websites lead to services with their own cookie policies, which apply once you are there.' },
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
