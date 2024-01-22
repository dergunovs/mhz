<template>
  <button @click="goToConfigurationIfLoggedIn" :class="$style.ad" type="button">
    <div :class="$style.title">
      PC<br />
      configurator
    </div>

    <IconConfigurator />

    <div :class="$style.link">Build your PC ➝</div>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { isAuth } from 'mhz-helpers';

import IconConfigurator from '@/configuration/icons/configurator.svg?component';
import { URL_CUSTOMER_CONFIGURATION_CREATE } from '@/customer/constants';
import { URL_SIGN_UP } from '@/auth/constants';

const router = useRouter();

function goToConfigurationIfLoggedIn() {
  router.push(isAuth.value ? URL_CUSTOMER_CONFIGURATION_CREATE : URL_SIGN_UP);
}
</script>

<style module lang="scss">
.ad {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 192px;
  padding: 24px 16px;
  color: var(--color-white);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-accent);
  border: none;
  border-radius: 8px;
  transition: all 200ms;

  &:hover {
    color: var(--color-white);
    background-color: var(--color-accent-dark);
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.link {
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-white);
  text-align: right;
}

@media (max-width: $mobile) {
  .ad {
    width: 100%;
  }

  .title br {
    display: none;
  }
}
</style>
