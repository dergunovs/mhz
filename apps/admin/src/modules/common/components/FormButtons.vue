<template>
  <div :class="$style.buttons">
    <div :class="$style.buttonsInner">
      <UiButton type="submit" :isDisabled="props.isLoading" data-test="form-buttons-submit">
        {{ props.id ? 'Update' : 'Submit' }}
      </UiButton>

      <UiButton @click="router.go(-1)" layout="secondary" :isDisabled="props.isLoading" data-test="form-buttons-back">
        Back
      </UiButton>
    </div>

    <UiButton
      v-if="props.id"
      @click="isShowConfirm = true"
      layout="secondary"
      :isDisabled="props.isLoading"
      data-test="form-buttons-delete"
    >
      Delete
    </UiButton>

    <UiModal
      v-if="props.id"
      v-model="isShowConfirm"
      isConfirm
      @confirm="emit('delete', props.id)"
      data-test="form-buttons-confirm-modal"
    >
      Confirm delete?
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton, UiModal } from 'mhz-ui';

interface IProps {
  id?: string;
  isLoading?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits<{ delete: [id: string] }>();

const isShowConfirm = ref(false);

const router = useRouter();
</script>

<style module lang="scss">
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.buttonsInner {
  display: flex;
  gap: 16px;
}
</style>
