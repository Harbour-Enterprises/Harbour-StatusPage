<template>
  <n-card title="API">
    <slot>Normal</slot>
    <n-icon :component="CheckCircle" />
  </n-card>
</template>

<style scoped>
.n-card {
  width: 100%;
}
</style>

<script setup>
import { CheckCircle } from '@vicons/fa';
import { NCard, NIcon } from 'naive-ui';
</script>
