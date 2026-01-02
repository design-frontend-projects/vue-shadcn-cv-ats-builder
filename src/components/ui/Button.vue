<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
      variant === 'outline'
        ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
        : 'bg-primary text-primary-foreground hover:bg-primary/90',
      variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' : '',
      size === 'sm' ? 'h-9 rounded-md px-3' : '',
      size === 'lg' ? 'h-11 rounded-md px-8' : '',
      props.class,
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  class?: string;
}>();
</script>

<style scoped>
.bg-primary {
  background-color: #1a1a1a;
}
.text-primary-foreground {
  color: #ffffff;
}
.bg-background {
  background-color: #ffffff;
}
.border-input {
  border-color: #e2e8f0;
}
.hover\:bg-primary\/90:hover {
  background-color: rgba(26, 26, 26, 0.9);
}
</style>
