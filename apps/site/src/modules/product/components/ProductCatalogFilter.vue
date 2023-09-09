<template>
  <div :class="$style.container">
    <div :class="$style.filters">
      <div :class="[$style.filter, $style.price]">
        <div :class="$style.title">Price</div>

        <div :class="$style.range">
          <UiRange
            :min="props.priceRange[0]"
            :max="props.priceRange[1]"
            :modelValue="choosenPrice"
            @update:modelValue="updatePrice"
          />
        </div>
      </div>

      <div v-if="route.name === 'Manufacturer'" :class="$style.filter">
        <div :class="$style.title">Category</div>

        <div :class="$style.values">
          <UiCheckbox
            v-for="category in filters.category"
            :key="category._id"
            :modelValue="choosenCategories.some((choosen) => choosen._id === category._id)"
            @update:modelValue="updateCategories(category, $event)"
            :label="`${category.title}`"
            :subLabel="` (${category.count})`"
            :isDisabled="category.count === 0"
          />
        </div>
      </div>
      <div v-if="route.name === 'Category'" :class="$style.filter">
        <div :class="$style.title">Manufacturer</div>

        <div :class="$style.values">
          <UiCheckbox
            v-for="manufacturer in filters.manufacturer"
            :key="manufacturer._id"
            :modelValue="choosenManufacturers.some((choosen) => choosen._id === manufacturer._id)"
            @update:modelValue="updateManufacturers(manufacturer, $event)"
            :label="`${manufacturer.title}`"
            :subLabel="` (${manufacturer.count})`"
            :isDisabled="manufacturer.count === 0"
          />
        </div>
      </div>

      <div v-for="(item, key, index) in filters.fields" :key="key" :class="$style.filter">
        <UiSpoiler v-model="fieldSpoilers[index]" :title="item.fieldUnits ? `${key}, ${item.fieldUnits}` : `${key}`">
          <div :class="$style.values">
            <UiCheckbox
              v-for="value in item.fieldValues"
              :key="value.value.toString()"
              :modelValue="
                choosenFields.some(
                  (field) => field.title === key.toString() && field.values.includes(value.value.toString())
                )
              "
              @update:modelValue="updateFields(key.toString(), value.value.toString(), $event)"
              :label="convertBooleanValue(value.value)"
              :subLabel="` (${value.count})`"
              :isDisabled="value.count === 0"
            />
          </div>
        </UiSpoiler>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { IFilterData, IFilterField, IFilterBaseValue, IFilterFieldValue } from 'mhz-types';
import { UiCheckbox, UiRange, UiSpoiler } from 'mhz-ui';
import { clone } from 'mhz-helpers';

interface IProps {
  filtersInitial: IFilterData;
  filtersBase?: IFilterData;
  priceRange: [number, number];
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);

const route = useRoute();

const fieldSpoilers = ref([]);

const choosenPrice = ref<[number, number]>([props.priceRange[0], props.priceRange[1]]);
const choosenCategories = ref<IFilterBaseValue[]>([]);
const choosenManufacturers = ref<IFilterBaseValue[]>([]);
const choosenFields = ref<{ title: string; values: string[] }[]>([]);

const filters = ref<IFilterData>(props.filtersInitial);

function convertBooleanValue(value: string | boolean) {
  if (typeof value === 'string') return value;

  return value === true ? 'Yes' : 'No';
}

function updatePrice(value: [number, number]) {
  choosenPrice.value = [...value];
}

function updateFields(title: string, value: string, isChecked: boolean) {
  const currentField = choosenFields.value.find((field) => field.title === title);

  if (isChecked) {
    if (currentField) {
      currentField.values = [...currentField.values, value];
    } else {
      choosenFields.value = [...choosenFields.value, { title, values: [value] }];
    }
  } else if (currentField) {
    currentField.values = currentField.values.filter((currentValue) => currentValue !== value);
  }
}

