import Components from 'unplugin-vue-components/vite'; // This imports the plugin
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Status Page',
  description: '',

  dest: '../docs/',
  srcDir: './src',
  base: '/Harbour-StatusPage/', //TODO: remove this when custom domain is set up

  lastUpdated: false,
  cleanUrls: true,

  markdown: {
    math: false,
  },

  head: [
    ['meta', { name: 'theme-color', content: '#1255FE' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'Harbour Status Page' }],
  ],

  themeConfig: {
    logo: {
      light: '/icon-light.svg',
      dark: '/icon-dark.svg'
    },
    siteTitle: "Status Page",
    footer: {
      message: '© 2023 Harbour Enterprises, Inc. 💙💛',
    },
  },

  vite: {
    plugins: [
      Components({
        // relative paths to the directory to search for components.
        dirs: ['.vitepress/theme/components'],
        // valid file extensions for components.
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        // search for subdirectories
        deep: true,
      }),
    ],
  }
});