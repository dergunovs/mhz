<template>
  <div :class="$style.container">
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<style module lang="scss">
.container {
  width: calc(100% + 64px);
  padding: 24px 32px;
  margin-top: -32px;
  margin-bottom: 32px;
  margin-left: -32px;
  color: var(--color-white);
  background-color: var(--color-primary-dark);

  h1 {
    margin: 0;
  }
}
</style>
