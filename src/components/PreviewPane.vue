<template>
  <div
    class="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden h-full flex flex-col"
  >
    <div
      class="p-6 bg-primary text-white border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-2xl font-bold tracking-tight">Real-time Preview</h2>
      <p class="text-sm opacity-80">See how your ATS-optimized CV looks.</p>
    </div>

    <div class="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900">
      <!-- CV Document Container -->
      <div
        class="bg-white shadow-sm border border-gray-200 mx-auto max-w-[21cm] min-h-[29.7cm] p-[2cm] text-gray-800"
        :style="{
          fontFamily: cvStore.cv.theme?.fontFamily || 'Inter, sans-serif',
        }"
      >
        <!-- Header -->
        <header class="mb-8 border-b-2 border-primary pb-4">
          <h1
            class="text-4xl font-extrabold uppercase tracking-widest text-primary mb-2"
          >
            {{ cvStore.cv.personalInfo.fullName || "YOUR NAME" }}
          </h1>
          <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
            <span
              v-if="cvStore.cv.personalInfo.email"
              class="flex items-center"
            >
              <span class="font-semibold mr-1">Email:</span>
              {{ cvStore.cv.personalInfo.email }}
            </span>
            <span
              v-if="cvStore.cv.personalInfo.phone"
              class="flex items-center"
            >
              <span class="font-semibold mr-1">Phone:</span>
              {{ cvStore.cv.personalInfo.phone }}
            </span>
            <span
              v-if="cvStore.cv.personalInfo.address"
              class="flex items-center"
            >
              <span class="font-semibold mr-1">Address:</span>
              {{ cvStore.cv.personalInfo.address }}
            </span>
          </div>
          <div class="flex flex-wrap gap-4 mt-2 text-sm text-primary">
            <a
              v-if="cvStore.cv.personalInfo.linkedin"
              :href="cvStore.cv.personalInfo.linkedin"
              target="_blank"
              class="hover:underline"
              >LinkedIn</a
            >
            <a
              v-if="cvStore.cv.personalInfo.github"
              :href="cvStore.cv.personalInfo.github"
              target="_blank"
              class="hover:underline"
              >GitHub</a
            >
          </div>
        </header>

        <!-- Summary -->
        <section v-if="cvStore.cv.summary" class="mb-6">
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-primary"
          >
            Professional Summary
          </h2>
          <p class="text-sm leading-relaxed text-justify">
            {{ cvStore.cv.summary }}
          </p>
        </section>

        <!-- Experience -->
        <section v-if="cvStore.cv.workExperiences.length" class="mb-6">
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-3 uppercase text-primary"
          >
            Work Experience
          </h2>
          <div
            v-for="(exp, index) in cvStore.cv.workExperiences"
            :key="index"
            class="mb-4 last:mb-0"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-base">
                  {{ exp.position || "Position" }}
                </h3>
                <p class="text-sm font-semibold italic text-gray-700">
                  {{ exp.company || "Company" }}
                </p>
              </div>
              <div class="text-xs font-bold text-gray-500 whitespace-nowrap">
                {{ exp.startDate || "Start Date" }} –
                {{ exp.endDate || "Present" }}
              </div>
            </div>
            <p
              v-if="exp.description"
              class="text-sm mt-1 whitespace-pre-wrap leading-relaxed text-gray-600"
            >
              {{ exp.description }}
            </p>
          </div>
        </section>

        <!-- Education -->
        <section v-if="cvStore.cv.education.length" class="mb-6">
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-3 uppercase text-primary"
          >
            Education
          </h2>
          <div
            v-for="(edu, index) in cvStore.cv.education"
            :key="index"
            class="mb-3 last:mb-0"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-base">
                  {{ edu.institution || "Institution" }}
                </h3>
                <p class="text-sm font-semibold italic text-gray-700">
                  {{ edu.degree || "Degree" }}
                </p>
              </div>
              <div class="text-xs font-bold text-gray-500 whitespace-nowrap">
                {{ edu.startDate || "Start Date" }} –
                {{ edu.endDate || "Present" }}
              </div>
            </div>
            <p v-if="edu.description" class="text-sm mt-1 text-gray-600">
              {{ edu.description }}
            </p>
          </div>
        </section>

        <!-- Skills -->
        <section v-if="cvStore.cv.skills.length" class="mb-6">
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-primary"
          >
            Skills
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in cvStore.cv.skills"
              :key="index"
              class="px-2 py-0.5 bg-gray-100 border border-gray-200 text-xs font-semibold rounded"
            >
              {{ skill.name
              }}<span v-if="skill.level" class="ml-1 text-gray-400"
                >({{ skill.level }}/5)</span
              >
            </span>
          </div>
        </section>

        <!-- Projects -->
        <section v-if="cvStore.cv.projects.length" class="mb-6">
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-3 uppercase text-primary"
          >
            Projects
          </h2>
          <div
            v-for="(project, index) in cvStore.cv.projects"
            :key="index"
            class="mb-3 last:mb-0"
          >
            <div class="flex justify-between items-baseline">
              <h3 class="font-bold text-base">
                {{ project.name || "Project Name" }}
              </h3>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                class="text-xs text-primary hover:underline"
                >Link</a
              >
            </div>
            <p
              v-if="project.description"
              class="text-sm mt-1 text-gray-600 leading-relaxed"
            >
              {{ project.description }}
            </p>
          </div>
        </section>

        <!-- Custom Sections -->
        <section
          v-for="(section, index) in cvStore.cv.customSections"
          :key="index"
          class="mb-6"
        >
          <h2
            class="text-lg font-bold border-b border-gray-300 mb-2 uppercase text-primary"
          >
            {{ section.title || "Custom Section" }}
          </h2>
          <p class="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
            {{ section.content }}
          </p>
        </section>
      </div>
    </div>

    <!-- Footer Controls -->
    <div
      class="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2"
    >
      <Button variant="outline" @click="downloadJSON">Export JSON</Button>
      <Button @click="printCV">Download PDF</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCVStore } from "@/stores/cvStore";
import Button from "@/components/ui/Button.vue";

const cvStore = useCVStore();

function downloadJSON() {
  const data = JSON.stringify(cvStore.cv, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cv-data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function printCV() {
  window.print();
}
</script>

<style scoped>
@media print {
  /* Print styling to hide other UI elements and focus on the CV */
  body * {
    visibility: hidden;
  }
  .max-w-\[21cm\] {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    max-width: none !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .max-w-\[21cm\] * {
    visibility: visible;
  }
}

.bg-primary {
  background-color: #1a1a1a;
}
.text-primary {
  color: #1a1a1a;
}
.border-primary {
  border-color: #1a1a1a;
}
</style>
