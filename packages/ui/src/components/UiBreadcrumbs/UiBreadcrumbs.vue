<template>
  <div :class="$style.breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList">
    <div
      v-for="(link, index) in props.links"
      :key="`${link.title}${link.url}`"
      :class="$style.links"
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
      data-test="ui-breadcrumb"
    >
      <component
        :is="index === props.links.length - 1 ? 'div' : linkComponent"
        :to="link.url"
        :class="$style.link"
        :data-link="index !== props.links.length - 1"
        :data-color="props.color"
        :itemid="link.url"
        itemtype="https://schema.org/Thing"
        itemscope
        itemprop="item"
        data-test="ui-breadcrumb-link"
      >
        <span itemprop="name" data-test="ui-breadcrumb-title">{{ link.title }}</span>
      </component>

      <span
        v-if="index !== props.links.length - 1"
        :class="$style.slash"
        :data-color="props.color"
        data-test="ui-breadcrumb-slash"
        >/</span
      >

      <meta itemprop="position" :content="(index + 1).toString()" data-test="ui-breadcrumb-position" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import { DEFAULT_COLOR } from './constants';

interface ILink {
  url: string;
  title?: string;
}

interface IProps {
  links: ILink[];
  color?: 'white' | 'default';
}

const props = withDefaults(defineProps<IProps>(), {
  color: DEFAULT_COLOR,
});

declare const window: Window & typeof globalThis & { IS_STORYBOOK: boolean };

const linkComponent = computed(() => (window['IS_STORYBOOK'] ? 'a' : RouterLink));
</script>

<style module lang="scss">
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
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

  &[data-color='white'] {
    color: var(--color-white);

    &:hover {
      color: var(--color-gray-light);
    }
  }
}

.slash {
  color: var(--color-gray-dark);

  &[data-color='white'] {
    color: var(--color-white);
  }
}
</style>
