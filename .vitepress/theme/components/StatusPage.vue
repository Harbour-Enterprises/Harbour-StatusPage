<script setup>
import { darkTheme, NConfigProvider } from 'naive-ui';
import { useData } from 'vitepress';
import StatusBanner from './StatusBanner.vue';
import StatusTable from './StatusTable.vue';

const { isDark } = useData();
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <StatusBanner />

    <h2>Current status</h2>
    <StatusTable />
  </n-config-provider>
</template>

<style scoped>
</style>
