<template>
  <div :class="$style.page">
    <PageTitle>{{ title }}</PageTitle>

    <div>
      <p>
        This is not a real online store. All coincidences are random. We do not have email newsletters. We do not use
        your data in any way. You can use any personal data, even if it is not real.
      </p>
      <p>We have a fake payment that does not remember your data, which, we remind you, may not be real.</p>
      <p>
        The project is completely non-commercial, open source (https://github.com/dergunovs/mhz) and design
        (https://www.figma.com/file/TOqDhQK83b2x4zM0Gtev94/9000-MHz).
      </p>
      <p>
        All data on the site is taken from open sources. If you consider yourself the copyright holder of any content on
        the site, then write to me by email dergunovs@mail.ru and I will delete this content.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';

import PageTitle from '@/layout/components/PageTitle.vue';

const title = 'Privacy policy';

useHead({
  title,
});
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
