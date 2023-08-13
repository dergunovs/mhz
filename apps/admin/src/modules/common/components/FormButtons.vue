<template>
  <div :class="$style.buttons">
    <div :class="$style.buttonsInner">
      <UiButton type="submit" :isDisabled="props.isLoading">
        {{ props.id ? 'Update' : 'Submit' }}
      </UiButton>

      <UiButton @click="$router.go(-1)" layout="secondary" :isDisabled="props.isLoading">Back</UiButton>
    </div>

    <UiButton v-if="props.id" @click="emit('delete', props.id)" layout="secondary" :isDisabled="props.isLoading">
      Delete
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';

interface IProps {
  id?: string;
  isLoading: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['delete']);
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
