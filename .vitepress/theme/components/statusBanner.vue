<script setup>
import { CheckCircle } from '@vicons/fa';
import { NAlert, NIcon } from 'naive-ui';
</script>

<template>
  <n-alert title="All Systems Operational" type="success">
    <template #icon>
      <n-icon :component="CheckCircle" />
    </template>
  </n-alert>
</template>
