<script setup>
import { computed, onMounted, ref } from 'vue';
import { CheckCircle, ExclamationCircle, TimesCircleRegular, CircleRegular } from '@vicons/fa';
import { NIcon, NThing, NRadioGroup, NRadioButton, NEl } from 'naive-ui';
import { getReportByUrl } from '../../prepareData';
import MonthReport from './MonthReport.vue';

const props = defineProps({
  title: String,
  description: String,
});
const report = ref({});
const status = ref(null);
const viewType = ref('day');
const extraTitle = computed(() => `${report.value.upTime}% in the last 30 days`);
const statusMap = {
  nodata: 'No data',
  success: 'Fully Operational',
  failure: 'Major Outage',
  partial: 'Partial Outage'
};
const icons = {
  nodata: CircleRegular,
  success: CheckCircle,
  failure: TimesCircleRegular,
  partial: ExclamationCircle
};

const iconColors = {
  nodata: '',
  success: '#18a058',
  failure: '#e88080',
  partial: '#f2c97d'
};

onMounted(async () => {
  report.value = await getReportByUrl(props.title);
  const lastDayStatus = Object.values(report.value)[0];
  status.value = lastDayStatus == null
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
      fontSize: '12px'
    }"
  >
    <n-el
      tag="div"
      class="item-content"
    >
      <n-radio-group 
        v-model:value="viewType" 
        name="view"
        size="small"
      >
        <n-radio-button
          value="day"
          label="One day"
        />
        <n-radio-button
          value="month"
          label="Month"
        />
      </n-radio-group>

      <n-el
        v-if="viewType === 'day'"
        tag="div"
        class="status-data"
      >
        <span>{{ statusMap[status] }}</span>
        <n-icon
          :component="icons[status]"
          :color="iconColors[status]"
        />
      </n-el>
      
      <MonthReport
        v-if="viewType === 'month'"
        :report="report"
        :status-map="statusMap"
        :colors="iconColors"
      />
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
