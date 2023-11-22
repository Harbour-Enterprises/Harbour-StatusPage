<script setup>
import { NEl, NThing } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { getReportByUrl } from '../../prepareData';
import MonthReport from './MonthReport.vue';

const props = defineProps({
  title: String,
  description: String,
});
const report = ref({});
const status = ref(null);
const extraTitle = computed(() => `${report.value.upTime}% in the last 30 days`);
const statusMap = {
  nodata: 'No data',
  success: 'Fully Operational',
  failure: 'Major Outage',
  partial: 'Partial Outage',
};

const iconColors = {
  nodata: '',
  success: '#18a058',
  failure: '#e88080',
  partial: '#f2c97d',
};

onMounted(async () => {
  report.value = await getReportByUrl(props.title);
  const lastDayStatus = Object.values(report.value)[0];
  status.value =
    lastDayStatus == null
      ? 'nodata'
      : lastDayStatus === 1
      ? 'success'
      : lastDayStatus < 0.3
      ? 'failure'
      : 'partial';
});
</script>

<template>
  <n-thing
    :title="title"
    :title-extra="extraTitle"
    :description="description"
    :description-style="{
      fontSize: '12px',
    }">
    <n-el tag="div" class="item-content">
      <MonthReport :report="report" :status-map="statusMap" :colors="iconColors" />
    </n-el>
  </n-thing>
</template>

<style scoped>
.item-content {
  display: flex;
  flex-direction: column;
}
.status-data {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
}
</style>
