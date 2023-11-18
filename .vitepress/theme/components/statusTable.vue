<script setup>
import { NTable } from 'naive-ui';
import StatusTableCard from './StatusTableCard.vue';
</script>

<template>
  <n-table :bordered="false">
    <n-tbody>
      <n-tr>
        <StatusTableCard title="API v1" status="normal" />
      </n-tr>
      <n-tr>
        <StatusTableCard title="API v2" status="normal" />
      </n-tr>
      <n-tr>
        <StatusTableCard title="Verifications" />
      </n-tr>
    </n-tbody>
  </n-table>
</template>

<style scoped>
.n-table {
  width: 100%;
}
</style>
