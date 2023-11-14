import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Status Page',
  description: '',

  dest: '../docs/',
  srcDir: './src',
  base: '/Harbour-StatusPage/', //TODO: remove this when custom domain is set up

  lastUpdated: true,
  cleanUrls: true,

  markdown: {
    math: false,
  },

  head: [
    ['meta', { name: 'theme-color', content: '#1255FE' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Harbour Developers' }],
  ],

  themeConfig: {
    logo: { src: '/icon.svg' },
    siteTitle: "Status Page",
    footer: {
      message: '© 2023 Harbour Enterprises, Inc. 💙💛',
    },
  },
});

function navMenu() {
  return [
    {
      text: 'Reference',
      link: '/reference/v2',
      activeMatch: '/reference/',
    },
    {
      text: 'API Version',
      items: [
        { text: 'v2', link: '/reference/v2' },
        { text: 'v1', link: '/reference/v1' },
      ],
    },
  ];
}

function sidebarReference() {
  return [
    {
      text: 'Introduction',
      link: '#start-here',
      items: [
        {
          text: 'Authentication',
          link: '#_1-get-your-keys',
        },
        {
          text: 'Format',
          link: '#format',
        },
        {
          text: 'Errors',
          link: '#errors',
        },
        {
          text: 'Rate Limit',
          link: '#rate-limit',
        },
        {
          text: 'Pagination',
          link: '#pagination',
        },
        {
          text: 'Search',
          link: '#search',
        },
      ],
    },
    {
      text: 'Endpoints',
      link: '#core-resources',
      items: [
        {
          text: 'Webhooks',
          collapsed: true,
          link: '#webhooks',
          items: [
            {
              text: 'List webhooks',
              link: '#_1-listar-receipts',
            },
          ],
        },
        {
          text: 'Webhook Events',
          link: '#webhooks-events',
        },
        {
          text: 'Verifications',
          link: '#verifications',
        },
      ],
    },
  ];
}
