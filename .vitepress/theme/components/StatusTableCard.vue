<script setup>
import { CheckCircle, ExclamationCircle } from '@vicons/fa';
import { NCard, NIcon } from 'naive-ui';

const props = defineProps({
  title: String,
  status: String,
});
</script>

<template>
  <n-card :title="title">
    {{ status === 'normal' ? 'Normal' : 'Outage' }}
    <n-icon v-if="status === 'normal'" :component="CheckCircle" />
    <n-icon v-else :component="ExclamationCircle" />
  </n-card>
</template>

<style scoped>
.n-card {
  width: 100%;
}
</style>
