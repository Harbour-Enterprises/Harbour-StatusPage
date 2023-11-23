<script setup>
import { NEl, NPopover } from 'naive-ui';
import { getDate } from '../../prepareData';

const props = defineProps({
  report: Object,
  statusMap: Object,
  colors: Object
});

const getStatus = (num) => {
  return num == null
    ? 'nodata'
    : num === 1
      ? 'success'
      : num < 0.3
        ? 'failure'
        : 'partial';
}
</script>

<template>
  <n-el
    tag="div"
    class="month-data"
  >
    <div 
      v-for="value in Object.entries(report).slice(0, 30).reverse()"
      class="stats-item"
    >
      <template v-if="value[0] !== 'upTime'">
        <n-popover trigger="hover" :delay="50">
          <template #trigger>
            <div class="stats-item-block" :style="{ backgroundColor: colors[getStatus(value[1])] }"></div>
          </template>
          <div class="tooltip-content">
            <p class="date">{{ getDate(value[0]) }}</p>
            <p class="status">{{ statusMap[getStatus(value[1])] }}</p>
          </div>
        </n-popover>
      </template>
    </div>
  </n-el>
</template>

<style scoped lang="scss">
.month-data {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  margin-top: 10px;
}
.stats-item {
  &-block {
    width: 15px;
    height: 25px;
    border-radius: 4px;
  }
}
</style>
