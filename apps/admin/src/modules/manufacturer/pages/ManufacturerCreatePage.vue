<template>
  <div>
    <PageTitle>Добавить производителя</PageTitle>

    <div :class="$style.form">
      <ManufacturerForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/layout/components/PageTitle.vue';
import ManufacturerForm from '@/manufacturer/components/ManufacturerForm.vue';
</script>

<style module lang="scss">
.form {
  width: 300px;
}
</style>
