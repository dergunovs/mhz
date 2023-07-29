<template>
  <div :class="$style.layout">
    <RouterView />
  </div>
</template>

<style module lang="scss">
.layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
