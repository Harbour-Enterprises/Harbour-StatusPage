<script setup>
import { CheckCircle, CircleRegular, ExclamationCircle, TimesCircle } from '@vicons/fa';
import { NEl, NIcon, NThing } from 'naive-ui';
import { computed, onMounted, ref } from 'vue';
import { getReportByUrl } from '../../prepareData';
import MonthReport from './MonthReport.vue';

const props = defineProps({
  fileName: String,
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

const icons = {
  nodata: CircleRegular,
  success: CheckCircle,
  failure: TimesCircle,
  partial: ExclamationCircle,
};

onMounted(async () => {
  report.value = await getReportByUrl(props.fileName);
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
    :description-style="{
      fontSize: '12px',
    }">
    <template #avatar>
      <n-icon :component="icons[status]" :color="iconColors[status]" size="20" />
    </template>

    <template #description>
      <p class="status" :style="{ color: iconColors[status] }">{{ statusMap[status] }}</p>
    </template>

    <n-el tag="div" class="item-content">
      <MonthReport :report="report" :status-map="statusMap" :colors="iconColors" />
    </n-el>
  </n-thing>
</template>

<style scoped lang="scss">
p {
  margin: 0;
  line-height: 1;
  & + & {
    margin-top: 5px;
  }
}
.item-content {
  display: flex;
  flex-direction: column;
}
.status {
  font-weight: bolder;
  font-size: 14px;
}
.n-thing::v-deep .n-thing-avatar-header-wrapper {
  align-items: center !important;
}
</style>
