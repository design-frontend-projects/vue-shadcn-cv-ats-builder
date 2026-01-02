<template>
  <textarea
    :class="[
      'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    ]"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  class?: string;
}>();
</script>

<style scoped>
.border-input {
  border-color: #e2e8f0;
}
.bg-background {
  background-color: #ffffff;
}
</style>
