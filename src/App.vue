<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <Navbar :active-view="currentView" @change-view="currentView = $event" />
    <main class="flex-1 overflow-hidden">
      <!-- Builder View -->
      <div v-if="currentView === 'builder'" class="flex h-full">
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

      <!-- ATS Checker View -->
      <div v-else-if="currentView === 'ats'" class="h-full overflow-y-auto">
        <ATSChecker />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import FormBuilder from "@/components/FormBuilder.vue";
import PreviewPane from "@/components/PreviewPane.vue";
import ATSChecker from "@/components/ATSChecker.vue";

const currentView = ref<"builder" | "ats">("builder");
</script>

<style scoped>
/* Ensure dark mode support */
</style>
