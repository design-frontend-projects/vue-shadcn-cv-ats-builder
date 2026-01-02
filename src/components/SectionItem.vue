<template>
  <div
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md"
  >
    <div
      class="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 dark:border-gray-700"
    >
      <div class="flex items-center space-x-2">
        <span
          class="text-xs font-bold uppercase tracking-wider text-gray-400"
          >{{ sectionTypeLabel }}</span
        >
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-100">
          {{ sectionTitle }}
        </h3>
      </div>
      <Button
        v-if="canRemove"
        variant="ghost"
        size="sm"
        class="text-red-500 hover:text-red-700 hover:bg-red-50"
        @click="$emit('remove')"
      >
        <span class="text-lg">&times;</span>
      </Button>
    </div>

    <!-- Personal Info Form -->
    <div v-if="type === 'personalInfo'" class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label>Full Name</Label>
        <Input
          v-model="cvStore.cv.personalInfo.fullName"
          placeholder="John Doe"
        />
      </div>
      <div class="space-y-2">
        <Label>Email</Label>
        <Input
          v-model="cvStore.cv.personalInfo.email"
          type="email"
          placeholder="john@example.com"
        />
      </div>
      <div class="space-y-2">
        <Label>Phone</Label>
        <Input
          v-model="cvStore.cv.personalInfo.phone"
          placeholder="+1 234 567 890"
        />
      </div>
      <div class="space-y-2">
        <Label>Address</Label>
        <Input
          v-model="cvStore.cv.personalInfo.address"
          placeholder="New York, USA"
        />
      </div>
    </div>

    <!-- Work Experience Form -->
    <div v-else-if="type === 'workExperiences'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Company</Label>
          <Input v-model="cvStore.cv.workExperiences[index].company" />
        </div>
        <div class="space-y-2">
          <Label>Position</Label>
          <Input v-model="cvStore.cv.workExperiences[index].position" />
        </div>
      </div>
      <div class="space-y-2">
        <Label>Location</Label>
        <Input
          v-model="cvStore.cv.workExperiences[index].location"
          placeholder="City, Country"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Start Date</Label>
          <Input
            v-model="cvStore.cv.workExperiences[index].startDate"
            placeholder="MM/YYYY"
          />
        </div>
        <div class="space-y-2">
          <Label>End Date</Label>
          <Input
            v-model="cvStore.cv.workExperiences[index].endDate"
            placeholder="Present"
          />
        </div>
      </div>
      <div class="space-y-2">
        <Label>Description</Label>
        <Textarea
          v-model="cvStore.cv.workExperiences[index].description"
          rows="3"
        />
      </div>
    </div>

    <!-- Education Form -->
    <div v-else-if="type === 'education'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Institution</Label>
          <Input v-model="cvStore.cv.education[index].institution" />
        </div>
        <div class="space-y-2">
          <Label>Degree</Label>
          <Input v-model="cvStore.cv.education[index].degree" />
        </div>
      </div>
      <div class="space-y-2">
        <Label>Location</Label>
        <Input
          v-model="cvStore.cv.education[index].location"
          placeholder="City, Country"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Start Date</Label>
          <Input v-model="cvStore.cv.education[index].startDate" />
        </div>
        <div class="space-y-2">
          <Label>End Date</Label>
          <Input v-model="cvStore.cv.education[index].endDate" />
        </div>
      </div>
    </div>

    <!-- Skill Form -->
    <div v-else-if="type === 'skills'" class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label>Skill Name</Label>
        <Input v-model="cvStore.cv.skills[index].name" />
      </div>
      <div class="space-y-2">
        <Label>Level (1-5)</Label>
        <Input
          v-model.number="cvStore.cv.skills[index].level"
          type="number"
          min="1"
          max="5"
        />
      </div>
    </div>

    <!-- Project Form -->
    <div v-else-if="type === 'projects'" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label>Project Name</Label>
          <Input v-model="cvStore.cv.projects[index].name" />
        </div>
        <div class="space-y-2">
          <Label>Link</Label>
          <Input v-model="cvStore.cv.projects[index].link" />
        </div>
      </div>
      <div class="space-y-2">
        <Label>Description</Label>
        <Textarea v-model="cvStore.cv.projects[index].description" rows="2" />
      </div>
    </div>

    <!-- Custom Section Form -->
    <div v-else-if="type === 'customSections'" class="space-y-4">
      <div class="space-y-2">
        <Label>Section Title</Label>
        <Input v-model="cvStore.cv.customSections[index].title" />
      </div>
      <div class="space-y-2">
        <Label>Content</Label>
        <Textarea v-model="cvStore.cv.customSections[index].content" rows="4" />
      </div>
    </div>

    <div v-else class="text-gray-400 italic text-sm">
      Form for {{ type }} is under development.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCVStore } from "@/stores/cvStore";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Textarea from "@/components/ui/Textarea.vue";

const props = defineProps<{
  sectionId: string;
}>();

defineEmits(["remove"]);

const cvStore = useCVStore();

const type = computed(() => props.sectionId.split("-")[0]);
const index = computed(() => {
  const parts = props.sectionId.split("-");
  return parts.length > 1 ? parseInt(parts[1]) : 0;
});

const canRemove = computed(() => type.value !== "personalInfo");

const sectionTypeLabel = computed(() => {
  const dictionary: Record<string, string> = {
    personalInfo: "Static",
    workExperiences: "Professional",
    education: "Academic",
    skills: "Capability",
    projects: "Portfolio",
    certifications: "Achievement",
    languages: "Linguistic",
    customSections: "Additional",
  };
  return dictionary[type.value] || "Section";
});

const sectionTitle = computed(() => {
  const dictionary: Record<string, string> = {
    personalInfo: "Personal Information",
    workExperiences: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    customSections: "Custom Section",
  };
  return dictionary[type.value] || type.value;
});
</script>
