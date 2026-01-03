<template>
  <div class="space-y-4">
    <!-- Add Section Controls -->
    <div
      class="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center space-x-2">
        <select
          v-model="newSectionType"
          class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        >
          <option disabled value="">Add Section...</option>
          <option
            v-for="type in availableSectionTypes"
            :key="type"
            :value="type"
          >
            {{ sectionLabels[type] || type }}
          </option>
        </select>
        <Button
          @click="addSection"
          :disabled="!newSectionType"
          variant="outline"
          size="sm"
        >
          + Add Custom
        </Button>
      </div>

      <div class="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

      <div class="flex items-center gap-2">
        <Button
          @click="quickAdd('workExperiences')"
          variant="outline"
          size="sm"
          class="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
        >
          <span class="mr-1.5">💼</span> Add Experience
        </Button>
        <Button
          @click="quickAdd('skills')"
          variant="outline"
          size="sm"
          class="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
        >
          <span class="mr-1.5">⚡</span> Add Skill
        </Button>
      </div>
    </div>

    <!-- Section List (Drag-and-Drop placeholder) -->
    <div class="space-y-2">
      <div
        v-for="id in sectionOrder"
        :key="id"
        class="bg-white dark:bg-gray-800 rounded shadow-sm p-2"
      >
        <SectionItem :section-id="id" @remove="removeSection(id)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCVStore } from "@/stores/cvStore";
import Button from "@/components/ui/Button.vue";
import SectionItem from "@/components/SectionItem.vue";

// Available section types (keys correspond to store arrays)
const availableSectionTypes = [
  "personalInfo",
  "workExperiences",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "customSections",
];

const sectionLabels: Record<string, string> = {
  personalInfo: "Personal Information",
  workExperiences: "Work Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  customSections: "Custom Sections",
};

const cvStore = useCVStore();
const newSectionType = ref("");

// Flatten all sections into a single ordered list for UI
const sectionOrder = computed(() => {
  const order: string[] = [];
  // personalInfo is singular – give it a fixed id
  if (cvStore.cv.personalInfo) order.push("personalInfo");
  // For array sections, push ids like "workExperience-0"
  cvStore.cv.workExperiences.forEach((_, i) =>
    order.push(`workExperiences-${i}`)
  );
  cvStore.cv.education.forEach((_, i) => order.push(`education-${i}`));
  cvStore.cv.skills.forEach((_, i) => order.push(`skills-${i}`));
  cvStore.cv.projects.forEach((_, i) => order.push(`projects-${i}`));
  cvStore.cv.certifications.forEach((_, i) =>
    order.push(`certifications-${i}`)
  );
  cvStore.cv.languages.forEach((_, i) => order.push(`languages-${i}`));
  cvStore.cv.customSections.forEach((_, i) =>
    order.push(`customSections-${i}`)
  );
  return order;
});

function quickAdd(type: string) {
  newSectionType.value = type;
  addSection();
}

function addSection() {
  const type = newSectionType.value as keyof typeof cvStore.cv;
  if (!type) return;
  // Push a new empty object based on type
  switch (type) {
    case "personalInfo":
      // Already exists – nothing to add
      break;
    case "workExperiences":
      cvStore.cv.workExperiences.push({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      break;
    case "education":
      cvStore.cv.education.push({
        institution: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
      });
      break;
    case "skills":
      cvStore.cv.skills.push({ name: "", level: 3 });
      break;
    case "projects":
      cvStore.cv.projects.push({ name: "", description: "", link: "" });
      break;
    case "certifications":
      cvStore.cv.certifications.push({ name: "", issuer: "" });
      break;
    case "languages":
      cvStore.cv.languages.push({ name: "" });
      break;
    case "customSections":
      cvStore.cv.customSections.push({ title: "", content: "" });
      break;
  }
  newSectionType.value = "";
}

function removeSection(id: string) {
  const [type, indexStr] = id.split("-");
  if (!indexStr) return; // personalInfo cannot be removed
  const idx = Number(indexStr);
  switch (type) {
    case "workExperiences":
      cvStore.cv.workExperiences.splice(idx, 1);
      break;
    case "education":
      cvStore.cv.education.splice(idx, 1);
      break;
    case "skills":
      cvStore.cv.skills.splice(idx, 1);
      break;
    case "projects":
      cvStore.cv.projects.splice(idx, 1);
      break;
    case "certifications":
      cvStore.cv.certifications.splice(idx, 1);
      break;
    case "languages":
      cvStore.cv.languages.splice(idx, 1);
      break;
    case "customSections":
      cvStore.cv.customSections.splice(idx, 1);
      break;
  }
}

function onDragEnd(event: any) {
  // TODO: Implement proper drag and drop for Vue.
  // The current implementation used React libraries which are incompatible.
  console.log("Drag end event:", event);
}
</script>
