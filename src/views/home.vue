<template>
  <div class="home">{{ a }}</div>
</template>

<script setup lang="ts">
  const a = ref(1)
</script>

<style scoped lang="scss">
  .home {
    color: red;
  }
</style>
