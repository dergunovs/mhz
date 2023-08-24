<template>
  <div :class="$style.breadcrumbs">
    <div v-for="(link, index) in props.links" :key="`${link.title}${link.url}`" :class="$style.links">
      <component
        :is="index === props.links.length - 1 ? 'div' : linkComponent"
        :to="link.url"
        :class="$style.link"
        :data-link="index !== props.links.length - 1"
        :data-white="props.color === 'white'"
      >
        {{ link.title }}
      </component>

      <span v-if="index !== props.links.length - 1" :class="$style.slash" :data-white="props.color === 'white'">/</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

interface ILink {
  url?: string;
  title?: string;
}

interface IProps {
  links: ILink[];
  color?: 'white' | 'default';
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'default',
});

const isDevMode = import.meta.env.DEV;

const linkComponent = computed(() => (isDevMode ? 'a' : RouterLink));
</script>

<style module lang="scss">
.breadcrumbs {
  display: flex;
  gap: 4px;
}

.links {
  display: flex;
  gap: 4px;
}

.link {
  color: var(--color-gray-dark);
  text-decoration: none;

  &[data-link='true'] {
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      color: var(--color-primary-dark);
    }
  }

  &[data-white='true'] {
    color: var(--color-white);

    &:hover {
      color: var(--color-gray-light);
    }
  }
}

.slash {
  color: var(--color-gray-dark);

  &[data-white='true'] {
    color: var(--color-white);
  }
}
</style>
