<script setup>
import { onMounted, ref } from 'vue';
import { NAlert } from 'naive-ui';
import { getUrls, getReportByUrl } from '../../prepareData';

const titlesMap = {
  nodata: 'No data',
  success: 'All Systems Operational',
  failure: 'Major Outage in all systems',
  partial: 'Some systems has partial Outage'
};

const typesMap = {
  nodata: 'default',
  success: 'success',
  failure: 'error',
  partial: 'warning'
};

const reports = ref([]);
const currentStatus = ref('');

onMounted(async () => {
  const urls = await getUrls();
  const promises = [];
  for (const urlData of urls) {
    promises.push(getReportByUrl(urlData.key, true));
  }
  reports.value = await Promise.all(promises);
  if (reports.value.every(item => item === null || item === undefined)) {
    currentStatus.value = 'nodata';
    return;
  }
  const commonStatus = reports.value.reduce((acc, item) => acc + item, 0);

  currentStatus.value = commonStatus === (urls.length)
      ? 'success'
      : commonStatus < (0.3 * urls.length)
        ? 'failure'
        : 'partial';
});
</script>

<template>
  <n-alert :title="titlesMap[currentStatus]" :type="typesMap[currentStatus]" />
</template>
