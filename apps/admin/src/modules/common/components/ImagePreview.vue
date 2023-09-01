<template>
  <div :class="$style.container">
    <div>
      Image<template v-if="props.urls.length > 1">s <i>(sortable)</i></template>
    </div>

    <Sortable :list="props.urls" :itemKey="(item) => item" tag="div" @end="updateIndex" :class="$style.images">
      <template #item="{ element }">
        <div :class="$style.image" :key="element">
          <img :src="`${PATH_UPLOAD}/${element}`" width="200" alt="Image" loading="lazy" crossorigin="anonymous" />
          <UiButton @click="handleDeleteFile(element)" layout="plain">Delete</UiButton>
        </div>
      </template>
    </Sortable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { Sortable } from 'sortablejs-vue3';

import { UiButton } from 'mhz-ui';

import { PATH_UPLOAD } from '@/common/constants';
import { deleteFile } from '@/common/services';

interface IProps {
  urls: string[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['delete', 'update']);

const urlsSortable = ref<string[]>([]);

function updateIndex(event: { oldIndex: number; newIndex: number }) {
  urlsSortable.value.splice(event.newIndex, 0, urlsSortable.value.splice(event.oldIndex, 1)[0]);
  emit('update', urlsSortable.value);
}

const { mutate: mutateDeleteFile } = deleteFile();

function handleDeleteFile(url: string) {
  mutateDeleteFile(url);
  emit('delete', url);
}

function getUrls() {
  urlsSortable.value = [...props.urls];
}

onMounted(() => {
  getUrls();

  watch(
    () => props.urls,
    () => getUrls()
  );
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.images {
  display: flex;
  gap: 8px;
}

.image {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  padding: 8px;
  border: 1px solid var(--color-gray);
  border-radius: 16px;
}
</style>
