<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <Navbar />
    <div class="flex flex-1 overflow-hidden">
      <!-- Left panel: Form Builder -->
      <section class="w-1/2 overflow-y-auto p-4">
        <FormBuilder />
      </section>
      <!-- Right panel: Live CV Preview -->
      <section
        class="w-1/2 overflow-y-auto border-l border-gray-200 dark:border-gray-700 p-4"
      >
        <PreviewPane />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import FormBuilder from "@/components/FormBuilder.vue";
import PreviewPane from "@/components/PreviewPane.vue";
</script>

<style scoped>
/* Ensure dark mode support */
</style>
