<template>
  <footer :class="$style.footer">
    <RouterLink :to="URL_MAIN" aria-label="Footer logo">
      <img :src="IconLogoWhite" width="200" height="30" loading="lazy" alt="Footer logo" />
    </RouterLink>

    <div :class="$style.innerBlock">
      <div :class="$style.inner">
        <div>Contact us: <a href="tel:74629210613" :class="$style.link">+7 462 921 0613</a></div>
        <div>E-mail: <a href="mailto:sales@9000mhz.ru" :class="$style.link">sales@9000mhz.ru</a></div>
      </div>

      <div :class="$style.inner">
        <RouterLink :to="URL_CATEGORY" :class="$style.link">Categories</RouterLink>
        <RouterLink :to="URL_MANUFACTURER" :class="$style.link">Manufacturers</RouterLink>
        <RouterLink :to="URL_PRIVACY" :class="$style.link">Privacy policy</RouterLink>
      </div>

      <form @submit.prevent="submit" :class="[$style.inner, $style.subscribe]">
        <UiField label="Subscribe to promotions and offers" isRequired :error="error('email')">
          <UiInput v-model="formData.email" />
        </UiField>

        <div>
          <UiButton type="submit">Subscribe</UiButton>
        </div>
      </form>
    </div>

    <UiModal v-model="isShowModal">
      <div>Thanks for subscribing. We remind you that this is not a real online store.</div>
    </UiModal>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiField, UiInput, UiModal } from 'mhz-ui';
import { email, required, useValidator } from 'mhz-helpers';

import IconLogoWhite from '@/layout/icons/logo-text-white.svg?url';

import { URL_MAIN, URL_PRIVACY } from '@/common/constants';
import { URL_CATEGORY } from '@/category/constants';
import { URL_MANUFACTURER } from '@/manufacturer/constants';

const isShowModal = ref(false);

const formData = ref({
  email: '',
});

const rules = computed(() => {
  return {
    email: [required, email],
  };
});

const { error, isValid } = useValidator(formData, rules);

function submit() {
  if (isValid()) isShowModal.value = true;
}
</script>

<style module lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px;
  background-color: var(--color-accent-dark);
}

.innerBlock {
  display: flex;
  gap: 64px;
  color: var(--color-white);
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 240px;
}

.link {
  color: var(--color-white);

  &:hover {
    color: var(--color-gray-light);
  }
}

.subscribe {
  gap: 16px;
}

@media (max-width: $notebook) {
  .footer {
    padding: 64px 32px;
  }
}

@media (max-width: $tablet) {
  .footer {
    padding: 48px 16px;
  }
}
</style>
