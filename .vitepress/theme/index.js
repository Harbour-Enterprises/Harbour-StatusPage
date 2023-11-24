import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Subscribe from './components/Subscribe.vue';

export default {
  ...DefaultTheme,
  Layout: h(DefaultTheme.Layout, null, {
    'nav-bar-content-after': () => h(Subscribe),
  }),
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx);
  },
};