function updateCategories(category: IFilterBaseValue, isChecked: boolean) {
  choosenCategories.value = isChecked
    ? [...choosenCategories.value, category]
    : choosenCategories.value.filter((current) => current._id !== category._id);
}

function updateManufacturers(manufacturer: IFilterBaseValue, isChecked: boolean) {
  choosenManufacturers.value = isChecked
    ? [...choosenManufacturers.value, manufacturer]
    : choosenManufacturers.value.filter((current) => current._id !== manufacturer._id);
}

const choosenFilters = computed(() => {
  const price = { price: choosenPrice.value };

  const category = { category: choosenCategories.value.map((cat) => cat._id) };

  const manufacturer = { manufacturer: choosenManufacturers.value.map((man) => man._id) };

  const fields = choosenFields.value.map((field) => {
    return { [field.title]: field.values };
  });

  return route.name === 'Category' ? { ...price, ...manufacturer, fields } : { ...price, ...category, fields };
});

watch(
  () => [choosenPrice.value, choosenCategories.value, choosenManufacturers.value, choosenFields.value],
  () => {
    emit('update', choosenFilters.value);
  },
  { deep: true }
);

function findNewCount(
  newFilters: { category: IFilterBaseValue[]; manufacturer: IFilterBaseValue[] },
  parent: string,
  title: string
) {
  const found: (number | undefined)[] = [];

  Object.entries(newFilters).forEach(([parentKey, parentValue]) => {
    found.push(parentValue.find((value) => parent === parentKey && title === value.title)?.count);
  });

  return found.filter(Boolean)[0] || 0;
}

function findNewFieldCount(newFilters: IFilterField, title: string, values: IFilterFieldValue[]) {
  const found: IFilterFieldValue[] = [];

  Object.entries(newFilters).forEach(([newTitle, newValues]) => {
    if (title === newTitle) {
      values.forEach((oldValue) => {
        let value = { value: oldValue.value, count: 0 };

        newValues.fieldValues.forEach((newValue) => {
          if (oldValue.value === newValue.value) {
            value = newValue;
          }
        });

        found.push(value);
      });
    }
  });

  return found;
}

function cloneFilter(filter: IFilterData) {
  return { category: clone(filter).category, manufacturer: clone(filter).manufacturer };
}

function cloneFilterFields(filter: IFilterData) {
  return clone(filter).fields;
}

watch(
  () => props.filtersBase,
  () => {
    if (
      props.filtersInitial &&
      props.filtersBase &&
      Object.keys(props.filtersBase.fields).length === Object.keys(props.filtersInitial.fields).length
    ) {
      const newCategoriesAndManufacturers = cloneFilter(props.filtersBase);
      const newFields = cloneFilterFields(props.filtersBase);

      const oldCategoriesAndManufacturers = cloneFilter(filters.value);
      const oldFields = cloneFilterFields(filters.value);

      const updatedCategoriesAndManufacturers = Object.fromEntries(
        Object.entries(oldCategoriesAndManufacturers).map(([parentKey, parentValue]) => {
          return [
            parentKey,
            parentValue.map((value) => {
              return { ...value, count: findNewCount(newCategoriesAndManufacturers, parentKey, value.title) };
            }),
          ];
        })
      );

      const updatedFields = Object.fromEntries(
        Object.entries(oldFields).map(([title, values]) => {
          return [
            title,
            { fieldUnits: values.fieldUnits, fieldValues: findNewFieldCount(newFields, title, values.fieldValues) },
          ];
        })
      );

      filters.value = { ...updatedCategoriesAndManufacturers, fields: updatedFields } as IFilterData;
    }
  }
);
</script>

<style module lang="scss">
.container {
  display: flex;
  flex-shrink: 0;
  width: 240px;
  padding-right: 16px;
  border-right: 1px solid var(--color-gray);
}

.filters {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
}

.price {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 64px;
}

.range {
  position: relative;
  z-index: 0;
  padding: 0 12px;
}

.title {
  margin-bottom: 4px;
  font-weight: 700;
}

.values {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
