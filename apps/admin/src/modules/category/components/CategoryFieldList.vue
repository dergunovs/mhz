<template>
  <div :class="$style.container">
    <div>
      Field<template v-if="props.fields.length > 1">s <i>(sortable)</i></template>
    </div>

    <Sortable
      :list="props.fields"
      itemKey="title"
      tag="div"
      @end="updateIndex"
      :class="$style.fields"
      :data-disabled="isShowCategoryFieldForm"
    >
      <template #item="{ element }">
        <div :class="$style.field" :key="element.title">
          <div>
            <span>{{ element.title }}, type: {{ element.fieldType }}</span>
            <span v-if="element.fieldType === 'number'">, units: {{ element.fieldUnits }}</span>
          </div>

          <UiButton @click="emit('edit', element)" :isDisabled="isShowCategoryFieldForm" layout="plain">Edit</UiButton>
        </div>
      </template>
    </Sortable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import { Sortable } from 'sortablejs-vue3';

import { UiButton } from 'mhz-ui';
import { ICategoryField } from 'mhz-types';

interface IProps {
  fields: ICategoryField[];
  isShowCategoryFieldForm: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['edit', 'update']);

const fieldsSortable = ref<ICategoryField[]>([]);

function updateIndex(event: { oldIndex: number; newIndex: number }) {
  fieldsSortable.value.splice(event.newIndex, 0, fieldsSortable.value.splice(event.oldIndex, 1)[0]);
  emit('update', fieldsSortable.value);
}

function getFields() {
  fieldsSortable.value = [...props.fields];
}

onMounted(() => {
  getFields();

  watch(
    () => props.fields,
    () => getFields()
  );
});
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fields {
  display: flex;
  flex-direction: column;

  &[data-disabled='true'] {
    pointer-events: none;
  }
}

.field {
  display: flex;
  gap: 8px;
}
</style>
