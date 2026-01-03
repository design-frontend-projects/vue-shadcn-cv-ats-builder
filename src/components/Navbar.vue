<template>
  <nav
    class="border-b bg-white dark:bg-gray-900 bg-opacity-95 backdrop-blur-sm sticky top-0 z-50 w-full"
  >
    <div class="flex h-16 items-center px-6 max-w-7xl mx-auto">
      <!-- Logo / Title -->
      <div class="mr-8 flex items-center gap-2">
        <div
          class="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold"
        >
          CV
        </div>
        <span class="text-xl font-extrabold tracking-tight hidden sm:block"
          >ATS Builder</span
        >
      </div>

      <!-- Navigation Links -->
      <div class="flex items-center space-x-1 flex-1">
        <button
          @click="$emit('change-view', 'builder')"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="
            activeView === 'builder'
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          CV Builder
        </button>
        <button
          @click="$emit('change-view', 'ats')"
          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
          :class="
            activeView === 'ats'
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          "
        >
          ATS Checker
        </button>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggle from "@/components/ThemeToggle.vue";

defineProps<{
  activeView: "builder" | "ats";
}>();

defineEmits<{
  (e: "change-view", view: "builder" | "ats"): void;
}>();
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
