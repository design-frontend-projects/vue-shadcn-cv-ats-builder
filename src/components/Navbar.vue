<template>
  <nav
    class="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="flex h-14 items-center px-4">
      <!-- Logo / Title -->
      <div class="mr-4 flex">
        <a class="flex items-center space-x-2 font-bold" href="/">
          <span class="inline-block h-6 w-6 bg-primary rounded-full"></span>
          <span class="hidden sm:inline-block">CV Builder</span>
        </a>
      </div>

      <!-- Right Side Actions -->
      <div class="flex flex-1 items-center justify-end space-x-2">
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<style scoped>
/* Optional: Add sticky positioning if needed */
nav {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
}
</style>
