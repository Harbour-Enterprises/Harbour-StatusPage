<script setup>
import { darkTheme, NConfigProvider } from 'naive-ui';
import { useData } from 'vitepress';
import PageBanner from './PageBanner.vue';
import ListGrid from './ListGrid.vue';

const { isDark } = useData();
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <PageBanner />

    <h2>Current status</h2>
    <ListGrid />
  </n-config-provider>
</template>

<style scoped>
</style>
