<script setup>
import { ref } from 'vue';
import { NButton, NModal, NCard, NInput } from 'naive-ui';

const showModal = ref(false);
const email = ref('');
</script>

<template>
  <div class="header-button">
    <n-button @click="showModal = true">
      Subscribe
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 350px"
        title="Subscribe to updates"
        :bordered="false"
        size="small"
        role="dialog"
        aria-modal="true"
      >
        <n-input v-model:value="email" type="text" placeholder="Enter your email" />
        <template #footer>
          <n-button>
            Subscribe via email
          </n-button>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style scoped>
.header-button {
  margin-left: 15px;
}
</style>
