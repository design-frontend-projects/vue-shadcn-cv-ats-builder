<template>
  <Button
    variant="ghost"
    size="sm"
    @click="toggleTheme"
    class="w-9 px-0"
    title="Toggle Theme"
  >
    <!-- Sun Icon (for Dark Mode) -->
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 transition-all text-yellow-400"
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
    <!-- Moon Icon (for Light Mode) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-5 w-5 transition-all text-slate-700 dark:text-slate-400"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
import Button from "@/components/ui/Button.vue";

const { isDark, toggleTheme } = useTheme();
</script>
