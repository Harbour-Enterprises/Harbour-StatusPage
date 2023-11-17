<template>
  <n-table :bordered="false">
    <n-tbody>
      <n-tr>
        <statusTableCard>Normal</statusTableCard>
      </n-tr>
      <n-tr>
        <statusTableCard>Normal</statusTableCard>
      </n-tr>
      <n-tr>
        <statusTableCard>Normal</statusTableCard>
      </n-tr>
    </n-tbody>
  </n-table>
</template>

<style scoped>
.n-table {
  width: 100%;
}
</style>

<script setup>
import { NTable } from 'naive-ui';
import statusTableCard from './statusTableCard.vue';
</script>
