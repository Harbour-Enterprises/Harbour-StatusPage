<script setup>
import { onMounted, ref } from 'vue';
import { NList, NListItem } from 'naive-ui';
import StatusTableItem from './StatusTableItem.vue';
import { getUrls } from '../../prepareData';

const urls = ref([]);

onMounted(async () => {
  urls.value = await getUrls();
});
</script>

<template>
  <n-list bordered>
    <n-list-item v-for="urlData in urls">
      <StatusTableItem
        :file-name="urlData.key"
        :title="urlData.name"
        :description="urlData.url"
      />
    </n-list-item>
  </n-list>
</template>

